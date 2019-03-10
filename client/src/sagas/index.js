import { fork, all } from 'redux-saga/effects';
import { watchRegisterUser } from './auth';

export default function* rootSaga() {
	yield all([ fork(watchRegisterUser) ]);
}
