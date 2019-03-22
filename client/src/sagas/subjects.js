import { call, put, takeEvery } from 'redux-saga/effects';
import SubjectsAPI from '../api/subjects';
import { types as subjectsTypes } from '../reducers/subjects';

function* getSubjects() {
	const { response, errors } = yield call(SubjectsAPI.get);
	if (response) {
		yield put({ type: subjectsTypes.SUBJECTS_SUCCESS, payload: response });
	} else {
		yield put({ type: subjectsTypes.SUBJECTS_FAILURE, payload: errors });
	}
}

export function* watchGetSubjects() {
	yield takeEvery(subjectsTypes.SUBJECTS_REQUEST, getSubjects);
}
