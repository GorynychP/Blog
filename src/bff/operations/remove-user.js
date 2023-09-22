import { sessions } from '../sessions';
import { ROLE } from '../constants/role';
import { deleteUser } from '../api';

export const removeUser = async (hash, userId) => {
	const accessRole = [ROLE.ADMIN];
	const access = await sessions.access(hash, accessRole);
	if (!access) {
		return { error: 'Доступ запрещен', res: null };
	}
	deleteUser(userId);
	return {
		error: null,
		res: true,
	};
};
