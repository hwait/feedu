import { call, put, takeEvery } from 'redux-saga/effects';
import CalendarAPI from '../api/calendar';
import { types as calendarTypes } from '../reducers/calendar';

function* calendarsGet(action) {
	const { response, errors } = yield call(CalendarAPI.getAll, action.payload);
	if (response) {
		yield put({ type: calendarTypes.CALENDAR_SUCCESS, payload: { calendars: response } });
	} else {
		yield put({ type: calendarTypes.CALENDAR_FAILURE, payload: errors });
	}
}

export function* calendarsGetWatch() {
	yield takeEvery(calendarTypes.CALENDARS_GET, calendarsGet);
}

function* calendarGet(action) {
	const { response, errors } = yield call(CalendarAPI.getOne, action.payload);
	if (response) {
		yield put({ type: calendarTypes.CALENDAR_SUCCESS, payload: { calendar: response } });
	} else {
		yield put({ type: calendarTypes.CALENDAR_FAILURE, payload: errors });
	}
}

export function* calendarGetWatch() {
	yield takeEvery(calendarTypes.CALENDAR_GET, calendarGet);
}

function* calendarSave(action) {
	const { response, errors } = yield call(CalendarAPI.save, action.payload);
	if (response) {
		yield put({ type: calendarTypes.CALENDAR_SAVE_OK, payload: response });
	} else {
		yield put({ type: calendarTypes.CALENDAR_FAILURE, payload: errors });
	}
}

export function* calendarSaveWatch() {
	yield takeEvery(calendarTypes.CALENDAR_SAVE, calendarSave);
}
