import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../../components/layouts';
import { CartList, OrderSummary } from '../../../components/cart';
import NextLink from 'next/link';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
const OrderPage = () => {
	return (
		<ShopLayout title='Resumen de la orden 1254564' pageDescription='Resumen de la orden 1515156'>
			<Typography variant='h1' component='h1'>
				Orden: abc123
			</Typography>
			{/* <Chip
				sx={{ my: 2 }}
				label='Pendiente de pago'
				variant='outlined'
				color='error'
				icon={<CreditCardOffOutlined />}
			/> */}
			<Chip sx={{ my: 2 }} label='Orden ya fue pagada' variant='outlined' color='success' icon={<CreditScoreOutlined />} />
			<Grid container>
				<Grid item xs={12} sm={7}>
					<CartList />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className='summary-card'>
						<CardContent>
							<Typography variant='h2'>Resumen (3 productos)</Typography>
							<Divider sx={{ my: 1 }} />
							<Box display='flex' justifyContent='space-between'>
								<Typography variant='subtitle1'>Dirección de entrega</Typography>
								<NextLink href='/checkout/address' passHref legacyBehavior>
									<Link underline='always'>Editar</Link>
								</NextLink>
							</Box>
							<Typography>Jaaciel Briseño</Typography>
							<Typography>548 Any lugar</Typography>
							<Typography>Hmo,Son</Typography>
							<Typography>+52 622451274</Typography>
							<Divider sx={{ my: 1 }} />
							<Box display='flex' justifyContent='end'>
								<NextLink href='/cart' passHref legacyBehavior>
									<Link underline='always'>Editar</Link>
								</NextLink>
							</Box>
							<OrderSummary />
							<Box sx={{ mt: 3 }}>
								{/* Todo */}
								<h1>Pagar</h1>
								<Chip
									sx={{ my: 2 }}
									label='Orden ya fue pagada'
									variant='outlined'
									color='success'
									icon={<CreditScoreOutlined />}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};
export default OrderPage;
