import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '../../interfaces';

interface ContextProps {
	isLoaded: boolean;
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;

	shippingAddress?: ShippingAddress;

	//* Methods
	updateCartQuantity: (product: ICartProduct) => void;
	removeCartProduct: (product: ICartProduct) => void;
	addProductToCart: (product: ICartProduct) => void;
	updateAddress: (address: ShippingAddress) => void;

	createOrder: () => Promise<{
		hasError: boolean;
		message: string;
	}>;
}

export const CartContext = createContext({} as ContextProps);
