import { PropsWithChildren, useEffect, useReducer, useRef } from 'react';
import Cookie from 'js-cookie';
import { CartContext, cartReducer } from '.';
import { ICartProduct } from '../../interfaces';

export interface CartState {
	isLoaded: boolean;
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
	shippingAddress?: ShippingAddress;
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

const CART_INITIAL_STATE: CartState = {
	isLoaded: false,
	cart: [],
	numberOfItems: 0,
	subTotal: 0,
	tax: 0,
	total: 0,
	shippingAddress: undefined,
};
export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
	const firstTimeLoad = useRef(true);

	useEffect(() => {
		try {
			const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
			dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
		} catch (error) {
			dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
		}
	}, []);

	useEffect(() => {
		if (Cookie.get('firstName')) {
			const userAddress: ShippingAddress = {
				firstName: Cookie.get('firstName') || '',
				lastName: Cookie.get('lastName') || '',
				address: Cookie.get('address') || '',
				zip: Cookie.get('zip') || '',
				city: Cookie.get('city') || '',
				country: Cookie.get('country') || '',
				phone: Cookie.get('phone') || '',
			};
			dispatch({ type: '[Cart] - Load address from cookies', payload: userAddress });
		}
	}, []);

	useEffect(() => {
		if (firstTimeLoad.current) {
			firstTimeLoad.current = false;
			if (state.cart.length === 0) {
				return;
			}
		}
		Cookie.set('cart', JSON.stringify(state.cart));
	}, [state.cart]);

	useEffect(() => {
		const numberOfItems = state.cart.reduce((acc, product) => acc + product.quantity, 0);
		const subTotal = state.cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
		const orderSummary = {
			numberOfItems,
			subTotal,
			tax: subTotal * taxRate,
			total: subTotal * (taxRate + 1),
		};
		dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
	}, [state.cart]);

	const addProductToCart = (product: ICartProduct) => {
		const productInCart = state.cart.some(prodInCart => prodInCart._id === product._id);
		if (!productInCart) {
			return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] });
		}
		const productInCartButDifferentSize = state.cart.some(
			prodInCart => prodInCart._id === product._id && prodInCart.size === product.size
		);
		if (!productInCartButDifferentSize) {
			return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] });
		}
		const updatedProducts = state.cart.map(p => {
			if (p._id !== product._id) return p;
			if (p.size !== product.size) return p;

			p.quantity += product.quantity;
			return p;
		});
		dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });
	};

	const updateCartQuantity = (product: ICartProduct) => {
		dispatch({ type: '[Cart] - Change product in cart quantity', payload: product });
	};
	const removeCartProduct = (product: ICartProduct) => {
		dispatch({ type: '[Cart] - Remove product in cart', payload: product });
	};

	const updateAddress = (address: ShippingAddress) => {
		Cookie.set('firstName', address.firstName);
		Cookie.set('lastName', address.lastName);
		Cookie.set('address', address.address);
		Cookie.set('address2', address.address2 || '');
		Cookie.set('zip', address.zip);
		Cookie.set('city', address.city);
		Cookie.set('country', address.country);
		Cookie.set('phone', address.phone);
		dispatch({ type: '[Cart] - Update address', payload: address });
	};

	return (
		<CartContext.Provider
			value={{
				...state,
				//*Methods
				addProductToCart,
				updateCartQuantity,
				removeCartProduct,
				updateAddress,
			}}>
			{children}
		</CartContext.Provider>
	);
};
