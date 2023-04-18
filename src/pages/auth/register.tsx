import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { useAuthContext } from '../../../hooks';
import { validations } from '../../../utils';
import { AuthLayout } from '../../../components/layouts';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
type FormData = {
	name: string;
	email: string;
	password: string;
};
const RegisterPage = () => {
	const router = useRouter();
	const { registerUser } = useAuthContext();
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onRegisterForm = async ({ email, name, password }: FormData) => {
		setShowError(false);
		const { hasError, message } = await registerUser(name, email, password);
		if (hasError) {
			setShowError(true);
			setErrorMessage(message!);
			setTimeout(() => setShowError(false), 3000);
			return;
		}
		//? Navegar a la pantalla donde el usuario estaba.
		// const destination = router.query.p?.toString() || '/';
		// router.replace(destination);
		await signIn('credentials', { email, password });
	};
	return (
		<AuthLayout title='Registrar'>
			<form onSubmit={handleSubmit(onRegisterForm)}>
				<Box sx={{ width: 350, padding: '10px 20px' }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h1' component='h1'>
								Crear cuenta
							</Typography>
							<Chip
								label='Error registrando usuario'
								color='error'
								icon={<ErrorOutline />}
								className='fadeIn'
								sx={{ display: showError ? 'flex' : 'none' }}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Nombre completo'
								type='text'
								variant='filled'
								fullWidth
								{...register('name', {
									required: 'El nombre es requerido.',
									minLength: { value: 2, message: 'Mínimo 2 caracteres.' },
								})}
								error={!!errors.name}
								helperText={errors.name?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Correo'
								type='email'
								variant='filled'
								fullWidth
								{...register('email', {
									required: 'El correo es requerido',
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
									required: 'La contraseña es requerida',
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
								href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}
								passHref
								legacyBehavior>
								<Link underline='always'>Ya tienes una cuenta ?</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};
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
export default RegisterPage;
