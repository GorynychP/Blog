import { addComment, getComments, getPost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const addPostComment = async (
	hash,
	userName,
	userId,
	postId,
	content,
) => {
	const accessRole = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	const access = await sessions.access(hash, accessRole);
	if (!access) {
		return { error: 'Доступ запрещен', res: null };
	}

	await addComment(userName, userId, postId, content);

	const post = await getPost(postId);
	const comments = await getComments(postId);

	return {
		error: null,
		res: { ...post, comments },
	};
};
