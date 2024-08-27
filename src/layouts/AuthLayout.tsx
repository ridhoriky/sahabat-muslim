import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';

const AuthLayout = () => {
  const auth = useSelector((state: any) => state.auth.authStatus);

  return (
    <>
      <Navbar />
      {auth ? <Navigate to={'/'} /> : <Outlet />}
    </>
  );
};

export default AuthLayout;
