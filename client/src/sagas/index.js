import { fork, all } from 'redux-saga/effects';
import { watchRegisterUser, watchLoginUser, watchSaveUser } from './auth';
import { watchGetSubjects } from './subjects';

export default function* rootSaga() {
	yield all([ fork(watchRegisterUser), fork(watchSaveUser), fork(watchLoginUser), fork(watchGetSubjects) ]);
}
