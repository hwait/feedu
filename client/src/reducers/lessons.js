export const types = {
	LESSONS_GET: 'LESSONS_GET',
	LESSONS_GET_OK: 'LESSONS_GET_OK',
	LESSONS_FAILURE: 'LESSONS_FAILURE',
	LESSONS_NEW: 'LESSONS_NEW',
	LESSONS_SET: 'LESSONS_SET',
	LESSONS_INC_OK: 'LESSONS/LESSONS_INC_OK',
	LESSONS_INC: 'LESSONS/LESSONS_INC',
	LESSONS_REMOVE_OK: 'LESSONS/LESSONS_REMOVE_OK',
	LESSONS_REMOVE: 'LESSONS/LESSONS_REMOVE'
};

const initialState = {
	lessons: [],
	errors: {},
	loading: false,
	filter: 0,
	current: ''
};
// TODO: Make Lessons just list of names and ids
// TODO: Make new reducer for Lesson to operate
export default (state = initialState, { type, payload }) => {
	state = { ...state, errors: {} };
	switch (type) {
		case types.LESSONS_SET: {
			return {
				...state,
				current: payload
			};
		}
		case types.LESSONS_INC:
		case types.LESSONS_GET: {
			return {
				...state,
				loading: true
			};
		}
		case types.LESSONS_NEW: {
			return {
				...state,
				current: 'NEW'
			};
		}
		case types.LESSONS_GET_OK: {
			return {
				...state,
				lessons: payload,
				errors: {},
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
		case types.LESSONS_INC_OK:
		case types.LESSONS_REMOVE_OK: {
			return {
				...state,
				errors: { success: true },
				loading: false
			};
		}
		default: {
			return state;
		}
	}
};

export const actions = {
	lessonsGet: (cid) => ({ type: types.LESSONS_GET, payload: cid }),
	lessonSetCurrent: (payload) => ({ type: types.LESSONS_SET, payload }),
	lessonNew: () => ({ type: types.LESSONS_NEW }),
	lessonsInc: (payload) => ({ type: types.LESSONS_INC, payload }),
	lessonsRem: (payload) => ({ type: types.LESSONS_REMOVE, payload })
};

export const getNextNmb = (state) => {
	const cn = state.lesson.lesson.nmb;
	const nn = state.lessons.lessons.find((x) => x.nmb > cn);
	return state.lessons.current === 'NEW' ? state.lessons.lessons.length * 1 + 1 : nn ? nn.nmb : cn + 1;
};
