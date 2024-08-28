import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Jadwal from './pages/Jadwal';
import Home from './pages/Home';
import Quran from './pages/Quran';
import Ayat from './pages/Ayat';
import Login from './pages/Login';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import store from './store';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import AuthLayout from './layouts/AuthLayout';
import SettingAlarm from './pages/SettingAlarm';
import Alarm from './pages/Alarm';

function App() {
  return (
    <Provider store={store}>
      <Alarm />
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path='quran' element={<Outlet />}>
                <Route index element={<Quran />} />
                <Route path={':surat'} element={<Ayat />} />
              </Route>
              <Route path='jadwal' element={<Jadwal />} />
            </Route>
            <Route element={<PrivateLayout />}>
              <Route path='/setting-alarm' element={<SettingAlarm />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

// <Route path='/'>
//   <Route element={<Public />}>
//     <Route index element={<Home />} />
//     <Route path='/parking' element={<Outlet />}>
//       <Route index element={<ListSlotParking />} />
//       <Route path=':id' element={<DetailSlotParking />} />
//     </Route>
//     <Route path='/daftar-kendaraan' element={<ListVehicle />} />
//     <Route path='/daftar-kendaraan' element={<ListVehicle />} />
//     <Route path='/catatan-parkir' element={<ParkingRecords />} />
//   </Route>
//   <Route element={<AuthLayout />}>
//     <Route path='login' element={<Login />} />
//     <Route path='register' element={<Register />} />
//   </Route>
//   <Route path='*' element={<NotFound />} />
// </Route>;

export default App;
