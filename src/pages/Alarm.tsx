import React, { useEffect, useRef, useState } from 'react';
import adzan from '../assets/audio/AZAN USTAZ FAHMI maqam nahawand kurdi.mp3';
import { getScheduleToday } from '../services/api';
import { useDate } from '../utils/useDate';
import { setAlarmTime } from '../store/actions/alarmActions';
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const Alarm: React.FC = () => {
  const [scheduleToday, setScheduleToday] = useState<any | null>(null);
  const [isAlarmVisible, setIsAlarmVisible] = useState(false);
  const [setting, setSetting] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonPlay = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const { date, month, year, timeWithoutSeconds } = useDate();
  const dateParm = `${year}-${month}-${date}`;

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, 'Users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const settingAlarm = docSnap.data().saveSetting;
          setSetting(settingAlarm);
        } else {
          console.log('User is not logged in');
        }
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchScheduleToday = async () => {
      const todayScheduleResponse = await getScheduleToday(
        setting?.kota,
        dateParm
      );
      setScheduleToday(todayScheduleResponse.data);
    };
    fetchScheduleToday();
  }, [dateParm, setting]);

  useEffect(() => {
    if (scheduleToday) {
      const arraySchedule = [
        scheduleToday?.jadwal?.subuh,
        scheduleToday?.jadwal?.dzuhur,
        scheduleToday?.jadwal?.ashar,
        scheduleToday?.jadwal?.maghrib,
        scheduleToday?.jadwal?.isya,
      ];

      if (arraySchedule.includes(timeWithoutSeconds)) {
        dispatch(setAlarmTime(timeWithoutSeconds));
        setIsAlarmVisible(true);
        buttonPlay?.current?.click();
      }
    }
  }, [timeWithoutSeconds, scheduleToday, dispatch]);

  const handleAudioEnded = () => {
    handleAlarmDismiss();
  };

  const handlePlayClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error('Playback failed:', error);
      });
    }
  };

  const handleAlarmDismiss = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsAlarmVisible(false);
    dispatch(setAlarmTime(''));
  };

  return (
    <div
      className={`${
        setting?.alarmStatus && isAlarmVisible
          ? 'fixed z-50 '
          : 'absolute invisible -z-50 '
      } top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center `}
    >
      <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
        <h2 className='text-2xl font-bold mb-4'>Waktu Sholat Telah Tiba!</h2>
        <button
          ref={buttonPlay}
          className='px-4 py-2 bg-amber-700 text-white rounded-lg mr-4 hidden'
          onClick={handlePlayClick}
        ></button>
        <button
          className='px-4 py-2 bg-red-700 text-white rounded-lg'
          onClick={handleAlarmDismiss}
        >
          Matikan Alarm
        </button>
      </div>
      <audio
        ref={audioRef}
        src={adzan}
        onEnded={handleAudioEnded}
        preload='auto'
      />
    </div>
  );
};

export default Alarm;
