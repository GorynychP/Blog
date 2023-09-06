import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Icon } from '../../../../components';
import { useDispatch } from 'react-redux';
import { TableRow } from '../table-row/table-row';
import { useServerRequest } from '../../../../hooks';

const UserRowContainer = ({
	className,
	id,
	login,
	registered_at,
	role_id: userRoleId,
	roles,
	onRemoveUser,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};
	const onRoleSave = (roleId, newUserRoleId) => {
		console.log(roleId);
		console.log(newUserRoleId);
		requestServer('updateUserRole', roleId, newUserRoleId).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};
	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<TableRow border>
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{registered_at}</div>
				<div className="role-column">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<Icon
						id="fa-floppy-o"
						margin="0 0 0 10px"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					></Icon>
				</div>
			</TableRow>
			<Icon
				id="fa-trash-o"
				margin="0 0 0 10px"
				onClick={onRemoveUser}
			></Icon>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	width: 565px;
	margin: 10px;
`;
