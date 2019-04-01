import { call, put, takeEvery } from 'redux-saga/effects';
import LessonsAPI from '../api/lessons';
import { types as lessonsTypes } from '../reducers/lessons';
import { types as lessonTypes } from '../reducers/lesson';

function* getLesson(action) {
	const { response, errors } = yield call(LessonsAPI.getLesson, action.payload);
	if (response) {
		yield put({ type: lessonTypes.LESSON_SUCCESS, payload: response });
	} else {
		yield put({ type: lessonTypes.LESSON_FAILURE, payload: errors });
	}
}

export function* watchGetLesson() {
	yield takeEvery(lessonTypes.LESSON_GET, getLesson);
}

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
