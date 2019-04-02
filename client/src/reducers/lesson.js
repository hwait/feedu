import Immutable from '../utils/immutable';

export const types = {
	LESSON_FC: 'LESSON/LESSON_FC',
	YOUTUBE_ADD: 'LESSON/YOUTUBE_ADD',
	YOUTUBE_LOAD: 'LESSON/YOUTUBE_LOAD',
	YOUTUBE_SUCCESS: 'LESSON/YOUTUBE_SUCCESS',
	YOUTUBE_FAILURE: 'LESSON/YOUTUBE_FAILURE',
	YOUTUBE_CHANGE: 'LESSON/YOUTUBE_CHANGE',
	YOUTUBE_REMOVE: 'LESSON/YOUTUBE_REMOVE',
	LESSON_EXTENDED: 'LESSON/LESSON_EXTENDED',
	LESSON_GET: 'LESSON/LESSON_GET',
	LESSON_SAVE: 'LESSON/LESSON_SAVE',
	LESSON_SUCCESS: 'LESSON/LESSON_SUCCESS',
	LESSON_FAILURE: 'LESSON/LESSON_FAILURE',
	LESSON_NEW: 'LESSON/LESSON_NEW'
};

const initialLesson = {
	subject: '',
	classn: 0,
	nmb: 0,
	name: '',
	isextended: false,
	videos: [],
	papers: [],
	tasks: []
};
const initialState = {
	lesson: initialLesson,
	errors: {},
	loading: false
};
// TODO: Make Lesson just list of names and ids
// TODO: Make new reducer for Lesson to operate
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case types.LESSON_FC: {
			return {
				...state,
				lesson: { ...state.lesson, [payload.field]: payload.value }
			};
		}
		case types.YOUTUBE_LOAD: {
			return {
				...state,
				lesson: { ...state.lesson, videos: Immutable.updateObjectInArray(state.lesson.videos, payload) }
			};
		}
		case types.YOUTUBE_CHANGE:
		case types.YOUTUBE_FAILURE:
		case types.YOUTUBE_SUCCESS: {
			// In the payload should be index and item
			return {
				...state,
				lesson: { ...state.lesson, videos: Immutable.updateObjectInArray(state.lesson.videos, payload) }
			};
		}
		case types.YOUTUBE_REMOVE: {
			return {
				...state,
				lesson: { ...state.lesson, videos: Immutable.removeItem(state.lesson.videos, payload) }
			};
		}
		case types.YOUTUBE_ADD: {
			return {
				...state,
				lesson: {
					...state.lesson,
					videos: Immutable.addItem(state.lesson.videos, {
						link: '',
						name: '',
						dur: '',
						errors: {},
						loading: false
					})
				}
			};
		}
		case types.LESSON_NEW: {
			return {
				...state,
				lesson: { ...state.lesson, ...payload }
			};
		}
		case types.LESSON_EXTENDED: {
			return {
				...state,
				lesson: { ...state.lesson, isextended: !state.lesson.isextended }
			};
		}
		case types.LESSON_GET:
		case types.LESSON_SAVE: {
			return {
				...state,
				loading: true
			};
		}
		case types.LESSON_SUCCESS: {
			return {
				...state,
				lesson: payload,
				errors: {},
				loading: false
			};
		}
		case types.LESSON_FAILURE: {
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

export const actions = {
	fc: (field, value) => ({ type: types.LESSON_FC, payload: { field, value } }),
	youtubeAdd: () => ({ type: types.YOUTUBE_ADD }),
	youtubeLoad: (index, link) => {
		const yid = link.split('&')[0].split('v=')[1];
		return { type: types.YOUTUBE_LOAD, payload: { index, link: yid, item: { loading: true } } };
	},
	youtubeChange: (index, link) => ({ type: types.YOUTUBE_CHANGE, payload: { index, item: { link } } }),
	youtubeRemove: (index) => ({ type: types.YOUTUBE_REMOVE, payload: index }),
	lessonGet: (lid) => ({ type: types.LESSON_GET, payload: lid }),
	lessonSave: (lesson) => ({ type: types.LESSON_SAVE, payload: lesson }),
	toggleExtended: () => ({ type: types.LESSON_EXTENDED }),
	lessonNew: (payload) => ({ type: types.LESSON_SET, payload })
};