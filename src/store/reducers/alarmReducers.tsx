import { SET_ALARM_TIME, SET_SUARA_ADZAN } from '../actions/alarmActions';

const initialState = {
  alarmTime: '',
  selectedAdzan: '',
};

const alarmReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ALARM_TIME:
      return {
        ...state,
        alarmTime: action.payload,
      };
    case SET_SUARA_ADZAN:
      return {
        ...state,
        selectedAdzan: action.payload,
      };
    default:
      return state;
  }
};

export default alarmReducer;
