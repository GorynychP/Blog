import { sessions } from '../sessions';
import { ROLE } from '../constants/role';
import { getRoles } from '../api';

export const fetchRoles = async (userSession) => {
	const accessRole = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRole)) {
		return { error: 'Доступ запрещен', res: null };
	}
	const roles = await getRoles();
	return {
		error: null,
		res: roles,
	};
};
