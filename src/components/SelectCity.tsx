import { Select } from 'antd';
import titleCase from '../utils/capitalizeFirstLater';

const SelectCity = (props: any) => {
  const { listCity, city, handleChangeCity } = props;
  const newArray = listCity?.map((item: any) => ({
    value: item.id,
    label: titleCase(item.lokasi),
  }));
  return (
    <Select
      showSearch
      className='min-w-64'
      placeholder='Select a person'
      optionFilterProp='children'
      value={city}
      onChange={handleChangeCity}
      filterOption={(input, option) => {
        if (option && typeof option.label === 'string') {
          return option.label.toLowerCase().includes(input.toLowerCase());
        }
        return false;
      }}
      options={newArray}
    />
  );
};

export default SelectCity;
