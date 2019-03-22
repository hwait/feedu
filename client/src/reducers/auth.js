export const types = {
	SIGNUP_REQUEST: 'AUTH/SIGNUP_REQUEST',
	SIGNUP_FC: 'AUTH/SIGNUP_FC', // Field changed
	SIGNUP_SUBJECT: 'AUTH/SIGNUP_SUBJECT',
	SIGNUP_SUBJECTS: 'AUTH/SIGNUP_SUBJECTS',
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
	role: 0,
	subjects: []
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
			const arr = payload.flag ? payload.arr : [];
			return {
				...state,
				user: { ...state.user, subjects: arr }
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
	changeSubject: (sid) => ({ type: types.SIGNUP_SUBJECT, payload: sid }),
	changeSubjects: (arr, flag) => ({ type: types.SIGNUP_SUBJECTS, payload: { arr, flag } }),
	signup: (userData) => ({ type: types.SIGNUP_REQUEST, payload: userData }),
	login: (email, password) => ({ type: types.LOGIN_REQUEST, email, password }),
	logout: () => ({ type: types.LOGOUT })
};
