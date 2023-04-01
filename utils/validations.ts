export const isValidEmail = (email: string): boolean => {
	const match = String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

	return !!match;
};

export const isEmail = (email: string): string | undefined => {
	return isValidEmail(email) ? undefined : 'El correo no parece ser válido';
};

export const isValidForRegister = (email: string, password: string, name: string) => {
	if (password.length < 6) {
		return {
			error: true,
			message: 'La contraseña debe tener mínimo 6 caracteres.',
		};
	}

	if (name.length < 2) {
		return {
			error: true,
			message: 'El nombre debe tener mínimo 2 caracteres.',
		};
	}

	if (!isValidEmail(email)) {
		return {
			error: true,
			message: 'El correo no es válido.',
		};
	}

	return {
		error: false,
		message: 'Todos los campos son validos.',
	};
};
