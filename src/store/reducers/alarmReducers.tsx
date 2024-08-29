import { SET_ALARM_TIME } from '../actions/alarmActions';

type AlarmState = {
  alarmTime: string;
};
const alarmState = {
  alarmTime: '',
};

type Action = { type: string; payload: number };

const alarmReducer = (state: AlarmState = alarmState, action: Action) => {
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
