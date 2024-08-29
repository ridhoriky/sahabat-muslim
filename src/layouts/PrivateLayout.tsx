import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import Footer from '../components/Footer';

const PrivateLayout = () => {
  const auth = useSelector((state: RootState) => state.auth.authStatus);

  return (
    <>
      <Navbar />
      {auth !== null ? <Outlet /> : <Navigate to='/login' />}
      <Footer />
    </>
  );
};

export default PrivateLayout;
