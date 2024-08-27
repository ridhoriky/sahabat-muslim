import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDate } from '../utils/useDate';
import {
  getListCity,
  getScheduleMonth,
  getScheduleToday,
} from '../services/api';
import titleCase from '../utils/capitalizeFirstLater';
import SelectComp from '../components/SelectComp';
import TableSchedule from '../components/TableSchedule';
import { setAlarmTime } from '../store/actions/alarmActions';

type scheduleToday = {
  id: number;
  lokasi: string;
  daerah: string;
  jadwal: {
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
  };
};

type Schedule = {
  month: number | undefined;
  year: number | undefined;
};

function Jadwal() {
  const [listCity, setListCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [scheduleToday, setScheduleToday] = useState<scheduleToday | null>(
    null
  );
  const [schedule] = useState<Schedule>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [scheduleMonth, setScheduleMonth] = useState<any>(null);

  const { dateNow, date, month, year, time, timeWithoutSeconds } = useDate();
  const dispatch = useDispatch();
  const alarmTime = useSelector((state: any) => state.alarm.alarmTime);

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCity(e.target.value);
    },
    []
  );

  const memoizedScheduleMonth = useMemo(
    () => scheduleMonth?.jadwal,
    [scheduleMonth]
  );

  useEffect(() => {
    const arraySchedule = [
      scheduleToday?.jadwal?.subuh,
      scheduleToday?.jadwal?.dzuhur,
      scheduleToday?.jadwal?.ashar,
      scheduleToday?.jadwal?.maghrib,
      scheduleToday?.jadwal?.isya,
    ];
    for (let index = 0; index < arraySchedule.length; index++) {
      if (arraySchedule[index] === timeWithoutSeconds) {
        dispatch(setAlarmTime((arraySchedule[index] = '')));
        console.log('alarm');
      }
    }
  }, [timeWithoutSeconds, dispatch, scheduleToday]);

  return (
    <div>
      <div className='px-[10%]  pt-5 flex justify-between flex-wrap bg-lightBrown'>
        <div className='flex items-center justify-center w-full '>
          <h3 className='mx-4 py-5 w-1/6 md:w-2/12 font-bold text-2xl text-darkBrown text-end'>
            Kota :
          </h3>
          <SelectComp
            city={selectedCity}
            listCity={listCity}
            handleChange={handleChange}
          />
        </div>
        <div className='w-full md:px-[30%]'>
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
        <div className='w-full'>
          <h2 className='text-center py-3 font-semibold text-md '>
            Jadwal Solat untuk Daerah {titleCase(scheduleToday?.lokasi)},{' '}
            {titleCase(scheduleToday?.daerah)}
          </h2>
          <TableSchedule data={memoizedScheduleMonth} id='tanggal' />
        </div>
      </div>

      <audio
        src='/audio/adzan.mp3'
        preload='auto'
        autoPlay={alarmTime !== ''}
      />
    </div>
  );
}

export default Jadwal;
