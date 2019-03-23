import { types as authTypes } from './auth';

export const types = {
	SUBJECTS_LOAD: 'SUBJECTS/SUBJECTS_LOAD',
	SUBJECTS_FILTER: 'SUBJECTS/SUBJECTS_FILTER',
	SUBJECTS_REQUEST: 'SUBJECTS/SUBJECTS_REQUEST',
	SUBJECTS_SUCCESS: 'SUBJECTS/SUBJECTS_SUCCESS',
	SUBJECTS_FAILURE: 'SUBJECTS/SUBJECTS_FAILURE'
};

const initialState = {
	subjects: [],
	errors: [],
	loading: false,
	filter: 0
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case types.SUBJECTS_FILTER: {
			return {
				...state,
				filter: payload
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
		case authTypes.SIGNUP_FC: {
			if (payload.field === 'role' && payload.value === 2)
				return {
					...state,
					filter: 0
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
	setFilter: (payload) => ({ type: types.SUBJECTS_FILTER, payload })
};

export const getSubjectsByClass = (state) => {
	const arr = state.auth.user.subjects;
	return state.subjects.subjects
		.filter((x) => x.cf <= state.subjects.filter && x.ct >= state.subjects.filter)
		.map((x) => ({
			id: x.id,
			name: x.name,
			checked: arr.findIndex((s) => s === x.id) > -1
		}))
		.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
};