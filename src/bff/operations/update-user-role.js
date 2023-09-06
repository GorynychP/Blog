import { sessions } from '../sessions';
import { ROLE } from '../constants/role';
import { setUserRole } from '../api';

export const updateUserRole = async (userSession, userId, newUserRoleId) => {
	const accessRole = [ROLE.ADMIN];
	if (!sessions.access(userSession, accessRole)) {
		return { error: 'Доступ запрещен', res: null };
	}
	setUserRole(userId, newUserRoleId);
	return {
		error: null,
		res: true,
	};
};
