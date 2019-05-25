import { call, put, takeEvery } from 'redux-saga/effects';
import PatternsAPI from '../api/patterns';
import { types as patternsTypes } from '../reducers/patterns';

function* patternsGet(action) {
	const { response, errors } = yield call(PatternsAPI.getAll, action.payload);
	if (response) {
		yield put({ type: patternsTypes.PATTERNS_GET_OK, payload: { patterns: response } });
	} else {
		yield put({ type: patternsTypes.PATTERN_FAILURE, payload: errors });
	}
}

export function* patternsGetWatch() {
	yield takeEvery(patternsTypes.PATTERNS_GET, patternsGet);
}

function* patternSave(action) {
	const { response, errors } = yield call(PatternsAPI.save, action.payload);
	if (response) {
		yield put({ type: patternsTypes.PATTERNS_SAVE_OK, payload: response });
	} else {
		yield put({ type: patternsTypes.PATTERN_FAILURE, payload: errors });
	}
}

export function* patternSaveWatch() {
	yield takeEvery(patternsTypes.PATTERNS_SAVE, patternSave);
}
