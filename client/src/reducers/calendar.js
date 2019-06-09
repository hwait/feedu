import Immutable from '../utils/immutable';
import moment from 'moment';
import { createSelector } from 'reselect';
moment.locale('ru');
export const types = {
	FC: 'CALENDAR/FC',
	START_SET: 'CALENDAR/START_SET',
	WEEK_SET: 'CALENDAR/WEEK_SET',
	DATE_TOGGLE: 'CALENDAR/DATE_TOGGLE',

	DATES_TOGGLE: 'CALENDAR/DATES_TOGGLE',
	CALENDAR_SAVE: 'CALENDAR/CALENDAR_SAVE',
	CALENDAR_SAVE_OK: 'CALENDAR/CALENDAR_SAVE_OK',
	CALENDAR_FAILURE: 'CALENDAR/CALENDAR_FAILURE',
	CALENDAR_GET: 'CALENDAR/CALENDAR_GET',
	CALENDARS_TOGGLE: 'CALENDAR/CALENDARS_TOGGLE',
	CALENDAR_CANCEL: 'CALENDAR/CALENDAR_CANCEL',
	CALENDARS_GROUP_OK: 'CALENDAR/CALENDARS_GROUP_OK',
	CALENDARS_GROUP: 'CALENDAR/CALENDARS_GROUP',
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
const getWeeks = (startYear) => {
	const st = moment().set({ year: startYear, month: 8, day: 0 }).startOf('isoWeek');
	const weeks = [];
	for (let i = 1; i < 53; i++) {
		const dstr = st.format('YYYY-MM-DD');
		st.add(1, 'w');
		if (moment() <= st)
			weeks.push({
				n: i,
				ds: dstr
			});
	}
	return weeks;
};
const initialState = {
	calendar: initialCalendar,
	calendars: [],
	current: '',
	group: '',

	weeks: getWeeks(moment().month() > 7 ? moment().year() : moment().year() - 1),
	week: getWeeks(moment().month() > 7 ? moment().year() : moment().year() - 1)[0],
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
		case types.WEEK_SET: {
			return {
				...state,
				week: state.weeks.find((x) => x.n === payload)
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
		case types.CALENDARS_GROUP: {
			const calendar = state.calendars.find((x) => x.group === payload);
			if (calendar) {
				const weeks = getWeeks(calendar.year);
				return {
					...state,
					group: payload,
					weeks,
					week: weeks[0],
					loading: true
				};
			}
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
				group: '',
				errors: {},
				loading: false
			};
		}
		case types.CALENDARS_TOGGLE: {
			return {
				...state,
				...payload,
				calendars: Immutable.toggleObjectsInArray(state.calendars, payload),
				errors: {},
				loading: false
			};
		}
		case types.CALENDARS_GROUP_OK: {
			return {
				...state,
				...payload,
				//calendars: Immutable.updateObjectsInArray(state.calendars, payload),
				current: '',
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
	weekSet: (n) => ({ type: types.WEEK_SET, payload: n }),
	monthToggle: (initialDate) => ({ type: types.DATES_TOGGLE, payload: initialDate }),
	calendarsGet: () => ({ type: types.CALENDARS_GET }),

	calendarsGroupsGet: (group) => ({ type: types.CALENDARS_GROUP, payload: group }),
	calendarToggle: (id) => ({ type: types.CALENDARS_TOGGLE, payload: { id, field: 'selected' } }),
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
const getGroup = (state) => {
	return state.calendar.group;
};
const getCalendars = (state) => {
	return state.calendar.calendars;
};

export const getDatesSelected = (state) => {
	return state.calendar.calendars.filter((x) => x.selected).reduce((a, { dates }) => a.concat(dates), []);
};

export const calendarsGet = (state) => {
	return state.calendar.calendars.map(({ name, _id }) => ({ key: _id, value: _id, text: `${name}.` }));
};

export const calendarsGroupsGet = (state) => {
	return [ ...new Set(state.calendar.calendars.map(({ group }) => group)) ].map((x) => ({
		key: x,
		value: x,
		text: x
	}));
};

// export const calendarDaysInWeeks = (state) => {
// 	const arr = [ 0, 0, 0, 0, 0, 0, 0 ];
// 	state.calendar.calendar.dates.forEach((x) => {
// 		arr[moment(x).weekday()]++;
// 	});

// 	return arr;
// };

export const calendarDaysInWeeks = createSelector([ getDatesSelected ], (dates) => {
	const arr = [ 0, 0, 0, 0, 0, 0, 0 ];
	dates.forEach((x) => {
		arr[moment(x).weekday()]++;
	});
	return arr;
});

export const getCalendarsByGroup = createSelector([ getGroup, getCalendars ], (group, calendars) => {
	return calendars.filter((x) => x.group === group).map(({ _id, name, selected }) => ({ _id, name, selected }));
});
