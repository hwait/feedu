export const types = {
	BOOKS_GET: 'BOOKS_GET',
	BOOKS_GET_OK: 'BOOKS_GET_OK',
	BOOKS_FAILURE: 'BOOKS_FAILURE',
	BOOKS_SET: 'BOOKS_SET'
};

const initialState = {
	books: [],
	errors: {},
	loading: false,
	filter: 0,
	current: ''
};
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case types.BOOKS_SET: {
			return {
				...state,
				current: payload
			};
		}
		case types.BOOKS_GET: {
			return {
				...state,
				loading: true
			};
		}
		case types.BOOKS_GET_OK: {
			return {
				...state,
				books: payload,
				errors: {},
				loading: false
			};
		}
		case types.BOOKS_FAILURE: {
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
	booksGet: (classn, sid) => ({ type: types.BOOKS_GET, payload: { classn, sid } }),
	bookSetCurrent: (payload) => ({ type: types.BOOKS_SET, payload })
};
export const booksToBindGet = (state) => {
	return state.books.books;
};
