import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import Footer from '../components/Footer';

const AuthLayout = () => {
  const auth = useSelector((state: RootState) => state.auth.authStatus);

  return (
    <>
      <Navbar />
      {auth ? <Navigate to={'/'} /> : <Outlet />}
      <Footer />
    </>
  );
};

export default AuthLayout;
