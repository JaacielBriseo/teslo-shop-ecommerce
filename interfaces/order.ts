import { ISize, IUser } from './';

export interface IOrder {
	_id?: string;
	user?: IUser | string;
	orderItems: IOrderItem[];
	shippingAddress: ShippingAddress;
	paymentResult?: string;

	numberOfItems: number;
	subTotal: number;
	total: number;
	tax: number;

	isPaid: boolean;
	paidAt?: string;

	transactionId?:string
}

export interface IOrderItem {
	_id: string;
	title: string;
	size: ISize;
	slug: string;
	image: string;
	gender: string;
	price: number;
	quantity: number;
}

export interface ShippingAddress {
	firstName: string;
	lastName: string;
	address: string;
	address2?: string;
	zip: string;
	city: string;
	country: string;
	phone: string;
}
