import Immutable from '../utils/immutable';
import { createSelector } from 'reselect';
import { getCurrentCourse, getCourse } from './courses';

export const types = {
	PATTERNS_GET: 'PATTERNS_GET',
	PATTERNS_GET_OK: 'PATTERNS_GET_OK',
	PATTERNS_SAVE: 'PATTERNS_SAVE',
	PATTERNS_SAVE_OK: 'PATTERNS_SAVE_OK',
	PATTERNS_FAILURE: 'PATTERNS_FAILURE',
	PATTERN_ADD: 'PATTERN_ADD',
	PATTERN_DURATION: 'PATTERN_DURATION',
	PATTERN_CURRENT: 'PATTERN_CURRENT',
	PATTERN_REMOVE: 'PATTERN_REMOVE',
	PATTERN_REMOVE_OK: 'PATTERN_REMOVE_OK'
};

const initialState = {
	patterns: [],
	dur: 2,
	errors: {},
	loading: false
};

export default (state = initialState, { type, payload }) => {
	state = { ...state, errors: {} };
	switch (type) {
		case types.PATTERNS_GET:
		case types.PATTERN_REMOVE:
		case types.PATTERNS_SAVE: {
			return {
				...state,
				loading: true
			};
		}
		case types.PATTERNS_SAVE_OK: {
			return {
				...state,
				errors: { success: true },
				loading: false
			};
		}
		case types.PATTERNS_GET_OK: {
			return {
				...state,
				...payload,
				errors: {},
				loading: false
			};
		}
		case types.PATTERN_FAILURE: {
			return {
				...state,
				errors: payload,
				loading: false
			};
		}
		case types.PATTERN_REMOVE_OK: {
			const { weekday, ts } = payload;
			return {
				...state,
				patterns: state.patterns.filter((x) => !(x.weekday === weekday && x.ts === ts))
			};
		}
		case types.PATTERN_ADD: {
			if (state.patterns.some((x) => x.ts - payload.ts < payload.dur && x.ts - payload.ts > 0)) return state;
			return {
				...state,
				patterns: Immutable.addItem(state.patterns, payload)
			};
		}
		case types.PATTERN_DURATION: {
			return {
				...state,
				dur: payload
			};
		}
		case types.PATTERN_CURRENT: {
			// In the payload should be index and item
			return {
				...state,
				patterns: Immutable.updateObjectInArray(state.patterns, payload)
			};
		}

		default: {
			return state;
		}
	}
};

export const actions = {
	patternsGet: (uid) => ({ type: types.PATTERNS_GET, payload: uid }),
	patternAdd: (item) => ({ type: types.PATTERN_ADD, payload: item }),
	patternsSave: (patterns) => ({ type: types.PATTERNS_SAVE, payload: patterns }),
	patternDuration: (dur) => ({ type: types.PATTERN_DURATION, payload: dur }),
	patternRemove: (item) => ({ type: types.PATTERN_REMOVE, payload: item }),
	patternRemoveImmediate: (item) => ({ type: types.PATTERN_REMOVE_OK, payload: item })
};

const getCalendarFilter = (state) => {
	return state.calendar.current;
};

const getPatterns = (state) => {
	return state.patterns.patterns;
};
/**
 * TODO: Problem with const course = getCourse(state, { _id: x.course });
 * Среди списка курсов только те, которые на текущий предмет. В Паттернах же разные предметы, поэтому не добраться так просто до курсов. 
 * Мы должны название курса и цвет предмета выдавать вместе с паттерном из сервера.
 */
export const getPatternsByWeek = (state, props) => {
	const patterns = state.patterns.patterns.filter((x) => x.weekday === props.weekday).map((x) => {
		const course = getCourse(state, { _id: x.course });
		const subj = state.subjects.subjects.find((s) => s.id === course.subject);
		console.log('==========getPatternsByWeek=============');
		console.log(course, subj);
		console.log('====================================');
		return { ...x, color: `#${subj.color}`, icon: `${subj.icon}`, name: `${course.sname}` };
	});
	return patterns;
};
export const getPatternsByCalendar = createSelector(
	[ getCalendarFilter, getCurrentCourse, getPatternsByWeek ],
	(calendarFilter, course, patterns) => {
		return patterns.filter((x) => x.calendar === calendarFilter);
	}
);
export const getCourseDays = createSelector([ getCurrentCourse, getPatterns ], (course, patterns) => {
	return patterns.filter((x) => x.course === course._id).reduce((a, b) => a + (b.days || 0), 0);
});
