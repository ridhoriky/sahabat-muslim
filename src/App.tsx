import Navbar from './components/Navbar';
import Select from './components/Select';
import { useEffect, useState } from 'react';
import {
  getListCity,
  getScheduleMonth,
  getScheduleToday,
} from './services/api';
import titleCase from './utils/capitalizeFirstLater';
import { useDate } from './utils/useDate';

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
type Item = {
  ashar: string;
  date: string;
  dhuha: string;
  dzuhur: string;
  imsak: string;
  isya: string;
  maghrib: string;
  subuh: string;
  tanggal: string;
  terbit: string;
};

function App() {
  const [listCity, setListCity] = useState([]);
  const [scheduleToday, setScheduleToday] = useState<scheduleToday | null>(
    null
  );
  const [schedule] = useState<Schedule>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [scheduleMonth, setScheduleMonth] = useState<any>(null);
  const [city, setCity] = useState('1501');

  const { dateNow, date, month, year, time } = useDate();

  const dateParm = `${year}-${month}-${date}`;

  useEffect(() => {
    getListCity().then((response) => setListCity(response.data));
  }, []);
  useEffect(() => {
    getScheduleMonth(city, schedule.year, schedule.month).then((response) =>
      setScheduleMonth(response.data)
    );
    getScheduleToday(city, dateParm).then((response) =>
      setScheduleToday(response.data)
    );
  }, [city]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className='px-[10%] mt-1 flex justify-between flex-wrap'>
        <div className='w-1/3 pr-5'>
          <h4 className='py-3 font-semibold text-md ml-4'>
            Jadwal Sholat Hari Ini
          </h4>

          <div className='flex items-center justify-start w-full pl-5'>
            <h3 className='mx-4 py-5'>Kota :</h3>
            <Select listCity={listCity} handleChange={handleChange} />
          </div>
          <div className='overflow-x-auto w-full '>
            <p className='text-center'>{time}</p>
            <p className='text-center'>{dateNow}</p>
            <p className='ml-4 text-center my-2'>
              {titleCase(scheduleToday?.lokasi)},{' '}
              {titleCase(scheduleToday?.daerah)}
            </p>

            <table className='table table-zebra'>
              <tbody>
                <tr>
                  <th>Subuh</th>
                  <td>{scheduleToday?.jadwal?.subuh}</td>
                </tr>
                <tr>
                  <th>Dzuhur</th>
                  <td>{scheduleToday?.jadwal?.dzuhur}</td>
                </tr>
                <tr>
                  <th>Ashar</th>
                  <td>{scheduleToday?.jadwal?.ashar}</td>
                </tr>
                <tr>
                  <th>Maghrib</th>
                  <td>{scheduleToday?.jadwal?.maghrib}</td>
                </tr>
                <tr>
                  <th>Isya</th>
                  <td>{scheduleToday?.jadwal?.isya}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='w-2/3'>
          <h2 className='text-center py-3 font-semibold text-md '>
            Jadwal Solat Untuk {titleCase(scheduleToday?.lokasi)},{' '}
            {titleCase(scheduleToday?.daerah)}
          </h2>

          <table className='table table-zebra table-xs'>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Imsak</th>
                <th>Subuh</th>
                <th>Terbit</th>
                <th>Dhuha</th>
                <th>Dzuhur</th>
                <th>Ashar</th>
                <th>Maghrib</th>
                <th>Isya</th>
              </tr>
            </thead>
            <tbody>
              {scheduleMonth?.jadwal?.map((item: Item) => (
                <tr key={item.date}>
                  <td>{item.tanggal}</td>
                  <td>{item.imsak}</td>
                  <td>{item.subuh}</td>
                  <td>{item.terbit}</td>
                  <td>{item.dhuha}</td>
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
  );
}

export default App;
