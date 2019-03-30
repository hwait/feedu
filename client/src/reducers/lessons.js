export const types = {
	LESSONS_REQUEST: 'LESSONS/LESSONS_REQUEST',
	LESSONS_SUCCESS: 'LESSONS/LESSONS_SUCCESS',
	LESSONS_FAILURE: 'LESSONS/LESSONS_FAILURE',
	LESSONS_SET: 'LESSONS/LESSONS_SET'
};

const initialState = {
	lessons: [],
	errors: [],
	loading: false,
	filter: 0,
	current: ''
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case types.LESSONS_SET: {
			return {
				...state,
				current: payload
			};
		}
		case types.LESSONS_REQUEST: {
			return {
				...state,
				loading: true
			};
		}
		case types.LESSONS_SUCCESS: {
			return {
				...state,
				lessons: payload,
				errors: [],
				loading: false
			};
		}
		case types.LESSONS_FAILURE: {
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
	getLessons: (classn, sid) => ({ type: types.LESSONS_REQUEST, payload: { classn, sid } }),
	setCurrent: (payload) => ({ type: types.LESSONS_SET, payload })
};
