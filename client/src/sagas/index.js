import { fork, all } from 'redux-saga/effects';
import { watchRegisterUser, watchLoginUser, watchSaveUser } from './auth';
import { watchGetSubjects } from './subjects';
import {
	lessonsGetWatch,
	lessonGetWatch,
	videoInfoGetWatch,
	lessonSaveWatch,
	lessonIncWatch,
	lessonRemoveWatch
} from './lessons';
import { booksGetWatch, bookGetWatch, bookSaveWatch } from './books';
import { calendarsGetWatch, calendarsGroupGetWatch, calendarGetWatch, calendarSaveWatch } from './calendar';
import { patternsGetWatch, patternSaveWatch, patternRemoveWatch } from './patterns';
import { schedulesGenerateWatch, schedulesGenerateCourseWatch, schedulesGetWatch, syllabusGetWatch } from './schedules';
import { coursesGetWatch, courseGetWatch, courseSaveWatch, courseRemoveWatch } from './courses';

export default function* rootSaga() {
	yield all([
		fork(watchRegisterUser),
		fork(watchSaveUser),
		fork(watchLoginUser),
		fork(coursesGetWatch),
		fork(courseGetWatch),
		fork(courseRemoveWatch),
		fork(courseSaveWatch),
		fork(schedulesGenerateWatch),
		fork(schedulesGenerateCourseWatch),
		fork(schedulesGetWatch),
		fork(syllabusGetWatch),
		fork(patternsGetWatch),
		fork(patternRemoveWatch),
		fork(patternSaveWatch),
		fork(calendarsGetWatch),
		fork(calendarsGroupGetWatch),
		fork(calendarGetWatch),
		fork(calendarSaveWatch),
		fork(booksGetWatch),
		fork(bookGetWatch),
		fork(bookSaveWatch),
		fork(lessonsGetWatch),
		fork(lessonGetWatch),
		fork(lessonSaveWatch),
		fork(lessonIncWatch),
		fork(lessonRemoveWatch),
		fork(videoInfoGetWatch),
		fork(watchGetSubjects)
	]);
}
