import { useState } from 'react';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { validations } from '../../../utils';
import { AuthLayout } from '../../../components/layouts';
import { useAuthContext } from '../../../hooks';
import { useRouter } from 'next/router';

type FormData = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const router = useRouter();
	const [showError, setShowError] = useState(false);
	const { loginUser } = useAuthContext();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onLoginuser = async ({ email, password }: FormData) => {
		setShowError(false);
		const isValidLogin = await loginUser(email, password);
		if (!isValidLogin) {
			setShowError(true);
			setTimeout(() => setShowError(false), 3000);
			return;
		}
		router.replace('/');
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
							<NextLink href='/auth/register' passHref legacyBehavior>
								<Link underline='always'>No tienes cuenta ?</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};
export default LoginPage;
