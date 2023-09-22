import { sessions } from '../sessions';
import { ROLE } from '../constants/role';
import { deleteComment, getComments, getPost } from '../api';

export const removeComment = async (hash, postId, userId) => {
	const accessRole = [ROLE.ADMIN, ROLE.MODERATOR];
	const access = await sessions.access(hash, accessRole);
	if (!access) {
		return { error: 'Доступ запрещен', res: null };
	}

	deleteComment(userId);
	const post = await getPost(postId);
	const comments = await getComments(postId);
	return {
		error: null,
		res: { ...post, comments },
	};
};
