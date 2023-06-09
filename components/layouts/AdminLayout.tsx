import { PropsWithChildren } from 'react';
import { AdminNavbar } from '../admin';
import { SideMenu } from '../ui';
import { Box, Typography } from '@mui/material';
interface Props {
	title: string;
	subTitle: string;
	icon?: JSX.Element;
}
export const AdminLayout: React.FC<PropsWithChildren<Props>> = ({ title, subTitle, icon, children }) => {
	return (
		<>
			<nav>
				<AdminNavbar />
			</nav>
			<SideMenu />
			<main style={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}>
				<Box display='flex' flexDirection='column'>
					<Typography variant='h1' component='h1'>
						{icon}
						{title}
					</Typography>
					<Typography variant='h2' sx={{ mb: 1 }}>
						{subTitle}
					</Typography>
				</Box>
				<Box className='fadeIn'>{children}</Box>
			</main>
		</>
	);
};
