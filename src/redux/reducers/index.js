import { combineReducers } from 'redux';

import UsersReducer from './UserReducer';
import DayoffReducer from './DayoffReducer';
import OvertimeReducer from './OvertimeReducer';

export default combineReducers({
  UsersReducer,
  DayoffReducer,
  OvertimeReducer,
});
