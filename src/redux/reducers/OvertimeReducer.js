import {
  ADD_OVERTIME,
  UPDATE_OVERTIME,
  DELETE_OVERTIME,
  GET_OVERTIMES,
} from '../constants/ActionTypes';

const initialState = {
  overtimes: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_OVERTIME:
      return { ...state, overtimes: [...state.overtimes, action.payload] };
    default:
      return state;
  }
};
