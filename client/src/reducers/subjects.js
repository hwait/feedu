import { types as authTypes } from './auth';
import { types as lessonsTypes } from './lessons';
import { types as booksTypes } from './books';

export const types = {
	SUBJECTS_LOAD: 'SUBJECTS/SUBJECTS_LOAD',
	SUBJECTS_REQUEST: 'SUBJECTS/SUBJECTS_REQUEST',
	SUBJECTS_SUCCESS: 'SUBJECTS/SUBJECTS_SUCCESS',
	SUBJECTS_FAILURE: 'SUBJECTS/SUBJECTS_FAILURE',
	SUBJECTS_SET: 'SUBJECTS/SUBJECTS_SET'
};

const initialState = {
	subjects: [],
	errors: [],
	loading: false,
	current: {}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case lessonsTypes.LESSONS_GET:
		case booksTypes.BOOKS_GET: {
			return {
				...state,
				current: state.subjects.find((x) => x.id === payload.sid)
			};
		}
		case types.SUBJECTS_SET: {
			return {
				...state,
				current: state.subjects.find((x) => x.id === payload)
			};
		}
		case types.SUBJECTS_REQUEST: {
			return {
				...state,
				loading: true
			};
		}
		case types.SUBJECTS_SUCCESS: {
			return {
				...state,
				subjects: payload,
				errors: [],
				loading: false
			};
		}
		case types.SUBJECTS_FAILURE: {
			return {
				...state,
				errors: payload,
				loading: false
			};
		}
		// case authTypes.LOGIN_SUCCESS: {
		// 	return {
		// 		...state,
		// 	};
		// }
		case authTypes.SIGNUP_FC: {
			if (payload.field === 'role' && payload.value === 2)
				return {
					...state
				};
		}

		// eslint-disable-next-line
		default: {
			return state;
		}
	}
};

export const actions = {
	init: () => ({ type: types.SUBJECTS_REQUEST }),
	setCurrent: (payload) => ({ type: types.SUBJECTS_SET, payload })
};

export const getSubjects = (state) => {
	return state.subjects.subjects
		.map((x) => ({
			id: x.id,
			name: x.name
		}))
		.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
};
export const getCurrentSubject = (state) => {
	return state.subjects.current;
};
