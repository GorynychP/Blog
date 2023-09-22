import React, { useEffect, useState } from 'react';
import { TableRow, UserRow } from './components';
import { useServerRequest } from '../../hooks';
import { styled } from 'styled-components';
import { PrivateContent } from '../../components';
import { ROLE } from '../../components/constants';
import { checkAccess } from '../../components/utils';
import { useSelector } from 'react-redux';
import { selectorUserRole } from '../../selectors';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [checkUser, setCheckUser] = useState(false);
	const userRole = useSelector(selectorUserRole);
	const requestServer = useServerRequest();

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			setIsLoading(false);
			return;
		}
		Promise.all([
			requestServer('fetchUsers'),
			requestServer('fetchRoles'),
		]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}
			setUsers(usersRes.res);
			setRoles(rolesRes.res);
			setIsLoading(false);
		});
		requestServer('fetchRoles').then((rolesError, res) => {
			if (rolesError) {
				setIsLoading(false);
				return;
			}
			setRoles(res);
			setIsLoading(false);
		});
	}, [requestServer, checkUser, userRole]);

	const onRemoveUser = (id) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			setIsLoading(false);
			return;
		}

		requestServer('removeUser', id).then(() => {
			setCheckUser(!checkUser);
		});
	};
	if (isLoading) {
		return null;
	}

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				{' '}
				<h2>Пользователи</h2>
				<TableRow>
					<div className="login-column">Логин</div>
					<div className="registered-at-column">Дата рагистрации</div>
					<div className="role-column">Роль</div>
				</TableRow>
				{users.map(({ id, login, registered_at, role_id }) => (
					<UserRow
						key={id}
						id={id}
						login={login}
						registered_at={registered_at}
						role_id={role_id}
						roles={roles.filter(({ id }) => id !== ROLE.GUEST)}
						onRemoveUser={() => onRemoveUser(id)}
					/>
				))}{' '}
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 570px;
	font-sizes: 18px;
	margin: 0 auto;
`;
