export const getUser = (loginToFind) =>
	fetch(`http://localhost:3005/users?login=${loginToFind}`)
		.then((loaded) => loaded.json())
		.then(([loadedUser]) => loadedUser)
		.catch((err) => console.log(`Ну удалось получить User ${err}`));
