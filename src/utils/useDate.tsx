import { useEffect, useState } from 'react';

export const useDate = () => {
  const [today, setToday] = useState(new Date());
  const locale = 'id';

  useEffect(() => {
    setInterval(() => setToday(new Date()), 1000);
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: 'long' });
  const dateNow = `${day}, ${today.getDate()} ${today.toLocaleDateString(
    locale,
    {
      month: 'long',
    }
  )}\n\n`;

  let date = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let formatHours = hours < 10 ? `0${hours}` : hours;
  let fromatMinutes = minutes < 10 ? `0${minutes}` : minutes;
  let fromatSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const time = `${formatHours}:${fromatMinutes}:${fromatSeconds}`;

  return {
    date,
    dateNow,
    month,
    year,
    time,
  };
};
