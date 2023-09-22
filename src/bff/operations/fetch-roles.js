import { sessions } from '../sessions';
import { ROLE } from '../constants/role';
import { getRoles } from '../api';

export const fetchRoles = async (hash) => {
	const accessRole = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRole);
	if (!access) {
		return { error: 'Доступ запрещен', res: null };
	}

	const roles = await getRoles();
	return {
		error: null,
		res: roles,
	};
};
