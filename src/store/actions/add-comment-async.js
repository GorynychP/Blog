import { setPostData } from './set-post-data';

export const addCommentAsync =
	(requestServer, userName, userId, postId, content) => (dispatch) => {
		requestServer('addPostComment', userName, userId, postId, content).then(
			(postComment) => {
				dispatch(setPostData(postComment.res));
			},
		);
	};
