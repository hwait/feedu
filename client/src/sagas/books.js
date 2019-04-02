import { call, put, takeEvery } from 'redux-saga/effects';
import BooksAPI from '../api/books';
import { types as booksTypes } from '../reducers/books';
import { types as bookTypes } from '../reducers/book';

function* booksGet(action) {
	const { response, errors } = yield call(BooksAPI.getAll, action.payload);
	if (response) {
		yield put({ type: booksTypes.BOOKS_GET_OK, payload: response });
	} else {
		yield put({ type: booksTypes.BOOKS_FAILURE, payload: errors });
	}
}

export function* booksGetWatch() {
	yield takeEvery(booksTypes.BOOKS_GET, booksGet);
}

function* bookGet(action) {
	const { response, errors } = yield call(BooksAPI.getOne, action.payload);
	if (response) {
		yield put({ type: bookTypes.BOOK_GET_OK, payload: response });
	} else {
		yield put({ type: bookTypes.BOOK_FAILURE, payload: errors });
	}
}

export function* bookGetWatch() {
	yield takeEvery(bookTypes.BOOK_GET, bookGet);
}

function* bookSave(action) {
	const { response, errors } = yield call(BooksAPI.save, action.payload);
	if (response) {
		yield put({ type: bookTypes.BOOK_SAVE_OK, payload: response });
	} else {
		yield put({ type: bookTypes.BOOK_FAILURE, payload: errors });
	}
}

export function* bookSaveWatch() {
	yield takeEvery(bookTypes.BOOK_SAVE, bookSave);
}
