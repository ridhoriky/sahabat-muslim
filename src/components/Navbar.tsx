// import { FaRegCalendarMinus } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className='navbar bg-base-100 px-[10%]'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>Jadwal Sholat</a>
      </div>
      <div className='flex-none'>
        <div className='dropdown dropdown-end'>
          {/* <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
            <div className='indicator'>
              <FaRegCalendarMinus size={24} />
              <span className='badge badge-sm indicator-item'>8</span>
            </div>
          </div> */}
          <div
            tabIndex={0}
            className='card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow'
          >
            <div className='card-body'>
              <span className='text-lg font-bold'>8 Items</span>
              <span className='text-info'>Subtotal: $999</span>
              <div className='card-actions'>
                <button className='btn btn-primary btn-block'>View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          >
            <div className='w-7 rounded-full'>
              <img
                alt='Tailwind CSS Navbar component'
                src='https://cdn-icons-png.flaticon.com/128/1077/1077114.png'
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            <li>
              <a className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
