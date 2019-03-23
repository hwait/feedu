import { fork, all } from 'redux-saga/effects';
import { watchRegisterUser, watchLoginUser } from './auth';
import { watchGetSubjects } from './subjects';

export default function* rootSaga() {
	yield all([ fork(watchRegisterUser), fork(watchLoginUser), fork(watchGetSubjects) ]);
}
