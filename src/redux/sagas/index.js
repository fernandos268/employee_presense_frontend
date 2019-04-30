import { all, fork } from 'redux-saga/effects';

import { UsersSaga } from './UserSaga';
export default function* rootSaga() {
  yield all([fork(UsersSaga)]);
}
