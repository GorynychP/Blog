import { ACTIONS_TYPE } from '../actions/actions-type';

const initialState = {
	wasLogout: false,
};

export const appReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTIONS_TYPE.LOGOUT:
			return { ...state, wasLogout: !state.wasLogout };
		default:
			return state;
	}
};
