import { combineReducers } from 'redux';
import alarmReducer from './alarmReducers';

const rootReducer = combineReducers({
  alarm: alarmReducer,
});

export default rootReducer;
