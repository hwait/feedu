import Immutable from '../utils/immutable';

export const types = {
	PATTERNS_GET: 'PATTERNS_GET',
	PATTERNS_GET_OK: 'PATTERNS_GET_OK',
	PATTERNS_SAVE: 'PATTERNS_SAVE',
	PATTERNS_SAVE_OK: 'PATTERNS_SAVE_OK',
	PATTERNS_FAILURE: 'PATTERNS_FAILURE',
	PATTERN_ADD: 'PATTERN_ADD',
	PATTERN_DURATION: 'PATTERN_DURATION',
	PATTERN_CURRENT: 'PATTERN_CURRENT',
	PATTERN_REMOVE: 'PATTERN_REMOVE'
};

const initialState = {
	patterns: [],
	duration: 2,
	errors: {},
	loading: false
};

export default (state = initialState, { type, payload }) => {
	state = { ...state, errors: {} };
	switch (type) {
		case types.PATTERNS_GET:
		case types.PATTERNS_SAVE: {
			return {
				...state,
				loading: true
			};
		}
		case types.PATTERNS_GET_OK: {
			return {
				...state,
				errors: { success: true },
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
		case types.PATTERN_REMOVE: {
			const { weekday, ts } = payload;
			return {
				...state,
				patterns: state.patterns.filter((x) => !(x.weekday === weekday && x.ts === ts))
			};
		}
		case types.PATTERN_ADD: {
			const collision = state.patterns;
			return {
				...state,
				patterns: Immutable.addItem(state.patterns, payload)
			};
		}
		case types.PATTERN_DURATION: {
			return {
				...state,
				duration: payload
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
	patternDuration: (duration) => ({ type: types.PATTERN_DURATION, payload: duration }),
	//patternCurrent: (index, isCurrent) => ({ type: types.PATTERN_CURRENT, payload: { index, item: { isCurrent } } }),
	patternRemove: (item) => ({ type: types.PATTERN_REMOVE, payload: item })
};

export const getPatternsByWeek = (state, weekday) => {
	const patterns = state.patterns.patterns.filter((x) => x.weekday === weekday).map((x) => {
		const subj = state.subjects.subjects.find((s) => s.id === x.subject);
		return { ...x, color: `#${subj.color}`, name: `${subj.name}-${x.cn}` };
	});
	return patterns;
};
