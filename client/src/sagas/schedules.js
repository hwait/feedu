import { call, put, takeEvery } from 'redux-saga/effects';
import SchedulesAPI from '../api/schedules';
import { types as schedulesTypes } from '../reducers/schedules';

function* schedulesGet(action) {
	const { response, errors } = yield call(SchedulesAPI.getAll, action.payload);
	if (response) {
		yield put({ type: schedulesTypes.SCHEDULES_GET_OK, payload: { schedules: response } });
	} else {
		yield put({ type: schedulesTypes.SCHEDULES_FAILURE, payload: errors });
	}
}

export function* schedulesGetWatch() {
	yield takeEvery(schedulesTypes.SCHEDULES_GET, schedulesGet);
}

function* schedulesGenerate(action) {
	const { response, errors } = yield call(SchedulesAPI.generate, action.payload);
	if (response) {
		yield put({ type: schedulesTypes.SCHEDULES_GENERATE_OK, payload: response });
	} else {
		yield put({ type: schedulesTypes.SCHEDULES_FAILURE, payload: errors });
	}
}

export function* schedulesGenerateWatch() {
	yield takeEvery(schedulesTypes.SCHEDULES_GENERATE, schedulesGenerate);
}
