import {
  ADD_DAYOFF,
  UPDATE_DAYOFF,
  DELETE_DAYOFF,
  GET_DAYOFFS,
} from '../constants/ActionTypes';

const initialState = {
  dayoffs: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DAYOFF:
      return { ...state, dayoffs: [...state.dayoffs, action.payload] };
    default:
      return state;
  }
};
