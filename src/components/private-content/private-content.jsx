import React from 'react';
import { Error } from '../error/error';
import { useSelector } from 'react-redux';
import { selectorUserRole } from '../../selectors';
import { ERROR } from '../constants/error';
import { checkAccess } from '../utils/check-access';

export const PrivateContent = ({ children, access, serverError = null }) => {
	const userRole = useSelector(selectorUserRole);
	const accessError = checkAccess(access, userRole)
		? null
		: ERROR.ACCESS_DENIED;

	const error = serverError || accessError;
	return error ? <Error error={error} /> : children;
};
