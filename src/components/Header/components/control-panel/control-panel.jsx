import { styled } from 'styled-components';
import { Icon } from '../../../../components';
import { Link, useNavigate } from 'react-router-dom';
const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`;
const Button = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #000;
	background-color: #eee;
	font-size: 18px;
	width: 100px;
	height: 32px;
`;

const BackNavigate = styled.div`
	cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	return (
		<div className={className}>
			<RightAligned>
				<Button to="/login">Войти</Button>
			</RightAligned>
			<RightAligned>
				<BackNavigate onClick={() => navigate(-1)}>
					<Icon id="fa-backward" margin="10px 0 0 0px" />
				</BackNavigate>
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
