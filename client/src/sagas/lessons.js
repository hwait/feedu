import { call, put, takeEvery } from 'redux-saga/effects';
import LessonsAPI from '../api/lessons';
import { types as lessonsTypes } from '../reducers/lessons';
import { types as lessonTypes } from '../reducers/lesson';

function* videoInfoGet(action) {
	const { response, errors } = yield call(LessonsAPI.videoInfoGet, action.payload);
	if (response) {
		yield put({ type: lessonTypes.YOUTUBE_SUCCESS, payload: response });
	} else {
		yield put({ type: lessonTypes.YOUTUBE_FAILURE, payload: errors });
	}
}

export function* videoInfoGetWatch() {
	yield takeEvery(lessonTypes.YOUTUBE_LOAD, videoInfoGet);
}

function* lessonGet(action) {
	const { response, errors } = yield call(LessonsAPI.lessonGet, action.payload);
	if (response) {
		yield put({ type: lessonTypes.LESSON_SUCCESS, payload: response });
	} else {
		yield put({ type: lessonTypes.LESSON_FAILURE, payload: errors });
	}
}

export function* lessonGetWatch() {
	yield takeEvery(lessonTypes.LESSON_GET, lessonGet);
}

function* lessonsGet(action) {
	const { response, errors } = yield call(LessonsAPI.get, action.payload);
	if (response) {
		yield put({ type: lessonsTypes.LESSONS_SUCCESS, payload: response });
	} else {
		yield put({ type: lessonsTypes.LESSONS_FAILURE, payload: errors });
	}
}

export function* lessonsGetWatch() {
	yield takeEvery(lessonsTypes.LESSONS_REQUEST, lessonsGet);
}
