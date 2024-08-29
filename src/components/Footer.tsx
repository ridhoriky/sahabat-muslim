import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import Logo from '../assets/images/islam.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer bg-neutral text-neutral-content items-center py-2 px-[10%]'>
      <aside className='grid-flow-col items-center'>
        <img className='w-10 h-10' src={Logo} alt='logo' />
        <p>Sahabat Muslim</p>
      </aside>
      <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      <nav className='grid-flow-col gap-4 md:place-self-center md:justify-self-end'>
        <Link
          className='text-lightBrown hover:text-darkBrown'
          to={'https://facebook.com'}
        >
          <FaFacebook size={20} />
        </Link>
        <Link
          className='text-lightBrown hover:text-darkBrown'
          to={'https://twitter.com'}
        >
          <FaTwitter size={20} />
        </Link>
        <Link
          className='text-lightBrown hover:text-darkBrown'
          to={'https://youtube.com'}
        >
          <FaYoutube size={20} />
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
