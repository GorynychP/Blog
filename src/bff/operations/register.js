import { addUser, getUser } from '../api';
import { sessions } from '../sessions';

export const register = async (regLogin, regPassword) => {
	const existedUser = await getUser(regLogin);

	if (existedUser) {
		return { error: 'Такой пользователь уже существует', res: null };
	}
	const NewUser = await addUser(regLogin, regPassword);
	console.log(NewUser);
	return {
		error: null,
		res: {
			id: NewUser.id,
			login: NewUser.login,
			roleId: NewUser.role_id,
			session: sessions.create(NewUser),
		},
	};
};
