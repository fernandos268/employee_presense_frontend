import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// ACTION TYPES
import * as ActionTypes from '../constants/ActionTypes';

// ACTIONS
import {
  receiveCurrentUserOvertimes,
  receiveCreateOvertimeResponse,
  receiveDeleteOvertimeResponse,
  receiveUpdateOvertimeResponse,
  receiveApiRequestFailure
} from '../actions';

// API REQUESTS
import {
  fetchCurrentUserOvertimes,
  createOvertimeMutation,
  deleteOvertimeMutation,
  updateOvertimeMutation
} from '../../apiRequests';

// GET ALL OVERTIMES BELONG TO THE CURRENT USER
function* getCurrentUserOvertimes(user) {
  try {
    const data = yield call(fetchCurrentUserOvertimes, user.data);
    yield put(receiveCurrentUserOvertimes(data.user));
  } catch (e) {
    throw e;
  }
}

// CREATE OVERTIME
function* CreateOvertime(overtime) {
  try {
    const response = yield call(createOvertimeMutation, overtime.data);
    if (!response) {
      return yield put(receiveApiRequestFailure());
    }
    yield put(receiveCreateOvertimeResponse(response));
  } catch (e) {
    yield put(receiveApiRequestFailure());
    throw e;
  }
}

// DELETE OVERTIME
function* DeleteOvertime(overtimeId) {
  try {
    const response = yield call(deleteOvertimeMutation, overtimeId.data);
    if (!response) {
      return yield put(receiveApiRequestFailure());
    }
    yield put(receiveDeleteOvertimeResponse(response));
  } catch (e) {
    yield put(receiveApiRequestFailure());
    throw e;
  }
}


// UPDATE OVERTIME
function* UpdateOvertime(overtime) {
  try {
    const response = yield call(updateOvertimeMutation, overtime.data);
    if (!response) {
      return yield put(receiveApiRequestFailure());
    }
    yield put(receiveUpdateOvertimeResponse(response));
  } catch (e) {
    yield put(receiveApiRequestFailure());
    throw e;
  }
}


export function* OvertimeSagaWatcher() {
  yield takeLatest(
    ActionTypes.REQUEST_CURRENT_USER_OVERTIMES,
    getCurrentUserOvertimes
  );
  yield takeLatest(
    ActionTypes.REQUEST_CREATE_OVERTIME,
    CreateOvertime
  );

  yield takeLatest(
    ActionTypes.REQUEST_DELETE_OVERTIME,
    DeleteOvertime
  );

  yield takeLatest(
    ActionTypes.REQUEST_UPDATE_OVERTIME,
    UpdateOvertime
  );
}
