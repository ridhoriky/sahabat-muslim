import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';

const PrivateLayout = () => {
  const auth = useSelector((state: any) => state.auth.authStatus);

  return (
    <>
      <Navbar />
      {auth !== null ? <Outlet /> : <Navigate to='/login' />}
    </>
  );
};

export default PrivateLayout;
