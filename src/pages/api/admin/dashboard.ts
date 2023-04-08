import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Order, Product, User } from '../../../../models';

type Data = {
	numberOfOrders: number;
	paidOrders: number; //ispaid true
	notPaidOrders: number;
	numberOfClients: number; //role client
	numberOfProducts: number;
	productsWithNoInventory: number;
	lowInventory: number; //productos con 10 o menos instock
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	await db.connect();
	const [
		numberOfOrders,
		paidOrders,
		notPaidOrders,
		numberOfClients,
		numberOfProducts,
		productsWithNoInventory,
		lowInventory,
	] = await Promise.all([
		Order.count(),
		Order.count({ isPaid: true }),
		Order.count({ isPaid: false }),
		User.count({ role: 'client' }),
		Product.count(),
		Product.count({ inStock: 0 }),
		Product.count({ inStock: { $lte: 10 } }),
	]);
	await db.disconnect();

	res.status(200).json({
		numberOfOrders,
		paidOrders,
		notPaidOrders,
		numberOfClients,
		numberOfProducts,
		productsWithNoInventory,
		lowInventory,
	});
}
