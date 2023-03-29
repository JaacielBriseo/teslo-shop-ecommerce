import { Box, Typography, Link } from '@mui/material';
import NextLink from 'next/link';
import { ShopLayout } from '../../../components/layouts';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';

const EmptyPage = () => {
	return (
		<ShopLayout title='Carrito vacio' pageDescription='No hay articulos en el carrito'>
			<Box
				sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='calc(100vh - 200px)'>
				<RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
				<Box display='flex' flexDirection='column' alignItems='center'>
					<Typography>Su carrito esta vacio.</Typography>
					<NextLink href='/' passHref legacyBehavior>
						<Link typography='h4' color='secondary'>
							Regresar
						</Link>
					</NextLink>
				</Box>
			</Box>
		</ShopLayout>
	);
};
export default EmptyPage;
