import { generateDate } from '../utils';
export const addPost = ({ title, content, image_url }) =>
	fetch('http://localhost:3005/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url,
			title,
			published_at: generateDate(),
			content,
		}),
	})
		.then((createPost) => createPost.json())
		.catch((error) => console.log(` Ну удалось добавить Post: ${error}`));
