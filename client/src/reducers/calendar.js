import Immutable from '../utils/immutable';
import moment from 'moment';

export const types = {
	START_SET: 'CALENDAR/START_SET',
	WEEKEND_TOGGLE: 'CALENDAR/WEEKEND_TOGGLE',
	DATE_TOGGLE: 'CALENDAR/DATE_TOGGLE',
	DATES_TOGGLE: 'CALENDAR/DATES_TOGGLE'
};

const initialState = {
	dates: [],
	start: 8,
	weekends: [ 6, 7 ],
	loading: false
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case types.DATE_TOGGLE: {
			return {
				...state,
				dates: state.dates.includes(payload)
					? Immutable.removeItem(state.dates, payload)
					: Immutable.addItem(state.dates, payload)
			};
		}
		case types.START_SET: {
			return {
				...state,
				start: payload,
				dates: []
			};
		}
		case types.WEEKEND_TOGGLE: {
			return {
				...state,
				weekends: state.weekends.includes(payload)
					? Immutable.removeItem(state.weekends, payload)
					: Immutable.addItem(state.weekends, payload),
				dates: []
			};
		}
		case types.DATES_TOGGLE: {
			const patt = payload.substr(0, 7);
			const dates = state.dates.filter((x) => x.includes(patt));
			return {
				...state,
				dates:
					dates.length > 0
						? state.dates.filter((x) => !x.includes(patt))
						: [ ...state.dates, ...fillMonth(payload, state.weekends) ]
			};
		}
		default: {
			return state;
		}
	}
};

const fillMonth = (initialDate, weekends) => {
	const arr = [];
	let dt = moment(initialDate);
	const month = dt.month();
	while (dt.month() === month) {
		if (!weekends.includes(dt.isoWeekday())) arr.push(dt.format('YYYY-MM-DD'));
		dt = dt.add(1, 'day');
	}
	return arr;
};

export const actions = {
	dateToggle: (date) => ({ type: types.DATE_TOGGLE, payload: date }),
	weekendToggle: (day) => ({ type: types.WEEKEND_TOGGLE, payload: day }),
	startSet: (month) => ({ type: types.START_SET, payload: month }),
	monthToggle: (initialDate) => ({ type: types.DATES_TOGGLE, payload: initialDate })
};

export const getMarks = (dates, initialDate) => {
	const patt = initialDate.substr(0, 7);
	return dates.filter((x) => x.includes(patt)).map((x) => moment(x));
};

export const getStats = (dates) => {
	return dates.length;
};
