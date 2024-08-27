export const SET_ALARM_TIME = 'SET_ALARM_TIME';
export const SET_SUARA_ADZAN = 'SET_SUARA_ADZAN';

export const setAlarmTime = (time: string) => ({
  type: SET_ALARM_TIME,
  payload: time,
});
export const setSuaraAdzan = (time: string) => ({
  type: SET_SUARA_ADZAN,
  payload: time,
});
