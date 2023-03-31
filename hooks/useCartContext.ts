import { useContext } from 'react';
import { CartContext } from '../contexts';
export const useCartContext = () => useContext(CartContext)