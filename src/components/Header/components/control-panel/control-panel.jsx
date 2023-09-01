import { styled } from 'styled-components';
import { Button, Icon } from '../../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { ROLE } from '../../../../bff/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectorUserRole,
	selectorUserLogin,
	selectorUserSession,
} from '../../../../selectors';
import { logout } from '../../../../store/actions';
const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;
const StyledIcon = styled.div`
	cursor: pointer;
`;
const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const roleId = useSelector(selectorUserRole);
	const login = useSelector(selectorUserLogin);
	const session = useSelector(selectorUserSession);
	const dispatch = useDispatch();
	console.log(roleId);
	console.log(session);
	const logautAndNavigate = () => {
		dispatch(logout(session));
	};
	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Link to="/login">
						<Button width={'100px'}>Войти</Button>
					</Link>
				) : (
					<>
						<UserName>{login}</UserName>
						<StyledIcon onClick={logautAndNavigate}>
							<Icon id="fa-sign-out" margin="0px 0 0px 10px" />
						</StyledIcon>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<StyledIcon onClick={() => navigate(-1)}>
					<Icon id="fa-backward" margin="10px 0 0 0px" />
				</StyledIcon>
				<Link to="/post">
					<Icon id="fa-file-text" margin="10px 0 0 14px" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" margin="10px 0 0 14px" />
				</Link>
			</RightAligned>
		</div>
	);
};
export const ControlPanel = styled(ControlPanelContainer)``;
