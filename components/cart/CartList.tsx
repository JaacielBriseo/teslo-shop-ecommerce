import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { useCartContext } from '../../hooks';
import { ItemCounter } from '../ui';
import { ICartProduct, IOrderItem } from '../../interfaces';
interface Props {
	editable?: boolean;
	products: IOrderItem[];
}
export const CartList: React.FC<Props> = ({ editable = false, products }) => {
	const { cart, updateCartQuantity, removeCartProduct } = useCartContext();
	const onNewCartProductQuantity = (product: ICartProduct, newQuantityValue: number) => {
		product.quantity = newQuantityValue;
		updateCartQuantity(product);
	};
	const onRemoveProductFromCart = (product: ICartProduct) => {
		removeCartProduct(product);
	};
	const productsToShow = products ? products : cart;
	return (
		<>
			{productsToShow.map(product => (
				<Grid key={product.slug + product.size} container spacing={2} sx={{ mb: 1 }}>
					<Grid item xs={3}>
						<NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
							<Link>
								<CardActionArea>
									<CardMedia image={`/products/${product.image}`} component='img' sx={{ borderRadius: '5px' }} />
								</CardActionArea>
							</Link>
						</NextLink>
					</Grid>
					<Grid item xs={7}>
						<Box display='flex' flexDirection='column'>
							<Typography variant='body1'>{product.title}</Typography>
							<Typography variant='body1'>
								Talla: <strong>{product.size}</strong>
							</Typography>

							{editable ? (
								<ItemCounter
									currentValue={product.quantity}
									maxValue={10}
									updateCartProductQuantity={value => onNewCartProductQuantity(product as ICartProduct, value)}
								/>
							) : (
								<Typography variant='h5'>
									{product.quantity} {product.quantity > 1 ? 'products' : 'producto'}
								</Typography>
							)}
						</Box>
					</Grid>
					<Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
						<Typography variant='subtitle1'>${product.price}</Typography>
						{editable && (
							<Button onClick={() => onRemoveProductFromCart(product as ICartProduct)} variant='text' color='secondary'>
								Remover
							</Button>
						)}
					</Grid>
				</Grid>
			))}
		</>
	);
};
