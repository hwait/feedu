import { fork, all } from 'redux-saga/effects';
import { watchRegisterUser, watchLoginUser, watchSaveUser } from './auth';
import { watchGetSubjects } from './subjects';
import { lessonsGetWatch, lessonGetWatch, videoInfoGetWatch } from './lessons';
import { booksGetWatch, booksSaveWatch } from './books';

export default function* rootSaga() {
	yield all([
		fork(watchRegisterUser),
		fork(watchSaveUser),
		fork(watchLoginUser),
		fork(booksGetWatch),
		fork(booksSaveWatch),
		fork(lessonsGetWatch),
		fork(lessonGetWatch),
		fork(videoInfoGetWatch),
		fork(watchGetSubjects)
	]);
}
