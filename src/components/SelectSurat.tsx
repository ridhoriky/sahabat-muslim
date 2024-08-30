import { Select } from 'antd';

const SelectSurat = (props: any) => {
  const { allSurat, handleChangeSurat, namaSurat } = props;
  const newArray = allSurat?.map((item: any) => ({
    value: item.number,
    label: item.name_id,
  }));
  return (
    <Select
      showSearch
      placeholder='Select a person'
      optionFilterProp='children'
      value={namaSurat}
      onChange={handleChangeSurat}
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

export default SelectSurat;
