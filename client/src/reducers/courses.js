import Immutable from '../utils/immutable';
import { createSelector } from 'reselect';
import { getCurrentSubject } from './subjects';

export const types = {
	COURSE_FC: 'COURSE_FC',
	COURSES_GET: 'COURSES_GET',
	COURSES_GET_OK: 'COURSES_GET_OK',
	COURSE_CHOOSE: 'COURSE_CHOOSE',
	COURSE_GET: 'COURSE_GET',
	COURSE_GET_OK: 'COURSE_GET_OK',
	COURSE_SAVE: 'COURSE_SAVE',
	COURSE_SAVE_OK: 'COURSE_SAVE_OK',
	COURSE_FAILURE: 'COURSE_FAILURE',
	COURSE_ADD: 'COURSE_ADD',
	COURSE_REMOVE: 'COURSE_REMOVE',
	COURSE_REMOVE_OK: 'COURSE_REMOVE_OK'
};

const initialState = {
	courses: [],
	course: {},
	errors: {},
	loading: false
};

const initialCourse = {
	name: '',
	sname: '',
	description: '',
	link: '',
	subjects: [],
	lessonsn: 0,
	books: []
};

export default (state = initialState, { type, payload }) => {
	state = { ...state, errors: {} };
	switch (type) {
		case types.COURSE_FC: {
			return {
				...state,
				course: { ...state.course, [payload.field]: payload.value }
			};
		}
		case types.COURSES_GET:
		case types.COURSE_GET:
		case types.COURSE_REMOVE:
		case types.COURSE_SAVE: {
			return {
				...state,
				loading: true
			};
		}
		case types.COURSE_SAVE_OK: {
			return {
				...state,
				courses: Immutable.addItem(state.courses, { sname: state.courses.sname, _id: payload._id }),
				errors: { success: true },
				loading: false
			};
		}
		case types.COURSES_GET_OK: {
			return {
				...state,
				...payload,
				errors: {},
				loading: false
			};
		}
		case types.COURSE_GET_OK: {
			return {
				...state,
				...payload,
				errors: {},
				loading: false
			};
		}
		case types.COURSE_FAILURE: {
			return {
				...state,
				errors: payload,
				loading: false
			};
		}
		case types.COURSE_REMOVE_OK: {
			return {
				...state,
				courses: state.courses.filter((x) => !(x._id === payload._id))
			};
		}
		case types.COURSE_ADD: {
			return {
				...state,
				course: initialCourse
			};
		}
		case types.COURSE_CHOOSE: {
			return {
				...state,
				course: state.course.find((x) => x._id === payload)
			};
		}

		case types.COURSE_DURATION: {
			return {
				...state,
				dur: payload
			};
		}

		default: {
			return state;
		}
	}
};

export const actions = {
	fc: (field, value) => ({ type: types.COURSE_FC, payload: { field, value } }),
	coursesGet: (sid) => ({ type: types.COURSES_GET, payload: sid }),
	courseGet: (id) => ({ type: types.COURSE_GET, payload: id }),
	courseChoose: (id) => ({ type: types.COURSE_CHOOSE, payload: id }),
	courseAdd: (item) => ({ type: types.COURSE_ADD, payload: item }),
	courseSave: (courses) => ({ type: types.COURSE_SAVE, payload: courses }),
	courseRemove: (id) => ({ type: types.COURSE_REMOVE, payload: id })
};

const getCourses = (state) => {
	return state.curses.curses.map((x) => ({
		key: x._id,
		value: x._id,
		text: x.sname
	}));
};
export const getCurrentCourse = (state) => {
	return state.courses.course;
};
export const getCourse = (state, props) => {
	return state.courses.courses.find((x) => x._id === props._id);
};
export const getCoursesBySubject = createSelector([ getCurrentSubject, getCourses ], (subject, courses) => {
	return courses.filter((x) => x.subject === subject);
});
