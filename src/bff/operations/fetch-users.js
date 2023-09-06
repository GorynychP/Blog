import { sessions } from '../sessions';
import { ROLE } from '../constants/role';
import { getUsers } from '../api';

export const fetchUsers = async (userSession) => {
	const accessRole = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRole)) {
		return { error: 'Доступ запрещен', res: null };
	}
	const users = await getUsers();
	return {
		error: null,
		res: users,
	};
};
