import React, { useEffect, useState } from 'react';
import { TableRow, UserRow } from './components';
import { useServerRequest } from '../../hooks';
import { styled } from 'styled-components';
import { Content } from '../../components';
import { ROLE } from '../../components/constants';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [checkUser, setCheckUser] = useState(false);
	const requestServer = useServerRequest();

	useEffect(() => {
		Promise.all([
			requestServer('fetchUsers'),
			requestServer('fetchRoles'),
		]).then(([usersRes, rolesRes]) => {
			console.log('usersRes', usersRes);
			console.log('rolesRes', rolesRes);
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}

			setUsers(usersRes.res);
			setRoles(rolesRes.res);
		});
		requestServer('fetchRoles').then((rolesError, res) => {
			if (rolesError) {
				return;
			}
			setRoles(res);
		});
	}, [requestServer, checkUser]);

	const onRemoveUser = (id) => {
		requestServer('removeUser', id).then(() => {
			setCheckUser(!checkUser);
		});
	};
	return (
		<div className={className}>
			<Content error={errorMessage}>
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
			</Content>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 570px;
	font-sizes: 18pxL;
	margin: 0 auto;
`;
