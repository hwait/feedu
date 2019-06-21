import Immutable from '../utils/immutable';
import { createSelector } from 'reselect';

export const types = {
	SCHEDULES_GET: 'SCHEDULES_GET',
	SCHEDULES_GET_OK: 'SCHEDULES_GET_OK',
	SCHEDULES_GENERATE: 'SCHEDULES_GENERATE',
	SCHEDULES_GENERATE_OK: 'SCHEDULES_GENERATE_OK',
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
	schedulesGet: (uid) => ({ type: types.SCHEDULES_GET, payload: uid }),
	schedulesGenerate: (schedules) => ({ type: types.SCHEDULES_GENERATE, payload: schedules })
};

const getCalendarFilter = (state) => {
	return state.calendar.current;
};

const getSchedules = (state) => {
	return state.schedules.schedules;
};
const getSchedulesDates = (state) => {
	return state.schedules.schedules.reduce((a, { dates }) => a.concat(dates), []);
};
export const getSchedulesByDate = (state, props) => {
	// const ds = props.date;
	// const de = props.date.add(1, 'd');

	const ds = props.date.format('YYYY-MM-DD');
	const schedules = state.schedules.schedules.filter((x) => x.dates.some((d) => d.includes(ds)));
	const conv = schedules.map((c) => {
		const subj = state.subjects.subjects.find((s) => s.id === c.course.subjects[0]);
		return {
			...c,
			dates: c.dates.filter((e) => e.includes(ds)),
			color: `#${subj.color}`,
			icon: `${subj.icon}`,
			name: `${c.course.sname}`
		};
	});

	return conv;
};
