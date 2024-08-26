import { useEffect, useState } from 'react';
import { getAllSurat } from '../services/api';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const Quran = () => {
  const [allSurat, setAllSurat] = useState<any>(undefined);
  useEffect(() => {
    getAllSurat().then((res) => setAllSurat(res.data));
  }, []);

  return (
    <div style={{ padding: '0 10%', backgroundColor: '#FFF5D9' }}>
      <div style={{ padding: '40px 15%' }}>
        <Row gutter={16}>
          {allSurat?.map((surat: any) => (
            <Col span={8} key={surat.number} style={{ marginBottom: '15px' }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  padding: '10px',
                  backgroundColor: '#FFF5E9',
                  textAlign: 'center',
                  border: '2px solid grey',
                  borderRadius: '5px',
                }}
              >
                <Link to={surat.number} style={{ color: 'black' }}>
                  <Row gutter={16}>
                    <Col span={4}>
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',

                          justifyContent: 'start',
                        }}
                      >
                        <div
                          style={{
                            border: '1px solid black',
                            borderRadius: '5px',
                            padding: '5px 10px',
                          }}
                        >
                          {surat.number}
                        </div>
                      </div>
                    </Col>
                    <Col span={20}>
                      <h4 style={{ fontWeight: 'bold' }}>Qur'an Surat </h4>
                      <h4
                        style={{
                          fontWeight: 'bold',
                          marginBottom: '10px',
                        }}
                      >
                        {surat.name_id}
                      </h4>
                      <p>
                        {surat.revelation_id} &#8226;{' '}
                        {`${surat.sequence} Surah`}
                      </p>
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
