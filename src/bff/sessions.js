import { addSession, deleteSession, getSession } from './api';

export const sessions = {
	list: {},
	create(user) {
		const hash = Math.random().toFixed(50);

		addSession(hash, user);
		this.list[hash] = user;
		return hash;
	},
	async remove(hash) {
		const session = await getSession(hash);

		if (!session) {
			return;
		}
		deleteSession(session.id);
	},

	async access(hash, accessRoles) {
		const session = await getSession(hash);
		if (!session) {
			return;
		}
		return !!session?.user && accessRoles.includes(session.user.role_id);
	},
};
