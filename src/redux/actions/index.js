import * as ActionTypes from '../constants/ActionTypes';

// GENERAL
export const receiveApiRequestFailure = () => ({
  type: ActionTypes.RECEIVE_API_REQUEST_FAILURE,
});

// USERS -------------------------------------------------------------

// FETCH ALL USERS
export const requestAllUsers = () => ({ type: ActionTypes.REQUEST_ALL_USERS });
export const receiveAllUsers = data => ({
  type: ActionTypes.RECEIVE_ALL_USERS,
  data,
});

// FETCH A SINGLE USER
export const requestUser = () => ({ type: ActionTypes.REQUEST_USER });
export const receiveUser = data => ({ type: ActionTypes.RECEIVE_USER, data });

// FETCH CURRENT USER'S OVERTIME & DAYOFF
export const requestCurrentUserData = data => ({
  type: ActionTypes.REQUEST_CURRENT_USER_DATA,
  data,
});
export const receiveCurrentUserData = data => ({
  type: ActionTypes.RECEIVE_CURRENT_USER_DATA,
  data,
});

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
export const resetSigninErrors = () => ({
  type: ActionTypes.RESET_SIGNIN_ERRORS,
});

// OVERTIME -------------------------------------------------------------
// FETCH OVERTIMES THAT BELONG TO THE CURRENT USER
export const requestCurrentUserOvertimes = data => ({
  type: ActionTypes.REQUEST_CURRENT_USER_OVERTIMES,
  data,
});

export const receiveCurrentUserOvertimes = data => ({
  type: ActionTypes.RECEIVE_CURRENT_USER_OVERTIMES,
  data,
});

// CREATE OVERTIME
export const requestCreateOvertime = data => ({
  type: ActionTypes.REQUEST_CREATE_OVERTIME,
  data,
});
export const receiveCreateOvertimeResponse = data => ({
  type: ActionTypes.RECEIVE_CREATED_OVERTIME_RESPONSE,
  data,
});
export const receiveCreatedOvertimeSuccess = () => ({
  type: ActionTypes.RECEIVE_CREATED_OVERTIME_SUCCESS,
});

// DELETE OVERTIME
export const requestDeleteOvertime = data => ({
  type: ActionTypes.REQUEST_DELETE_OVERTIME,
  data,
});
export const receiveDeleteOvertimeResponse = data => ({
  type: ActionTypes.RECEIVE_DELETED_OVERTIME_RESPONSE,
  data,
});
export const receiveDeleteOvertimeSuccess = () => ({
  type: ActionTypes.RECEIVE_DELETED_OVERTIME_SUCCESS,
});
// UPDATE OVERTIME
export const requestUpdateOvertime = data => ({
  type: ActionTypes.REQUEST_UPDATE_OVERTIME,
  data,
});
export const receiveUpdateOvertimeResponse = data => ({
  type: ActionTypes.RECEIVE_UPDATED_OVERTIME_RESPONSE,
  data,
});
export const receiveUpdateOvertimeSuccess = () => ({
  type: ActionTypes.RECEIVE_UPDATED_OVERTIME_SUCCESS,
});

// DAYOFF -------------------------------------------------------------
