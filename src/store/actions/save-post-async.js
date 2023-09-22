import { setPostData } from './set-post-data';

export const savePostAsync =
	(requestServer, id, image_url, title, content) => (dispatch) =>
		requestServer('savePost', id, image_url, title, content).then(
			(updatePost) => {
				dispatch(setPostData(updatePost.res));
				return updatePost.res;
			},
		);
