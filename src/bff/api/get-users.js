export const getUsers = () =>
	fetch('http://localhost:3005/users')
		.then((loadedUsers) => loadedUsers.json())
		.catch((err) => console.log(`Ну удалось получить Users ${err}`));
