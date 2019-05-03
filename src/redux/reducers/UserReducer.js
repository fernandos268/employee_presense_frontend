import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  users: [],
  user: {},
  ok: false,
  errors: [],
  isLoading: false,
  token: '',
};

export default (state = initialState, { type, data }) => {
  switch (type) {
    // FETCH ALL USERS------------------------------------
    case ActionTypes.RECEIVE_ALL_USERS:
      return { ...state, users: data };
    // CREATE USER ---------------------------------------
    case ActionTypes.REQUEST_CREATE_USER:
      return { ...state, isLoading: true };
    case ActionTypes.RECEIVE_CREATED_USER_RESPONSE:
      return { ...state, ...data, isLoading: false };
    case ActionTypes.RECEIVE_CREATED_USER_SUCCESS:
      return state;
    //  SIGNIN--------------------------------------------
    case ActionTypes.REQUEST_SIGNIN:
      return { ...state, isLoading: true };
    case ActionTypes.RECEIVE_SIGNIN_RESPONSE:
      return { ...state, ...data, isLoading: false };
    case ActionTypes.RESET_SIGNIN_ERRORS:
      return { ...state, errors: [] };
    // REQUEST ERROR--------------------------------------
    case ActionTypes.RECEIVE_API_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: ['Something is wrong with the API request!'],
      };
    default:
      return state;
  }
};
