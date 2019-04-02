import Immutable from '../utils/immutable';
export const types = {
	BOOK_GET: 'BOOK_GET',
	BOOK_GET_OK: 'BOOK_GET_OK',
	BOOK_FAILURE: 'BOOK_FAILURE',
	BOOK_FC: 'BOOK_FC',
	BOOK_SAVE: 'BOOK_SAVE',
	BOOK_SAVE_OK: 'BOOK_SAVE_OK',
	BOOK_REMOVE: 'BOOK_REMOVE',
	BOOK_REMOVE_OK: 'BOOK_REMOVE_OK',
	BOOK_ADD: 'BOOK_ADD'
};

const initialBook = {
	subject: '',
	name: '',
	author: '',
	classfrom: 0,
	classto: 0,
	type: 0,
	year: 0,
	binded: ''
};
const initialState = {
	book: initialBook,
	errors: {},
	loading: false
};
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case types.BOOK_FC: {
			// In the payload should be index and item
			return {
				...state,
				book: { ...state.book, [payload.field]: payload.value }
			};
		}
		case types.BOOK_SAVE:
		case types.BOOK_REMOVE:
		case types.BOOK_REQUEST: {
			return {
				...state,
				loading: true
			};
		}
		case types.BOOK_SAVE_OK: {
			return {
				...state,
				book: payload,
				loading: false
			};
		}
		case types.BOOK_REMOVE_OK: {
			// Remove
			return initialState;
		}
		case types.BOOK_GET_OK: {
			return {
				...state,
				book: payload,
				loading: false
			};
		}

		case types.BOOK_ADD: {
			return {
				...state,
				book: initialBook
			};
		}

		default: {
			return state;
		}
	}
};

export const actions = {
	fc: (field, value) => ({ type: types.BOOK_FC, payload: { field, value } }),
	bookGet: (bid) => ({ type: types.BOOK_GET, payload: bid }),
	bookAdd: () => ({ type: types.BOOK_ADD }),
	bookSave: (index, item) => ({ type: types.BOOK_SAVE, payload: { index, item } }),
	bookRemove: (index) => ({ type: types.BOOK_REMOVE, payload: index })
};
