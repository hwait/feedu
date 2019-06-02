import { call, put, takeEvery } from 'redux-saga/effects';
import CoursesAPI from '../api/courses';
import { types as coursesTypes } from '../reducers/courses';

function* coursesGet(action) {
	const { response, errors } = yield call(CoursesAPI.getAll, action.payload);
	if (response) {
		yield put({ type: coursesTypes.COURSES_GET_OK, payload: { courses: response } });
	} else {
		yield put({ type: coursesTypes.COURSE_FAILURE, payload: errors });
	}
}

export function* coursesGetWatch() {
	yield takeEvery(coursesTypes.COURSES_GET, coursesGet);
}

function* courseGet(action) {
	const { response, errors } = yield call(CoursesAPI.getOne, action.payload);
	if (response) {
		yield put({ type: coursesTypes.COURSE_GET_OK, payload: { course: response } });
	} else {
		yield put({ type: coursesTypes.COURSE_FAILURE, payload: errors });
	}
}

export function* courseGetWatch() {
	yield takeEvery(coursesTypes.COURSE_GET, courseGet);
}

function* courseSave(action) {
	const { response, errors } = yield call(CoursesAPI.save, action.payload);
	if (response) {
		yield put({ type: coursesTypes.COURSE_SAVE_OK, payload: response });
	} else {
		yield put({ type: coursesTypes.COURSE_FAILURE, payload: errors });
	}
}

export function* courseSaveWatch() {
	yield takeEvery(coursesTypes.COURSE_SAVE, courseSave);
}

function* courseRemove(action) {
	const { response, errors } = yield call(CoursesAPI.remove, action.payload);
	if (response) {
		yield put({ type: coursesTypes.COURSE_REMOVE_OK, payload: response });
	} else {
		yield put({ type: coursesTypes.COURSE_FAILURE, payload: errors });
	}
}

export function* courseRemoveWatch() {
	yield takeEvery(coursesTypes.COURSE_REMOVE, courseRemove);
}
