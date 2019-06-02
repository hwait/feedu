import Immutable from '../utils/immutable';
import moment from 'moment';
moment.locale('ru');
export const types = {
	FC: 'CALENDAR/FC',
	START_SET: 'CALENDAR/START_SET',
	DATE_TOGGLE: 'CALENDAR/DATE_TOGGLE',
	DATES_TOGGLE: 'CALENDAR/DATES_TOGGLE',
	CALENDAR_SAVE: 'CALENDAR/CALENDAR_SAVE',
	CALENDAR_SAVE_OK: 'CALENDAR/CALENDAR_SAVE_OK',
	CALENDAR_FAILURE: 'CALENDAR/CALENDAR_FAILURE',
	CALENDAR_GET: 'CALENDAR/CALENDAR_GET',
	CALENDAR_CANCEL: 'CALENDAR/CALENDAR_CANCEL',
	CALENDARS_GET: 'CALENDAR/CALENDARS_GET',
	CALENDAR_SUCCESS: 'CALENDAR/CALENDAR_SUCCESS'
};

const initialCalendar = {
	group: '',
	year: 2019,
	dates: [],
	name: '',
	start: 5
};

const initialState = {
	calendar: initialCalendar,
	calendars: [],
	current: '',
	errors: {},
	loading: false
};

export default (state = initialState, { type, payload }) => {
	state = { ...state, errors: {} };
	switch (type) {
		case types.FC: {
			return {
				...state,
				calendar: {
					...state.calendar,
					[payload.field]: payload.value
				}
			};
		}
		case types.DATE_TOGGLE: {
			return {
				...state,
				calendar: {
					...state.calendar,
					dates: state.calendar.dates.includes(payload)
						? Immutable.removeItem(state.calendar.dates, payload)
						: Immutable.addItem(state.calendar.dates, payload)
				}
			};
		}
		case types.START_SET: {
			return {
				...state,
				calendar: {
					...state.calendar,
					start: payload,
					dates: []
				}
			};
		}
		case types.CALENDAR_CANCEL: {
			return {
				...state,
				current: '',
				calendar: initialCalendar
			};
		}

		case types.DATES_TOGGLE: {
			const patt = payload.substr(0, 7);
			const dates = state.calendar.dates.filter((x) => x.includes(patt));
			return {
				...state,
				calendar: {
					...state.calendar,
					dates:
						dates.length > 0
							? state.calendar.dates.filter((x) => !x.includes(patt))
							: [ ...state.calendar.dates, ...fillMonth(payload) ]
				}
			};
		}
		case types.CALENDAR_GET:
		case types.CALENDARS_GET:
		case types.CALENDAR_SAVE: {
			return {
				...state,
				loading: true
			};
		}
		case types.CALENDAR_SAVE_OK: {
			return {
				...state,
				...initialState,
				errors: { success: true }
			};
		}
		case types.CALENDAR_SUCCESS: {
			return {
				...state,
				...payload,
				current: payload.calendar ? payload.calendar._id : '',
				errors: {},
				loading: false
			};
		}
		case types.CALENDAR_FAILURE: {
			return {
				...state,
				errors: payload,
				loading: false
			};
		}

		default: {
			return state;
		}
	}
};

const fillMonth = (initialDate) => {
	const arr = [];
	let dt = moment(initialDate);
	const month = dt.month();
	while (dt.month() === month) {
		arr.push(dt.format('YYYY-MM-DD'));
		dt = dt.add(1, 'day');
	}
	return arr;
};

export const actions = {
	fc: (field, value) => ({ type: types.FC, payload: { field, value } }),
	dateToggle: (date) => ({ type: types.DATE_TOGGLE, payload: date }),
	startSet: (month) => ({ type: types.START_SET, payload: month }),
	monthToggle: (initialDate) => ({ type: types.DATES_TOGGLE, payload: initialDate }),
	calendarsGet: () => ({ type: types.CALENDARS_GET }),
	calendarGet: (id) => ({ type: types.CALENDAR_GET, payload: id }),
	calendarCancel: () => ({ type: types.CALENDAR_CANCEL }),
	calendarSave: (calendar) => ({ type: types.CALENDAR_SAVE, payload: calendar })
};

export const getMarks = (dates, initialDate) => {
	const patt = initialDate.substr(0, 7);
	return dates.filter((x) => x.includes(patt)).map((x) => moment(x));
};

export const getStats = (dates) => {
	return dates.length;
};

export const calendarsGet = (state) => {
	return state.calendar.calendars.map(({ name, _id }) => ({ key: _id, value: _id, text: `${name}.` }));
};

export const calendarDaysInWeeks = (state) => {
	const arr = [ 0, 0, 0, 0, 0, 0, 0 ];
	state.calendar.calendar.dates.forEach((x) => {
		arr[moment(x).weekday()]++;
	});

	return arr;
};
