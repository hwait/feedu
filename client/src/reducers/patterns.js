import Immutable from '../utils/immutable';
import { createSelector } from 'reselect';
import { getCurrentCourse } from './courses';
import { getDatesSelected } from './calendar';

export const types = {
	PATTERNS_GET: 'PATTERNS_GET',
	PATTERNS_GET_OK: 'PATTERNS_GET_OK',
	PATTERNS_SAVE: 'PATTERNS_SAVE',
	SPREAD_TOGGLE: 'PATTERNS/SPREAD_TOGGLE',
	PATTERNS_SAVE_OK: 'PATTERNS_SAVE_OK',
	PATTERNS_FAILURE: 'PATTERNS_FAILURE',
	PATTERN_ADD: 'PATTERN_ADD',
	PATTERN_DURATION: 'PATTERN_DURATION',
	PATTERN_CURRENT: 'PATTERN_CURRENT',
	PATTERN_DATE_REMOVE: 'PATTERN_DATE_REMOVE',
	PATTERN_REMOVE: 'PATTERN_REMOVE',
	PATTERN_REMOVE_OK: 'PATTERN_REMOVE_OK'
};

const initialState = {
	patterns: [],
	dur: 2,
	spread: false,
	pattern: {},
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
		case types.SPREAD_TOGGLE: {
			return {
				...state,
				spread: !state.spread
			};
		}
		case types.PATTERN_REMOVE_OK: {
			const { cid, uid } = payload;
			return {
				...state,
				patterns: state.patterns.filter((x) => !(x.course._id === cid && x.student === uid))
			};
		}
		case types.PATTERN_DATE_REMOVE: {
			const patt = state.patterns.find(
				({ course, student }) => course === payload.course && student === payload.student
			);
			if (patt) patt.dates = patt.dates.filter((x) => !payload.dates.includes(x));
			return {
				...state,
				patterns: Immutable.updateObjectInArray(state.patterns, patt)
			};
		}
		case types.PATTERN_ADD: {
			// Without check
			const patt = state.patterns.find(
				({ course, student }) => course._id === payload.course._id && student === payload.student
			);

			if (patt) {
				patt.dates = Immutable.addItems(patt.dates, payload.dates);

				// 	const startdates = state.patterns.reduce((a, { dates }) => a.concat(dates.map((d) => moment(d))), []);
				// 	const enddates = state.patterns.reduce(
				// 		(a, { dates, dur }) => a.concat(dates.map((d) => moment(d).add(dur, 'm'))),
				// 		[]
				// 	);
				// 	for (let i = 0; i < startdates.length; i++) {
				// 		const ds = startdates[i];
				// 		const de = enddates[i];
				// 	}
				// 	if (
				// 		dates.some()
				// 		// 	(d) =>
				// 		// 		d.ts - payload.ts < payload.dur &&
				// 		// 		d.ts - payload.ts > 0 &&
				// 		// 		d.dates.some((d) => d === payload.date)
				// 		// )
				// 	)
				return {
					...state,
					patterns: Immutable.updateObjectInArray(state.patterns, patt)
				};
			}
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
	spreadToggle: () => ({ type: types.SPREAD_TOGGLE }),
	patternRemove: (id) => ({ type: types.PATTERN_REMOVE, payload: id }),
	patternDateRemove: (item) => ({ type: types.PATTERN_DATE_REMOVE, payload: item }),
	patternRemoveImmediate: (item) => ({ type: types.PATTERN_REMOVE_OK, payload: item })
};

const getCalendarFilter = (state) => {
	return state.calendar.current;
};

const getPatterns = (state) => {
	return state.patterns.patterns;
};
const getPatternsDates = (state) => {
	return state.patterns.patterns.reduce((a, { dates }) => a.concat(dates), []);
};
export const getPatternsByDate = (state, props) => {
	// const ds = props.date;
	// const de = props.date.add(1, 'd');

	const ds = props.date.format('YYYY-MM-DD');
	const patterns = state.patterns.patterns.filter((x) => x.dates.some((d) => d.includes(ds)));
	console.log('====================================');
	console.log(patterns, state.patterns, ds);
	console.log('====================================');
	const conv = patterns.map((c) => {
		const subj = state.subjects.subjects.find((s) => s.id === c.course.subjects[0]);
		return {
			...c,
			dates: c.dates.filter((e) => e.includes(ds)),
			color: `#${subj.color}`,
			icon: `${subj.icon}`,
			name: `${c.course.sname}`
		};
	});

	// const patterns = state.patterns.patterns.filter((x) => x.weekday === props.weekday).map((x) => {
	// 	//const course = getCourse(state, { _id: x.course });
	// 	const subj = state.subjects.subjects.find((s) => s.id === x.course.subjects[0]);
	// 	return { ...x, color: `#${subj.color}`, icon: `${subj.icon}`, name: `${x.course.sname}` };
	// });
	return conv;
};

export const getCourseDays = createSelector([ getCurrentCourse, getPatterns ], (course, patterns) => {
	return patterns.filter((x) => x.course === course._id).reduce((a, b) => a + (b.days || 0), 0);
});
