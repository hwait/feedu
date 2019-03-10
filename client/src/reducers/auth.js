export const types = {
	SIGNUP_REQUEST: 'AUTH/SIGNUP_REQUEST',
	SIGNUP_SUCCESS: 'AUTH/SIGNUP_SUCCESS',
	SIGNUP_FAILURE: 'AUTH/SIGNUP_FAILURE',
	LOGOUT: 'AUTH/LOGOUT'
};

const initialState = {
	isAuthentificate: false,
	loading: false,
	errors: [],
	user: {}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case types.SIGNUP_REQUEST: {
			return {
				...state,
				loading: true
			};
		}
		case types.SIGNUP_SUCCESS: {
			return {
				...state,
				data: payload,
				loading: false
			};
		}
		case types.SIGNUP_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload
			};
		}
		default: {
			return state;
		}
	}
};

export const actions = {
	signup: (userData) => ({ type: types.SIGNUP_REQUEST, payload: userData }),
	login: (email, password) => ({ type: types.LOGIN_REQUEST, email, password }),
	logout: () => ({ type: types.LOGOUT })
};
