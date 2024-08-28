import React, { useEffect, useRef } from 'react';
import adzan from '../assets/audio/AZAN USTAZ FAHMI maqam nahawand kurdi.mp3';

interface AlarmProps {
  alarmTime: string;
  onDismiss: () => void;
}

const Alarm: React.FC<AlarmProps> = ({ alarmTime, onDismiss }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (alarmTime && audioRef.current) {
      audioRef.current.play();
    }
  }, [alarmTime]);

  const handleAudioEnded = () => {
    onDismiss();
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        alarmTime ? 'block' : 'hidden'
      }`}>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Waktu Sholat Telah Tiba!</h2>
        <button
          className="px-4 py-2 bg-amber-700 text-white rounded-lg"
          onClick={onDismiss}>
          Matikan Alarm
        </button>
      </div>
      <audio
        ref={audioRef}
        src={adzan}
        onEnded={handleAudioEnded}
        preload="auto"
      />
    </div>
  );
};

export default Alarm;
