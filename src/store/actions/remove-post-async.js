export const removePostAsync = (requestServer, postId) => (dispatch) =>
	requestServer('removePost', postId);
