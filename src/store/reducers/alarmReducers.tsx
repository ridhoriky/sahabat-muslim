import { SET_ALARM_TIME } from '../actions/alarmActions';

const initialState = {
  alarmTime: '',
};

const alarmReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ALARM_TIME:
      return {
        ...state,
        alarmTime: action.payload,
      };
    default:
      return state;
  }
};

export default alarmReducer;
