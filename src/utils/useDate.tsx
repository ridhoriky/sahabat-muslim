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
  let hours = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
  let minutes =
    today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
  let seconds =
    today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();

  const time = `${hours}:${minutes}:${seconds}`;
  const timeWithoutSeconds = `${hours}:${minutes}`;

  return {
    date,
    dateNow,
    month,
    year,
    time,
    timeWithoutSeconds,
  };
};
