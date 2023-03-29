import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../../components/layouts/ShopLayout';
import NextLink from 'next/link';
const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{ field: 'fullname', headerName: 'Nombre Completo', width: 300 },
	{
		field: 'paid',
		headerName: 'Pagada',
		description: 'Muestra informacion si la orden esta pagada o no',
		width: 200,
		renderCell: (params: GridRenderCellParams) => {
			return params.row.paid ? (
				<Chip color='success' label='Pagada' variant='outlined' />
			) : (
				<Chip color='error' label='No Pagada' variant='outlined' />
			);
		},
	},
	{
		field: 'orden',
		headerName: 'Ver orden',
		width: 200,
		sortable: false,
		renderCell: (params: GridRenderCellParams) => {
			return (
				<NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
					<Link underline='always'>Ver orden</Link>
				</NextLink>
			);
		},
	},
];
const rows = [
	{ id: 1, paid: false, fullname: 'Jaaciel Briseño' },
	{ id: 2, paid: true, fullname: 'Nombre1' },
	{ id: 3, paid: false, fullname: 'Nombre2' },
	{ id: 4, paid: true, fullname: 'Nombre3' },
	{ id: 5, paid: false, fullname: 'Nombre4' },
	{ id: 6, paid: true, fullname: 'Nombre5' },
	{ id: 7, paid: false, fullname: 'Nombre6' },
];
const HistoryPage = () => {
	return (
		<ShopLayout title='Historial de ordenes' pageDescription='Historial de ordenes del cliente'>
			<Typography variant='h1' component='h1'>
				Historial de ordenes
			</Typography>
			<Grid container>
				<Grid item xs={12} sx={{ height: 650, width: '100%' }}>
					<DataGrid rows={rows} columns={columns} pageSizeOptions={[10, 100]} />
				</Grid>
			</Grid>
		</ShopLayout>
	);
};
export default HistoryPage;
