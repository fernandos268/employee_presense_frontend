import { combineReducers } from 'redux';

import UsersReducer from './UserReducer';
import DayoffRedycer from './DayoffReducer';
import OvertimeReducer from './OvertimeReducer';

export default combineReducers({
  UsersReducer,
  DayoffRedycer,
  OvertimeReducer,
});
