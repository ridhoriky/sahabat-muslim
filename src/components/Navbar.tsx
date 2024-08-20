import { FaRegCalendarMinus } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className='navbar bg-base-100 px-[10%]'>
      <div className='flex-1'>
        <p className='btn btn-ghost text-xl'>Jadwal Sholat</p>
      </div>
      <div className='flex-none'>
        <div className='dropdown dropdown-end'>
          <div className='btn btn-ghost btn-circle'>
            <div className='indicator'>
              <FaRegCalendarMinus size={24} />
              <span className='badge badge-sm indicator-item'>8</span>
            </div>
          </div>
          <div className='card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow'>
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
          <div className='btn btn-ghost btn-circle avatar'>
            <div className='w-7 rounded-full'>
              <img
                alt='Tailwind CSS Navbar component'
                src='https://cdn-icons-png.flaticon.com/128/1077/1077114.png'
              />
            </div>
          </div>
          <ul className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'>
            <li>
              <div className='justify-between'>
                <span className='badge'>New</span>
              </div>
            </li>
            <li>
              <p>Settings</p>
            </li>
            <li>
              <p>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
