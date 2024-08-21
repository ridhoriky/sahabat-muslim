import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Kalender from './pages/Kalender';
import AsmaulHusna from './pages/AsmaulHusna';
import Jadwal from './pages/Jadwal';
import Home from './pages/Home';
import Quran from './pages/Quran';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/quran' element={<Quran />} />
          <Route path='/jadwal' element={<Jadwal />} />
          <Route path='/kalender' element={<Kalender />} />
          <Route path='/asmaul-husna' element={<AsmaulHusna />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
