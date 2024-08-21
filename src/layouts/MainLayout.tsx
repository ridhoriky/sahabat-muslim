import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  let location = useLocation();
  return (
    <>
      <Navbar location={location.pathname} />
      <Outlet />
    </>
  );
};

export default MainLayout;
