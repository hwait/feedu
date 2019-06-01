export const types = {
	BOOKS_GET: 'BOOKS_GET',
	BOOKS_GET_OK: 'BOOKS_GET_OK',
	BOOKS_FAILURE: 'BOOKS_FAILURE',
	BOOKS_NEW: 'BOOKS_NEW',
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
		case types.BOOKS_NEW: {
			return {
				...state,
				current: 'NEW'
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
	booksGet: (sid) => ({ type: types.BOOKS_GET, payload: { sid } }),
	bookSetCurrent: (payload) => ({ type: types.BOOKS_SET, payload }),
	bookNew: () => ({ type: types.BOOKS_NEW })
};
export const booksToBindGet = (state) => {
	return state.books.books
		.filter((x) => x._id !== state.books.current)
		.map(({ name, author, _id }) => ({ key: _id, value: _id, text: `${name}.${author}` }));
};
export const booksToTasksGet = (state) => {
	return state.books.books
		.filter((x) => x._id !== state.books.current && x.type === 5)
		.map(({ name, author, _id }) => ({ key: _id, value: _id, text: `${name}.${author}` }));
};
export const getSubjectName = (state) => {
	const subject = state.subjects.subjects.find((x) => x.id === state.subjects.current);
	return subject ? subject.name : '';
};
