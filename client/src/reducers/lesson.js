import { types as lessonsTypes } from '../reducers/lessons';
import Immutable from '../utils/immutable';
// TODO: Add, Change and Remove
export const types = {
	LESSON_FC: 'LESSON/LESSON_FC',
	YOUTUBE_LOAD: 'LESSON/YOUTUBE_LOAD',
	YOUTUBE_SUCCESS: 'LESSON/YOUTUBE_SUCCESS',
	YOUTUBE_FAILURE: 'LESSON/YOUTUBE_FAILURE',
	YOUTUBE_ADD: 'LESSON/YOUTUBE_ADD',
	YOUTUBE_CHANGE: 'LESSON/YOUTUBE_CHANGE',
	YOUTUBE_REMOVE: 'LESSON/YOUTUBE_REMOVE',

	PAPER_ADD: 'LESSON/PAPER_ADD',
	PAPER_CHANGE: 'LESSON/PAPER_CHANGE',
	PAPER_REMOVE: 'LESSON/PAPER_REMOVE',

	TASK_ADD: 'LESSON/TASK_ADD',
	TASK_CHANGE: 'LESSON/TASK_CHANGE',
	TASK_REMOVE: 'LESSON/TASK_REMOVE',

	LESSON_GET: 'LESSON/LESSON_GET',
	LESSON_SAVE: 'LESSON/LESSON_SAVE',
	LESSON_SAVE_OK: 'LESSON/LESSON_SAVE_OK',
	LESSON_SUCCESS: 'LESSON/LESSON_SUCCESS',
	LESSON_FAILURE: 'LESSON/LESSON_FAILURE',
	LESSON_NEW: 'LESSON/LESSON_NEW',
	LESSON_COPY: 'LESSON/LESSON_COPY'
};

const initialLesson = {
	course: '',
	nmb: 1,
	name: '',
	link: '',
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
	state = { ...state, errors: {} };
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
				lesson: { ...state.lesson, videos: Immutable.removeIndex(state.lesson.videos, payload) }
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
						dur: ''
					})
				}
			};
		}

		case types.PAPER_ADD: {
			return {
				...state,
				lesson: {
					...state.lesson,
					papers: Immutable.addItem(state.lesson.papers, {
						book: '',
						paragraph: 0
					})
				}
			};
		}
		case types.PAPER_CHANGE: {
			return {
				...state,
				lesson: { ...state.lesson, papers: Immutable.updateObjectInArray(state.lesson.papers, payload) }
			};
		}
		case types.PAPER_REMOVE: {
			return {
				...state,
				lesson: { ...state.lesson, papers: Immutable.removeIndex(state.lesson.papers, payload) }
			};
		}
		case types.TASK_ADD: {
			return {
				...state,
				lesson: {
					...state.lesson,
					tasks: Immutable.addItem(state.lesson.tasks, {
						book: '',
						nmb: 0,
						difficulty: 1
					})
				}
			};
		}
		case types.TASK_CHANGE: {
			return {
				...state,
				lesson: { ...state.lesson, tasks: Immutable.updateObjectInArray(state.lesson.tasks, payload) }
			};
		}
		case types.TASK_REMOVE: {
			return {
				...state,
				lesson: { ...state.lesson, tasks: Immutable.removeIndex(state.lesson.tasks, payload) }
			};
		}
		case types.LESSON_NEW: {
			return {
				...state,
				lesson: { ...state.lesson, ...payload }
			};
		}
		case lessonsTypes.LESSONS_INC_OK: {
			return {
				...state,
				lesson: { ...initialLesson, ...payload }
			};
		}
		case types.LESSON_COPY: {
			const words = payload.name.split(' ');
			const n = parseInt(words.slice(-1));
			const newName =
				n > 0 ? words.slice(0, words.length - 1).join(' ') + ' ' + (n + 1) : payload.name + '-ПРАКТ';
			return {
				...state,
				lesson: { ...state.lesson, ...payload, name: newName, _id: undefined }
			};
		}

		case types.LESSON_GET:
		case types.LESSON_SAVE: {
			return {
				...state,
				loading: true
			};
		}
		case types.LESSON_SAVE_OK: {
			if (payload.success) {
				// const nmb = state.lesson.nmb * 1 + 1;
				// const name = state.lesson.name === 'Решение задач' ? '' : 'Решение задач';
				// return {
				// 	...state,
				// 	lesson: { ...initialLesson, nmb, name },
				// 	loading: false
				// };
				return state;
			} else {
				return {
					...state,
					lesson: payload,
					errors: {},
					loading: false
				};
			}
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
		case lessonsTypes.LESSONS_NEW: {
			return {
				...state,
				lesson: initialLesson
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
	paperAdd: () => ({ type: types.PAPER_ADD }),
	paperChange: (index, field, value) => ({ type: types.PAPER_CHANGE, payload: { index, item: { [field]: value } } }),
	paperRemove: (index) => ({ type: types.PAPER_REMOVE, payload: index }),
	taskAdd: () => ({ type: types.TASK_ADD }),
	taskChange: (index, field, value) => ({ type: types.TASK_CHANGE, payload: { index, item: { [field]: value } } }),
	taskRemove: (index) => ({ type: types.TASK_REMOVE, payload: index }),
	youtubeChange: (index, link) => ({
		type: types.YOUTUBE_CHANGE,
		payload: { index, item: { link } }
	}),
	youtubeRemove: (index) => ({ type: types.YOUTUBE_REMOVE, payload: index }),
	lessonGet: (lid) => ({ type: types.LESSON_GET, payload: lid }),
	lessonSave: (lesson) => ({ type: types.LESSON_SAVE, payload: lesson }),
	lessonNew: (payload) => ({ type: types.LESSON_SET, payload }),
	lessonCopy: (payload) => ({ type: types.LESSON_COPY, payload }),
	lessonInc: (payload) => ({ type: lessonsTypes.LESSONS_INC, payload })
};
