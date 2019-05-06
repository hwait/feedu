import Immutable from '../utils/immutable';

export const types = {
	PATTERNS_GET: 'PATTERNS_GET',
	PATTERNS_GET_OK: 'PATTERNS_GET_OK',
	PATTERNS_SAVE: 'PATTERNS_SAVE',
	PATTERNS_SAVE_OK: 'PATTERNS_SAVE_OK',
	PATTERNS_FAILURE: 'PATTERNS_FAILURE',
	PATTERN_ADD: 'PATTERN_ADD',
	PATTERN_CURRENT: 'PATTERN_CURRENT',
	PATTERN_REMOVE: 'PATTERN_REMOVE'
};

const initialPattern = {
	_id: 0,
	subject: '',
	student: '',
	calendar: '',
	weekday: 0,
	hour: 9
};

const initialState = {
	patterns: [],
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
			return {
				...state,
				patterns: Immutable.removeObject(state.patterns, payload)
			};
		}
		case types.PATTERN_ADD: {
			return {
				...state,
				patterns: Immutable.addItem(state.patterns, payload)
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
	patternAdd: (item) => ({ type: types.PATTERN_ADD, payload: item }),
	patternCurrent: (index, isCurrent) => ({ type: types.PATTERN_CURRENT, payload: { index, item: { isCurrent } } }),
	patternRemove: (index) => ({ type: types.PATTERN_REMOVE, payload: index })
};
