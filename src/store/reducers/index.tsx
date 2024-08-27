import { combineReducers } from 'redux';
import alarmReducer from './alarmReducers';
import authReducers from './authReducers';

const rootReducer = combineReducers({
  alarm: alarmReducer,
  auth: authReducers,
});

export default rootReducer;
