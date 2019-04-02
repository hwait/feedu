import { fork, all } from 'redux-saga/effects';
import { watchRegisterUser, watchLoginUser, watchSaveUser } from './auth';
import { watchGetSubjects } from './subjects';
import { lessonsGetWatch, lessonGetWatch, videoInfoGetWatch } from './lessons';
import { booksGetWatch, bookGetWatch, bookSaveWatch } from './books';

export default function* rootSaga() {
	yield all([
		fork(watchRegisterUser),
		fork(watchSaveUser),
		fork(watchLoginUser),
		fork(booksGetWatch),
		fork(bookGetWatch),
		fork(bookSaveWatch),
		fork(lessonsGetWatch),
		fork(lessonGetWatch),
		fork(videoInfoGetWatch),
		fork(watchGetSubjects)
	]);
}
