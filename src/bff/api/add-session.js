export const addSession = (hesh, user) => {
	fetch('http://localhost:3005/sessions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			hesh,
			user,
		}),
	}).catch((error) => console.log(` Ну удалось добавить Session: ${error}`));
};
