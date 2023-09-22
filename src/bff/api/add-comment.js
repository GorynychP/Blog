import { generateDate } from '../utils';
export const addComment = (userName, userId, postId, content) =>
	fetch('http://localhost:3005/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			author: userName,
			author_id: userId,
			post_id: postId,
			published_at: generateDate(),
			content,
		}),
	}).catch((error) => console.log(` Ну удалось добавить Comment: ${error}`));
