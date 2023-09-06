export const getRoles = () =>
	fetch('http://localhost:3005/roles')
		.then((loadedRoles) => loadedRoles.json())
		.catch((err) => console.log(`Ну удалось получить roles ${err}`));
