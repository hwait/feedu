import { call, put, takeEvery } from 'redux-saga/effects';
import AuthAPI from '../api/auth';
import { types as authTypes } from '../reducers/auth';

function* registerUser(action) {
	const { response, errors } = yield call(AuthAPI.register, action.payload);
	if (response) {
		yield put({ type: authTypes.SIGNUP_SUCCESS, payload: response });
	} else {
		yield put({ type: authTypes.SIGNUP_FAILURE, payload: errors });
	}
}

export function* watchRegisterUser() {
	yield takeEvery(authTypes.SIGNUP_REQUEST, registerUser);
}

function* saveUser(action) {
	const { response, errors } = yield call(AuthAPI.save, action.payload);
	if (response) {
		yield put({ type: authTypes.SAVE_SUCCESS, payload: response });
	} else {
		yield put({ type: authTypes.SAVE_FAILURE, payload: errors });
	}
}

export function* watchSaveUser() {
	yield takeEvery(authTypes.SAVE_REQUEST, saveUser);
}

function* loginUser(action) {
	const { response, errors } = yield call(AuthAPI.login, action.payload);
	if (response) {
		yield put({ type: authTypes.LOGIN_SUCCESS, payload: response });
	} else {
		yield put({ type: authTypes.LOGIN_FAILURE, payload: errors });
	}
}

export function* watchLoginUser() {
	yield takeEvery(authTypes.LOGIN_REQUEST, loginUser);
}
