import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Grid, Typography } from '@mui/material';
import {
	AccessTimeOutlined,
	AttachMoneyOutlined,
	AttachmentOutlined,
	CancelPresentationOutlined,
	CategoryOutlined,
	CreditCardOffOutlined,
	CreditCardOutlined,
	DashboardOutlined,
	GroupOutlined,
	ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { AdminLayout } from '../../../components/layouts';
import { SummaryTile } from '../../../components/admin';
import { DashboardSummaryResponse } from '../../../interfaces';

const DashboardPage = () => {
	const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
		refreshInterval: 30 * 1000, //30 segundos
	});
	const [refreshIn, setRefreshIn] = useState(30);
	useEffect(() => {
		const interval = setInterval(() => {
			setRefreshIn(refreshIn => (refreshIn > 0 ? refreshIn - 1 : 30));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	if (!error && !data) {
		return <>Cargando...</>;
	}
	if (error) {
		console.log(error);
		return <Typography>Error al cargar la información</Typography>;
	}
	const {
		lowInventory,
		notPaidOrders,
		numberOfClients,
		numberOfOrders,
		numberOfProducts,
		paidOrders,
		productsWithNoInventory,
	} = data!;
	return (
		<AdminLayout title='Dashboard' subTitle='Estadisticas generales' icon={<DashboardOutlined />}>
			<Grid container spacing={2}>
				<SummaryTile
					title={numberOfOrders}
					subTitle='Ordenes totales'
					icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={paidOrders}
					subTitle='Ordenes pagadas'
					icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={notPaidOrders}
					subTitle='Ordenes pendientes'
					icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={numberOfClients}
					subTitle='Clientes'
					icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={numberOfProducts}
					subTitle='Productos'
					icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={productsWithNoInventory}
					subTitle='Sin Existencias'
					icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={lowInventory}
					subTitle='Bajo inventario'
					icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
				/>
				<SummaryTile
					title={refreshIn}
					subTitle='Actualización en:'
					icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
				/>
			</Grid>
		</AdminLayout>
	);
};
export default DashboardPage;
