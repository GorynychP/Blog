import { sessions } from '../sessions';
import { ROLE } from '../constants/role';
import { getUsers } from '../api';

export const fetchUsers = async (hash) => {
	const accessRole = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRole);
	if (!access) {
		return { error: 'Доступ запрещен', res: null };
	}
	const users = await getUsers();
	return {
		error: null,
		res: users,
	};
};
