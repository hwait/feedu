export const types = {
	BOOKS_REQUEST: 'BOOKS_REQUEST',
	BOOKS_SUCCESS: 'BOOKS_SUCCESS',
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
// TODO: Make Lessons just list of names and ids
// TODO: Make new reducer for Lesson to operate
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case types.BOOKS_SET: {
			return {
				...state,
				current: payload
			};
		}
		case types.BOOKS_REQUEST: {
			return {
				...state,
				loading: true
			};
		}
		case types.BOOKS_SUCCESS: {
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
	booksGet: (classn, sid) => ({ type: types.BOOKS_REQUEST, payload: { classn, sid } }),
	bookSetCurrent: (payload) => ({ type: types.BOOKS_SET, payload })
};
export const booksToBindGet = (state) => {
	return state.books.books;
};
