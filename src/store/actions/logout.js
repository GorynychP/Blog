import { server } from '../../bff';
import { ACTIONS_TYPE } from './actions-type';

export const logout = (session) => {
	server.logout(session);
	return {
		type: ACTIONS_TYPE.LOGOUT,
	};
};
