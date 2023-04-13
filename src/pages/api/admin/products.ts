import type { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from '../../../../interfaces';
import { db } from '../../../../database';
import { Product } from '../../../../models';
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');
type Data = { message: string } | IProduct[] | IProduct;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getProducts(req, res);
		case 'PUT':
			return updateProduct(req, res);
		case 'POST':
			return createProduct(req, res);
		default:
			return res.status(400).json({ message: 'Bad request.' });
	}
}
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	await db.connect();
	const products = await Product.find().sort({ title: 'asc' }).lean();
	await db.disconnect();

	//TODO: Tendremos que actualizar las imagenes
	const updatedProducts = products.map(product => {
		product.images = product.images.map(image => {
			return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`;
		});
		return product;
	});

	res.status(200).json(updatedProducts);
};
const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { _id = '', images = [] } = req.body as IProduct;
	if (!isValidObjectId(_id)) {
		return res.status(400).json({ message: 'El id del producto no es válido.' });
	}
	if (images.length < 2) {
		return res.status(400).json({ message: 'Es necesario al menos 2 imágenes.' });
	}

	//TODO: posiblemente tendremos un localhost:3000/products/asdfads.jpg

	try {
		await db.connect();

		const product = await Product.findById(_id);
		if (!product) {
			await db.disconnect();
			return res.status(404).json({ message: 'No existe un producto con ese ID.' });
		}
		//TODO: Eliminar fotos en cloudinary
		product.images.forEach(async image => {
			if (!images.includes(image)) {
				const [fileId, extension] = image.substring(image.lastIndexOf('/') + 1).split('.');
				console.log({ image, fileId, extension });
				await cloudinary.uploader.destroy(fileId);
			}
		});

		await product.updateOne(req.body);

		await db.disconnect();
		return res.status(200).json(product);
	} catch (error) {
		console.log(error);
		await db.disconnect();
		return res.status(400).json({ message: 'Revisar consola del servidor.' });
	}
};
const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { images = [] } = req.body as IProduct;
	if (images.length < 2) {
		return res.status(400).json({ message: 'El producto necesita al menos 2 imagenes.' });
	}
	try {
		await db.connect();
		const productInDb = await Product.findOne({ slug: req.body.slug });
		if (productInDb) {
			await db.disconnect();
			return res.status(400).json({ message: 'Ya existe un producto con ese slug.' });
		}
		const producto = new Product(req.body);
		await producto.save({ validateBeforeSave: true });

		await db.disconnect();
		return res.status(201).json(producto);
	} catch (error) {
		await db.disconnect();
		console.log(error);
		return res.status(500).json({ message: 'Revisar los logs del servidor.' });
	}
};