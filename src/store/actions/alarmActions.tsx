export const SET_ALARM_TIME = 'SET_ALARM_TIME';

export const setAlarmTime = (time: string) => ({
  type: SET_ALARM_TIME,
  payload: time,
});
