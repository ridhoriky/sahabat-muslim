import { useCallback, useEffect, useState } from 'react';
import { useDate } from '../utils/useDate';
import {
  getListCity,
  getScheduleMonth,
  getScheduleToday,
} from '../services/api';
import titleCase from '../utils/capitalizeFirstLater';
import SelectCity from '../components/SelectCity';
interface ScheduleToday {
  id: number;
  lokasi: string;
  daerah: string;
  jadwal: Jadwal;
}

interface Jadwal {
  tanggal: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  date: string;
}

type Schedule = {
  month: number | undefined;
  year: number | undefined;
};
type ScheduleMonth = {
  jadwal: Jadwal[];
};

function Jadwal() {
  const [listCity, setListCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [scheduleToday, setScheduleToday] = useState<ScheduleToday | null>(
    null
  );
  const [schedule] = useState<Schedule>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [scheduleMonth, setScheduleMonth] = useState<ScheduleMonth | null>(
    null
  );

  const { dateNow, date, month, year, time } = useDate();

  const dateParm = `${year}-${month}-${date}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesResponse = await getListCity();
        setListCity(citiesResponse.data);
        setSelectedCity(citiesResponse.data[89].id);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const monthScheduleResponse = await getScheduleMonth(
          selectedCity,
          schedule.year,
          schedule.month
        );
        setScheduleMonth(monthScheduleResponse.data);

        const todayScheduleResponse = await getScheduleToday(
          selectedCity,
          dateParm
        );
        setScheduleToday(todayScheduleResponse.data);
      } catch (error) {
        console.error('Failed to fetch schedules:', error);
      }
    };

    fetchSchedules();
  }, [selectedCity, schedule.month, schedule.year, dateParm]);

  const handleChangeCity = useCallback((value: string) => {
    setSelectedCity(value);
  }, []);

  return (
    <div>
      <div className='px-[10%]  flex justify-between flex-wrap bg-lightBrown'>
        <div className='flex items-center justify-center flex-col w-full '>
          <h3 className='mx-4 pt-5 pb-2 font-bold text-2xl text-darkBrown text-end'>
            Kota
          </h3>

          <SelectCity
            city={selectedCity}
            listCity={listCity}
            handleChangeCity={handleChangeCity}
          />
        </div>
        <div className='w-full md:px-[25%]'>
          <h4 className='py-3 text-center text-3xl text-darkBrown font-extrabold'>
            Jadwal Sholat Hari Ini
          </h4>

          <div className='overflow-x-auto w-full '>
            <p className='text-center font-bold'>{dateNow}</p>
            <p className='text-center font-extrabold text-xl'>{time}</p>
            <p className='ml-4 text-center my-2 font-bold'>
              {titleCase(scheduleToday?.lokasi)},{' '}
              {titleCase(scheduleToday?.daerah)}
            </p>

            <table className='table bg-amber-200 table-sm'>
              <tbody>
                <tr>
                  <th>Subuh</th>
                  <td className='font-bold'>{scheduleToday?.jadwal?.subuh}</td>
                </tr>
                <tr>
                  <th>Dzuhur</th>
                  <td className='font-bold'>{scheduleToday?.jadwal?.dzuhur}</td>
                </tr>
                <tr>
                  <th>Ashar</th>
                  <td className='font-bold'>{scheduleToday?.jadwal?.ashar}</td>
                </tr>
                <tr>
                  <th>Maghrib</th>
                  <td className='font-bold'>
                    {scheduleToday?.jadwal?.maghrib}
                  </td>
                </tr>
                <tr>
                  <th>Isya</th>
                  <td className='font-bold'>{scheduleToday?.jadwal?.isya}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='w-full flex flex-col justify-center items-center'>
          <h2 className='text-center py-5 mt-2  font-bold text-md '>
            Jadwal Sholat untuk Daerah {titleCase(scheduleToday?.lokasi)},{' '}
            {titleCase(scheduleToday?.daerah)}
          </h2>
          <div className='overflow-x-auto'>
            <table className='table table-sm text-center bg-amber-300 font-semibold mb-5'>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Imsak</th>
                  <th>Subuh</th>
                  <th>Dzuhur</th>
                  <th>Ashar</th>
                  <th>Maghrib</th>
                  <th>Isya</th>
                </tr>
              </thead>
              <tbody>
                {scheduleMonth?.jadwal.map((item: Jadwal) => (
                  <tr key={item.tanggal}>
                    <th className='text-start'>{item.tanggal}</th>
                    <td>{item.imsak}</td>
                    <td>{item.subuh}</td>
                    <td>{item.dzuhur}</td>
                    <td>{item.ashar}</td>
                    <td>{item.maghrib}</td>
                    <td>{item.isya}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jadwal;
