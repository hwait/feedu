import { call, put, takeEvery } from 'redux-saga/effects';
import AuthAPI from '../api/auth';
import { types as authTypes } from '../reducers/auth';

function* registerUser(action) {
	const { response, errors } = yield call(AuthAPI.add, action.payload);
	if (response) {
		yield put({ type: authTypes.SIGNUP_SUCCESS, payload: response });
	} else {
		yield put({ type: authTypes.SIGNUP_FAILURE, payload: errors });
	}
}

export function* watchRegisterUser() {
	yield takeEvery(authTypes.SIGNUP_REQUEST, registerUser);
}
