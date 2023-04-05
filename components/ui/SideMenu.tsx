import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext, useUiContext } from '../../hooks';
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	Input,
	InputAdornment,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from '@mui/material';
import {
	AccountCircleOutlined,
	AdminPanelSettings,
	CategoryOutlined,
	ConfirmationNumberOutlined,
	EscalatorWarningOutlined,
	FemaleOutlined,
	LoginOutlined,
	MaleOutlined,
	SearchOutlined,
	VpnKeyOutlined,
} from '@mui/icons-material';

export const SideMenu = () => {
	const router = useRouter();
	const { isMenuOpen, toggleSideMenu } = useUiContext();
	const { user, logout } = useAuthContext();
	const [searchTerm, setSearchTerm] = useState('');

	const onSearchTerm = () => {
		if (searchTerm.trim().length === 0) return;
		navigateTo(`/search/${searchTerm}`);
	};

	const navigateTo = (url: string) => {
		toggleSideMenu();
		router.push(url);
	};
	return (
		<Drawer
			open={isMenuOpen}
			onClose={toggleSideMenu}
			anchor='right'
			sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}>
			<Box sx={{ width: 250, paddingTop: 5 }}>
				<List>
					<ListItem>
						<Input
							autoFocus
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							onKeyPress={e => (e.key === 'Enter' ? onSearchTerm() : '')}
							type='text'
							placeholder='Buscar...'
							endAdornment={
								<InputAdornment position='end'>
									<IconButton onClick={onSearchTerm}>
										<SearchOutlined />
									</IconButton>
								</InputAdornment>
							}
						/>
					</ListItem>

					<ListItemButton sx={{ display: user ? 'flex' : 'none' }}>
						<ListItemIcon>
							<AccountCircleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Perfil'} />
					</ListItemButton>

					<ListItemButton sx={{ display: user ? 'flex' : 'none' }} onClick={() => navigateTo('/orders/history')}>
						<ListItemIcon>
							<ConfirmationNumberOutlined />
						</ListItemIcon>
						<ListItemText primary={'Mis Ordenes'} />
					</ListItemButton>

					<ListItemButton onClick={() => navigateTo('/category/men')} sx={{ display: { xs: '', sm: 'none' } }}>
						<ListItemIcon>
							<MaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Hombres'} />
					</ListItemButton>

					<ListItemButton onClick={() => navigateTo('/category/women')} sx={{ display: { xs: '', sm: 'none' } }}>
						<ListItemIcon>
							<FemaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Mujeres'} />
					</ListItemButton>

					<ListItemButton onClick={() => navigateTo('/category/kid')} sx={{ display: { xs: '', sm: 'none' } }}>
						<ListItemIcon>
							<EscalatorWarningOutlined />
						</ListItemIcon>
						<ListItemText primary={'Niños'} />
					</ListItemButton>

					<ListItemButton
						sx={{ display: user ? 'none' : 'flex' }}
						onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}>
						<ListItemIcon>
							<VpnKeyOutlined />
						</ListItemIcon>
						<ListItemText primary={'Ingresar'} />
					</ListItemButton>

					<ListItemButton sx={{ display: user ? 'flex' : 'none' }} onClick={logout}>
						<ListItemIcon>
							<LoginOutlined />
						</ListItemIcon>
						<ListItemText primary={'Salir'} />
					</ListItemButton>

					{/* Admin */}
					{user?.role === 'admin' && (
						<>
							<Divider />
							<ListSubheader>Admin Panel</ListSubheader>

							<ListItemButton>
								<ListItemIcon>
									<CategoryOutlined />
								</ListItemIcon>
								<ListItemText primary={'Productos'} />
							</ListItemButton>
							<ListItemButton>
								<ListItemIcon>
									<ConfirmationNumberOutlined />
								</ListItemIcon>
								<ListItemText primary={'Ordenes'} />
							</ListItemButton>

							<ListItemButton>
								<ListItemIcon>
									<AdminPanelSettings />
								</ListItemIcon>
								<ListItemText primary={'Usuarios'} />
							</ListItemButton>
						</>
					)}
				</List>
			</Box>
		</Drawer>
	);
};
