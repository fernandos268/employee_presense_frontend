import {
  ADD_USER,
  UPDATE_USER,
  REQUEST_ALL_USERS,
  RECEIVE_ALL_USERS,
  REQUEST_USER,
  RECEIVE_USER,
} from '../constants/ActionTypes';

const initialState = {
  users: [],
  user: {},
};

export default (state = initialState, { type, data }) => {
  switch (type) {
    case RECEIVE_ALL_USERS:
      return { ...state, users: data };
    default:
      return state;
  }
};
