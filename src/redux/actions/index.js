// import { REQUEST_ALL_USERS, RECEIVE_ALL_USERS } from '../constants/ActionTypes';

export const REQUEST_ALL_USERS = 'REQUEST_ALL_USERS';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';

export const REQUEST_CREATE_USER = 'REQUEST_CREATE_USER';
export const CREATE_USER_SUCCEED = 'CREATE_USER_SUCCEED';
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';

export const requestAllUsers = () => ({ type: REQUEST_ALL_USERS });
export const receiveAllUsers = data => ({ type: RECEIVE_ALL_USERS, data });
