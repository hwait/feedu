import { call, put, takeEvery } from 'redux-saga/effects';
import BooksAPI from '../api/books';
import { types as booksTypes } from '../reducers/books';

function* booksGet(action) {
	const { response, errors } = yield call(BooksAPI.get, action.payload);
	if (response) {
		yield put({ type: booksTypes.BOOKS_GET_OK, payload: response });
	} else {
		yield put({ type: booksTypes.BOOK_FAILURE, payload: errors });
	}
}

export function* booksGetWatch() {
	yield takeEvery(booksTypes.BOOKS_GET, booksGet);
}

function* booksSave(action) {
	const { response, errors } = yield call(BooksAPI.save, action.payload);
	if (response) {
		yield put({ type: booksTypes.BOOKS_SAVE_OK, payload: response });
	} else {
		yield put({ type: booksTypes.BOOKS_FAILURE, payload: errors });
	}
}

export function* booksSaveWatch() {
	yield takeEvery(booksTypes.BOOKS_SAVE, booksSave);
}
