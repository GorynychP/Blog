import { sessions } from '../sessions';
import { ROLE } from '../constants/role';
import { deleteUser } from '../api';

export const removeUser = async (userSession, userId) => {
	const accessRole = [ROLE.ADMIN];
	if (!sessions.access(userSession, accessRole)) {
		return { error: 'Доступ запрещен', res: null };
	}
	deleteUser(userId);
	return {
		error: null,
		res: true,
	};
};
