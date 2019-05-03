import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  overtimes: [],
  ok: false,
  errors: [],
  isLoading: false,
};
export default (state = initialState, { type, data }) => {
  switch (type) {
    // FETCH CURRENT USER'S OVERTIME
    case ActionTypes.RECEIVE_CURRENT_USER_OVERTIMES:
      return { ...state, overtimes: data };

    default:
      return state;
  }
};
