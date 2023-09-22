export const getSession = (hesh) =>
	fetch(`http://localhost:3005/sessions?hash${hesh}`)
		.then((loaded) => loaded.json())
		.then(([loadedSession]) => loadedSession)
		.catch((err) => console.log(`Ну удалось получить Post ${err}`));
