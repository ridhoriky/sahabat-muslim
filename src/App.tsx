import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Jadwal from './pages/Jadwal';
import Home from './pages/Home';
import Quran from './pages/Quran';
import Ayat from './pages/Ayat';
import Login from './pages/Login';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/quran" element={<Outlet />}>
              <Route index element={<Quran />} />
              <Route path={':surat'} element={<Ayat />} />
            </Route>
            <Route path="/jadwal" element={<Jadwal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
