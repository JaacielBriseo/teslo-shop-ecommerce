import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { PeopleOutline } from '@mui/icons-material';
import { Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { tesloApi } from '../../../api';
import { IUser } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts';
const UsersPage = () => {
	const { data, error } = useSWR<IUser[]>('/api/admin/users');
	const [users, setUsers] = useState<IUser[]>([]);
	useEffect(() => {
		if (data) {
			setUsers(data);
		}
	}, [data]);

	if (!data && !error) {
		return <></>;
	}
	const onRoleUpdate = async (userId: string, newRole: string) => {
		const previousUsers = users.map(user => ({ ...user }));
		const updatedUsers = users.map(user => ({
			...user,
			role: userId === user._id ? newRole : user.role,
		}));
		setUsers(updatedUsers);
		try {
			await tesloApi.put('/admin/users', { userId, role: newRole });
		} catch (error) {
			setUsers(previousUsers);
			console.log(error);
			alert('No se pudo actualizar el role del usuario');
		}
	};

	const columns: GridColDef[] = [
		{ field: 'email', headerName: 'Correo', width: 250 },
		{ field: 'name', headerName: 'Nombre completo', width: 300 },
		{
			field: 'role',
			headerName: 'Role',
			width: 300,
			renderCell({ row }: GridRenderCellParams) {
				return (
					<Select
						value={row.role}
						label='Role'
						sx={{ width: '300px' }}
						onChange={({ target }) => onRoleUpdate(row.id, target.value)}>
						<MenuItem value='admin'>admin</MenuItem>
						<MenuItem value='client'>client</MenuItem>
						<MenuItem value='super-user'>super-user</MenuItem>
						<MenuItem value='SEO'>SEO</MenuItem>
					</Select>
				);
			},
		},
	];
	const rows = users.map(user => ({
		id: user._id,
		email: user.email,
		name: user.name,
		role: user.role,
	}));
	return (
		<AdminLayout title='Usuarios' subTitle='Mantenimiento de usuarios' icon={<PeopleOutline />}>
			<Grid container className='fadeIn'>
				<Grid item xs={12} sx={{ height: 650, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} pageSizeOptions={[10, 100]} />
				</Grid>
			</Grid>
		</AdminLayout>
	);
};
export default UsersPage;
