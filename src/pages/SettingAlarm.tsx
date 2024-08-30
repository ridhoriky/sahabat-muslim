import React, { useCallback, useEffect, useState } from 'react';
import { getListCity } from '../services/api';
import adzanMekkah from '../assets/audio/adzan_mekkah.mp3';
import adzanMadinah from '../assets/audio/adzan_madinah.mp3';
import adzanTurkey from '../assets/audio/adzan_turkey.mp3';
import { useSelector } from 'react-redux';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { RootState } from '../store/reducers';
import SelectCity from '../components/SelectCity';

const SettingAlarm = () => {
  const [listCity, setListCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [saveSetting, setSaveSetting] = useState({
    alarmStatus: false,
    kota: '1503',
    adzan: adzanMekkah,
  });

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesResponse = await getListCity();
        setListCity(citiesResponse.data);

        setSelectedCity(citiesResponse.data[89]?.id || '1503');

        if (user) {
          const userDocRef = doc(db, 'Users', user);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const settingsFromDb = docSnap.data().saveSetting;
            if (Object.keys(settingsFromDb).length > 0) {
              setSaveSetting(settingsFromDb);
            }

            setSelectedCity(settingsFromDb.kota || '1503');
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [user]);

  const handleChangeCity = useCallback((value: string) => {
    const city = value;
    setSelectedCity(city);
    setSaveSetting((prevState) => ({ ...prevState, kota: city }));
  }, []);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const adzanSrc = e.target.value;
    setSaveSetting((prevState) => ({ ...prevState, adzan: adzanSrc }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      try {
        const userDocRef = doc(db, 'Users', user);
        await updateDoc(userDocRef, { saveSetting });
        localStorage.setItem('saveSetting', JSON.stringify(saveSetting));
        alert('Berhasil menyimpan pengaturan');
        window.location.reload();
      } catch (error) {
        console.error('Failed to save settings:', error);
      }
    }
  };

  return (
    <div className='pt-5 w-full h-screen flex justify-center bg-lightBrown'>
      <form
        action='#'
        onSubmit={(e) => handleSubmit(e)}
        className='flex flex-col md:w-2/3 items-center p-10 h-fit rounded bg-amber-500/5'
      >
        <h2 className='text-xl text-darkBrown font-bold'>Setting Alarm</h2>
        <div className='w-full my-3'>
          <label className='inline-flex w-full flex-wrap items-center justify-start cursor-pointer'>
            <span className='text-sm w-1/2 text-black dark:text-gray-300'>
              Alarm Status
            </span>
            <input
              type='checkbox'
              checked={saveSetting.alarmStatus}
              onChange={() =>
                setSaveSetting((prevState) => ({
                  ...prevState,
                  alarmStatus: !prevState.alarmStatus,
                }))
              }
              className='sr-only peer w-1/2 '
            />
            <div className="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-amber-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-700"></div>
          </label>
        </div>
        <div className='w-full mb-3 flex flex-wrap justify-between'>
          <p className='w-1/2'>Pilih Kota</p>
          {/* <SelectComp
            addedClass='md:w-1/2 w-full '
            city={selectedCity}
            listCity={listCity}
            handleChange={handleChange}
          /> */}
          <SelectCity
            listCity={listCity}
            city={selectedCity}
            handleChangeCity={handleChangeCity}
          />
        </div>
        <div className='w-full flex flex-wrap justify-between'>
          <p className='w-1/2'>Pilih Suara Adzan</p>
          <div className='flex flex-col items-start md:w-1/2'>
            <div className='flex items-center mb-4'>
              <input
                checked={saveSetting.adzan === adzanMekkah}
                id='adzanMekkah'
                type='radio'
                value={adzanMekkah}
                name='adzan'
                className='w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 focus:ring-amber-500 dark:focus:ring-amber-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={handleRadioChange}
              />
              <label
                htmlFor='adzanMekkah'
                className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Suara Adzan Mekkah
                <audio
                  src={adzanMekkah}
                  preload='auto'
                  autoPlay={false}
                  controls
                />
              </label>
            </div>
            <div className='flex items-center mb-4'>
              <input
                checked={saveSetting.adzan === adzanMadinah}
                id='adzanMadinah'
                type='radio'
                value={adzanMadinah}
                name='adzan'
                className='w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 focus:ring-amber-500 dark:focus:ring-amber-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={handleRadioChange}
              />
              <label
                htmlFor='adzanMadinah'
                className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Suara Adzan Madinah
                <audio
                  src={adzanMadinah}
                  preload='auto'
                  autoPlay={false}
                  controls
                />
              </label>
            </div>
            <div className='flex items-center'>
              <input
                checked={saveSetting.adzan === adzanTurkey}
                id='adzanTurkey'
                type='radio'
                value={adzanTurkey}
                name='adzan'
                className='w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 focus:ring-amber-500 dark:focus:ring-amber-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={handleRadioChange}
              />
              <label
                htmlFor='adzanTurkey'
                className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Suara Adzan Turkey
                <audio
                  src={adzanTurkey}
                  preload='auto'
                  autoPlay={false}
                  controls
                />
              </label>
            </div>
          </div>
        </div>

        <div>
          <button
            type='submit'
            className='bg-darkBrown hover:bg-darkBrown btn-md text-white mt-5'
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingAlarm;
