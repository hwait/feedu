export const types = {
	SIGNUP_REQUEST: 'AUTH/SIGNUP_REQUEST',
	SIGNUP_FC: 'AUTH/SIGNUP_FC', // Field changed
	SIGNUP_SUCCESS: 'AUTH/SIGNUP_SUCCESS',
	SIGNUP_FAILURE: 'AUTH/SIGNUP_FAILURE',
	LOGOUT: 'AUTH/LOGOUT'
};

const initialUser = {
	name: '',
	email: '',
	password: '',
	password2: '',
	surname: '',
	role: 0
};

const initialState = {
	isAuthentificate: false,
	loading: false,
	user: initialUser,
	errors: []
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case types.SIGNUP_FC: {
			return {
				...state,
				user: { ...state.user, [payload.field]: payload.value }
			};
		}
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
				errors: [],
				loading: false
			};
		}
		case types.SIGNUP_FAILURE: {
			return {
				...state,
				errors: payload,
				loading: false
			};
		}
		default: {
			return state;
		}
	}
};

export const actions = {
	fc: (field, value) => ({ type: types.SIGNUP_FC, payload: { field, value } }),
	signup: (userData) => ({ type: types.SIGNUP_REQUEST, payload: userData }),
	login: (email, password) => ({ type: types.LOGIN_REQUEST, email, password }),
	logout: () => ({ type: types.LOGOUT })
};
