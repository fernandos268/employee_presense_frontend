import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// ACTION TYPES
import * as ActionTypes from '../constants/ActionTypes';

// ACTIONS
import { requestCurrentUserOvertimes } from '../actions';

// API REQUESTS
import { fetchCurrentUserOvertimes } from '../../apiRequests';

// GET ALL OVERTIMES BELONG TO THE CURRENT USER
function* getCurrentUserOvertimes(userId) {
  try {
    const data = yield call(fetchCurrentUserOvertimes, userId);
    yield put(receiveCurrentUserOvertimes(data));
  } catch (e) {
    throw e;
  }
}

export function* rootOvertimeSaga() {
  yield takeLatest(
    ActionTypes.REQUEST_CURRENT_USER_OVERTIMES,
    getCurrentUserOvertimes
  );
}
