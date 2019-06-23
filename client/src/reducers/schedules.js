export const types = {
	SCHEDULES_GET: 'SCHEDULES_GET',
	SCHEDULES_GET_OK: 'SCHEDULES_GET_OK',
	SCHEDULES_GENERATE: 'SCHEDULES_GENERATE',
	SCHEDULES_GENERATE_OK: 'SCHEDULES_GENERATE_OK',
	SYLLABUS_GET: 'SYLLABUS_GET',
	SYLLABUS_GET_OK: 'SYLLABUS_GET_OK',
	SCHEDULES_FAILURE: 'SCHEDULES_FAILURE'
};

const initialState = {
	schedules: [],
	errors: {},
	loading: false
};

export default (state = initialState, { type, payload }) => {
	state = { ...state, errors: {} };
	switch (type) {
		case types.SCHEDULES_GET:
		case types.SYLLABUS_GET:
		case types.SCHEDULES_GENERATE: {
			return {
				...state,
				loading: true
			};
		}
		case types.SCHEDULES_GENERATE_OK: {
			return {
				...state,
				errors: { success: true },
				loading: false
			};
		}
		case types.SCHEDULES_GET_OK: {
			return {
				...state,
				...payload,
				errors: {},
				loading: false
			};
		}
		case types.SYLLABUS_GET_OK: {
			return {
				...state,
				...payload.schedules,
				errors: {},
				loading: false
			};
		}
		case types.SCHEDULE_FAILURE: {
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
	schedulesGet: (uid, ds, de) => ({ type: types.SCHEDULES_GET, payload: { uid, ds, de } }),
	syllabusGet: (uid, cid) => ({ type: types.SYLLABUS_GET, payload: { uid, cid } }),
	schedulesGenerate: (schedules) => ({ type: types.SCHEDULES_GENERATE, payload: schedules })
};
