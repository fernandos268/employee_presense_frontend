import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// ACTION TYPES
import * as ActionTypes from '../constants/ActionTypes';

// ACTIONS
import {
  receiveAllUsers,
  receiveCreateUserResponse,
  receiveApiRequestFailure,
  receiveSigninResponse,
} from '../actions';

// API REQUESTS
import { fetchUsers, signupMutation, signinMutation } from '../../apiRequests';

// GET ALL USERS
function* GetUsers() {
  try {
    const data = yield call(fetchUsers);
    yield put(receiveAllUsers(data));
  } catch (e) {
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

export function* rootUsersSaga() {
  yield takeLatest(ActionTypes.REQUEST_ALL_USERS, GetUsers);
  yield takeLatest(ActionTypes.REQUEST_CREATE_USER, CreateUser);
  yield takeLatest(ActionTypes.REQUEST_SIGNIN, Signin);
}
