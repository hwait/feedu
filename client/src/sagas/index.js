import { fork, all } from 'redux-saga/effects';
import { watchRegisterUser, watchLoginUser, watchSaveUser } from './auth';
import { watchGetSubjects } from './subjects';
import { lessonsGetWatch, lessonGetWatch, videoInfoGetWatch, lessonSaveWatch } from './lessons';
import { booksGetWatch, bookGetWatch, bookSaveWatch } from './books';
import { calendarsGetWatch, calendarGetWatch, calendarSaveWatch } from './calendar';

export default function* rootSaga() {
	yield all([
		fork(watchRegisterUser),
		fork(watchSaveUser),
		fork(watchLoginUser),
		fork(calendarsGetWatch),
		fork(calendarGetWatch),
		fork(calendarSaveWatch),
		fork(booksGetWatch),
		fork(bookGetWatch),
		fork(bookSaveWatch),
		fork(lessonsGetWatch),
		fork(lessonGetWatch),
		fork(lessonSaveWatch),
		fork(videoInfoGetWatch),
		fork(watchGetSubjects)
	]);
}
