import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// ACTION TYPES
import * as ActionTypes from '../constants/ActionTypes';

// ACTIONS
import {
  receiveAllUsers,
  receiveCreateUserResponse,
  receiveApiRequestFailure,
  receiveCurrentUserData,
  receiveSigninResponse,
} from '../actions';

// API REQUESTS
import {
  fetchUsers,
  signupMutation,
  signinMutation,
  fetchCurrentUserData,
} from '../../apiRequests';

// GET ALL USERS
function* GetUsers() {
  try {
    const response = yield call(fetchUsers);
    if (!response) {
      return yield put(
        receiveAllUsers({
          errors: ['Something is wrong with the API request!'],
        })
      );
    }
    yield put(receiveAllUsers(response));
  } catch (e) {
    yield put(receiveApiRequestFailure());
    throw e;
  }
}

// CREATE USER
function* CreateUser(user) {
  try {
    const response = yield call(signupMutation, user.data);
    if (!response) {
      return yield put(receiveApiRequestFailure());
    }
    yield put(receiveCreateUserResponse(response));
  } catch (e) {
    yield put(receiveApiRequestFailure());
    throw e;
  }
}

// SIGNIN
function* Signin(user) {
  try {
    const response = yield call(signinMutation, user.data);
    if (!response) {
      return yield put(receiveApiRequestFailure());
    }
    yield put(receiveSigninResponse(response));
  } catch (e) {
    yield put(receiveApiRequestFailure());
    throw e;
  }
}

// GET CURRENT USER OVERTIME & DAYOFF
function* GetCurrentUserData(userId) {
  try {
    const response = yield call(fetchCurrentUserData, userId.data);
    if (!response) {
      return yield put(receiveApiRequestFailure());
    }
    yield put(receiveCurrentUserData(response));
  } catch (e) {
    yield put(receiveApiRequestFailure());
    throw e;
  }
}

export function* UsersSagaWatcher() {
  yield takeLatest(ActionTypes.REQUEST_ALL_USERS, GetUsers);
  yield takeEvery(ActionTypes.REQUEST_CREATE_USER, CreateUser);
  yield takeEvery(ActionTypes.REQUEST_SIGNIN, Signin);
  yield takeLatest(ActionTypes.REQUEST_CURRENT_USER_DATA, GetCurrentUserData);
}
