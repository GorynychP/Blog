export const getPosts = (searchPhrase, page, limit) =>
	fetch(
		`http://localhost:3005/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then((loadedPosts) =>
			Promise.all([loadedPosts.json(), loadedPosts.headers.get('Link')]),
		)
		.then(([loadedPosts, links]) => ({
			posts: loadedPosts,
			links,
		}))
		.catch((err) => console.log(`Ну удалось получить Posts ${err}`));
