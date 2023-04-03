import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { useCartContext } from '../../../hooks';
import { ShopLayout } from '../../../components/layouts';
import { CartList, OrderSummary } from '../../../components/cart';
import { useMemo } from 'react';
import { countries } from '../../../utils';
const SummaryPage = () => {
	const { shippingAddress, numberOfItems } = useCartContext();
	const countryName = useMemo(
		() => countries.find(country => country.code === shippingAddress?.country)?.name,
		[shippingAddress?.country]
	);
	if (!shippingAddress) {
		return <></>;
	}
	return (
		<ShopLayout title='Resumen de orden' pageDescription='Resumen de la orden'>
			<Typography variant='h1' component='h1'>
				Resumen de la orden
			</Typography>
			<Grid container>
				<Grid item xs={12} sm={7}>
					<CartList />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>
								Resumen ({numberOfItems}) {numberOfItems === 1 ? 'producto' : 'productos'}
							</Typography>
							<Divider sx={{ my: 1 }} />
							<Box display='flex' justifyContent='space-between'>
								<Typography variant='subtitle1'>Dirección de entrega</Typography>
								<NextLink href='/checkout/address' passHref legacyBehavior>
									<Link underline='always'>Editar</Link>
								</NextLink>
							</Box>
							<Typography>
								{shippingAddress?.firstName} {shippingAddress?.lastName}
							</Typography>
							<Typography>{shippingAddress?.address}</Typography>
							<Typography>
								{shippingAddress?.city}, {shippingAddress.zip}
							</Typography>
							<Typography>{countryName}</Typography>
							<Typography>{shippingAddress?.phone}</Typography>
							<Divider sx={{ my: 1 }} />
							<Box display='flex' justifyContent='end'>
								<NextLink href='/cart' passHref legacyBehavior>
									<Link underline='always'>Editar</Link>
								</NextLink>
							</Box>
							<OrderSummary />
							<Box sx={{ mt: 3 }}>
								<Button color='secondary' className='circular-btn' fullWidth>
									Confirmar Orden
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};
export default SummaryPage;
