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
import Alarm from './components/Alarm';
import Doa from './pages/Doa';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#CD5C08',
          borderRadius: 2,

          // Alias Token
          colorBgContainer: '#fff',
        },
      }}
    >
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
                <Route path='doa' element={<Doa />} />
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
    </ConfigProvider>
  );
}

export default App;
