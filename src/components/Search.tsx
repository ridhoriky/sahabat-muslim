import { FaSearch } from 'react-icons/fa';

const Search = () => {
  return (
    <label className='input input-bordered flex items-center gap-2'>
      <input type='text' className='grow' placeholder='Search' />
      <FaSearch size={20} />
    </label>
  );
};

export default Search;
