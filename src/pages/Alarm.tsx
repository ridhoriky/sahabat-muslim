import React, { useEffect, useRef, useState } from 'react';
import adzan from '../assets/audio/AZAN USTAZ FAHMI maqam nahawand kurdi.mp3';
import { getScheduleToday } from '../services/api';
import { useDate } from '../utils/useDate';
import { setAlarmTime } from '../store/actions/alarmActions';
import { useDispatch } from 'react-redux';

const Alarm: React.FC = () => {
  const [scheduleToday, setScheduleToday] = useState<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAlarmVisible, setIsAlarmVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const dispatch = useDispatch();
  const { date, month, year, timeWithoutSeconds } = useDate();
  const dateParm = `${year}-${month}-${date}`;

  useEffect(() => {
    const fetchScheduleToday = async () => {
      const todayScheduleResponse = await getScheduleToday('1501', dateParm);
      setScheduleToday(todayScheduleResponse.data);
    };

    fetchScheduleToday();
  }, [dateParm]);

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
      }
    }
  }, [timeWithoutSeconds, scheduleToday, dispatch]);

  const handleAudioEnded = () => {
    setIsPlaying(false);
    handleAlarmDismiss();
  };

  const handlePlayClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error('Playback failed:', error);
      });
      setIsPlaying(true);
    }
  };

  const handleAlarmDismiss = () => {
    setIsAlarmVisible(false);
    setIsPlaying(false);
    dispatch(setAlarmTime(''));
  };

  return (
    <>
      {isAlarmVisible && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <h2 className='text-2xl font-bold mb-4'>
              Waktu Sholat Telah Tiba!
            </h2>
            <button
              className='px-4 py-2 bg-amber-700 text-white rounded-lg mr-4'
              onClick={handlePlayClick}
              disabled={isPlaying}
            >
              Putar Suara Adzan
            </button>
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
      )}
    </>
  );
};

export default Alarm;
