import { all, fork } from 'redux-saga/effects';

import { rootUsersSaga } from './UserSaga';
export default function* rootSaga() {
  yield all([fork(rootUsersSaga)]);
}
