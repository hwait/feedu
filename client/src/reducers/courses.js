import Immutable from '../utils/immutable';
import { types as schedulesTypes } from '../reducers/schedules';
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
	PAPER_ADD: 'COURSE_PAPER_ADD',
	PAPER_CHANGE: 'COURSE_PAPER_CHANGE',
	PAPER_REMOVE: 'COURSE_PAPER_REMOVE',
	COURSE_ADD: 'COURSE_ADD',
	COURSE_CANCEL: 'COURSE_CANCEL',
	COURSE_REMOVE: 'COURSE_REMOVE',
	COURSE_REMOVE_OK: 'COURSE_REMOVE_OK'
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

const initialState = {
	courses: [],
	course: initialCourse,
	errors: {},
	loading: false
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
		case schedulesTypes.SYLLABUS_GET_OK: {
			return {
				...state,
				course: payload.course,
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
		case types.COURSE_CANCEL: {
			return {
				...state,
				courses: [],
				course: initialCourse
			};
		}
		case types.COURSE_CHOOSE: {
			return {
				...state,
				course: state.courses.find((x) => x._id === payload)
			};
		}
		case types.PAPER_ADD: {
			return {
				...state,
				course: {
					...state.course,
					books: Immutable.addItem(state.course.books, '')
				}
			};
		}
		case types.PAPER_CHANGE: {
			return {
				...state,
				course: { ...state.course, books: Immutable.updateStringInArray(state.course.books, payload) }
			};
		}
		case types.PAPER_REMOVE: {
			return {
				...state,
				course: { ...state.course, books: Immutable.removeIndex(state.course.books, payload) }
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
	syllabusGet: (uid, cid) => ({ type: schedulesTypes.SYLLABUS_GET, payload: { uid, cid } }),
	courseGet: (id) => ({ type: types.COURSE_GET, payload: id }),
	courseChoose: (id) => ({ type: types.COURSE_CHOOSE, payload: id }),
	courseAdd: (item) => ({ type: types.COURSE_ADD, payload: item }),
	courseCancel: () => ({ type: types.COURSE_CANCEL }),
	courseSave: (courses) => ({ type: types.COURSE_SAVE, payload: courses }),
	courseRemove: (id) => ({ type: types.COURSE_REMOVE, payload: id }),
	paperAdd: () => ({ type: types.PAPER_ADD }),
	paperChange: (index, value) => ({ type: types.PAPER_CHANGE, payload: { index, item: value } }),
	paperRemove: (index) => ({ type: types.PAPER_REMOVE, payload: index })
};

export const getCourses = (state) => {
	return state.courses.courses.map((x) => ({
		key: x._id,
		value: x._id,
		text: x.sname
	}));
};
export const getCurrentCourse = (state) => {
	return state.courses.course;
};
export const getExtendedCourse = (state) => {
	return {
		...state.courses.course,
		books: state.courses.course.books
			? state.courses.course.books.map((x) => ({
					book: x,
					paragraph: 0
				}))
			: []
	};
};

// export const getExtendedCourse = createSelector([ getCurrentCourse, getBooks ], (course, books) => {
// 	const books = course.books.map((x) => {
// 		const book = books.find((b) => b._id === x._id);
// 		return { ...x, color: `#${subj.color}`, icon: `${subj.icon}`, name: `${x.course.sname}` };
// 	});
// });

export const getCourse = (state, props) => {
	return state.courses.courses.find((x) => x._id === props._id);
};
