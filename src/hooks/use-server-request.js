import { useSelector } from 'react-redux';
import { selectorUserSession } from '../selectors';
import { server } from '../bff';
import { useCallback } from 'react';

export const useServerRequest = () => {
	const session = useSelector(selectorUserSession);
	return useCallback(
		(operation, ...params) => {
			const request = ['register', 'authorize'].includes(operation)
				? params
				: [session, ...params];

			return server[operation](...request);
		},
		[session],
	);
};