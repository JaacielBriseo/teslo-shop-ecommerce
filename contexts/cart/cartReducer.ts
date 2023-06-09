import { CartState } from '.';
import { ICartProduct, ShippingAddress } from '../../interfaces';
type CartActionType =
	| { type: '[Cart] - LoadCart from cookies | storage'; payload: ICartProduct[] }
	| { type: '[Cart] - Update products in cart'; payload: ICartProduct[] }
	| { type: '[Cart] - Change product in cart quantity'; payload: ICartProduct }
	| { type: '[Cart] - Remove product in cart'; payload: ICartProduct }
	| { type: '[Cart] - Load address from cookies'; payload: ShippingAddress }
	| { type: '[Cart] - Update address'; payload: ShippingAddress }
	| { type: '[Cart] - Order completed' }
	| {
			type: '[Cart] - Update order summary';
			payload: {
				numberOfItems: number;
				subTotal: number;
				tax: number;
				total: number;
			};
	  };
export const cartReducer = (state: CartState, action: CartActionType): CartState => {
	switch (action.type) {
		case '[Cart] - LoadCart from cookies | storage':
			return {
				...state,
				cart: action.payload,
				isLoaded: true,
			};
		case '[Cart] - Update products in cart':
			return {
				...state,
				cart: [...action.payload],
			};
		case '[Cart] - Change product in cart quantity':
			return {
				...state,
				cart: state.cart.map(product => {
					if (product._id !== action.payload._id) return product;
					if (product.size !== action.payload.size) return product;

					return action.payload;
				}),
			};
		case '[Cart] - Remove product in cart':
			return {
				...state,
				cart: state.cart.filter(
					product => !(product._id === action.payload._id && product.size === action.payload.size)
				),
			};
		case '[Cart] - Update order summary':
			return {
				...state,
				...action.payload,
			};

		case '[Cart] - Update address':
		case '[Cart] - Load address from cookies':
			return {
				...state,
				shippingAddress: action.payload,
			};
		case '[Cart] - Order completed':
			return {
				...state,
				cart: [],
				numberOfItems: 0,
				subTotal: 0,
				tax: 0,
				total: 0,
			};

		default:
			return state;
	}
};
