import { SET_ALARM_TIME, UPDATE_SETTING } from '../actions/alarmActions';

type AlarmState = {
  alarmTime: string;
  updateAlarm: boolean;
};
const alarmState = {
  alarmTime: '',
  updateAlarm: true,
};

type Action = { type: string; payload: number };

const alarmReducer = (state: AlarmState = alarmState, action: Action) => {
  switch (action.type) {
    case SET_ALARM_TIME:
      return {
        ...state,
        alarmTime: action.payload,
      };
    case UPDATE_SETTING:
      return {
        ...state,
        updateAlarm: !action.payload,
      };
    default:
      return state;
  }
};

export default alarmReducer;
