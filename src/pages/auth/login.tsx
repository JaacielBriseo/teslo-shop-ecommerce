import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { signIn, getProviders } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { validations } from '../../../utils';
import { AuthLayout } from '../../../components/layouts';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

type FormData = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const router = useRouter();
	const [showError, setShowError] = useState(false);
	const [providers, setProviders] = useState<any>({});
	useEffect(() => {
		getProviders().then(prov => {
			setProviders(prov);
		});
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onLoginuser = async ({ email, password }: FormData) => {
		setShowError(false);
		await signIn('credentials', { email, password });
	};
	return (
		<AuthLayout title='Ingresar'>
			<form onSubmit={handleSubmit(onLoginuser)}>
				<Box sx={{ width: 350, padding: '10px 20px' }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h1' component='h1'>
								Iniciar Sesión
							</Typography>
							<Chip
								label='No reconocemos ese usuario / contraseña'
								color='error'
								icon={<ErrorOutline />}
								className='fadeIn'
								sx={{ display: showError ? 'flex' : 'none' }}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Correo'
								type='email'
								variant='filled'
								fullWidth
								{...register('email', {
									required: 'El correo es requerido.',
									validate: validations.isEmail,
								})}
								error={!!errors.email}
								helperText={errors.email?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Contraseña'
								type='password'
								variant='filled'
								fullWidth
								{...register('password', {
									required: 'Contraseña es requerida.',
									minLength: { value: 6, message: 'Mínimo 6 caracteres.' },
								})}
								error={!!errors.password}
								helperText={errors.password?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
								Ingresar
							</Button>
						</Grid>
						<Grid item xs={12} display='flex' justifyContent='end'>
							<NextLink
								href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
								passHref
								legacyBehavior>
								<Link underline='always'>No tienes cuenta ?</Link>
							</NextLink>
						</Grid>
						<Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
							<Divider sx={{ width: '100%', mb: 2 }} />
							{Object.values(providers).map((provider: any) => {
								if (provider.id === 'credentials') return <div key='credentials'></div>;
								return (
									<Button
										key={provider.id}
										variant='outlined'
										fullWidth
										color='primary'
										sx={{ mb: 1 }}
										onClick={() => signIn(provider.id)}>
										{provider.name}
									</Button>
								);
							})}
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query, res }) => {
	const session = await getServerSession(req, res, authOptions);
	const { p = '/' } = query;
	if (session) {
		return {
			redirect: {
				destination: p.toString(),
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
export default LoginPage;
