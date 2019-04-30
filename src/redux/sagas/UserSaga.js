import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { receiveAllUsers } from '../actions';

import { REQUEST_ALL_USERS } from '../constants/ActionTypes';

import { fetchUsers } from '../../apiRequests';

function* getUsersFromAPI() {
  try {
    const data = yield call(fetchUsers);
    yield put(receiveAllUsers(data));
  } catch (e) {
    console.log(e);
  }
}

export function* UsersSaga() {
  yield takeLatest(REQUEST_ALL_USERS, getUsersFromAPI);
}
