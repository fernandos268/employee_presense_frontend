import * as ActionTypes from '../constants/ActionTypes';

// GENERAL
export const receiveApiRequestFailure = () => ({
  type: ActionTypes.RECEIVE_API_REQUEST_FAILURE,
});

// USERS --------------------------------------

// FETCH ALL USERS

export const requestAllUsers = () => ({ type: ActionTypes.REQUEST_ALL_USERS });

export const receiveAllUsers = data => ({
  type: ActionTypes.RECEIVE_ALL_USERS,
  data,
});

// FETCH A SINGLE USER
export const requestUser = () => ({ type: ActionTypes.REQUEST_USER });

export const receiveUser = data => ({ type: ActionTypes.RECEIVE_USER, data });

// CREATE USER
export const requestCreateUser = data => ({
  type: ActionTypes.REQUEST_CREATE_USER,
  data,
});

export const receiveCreateUserResponse = data => ({
  type: ActionTypes.RECEIVE_CREATED_USER_RESPONSE,
  data,
});

export const receiveCreatedUserSuccess = () => ({
  type: ActionTypes.RECEIVE_CREATED_USER_SUCCESS,
});

// SIGNIN
export const requestSignin = data => ({
  type: ActionTypes.REQUEST_SIGNIN,
  data,
});
export const receiveSigninResponse = data => ({
  type: ActionTypes.RECEIVE_SIGNIN_RESPONSE,
  data,
});

export const receiveSigninSuccess = () => ({
  type: ActionTypes.RECEIVE_SIGNIN_SUCCESS,
});

// OVERTIME -------------------------------------

// DAYOFF ---------------------------------------
