import { sessions } from '../sessions';
import { ROLE } from '../constants/role';
import { setUserRole } from '../api';

export const updateUserRole = async (hash, userId, newUserRoleId) => {
	const accessRole = [ROLE.ADMIN];
	const access = await sessions.access(hash, accessRole);
	if (!access) {
		return { error: 'Доступ запрещен', res: null };
	}
	setUserRole(userId, newUserRoleId);
	return {
		error: null,
		res: true,
	};
};
