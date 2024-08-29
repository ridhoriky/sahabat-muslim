import React, { useEffect, useState } from 'react';
import { Flex, Radio, RadioChangeEvent } from 'antd';
import { getDoaWithSumber } from '../services/api';

interface Doa {
  judul?: string;
  arab?: string;
  indo?: string;
}

const Doa: React.FC = () => {
  const [sumber, setSumber] = useState<string>('quran');
  const [doa, setDoa] = useState<Doa[]>([]);
  const onChange = (e: RadioChangeEvent) => {
    setSumber(e.target.value);
  };
  useEffect(() => {
    const fetchDoa = async () => {
      await getDoaWithSumber(sumber).then((resp) => setDoa(resp.data));
    };
    fetchDoa();
  }, [sumber]);
  return (
    <div className='flex flex-col items-center  min-h-screen min-w-full bg-lightBrown px-[10%] '>
      <h2 className='py-5 font-bold text-xl text-darkBrown'>Kategori</h2>
      <Flex vertical gap='middle'>
        <Radio.Group
          onChange={onChange}
          defaultValue='quran'
          size='small'
          className='border-darkBrown'
        >
          <Radio.Button value='quran'>Sumber Quran</Radio.Button>
          <Radio.Button value='hadits'>Sumber Hadits</Radio.Button>
          <Radio.Button value='pilihan'>Doa Pilihan</Radio.Button>
          <Radio.Button value='harian'>Doa Harian</Radio.Button>
          <Radio.Button value='ibadah'>Doa Ibadah</Radio.Button>
          <Radio.Button value='haji'>Doa Haji</Radio.Button>
          <Radio.Button value='lainnya'>Lainnya</Radio.Button>
        </Radio.Group>
      </Flex>
      <div className='flex flex-col items-center justify-center'>
        {doa?.map((item: Doa) => (
          <div
            key={item?.arab}
            className='border-2 p-4 rounded-md my-3 border-black/20'
          >
            <p className='text-lg font-bold mb-2 text-center'>{item?.judul}</p>
            <p className='text-end font-semibold text-lg mb-2'>{item?.arab}</p>
            <p>{item?.indo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doa;
