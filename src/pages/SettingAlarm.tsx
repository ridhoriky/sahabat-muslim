import React, { useCallback, useEffect, useState } from 'react';
import { getListCity } from '../services/api';
import SelectComp from '../components/SelectComp';
import adzan1 from '../assets/audio/AZAN USTAZ FAHMI maqam nahawand kurdi.mp3';
import adzan2 from '../assets/audio/Adzan - Muhammad Thaha Al-Junayd.mp3';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const SettingAlarm = () => {
  const [listCity, setListCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [saveSetting, setSaveSetting] = useState({
    alarmStatus: false,
    kota: '1503',
    adzan: adzan1,
  });

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCity(e.target.value);
    },
    []
  );
  const { user } = useSelector((state: any) => state.auth);

  const userDocRef = doc(db, 'Users', user);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      await updateDoc(userDocRef, {
        saveSetting,
      });
      alert('Berhasil menyimpan pengaturan');
    }
  };

  return (
    <div className='pt-20 w-full h-screen flex justify-center  bg-lightBrown'>
      <form
        action='#'
        onSubmit={(e) => handleSubmit(e)}
        className='flex flex-col md:w-2/3 items-center p-10 h-fit rounded bg-amber-500/5'
      >
        <h2>Setting Alarm</h2>
        <div className='w-full mb-3'>
          <label className='inline-flex w-full items-center justify-between cursor-pointer'>
            <span className=' text-sm  w-1/2 text-black dark:text-gray-300'>
              Alarm Status
            </span>
            <input
              type='checkbox'
              value='alarmStatus'
              className='sr-only peer w-1/2'
              onChange={() =>
                setSaveSetting((state) => ({
                  ...state,
                  alarmStatus: !state.alarmStatus,
                }))
              }
            />
            <div className="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-amber-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-700"></div>
          </label>
        </div>
        <div className='w-full mb-3 flex justify-between'>
          <p className='w-1/2'>Pilih Kota</p>
          <SelectComp
            addedClass='md:w-1/2 w-full'
            city={selectedCity}
            listCity={listCity}
            handleChange={handleChange}
          />
        </div>
        <div
          className='w-full flex justify-between'
          defaultValue={adzan1}
          onChange={(e: any) =>
            setSaveSetting((state) => ({
              ...state,
              adzan: e.target.value,
            }))
          }
        >
          <p>Pilih Suara Adzan</p>
          <div className='flex flex-col'>
            <div className='flex items-center mb-4'>
              <input
                defaultChecked
                id='default-radio-1'
                type='radio'
                value={adzan2}
                name='default-radio'
                className='w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 focus:ring-amber-500 dark:focus:ring-amber-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='default-radio-1'
                className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Suara Adzan Muhammad Thaha Al-Junayd
                <audio
                  src={
                    '/src/assets/audio/AZAN%20USTAZ%20FAHMI%20maqam%20nahawand%20kurdi.mp3'
                  }
                  preload='auto'
                  autoPlay={false}
                  controls
                />
              </label>
            </div>
            <div className='flex items-center'>
              <input
                id='default-radio-2'
                type='radio'
                value={adzan1}
                name='default-radio'
                className='w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 focus:ring-amber-500 dark:focus:ring-amber-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='default-radio-2'
                className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Suara Adzan Ustaz Fahmi maqam nahawand kurdi
                <audio src={adzan1} preload='auto' autoPlay={false} controls />
              </label>
            </div>
          </div>
        </div>

        <div>
          <button
            type='submit'
            className='bg-darkBrown hover:bg-darkBrown btn-sm text-white mt-5'
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingAlarm;
