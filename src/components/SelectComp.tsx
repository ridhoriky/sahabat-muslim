import titleCase from '../utils/capitalizeFirstLater';

type City = {
  id: number;
  lokasi: string;
};

type props = {
  listCity?: City[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectComp = (props: props) => {
  const { listCity, handleChange } = props;
  return (
    <select
      id='kota'
      defaultValue={'default'}
      className='w-3/5 border-black/50 rounded-md border-2'
      onChange={(e) => handleChange(e)}
    >
      <option value={'default'} disabled>
        Pilih Kota
      </option>
      {listCity?.map((city: City) => (
        <option key={city.id} value={city.id}>
          {titleCase(city.lokasi)}
        </option>
      ))}
    </select>
  );
};

export default SelectComp;
