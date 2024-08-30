import { useEffect, useState } from 'react';
import { getAllSurat } from '../services/api';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

interface SingleSurat {
  number: string;
  name_id: string;
  number_of_verses: string;
  revelation_id: string;
  sequence: string;
}

const Quran = () => {
  const [allSurat, setAllSurat] = useState<SingleSurat[] | undefined>(
    undefined
  );
  useEffect(() => {
    getAllSurat().then((res) => setAllSurat(res.data));
  }, []);

  return (
    <div className='px-[10%] bg-[#FFF5D9]'>
      <div className='py-[20px] md:px-[15%]'>
        <Link to={'/'}>
          <div className='w-full bg-gradient-to-br from-amber-600 to-yellow-500 rounded mb-5'>
            <h2 className='py-5 text-center font-bold text-lg text-white'>
              Terakhir Dibaca
            </h2>
          </div>
        </Link>
        <Row gutter={16}>
          {allSurat?.map((surat: SingleSurat) => (
            <Col span={8} key={surat.number} className='mb-4'>
              <div className='w-full h-full p-3 bg-[#FFF5E9] group/item text-center border-2 border-gray-500 hover:border-darkBrown rounded'>
                <Link
                  to={surat.number}
                  className='text-black hover:text-darkBrown'
                >
                  <Row gutter={16}>
                    <Col span={4}>
                      <div className='w-full h-full flex items-center justify-start'>
                        <div className='border-[1px] group-hover/item:border-darkBrown  border-black rounded px-2 py-1'>
                          {surat.number}
                        </div>
                      </div>
                    </Col>
                    <Col span={20}>
                      <h4 className='font-bold'>Qur'an Surat </h4>
                      <h4 className='font-bold mb-2'>{surat.name_id}</h4>
                      <div className='flex items-center justify-center flex-wrap'>
                        <span>{surat.revelation_id}</span>
                        <span className='w-full md:w-fit px-2'>&#8226;</span>
                        <span> {`${surat.sequence} Surah`}</span>
                      </div>
                    </Col>
                  </Row>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Quran;
