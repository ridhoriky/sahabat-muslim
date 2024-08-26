import React from 'react';
import titleCase from '../utils/capitalizeFirstLater';

type City = {
  id: number;
  lokasi: string;
};

type props = {
  listCity?: City[];
  city: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectComp = React.memo((props: props) => {
  const { listCity, handleChange, city } = props;
  return (
    <select
      id='kota'
      value={city}
      className='w-2/6 md:w-2/12 border-black/50 rounded-md border-2'
      onChange={(e) => handleChange(e)}
    >
      {listCity?.map((city: City) => (
        <option className='font-semibold ' key={city.id} value={city.id}>
          {titleCase(city.lokasi)}
        </option>
      ))}
    </select>
  );
});

export default SelectComp;
