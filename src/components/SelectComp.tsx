import React from 'react';
import titleCase from '../utils/capitalizeFirstLater';

type City = {
  id: number;
  lokasi: string;
};

type props = {
  listCity?: City[];
  city: string;
  addedClass: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectComp = React.memo((props: props) => {
  const { listCity, handleChange, city, addedClass } = props;
  return (
    <select
      id='kota'
      value={city}
      className={`${addedClass} w-2/6 md:w-1/2 select select-sm border-black/50 rounded-md border-2`}
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
