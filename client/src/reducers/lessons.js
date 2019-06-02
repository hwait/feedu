export const types = {
	LESSONS_GET: 'LESSONS_GET',
	LESSONS_GET_OK: 'LESSONS_GET_OK',
	LESSONS_FAILURE: 'LESSONS_FAILURE',
	LESSONS_SET: 'LESSONS_SET'
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
	switch (type) {
		case types.LESSONS_SET: {
			return {
				...state,
				current: payload
			};
		}
		case types.LESSONS_GET: {
			return {
				...state,
				loading: true
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
		default: {
			return state;
		}
	}
};

export const actions = {
	lessonsGet: (cid) => ({ type: types.LESSONS_GET, payload: cid }),
	lessonSetCurrent: (payload) => ({ type: types.LESSONS_SET, payload })
};

export const getNextNmb = (state) => {
	const cn = state.lesson.lesson.nmb;
	const nn = state.lessons.lessons.find((x) => x.nmb > cn);
	return nn ? nn.nmb : cn + 1;
};
