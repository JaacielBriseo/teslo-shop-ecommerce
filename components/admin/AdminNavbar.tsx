import NextLink from 'next/link';
import { useUiContext } from '../../hooks';
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';

export const AdminNavbar = () => {
	const { toggleSideMenu } = useUiContext();

	return (
		<AppBar>
			<Toolbar>
				<NextLink href='/' legacyBehavior passHref>
					<Link display='flex' alignItems='center'>
						<Typography variant='h6'>Teslo |</Typography>
						<Typography sx={{ marginLeft: 0.5 }}>Shop</Typography>
					</Link>
				</NextLink>

				<Box flex={1} />

				<Button onClick={toggleSideMenu}>Menu</Button>
			</Toolbar>
		</AppBar>
	);
};
