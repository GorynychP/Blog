import { addUser } from './add-user';
import { getUser } from './get-user';
import { sessions } from './sessions';

export const server = {
	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);
		if (!user) {
			return { error: 'Такой пользователь не найден', res: null };
		}
		if (authPassword !== user.password) {
			return { error: 'Неверный пароль', res: null };
		}
		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},
	async register(regLogin, regPassword) {
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
	},
	async logout(session) {
		sessions.remove(session);
	},
};
