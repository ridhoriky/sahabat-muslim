export const SET_ALARM_TIME = 'SET_ALARM_TIME';
export const UPDATE_SETTING = 'UPDATE_SETTING';

export const setAlarmTime = (time: string | undefined) => ({
  type: SET_ALARM_TIME,
  payload: time,
});
export const updateSetting = (status: boolean | undefined) => ({
  type: UPDATE_SETTING,
  payload: status,
});
