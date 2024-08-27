import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../services/firebase';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/quran', label: 'Quran' },
    { to: '/jadwal', label: 'Jadwal' },
    { to: '/doa', label: 'Doa' },
  ];

  const navigate = useNavigate();
  const authStatus = useSelector((state: any) => state.auth.authStatus);

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('isAuth');
      localStorage.removeItem('acsesToken');
      window.location.href = '/login';
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <header className='px-[10%] py-2 bg-semiBrown'>
        <nav className='flex justify-between items-center max-container '>
          <Link
            to='/'
            className='z-50 text-3xl font-bold text-darkBrown hover:text-darkBrown'
          >
            Sahabat Muslim
          </Link>
          <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className=' text-darkBrown font-bold leading-normal hover:text-darkBrown hover:border-b-darkBrown hover:border-b-2'
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {authStatus ? (
            <button
              onClick={handleLogOut}
              className='max-lg:hidden btn btn-sm btn-error text-white'
            >
              Log Out
            </button>
          ) : (
            <div className='flex gap-2 text-lg leading-normal font-medium  max-lg:hidden wide:mr-24 text-darkBrown'>
              <Link to='/login'>
                <button className='btn text-white btn-sm bg-darkBrown hover:bg-darkBrown hover:scale-110'>
                  Masuk
                </button>
              </Link>
              <span>|</span>
              <Link
                to='/register'
                className='text-darkBrown  hover:text-darkBrown hover:border-b-darkBrown hover:border-b-2'
              >
                Daftar
              </Link>
            </div>
          )}

          <div
            className='max-lg:block cursor-pointer lg:hidden'
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <RxHamburgerMenu
              className={`${
                isMenuOpen ? `hidden` : 'block'
              } text-4xl text-darkBrown`}
            />
          </div>
        </nav>
        {isMenuOpen && (
          <div className='relative z-50'>
            <nav className='fixed top-0 right-0 left-0  bottom-0 lg:bottom-auto text-right '>
              <div
                className={`max-lg:block lg:hidden fixed right-0 pr-[10%] py-2 z-40 cursor-pointer`}
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                <AiOutlineClose
                  className={`${
                    isMenuOpen ? `block` : 'hidden'
                  } text-4xl text-darkBrown`}
                />
              </div>
              <div className=' lg:hidden flex flex-col justify-start items-start z-[100] shadow-sm shadow-darkBrown  absolute right-0 p-[20px] mr-[10%] mt-[50px] rounded-md bg-white w-fit  '>
                <ul className='flex flex-col justify-start items-start gap-2 pr-10'>
                  {navLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        to={item.to}
                        className=' text-darkBrown leading-normal hover:text-darkBrown hover:border-b-darkBrown hover:border-b-2'
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {authStatus ? (
                  <button
                    onClick={handleLogOut}
                    className='mt-2 btn btn-sm btn-error text-white'
                  >
                    Log Out
                  </button>
                ) : (
                  <div className='mt-2 flex gap-2 text-lg pr-10 leading-normal font-medium justify-start items-start flex-col wide:mr-24 text-darkBrown'>
                    <Link
                      to='/login'
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      <button className='btn text-white btn-sm bg-darkBrown hover:bg-darkBrown hover:scale-110'>
                        Masuk
                      </button>
                    </Link>
                    <Link
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      to='/register'
                      className='text-darkBrown  hover:text-darkBrown hover:border-b-darkBrown hover:border-b-2'
                    >
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
export default Navbar;
