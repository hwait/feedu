import { call, put, takeEvery } from 'redux-saga/effects';
import LessonsAPI from '../api/lessons';
import { types as lessonsTypes } from '../reducers/lessons';

function* getLessons(action) {
	const { response, errors } = yield call(LessonsAPI.get, action.payload);
	if (response) {
		yield put({ type: lessonsTypes.LESSONS_SUCCESS, payload: response });
	} else {
		yield put({ type: lessonsTypes.LESSONS_FAILURE, payload: errors });
	}
}

export function* watchGetLessons() {
	yield takeEvery(lessonsTypes.LESSONS_REQUEST, getLessons);
}
