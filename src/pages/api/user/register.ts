import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { User } from '../../../../models';
import bcrypt from 'bcryptjs';
import { jwt, validations } from '../../../../utils';

type Data = { message: string } | { token: string; user: { email: string; name: string; role: string } };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return registerUser(req, res);
		default:
			res.status(400).json({ message: 'Bad request.' });
	}
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { email = '', password = '', name = '' } = req.body as { email: string; password: string; name: string };

	const validationResult = validations.isValidForRegister(email, password, name);
	if (validationResult.error) {
		return res.status(400).json({ message: validationResult.message });
	}

	await db.connect();
	const user = await User.findOne({ email });

	if (user) {
		await db.disconnect();
		return res.status(400).json({ message: 'Correo ya registrado.' });
	}

	const newUser = new User({
		name,
		email: email.toLocaleLowerCase(),
		password: bcrypt.hashSync(password),
		role: 'client',
	});
	try {
		await newUser.save({ validateBeforeSave: true });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'Revisar logs del servidor.',
		});
	}
	const { _id, role } = newUser;

	const token = jwt.signToken(_id, email);
	await db.disconnect();
	return res.status(200).json({
		token,
		user: {
			email,
			role,
			name,
		},
	});
};
