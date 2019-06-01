import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
export const types = {
	SIGNUP_FC: 'AUTH/SIGNUP_FC', // Field changed
	SIGNUP_REQUEST: 'AUTH/SIGNUP_REQUEST',
	SIGNUP_SUCCESS: 'AUTH/SIGNUP_SUCCESS',
	SIGNUP_FAILURE: 'AUTH/SIGNUP_FAILURE',
	LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
	LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
	LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
	SAVE_REQUEST: 'PROFILE/SAVE_REQUEST',
	SAVE_SUCCESS: 'PROFILE/SAVE_SUCCESS',
	SAVE_FAILURE: 'PROFILE/SAVE_FAILURE',
	PATH_CHANGED: 'PATH/PATH_CHANGED',
	LOGOUT: 'AUTH/LOGOUT'
};

const initialUser = {
	name: '',
	email: '',
	password: '',
	password2: '',
	surname: '',
	classn: 0,
	role: 0
};

const initialState = {
	isAuthentificated: false,
	path: 'home',
	loading: false,
	user: initialUser,
	errors: {}
};

export default (state = initialState, { type, payload }) => {
	state = { ...state, errors: {} };
	switch (type) {
		case '@@INIT': {
			if (localStorage.jwtToken) {
				setAuthToken(localStorage.jwtToken);
				const decoded = jwt_decode(localStorage.jwtToken);
				const currentTime = Date.now() / 1000;
				if (decoded.exp < currentTime) {
					return logout(state);
				}
				return {
					...state,
					user: decoded,
					isAuthentificated: true
				};
			}
			return state;
		}
		case types.SIGNUP_FC: {
			if (payload.field === 'role' && payload.value === 2)
				return {
					...state,
					user: { ...state.user, [payload.field]: payload.value }
				};
			return {
				...state,
				user: { ...state.user, [payload.field]: payload.value }
			};
		}
		case types.SIGNUP_REQUEST:
		case types.SAVE_REQUEST:
		case types.LOGIN_REQUEST: {
			return {
				...state,
				loading: true
			};
		}
		case types.SIGNUP_SUCCESS: {
			return {
				...state,
				isAuthentificated: true,
				path: 'home',
				user: { ...payload, password: '', password2: '' },
				errors: {},
				loading: false
			};
		}
		case types.SAVE_SUCCESS: {
			return {
				...state,
				path: 'home',
				errors: {},
				loading: false
			};
		}
		case types.LOGIN_SUCCESS: {
			return {
				...state,
				isAuthentificated: true,
				user: payload,
				errors: {},
				loading: false
			};
		}
		case types.SIGNUP_FAILURE:
		case types.SAVE_FAILURE:
		case types.LOGIN_FAILURE: {
			return {
				...state,
				errors: payload,
				loading: false
			};
		}
		case types.PATH_CHANGED: {
			return {
				...state,
				path: payload
			};
		}
		case types.LOGOUT: {
			return logout(state);
		}
		default: {
			return state;
		}
	}
};

const logout = (state) => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	return {
		...state,
		isAuthentificated: false,
		path: 'home',
		user: initialUser
	};
};

export const actions = {
	fc: (field, value) => ({ type: types.SIGNUP_FC, payload: { field, value } }),
	pathChange: (payload) => ({ type: types.PATH_CHANGED, payload }),
	signup: (payload) => ({ type: types.SIGNUP_REQUEST, payload }),
	save: (payload) => ({ type: types.SAVE_REQUEST, payload }),
	login: (email, password) => ({ type: types.LOGIN_REQUEST, payload: { email, password } }),
	logout: () => ({ type: types.LOGOUT })
};
