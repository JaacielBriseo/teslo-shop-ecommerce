import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

const Custom404 = () => {
	return (
		<ShopLayout title={'Page not found'} pageDescription={'No hay nada que mostrar aqui'}>
			<Box
				sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='calc(100vh - 200px)'>
				<Typography variant='h1' component='h1' fontSize={100} fontWeight={150}>
					404 |{' '}
				</Typography>
				<Typography marginLeft={2}>Page not found </Typography>
			</Box>
		</ShopLayout>
	);
};
export default Custom404;
