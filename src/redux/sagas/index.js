import { all, fork } from 'redux-saga/effects';

import { UsersSagaWatcher } from './UserSaga';
import {OvertimeSagaWatcher} from './OvertimeSaga'


export default function* rootSaga() {
  yield all([
    fork(UsersSagaWatcher),
    fork(OvertimeSagaWatcher)
    ]);
}

