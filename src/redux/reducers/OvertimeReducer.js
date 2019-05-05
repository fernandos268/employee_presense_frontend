import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  createdOvertimes: [],
  assignedOvertimes: [],
  ok: false,
  errors: [],
  isLoading: false,
  operationLoading: false,
  operation: ""
};
export default (state = initialState, { type, data }) => {

  switch (type) {
    // FETCH CURRENT USER'S OVERTIME
    case ActionTypes.REQUEST_CURRENT_USER_OVERTIMES:
      return { ...state, isLoading: true };
    case ActionTypes.RECEIVE_CURRENT_USER_OVERTIMES:
      return { ...state, ...data, isLoading: false };
    // CREATE OVERTIME ---------------------------------------
    case ActionTypes.REQUEST_CREATE_OVERTIME:
      return { ...state, operationLoading: true };
    case ActionTypes.RECEIVE_CREATED_OVERTIME_RESPONSE:
      return { ...state, ...data, createdOvertimes: [...state.createdOvertimes, data.overtime], operationLoading: false, operation: "ADDED" };
    case ActionTypes.RECEIVE_CREATED_OVERTIME_SUCCESS:
      return { ...state, ok: false, isLoading: false, operationLoading: false };
    // DELETE OVERTIME ---------------------------------------
    case ActionTypes.REQUEST_DELETE_OVERTIME:
      return { ...state, operationLoading: true };
    case ActionTypes.RECEIVE_DELETED_OVERTIME_RESPONSE:
      const newcreatedOvertimes = state.createdOvertimes.map(overtime => {
        if (overtime._id !== data._id) {
          return overtime;
        }
      }).filter(overtime => overtime);
      return {
        ...state, ...data, createdOvertimes: [...newcreatedOvertimes], operationLoading: false, operation: "DELETED"
      };
    case ActionTypes.RECEIVE_DELETED_OVERTIME_SUCCESS:
      return { ...state, ok: false, isLoading: false, operationLoading: false };
    // UPDATE OVERTIME ---------------------------------------
    case ActionTypes.REQUEST_UPDATE_OVERTIME:
      return { ...state, operationLoading: true };
    case ActionTypes.RECEIVE_UPDATED_OVERTIME_RESPONSE:
      const newAssignedOvertimes = state.assignedOvertimes.map(overtime => {
        if (overtime._id === data.overtime._id) {
          return data.overtime;
        }
        return overtime;
      }).filter(overtime => overtime);
      return { ...state, ...data, assignedOvertimes: [...newAssignedOvertimes], operationLoading: false, operation: data.overtime.status.toUpperCase() };
    case ActionTypes.RECEIVE_UPDATED_OVERTIME_SUCCESS:
      return { ...state, ok: false, isLoading: false, operationLoading: false };
    default:
      return state;
  }
};
