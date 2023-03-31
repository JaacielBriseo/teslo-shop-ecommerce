import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { dbProducts } from '../../../database';
import { ItemCounter } from '../../../components/ui';
import { ShopLayout } from '../../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../../components/products';
import { ICartProduct, IProduct, ISize } from '../../../interfaces';
import { useCartContext } from '../../../hooks';
interface Props {
	product: IProduct;
}
const ProductPage: NextPage<Props> = ({ product }) => {
	const router = useRouter();
	const { addProductToCart } = useCartContext();
	const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
		_id: product._id,
		image: product.images[0],
		price: product.price,
		size: undefined,
		slug: product.slug,
		title: product.title,
		gender: product.gender,
		quantity: 1,
	});

	const selectedSize = (size: ISize) => {
		setTempCartProduct(currentProduct => ({
			...currentProduct,
			size,
		}));
	};

	const updateCartProductQuantity = (value: number) => {
		setTempCartProduct(currentProduct => {
			return {
				...currentProduct,
				quantity: value,
			};
		});
	};

	const onAddProduct = () => {
		if (!tempCartProduct.size) return;

		addProductToCart(tempCartProduct);
		router.push('/cart');
	};
	return (
		<ShopLayout title={product.title} pageDescription={product.description}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={7}>
					<ProductSlideshow images={product.images} />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Box display={'flex'} flexDirection={'column'}>
						{/* Title */}
						<Typography variant='h1' component='h1'>
							{product.title}
						</Typography>
						<Typography variant='subtitle1' component='h2'>
							${product.price}
						</Typography>

						{/* Cantidad */}
						<Box sx={{ my: 2 }}>
							<Typography variant='subtitle2'>Cantidad</Typography>
							<ItemCounter
								currentValue={tempCartProduct.quantity}
								maxValue={product.inStock > 10 ? 10 : product.inStock}
								updateCartProductQuantity={updateCartProductQuantity}
							/>
							<SizeSelector selectedSize={tempCartProduct.size} sizes={product.sizes} onSelectedSize={selectedSize} />
						</Box>

						{/* Agregar al carrito */}
						{product.inStock > 0 ? (
							<Button color='secondary' className='circular-btn' onClick={onAddProduct}>
								{tempCartProduct.size ? 'Agregar al carrito' : 'Seleccione una talla'}
							</Button>
						) : (
							<Chip label='No hay disponibles' color='error' variant='outlined' />
						)}

						{/* Description */}
						<Box sx={{ mt: 3 }}>
							<Typography variant='subtitle2'>Descripción</Typography>
							<Typography variant='body2'>{product.description}</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
// 	const { slug = '' } = query;
// 	const product = await dbProducts.getProductBySlug(slug as string);
// 	if (!product) {
// 		return {
// 			redirect: {
// 				destination: '/',
// 				permanent: false,
// 			},
// 		};
// 	}
// 	return {
// 		props: { product },
// 	};
// };

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async ctx => {
	const slugs = await dbProducts.getAllProductsSlugs();
	return {
		paths: slugs.map(({ slug }) => {
			return { params: { slug } };
		}),
		fallback: 'blocking',
	};
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params as { slug: string };
	const product = await dbProducts.getProductBySlug(slug);
	if (!product) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: {
			product,
		},
		revalidate: 86400,
	};
};
export default ProductPage;
