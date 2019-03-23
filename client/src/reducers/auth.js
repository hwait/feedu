export const types = {
	SIGNUP_FC: 'AUTH/SIGNUP_FC', // Field changed
	SIGNUP_SUBJECT: 'AUTH/SIGNUP_SUBJECT',
	SIGNUP_SUBJECTS: 'AUTH/SIGNUP_SUBJECTS',
	SIGNUP_REQUEST: 'AUTH/SIGNUP_REQUEST',
	SIGNUP_SUCCESS: 'AUTH/SIGNUP_SUCCESS',
	SIGNUP_FAILURE: 'AUTH/SIGNUP_FAILURE',
	LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
	LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
	LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
	PATH_CHANGED: 'PATH/PATH_CHANGED',
	LOGOUT: 'AUTH/LOGOUT'
};

const initialUser = {
	name: '',
	email: '',
	password: '',
	password2: '',
	surname: '',
	role: 0,
	subjects: []
};

const initialState = {
	isAuthentificated: false,
	path: 'home',
	loading: false,
	user: initialUser,
	errors: {}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case types.SIGNUP_FC: {
			if (payload.field === 'role' && payload.value === 2)
				return {
					...state,
					user: { ...state.user, [payload.field]: payload.value, subjects: [] }
				};
			return {
				...state,
				user: { ...state.user, [payload.field]: payload.value }
			};
		}
		case types.SIGNUP_SUBJECT: {
			let arr = state.user.subjects.slice();
			const subject = arr.find((x) => x === payload);
			if (subject) arr = arr.filter((x) => x !== payload);
			else arr.splice(0, 0, payload);
			return {
				...state,
				user: { ...state.user, subjects: arr }
			};
		}
		case types.SIGNUP_SUBJECTS: {
			const arr = payload.flag ? payload.arr : {};
			return {
				...state,
				user: { ...state.user, subjects: arr }
			};
		}
		case types.SIGNUP_REQUEST:
		case types.LOGIN_REQUEST: {
			return {
				...state,
				loading: true
			};
		}
		case types.SIGNUP_SUCCESS: {
			return {
				...state,
				data: payload,
				errors: {},
				loading: false
			};
		}
		case types.LOGIN_SUCCESS: {
			console.log('====================================');
			console.log('LOGIN_SUCCESS', payload);
			console.log('====================================');
			return {
				...state,
				isAuthentificated: true,
				user: payload,
				errors: {},
				loading: false
			};
		}
		case types.SIGNUP_FAILURE:
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
		default: {
			return state;
		}
	}
};

export const actions = {
	fc: (field, value) => ({ type: types.SIGNUP_FC, payload: { field, value } }),
	changePath: (payload) => ({ type: types.PATH_CHANGED, payload }),
	changeSubject: (payload) => ({ type: types.SIGNUP_SUBJECT, payload }),
	changeSubjects: (arr, flag) => ({ type: types.SIGNUP_SUBJECTS, payload: { arr, flag } }),
	signup: (payload) => ({ type: types.SIGNUP_REQUEST, payload }),
	login: (email, password) => ({ type: types.LOGIN_REQUEST, payload: { email, password } }),
	logout: () => ({ type: types.LOGOUT })
};
