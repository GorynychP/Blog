export const getPost = (postId) =>
	fetch(`http://localhost:3005/posts/${postId}`)
		.then((res) => {
			if (res.ok) {
				return res;
			}
			const error =
				res.status === 404
					? 'Такая страница не существует'
					: 'Что-то пошло не так. Попробуйте еще раз позднее';

			return Promise.reject(error);
		})
		.then((loaded) => loaded.json())
		.then((loadedPost) => loadedPost)
		.catch((err) => {
			return Promise.reject(err);
		});
