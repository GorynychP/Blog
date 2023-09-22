import { sessions } from '../sessions';
import { ROLE } from '../constants/role';
import { addPost, updatePost } from '../api';

export const savePost = async (hash, newPostData) => {
	const accessRole = [ROLE.ADMIN];
	const access = await sessions.access(hash, accessRole);
	if (!access) {
		return { error: 'Доступ запрещен', res: null };
	}
	const savePost =
		newPostData.id === ''
			? await addPost(newPostData)
			: await updatePost(newPostData);

	return {
		error: null,
		res: savePost,
	};
};
