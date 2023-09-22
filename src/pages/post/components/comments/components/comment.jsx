import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '../../../../../components';
import { useServerRequest } from '../../../../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
	CLOSE_MODAL,
	openModal,
	removeCommentAsync,
} from '../../../../../store/actions';
import { selectorUserRole } from '../../../../../selectors';
import { checkAccess } from '../../../../../components/utils/check-access';
import { ROLE } from '../../../../../components/constants';

const CommentContainer = ({
	className,
	postId,
	id,
	author,
	published_at,
	content,
}) => {
	const roleId = useSelector(selectorUserRole);
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const accessModerator = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], roleId);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий ?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};
	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon
							id="fa-user-circle-o"
							size="18px"
							margin="0px 5px 0px 0px"
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon
							size="18px"
							id="fa-calendar-o"
							margin="0px 5px 0px 0px"
						/>
						{published_at}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{accessModerator && (
				<Icon
					onClick={() => {
						onCommentRemove(id);
					}}
					id="fa-trash-o"
					margin="0px 0 0px 12px"
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;

	& .comment {
		width: 550px;
		padding: 5px 10px;
		border: 1px solid #000;
	}
	& .information-panel {
		display: flex;
		justify-content: space-between;
		margin-bottom: 5px;
	}
	& .author {
		display: flex;
		align-items: center;
		margin-left: 4px;
	}
	& .published-at {
		display: flex;
		align-items: center;
	}
	& .comment-text {
		display: flex;
		border: ridge;
		padding: 4px;
		text-align: left;
	}
`;
Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	published_at: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
};
