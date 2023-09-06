export const getUser = (loginToFind) =>
	fetch(`http://localhost:3005/users?login=${loginToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser)
		.catch((err) => console.log(`Ну удалось получить User ${err}`));
