import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSuratWithNumber, getSuratWithRange } from '../services/api';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Ayat = () => {
  const [menu, setMenu] = useState({
    display: false,
    id: null,
  });
  const [ayat, setAyat] = useState([]);
  const [surat, setSurat] = useState({
    namaSurat: '',
    nomorSurat: 1,
    panjangSurat: 7,
    awal: 1,
    akhir: 10,
  });
  const params = useParams();
  const navigate = useNavigate();

  console.log(menu);

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const resp = await getSuratWithNumber(params.surat);
        setSurat((state) => ({
          ...state,
          namaSurat: resp.data.name_id,
          nomorSurat: resp.data.number,
          panjangSurat: resp.data.number_of_verses,
        }));
      } catch (error) {
        console.error('Error fetching surat:', error);
      }
    };

    fetchSurat();
  }, [params.surat]);

  useEffect(() => {
    const fetchAyat = async () => {
      try {
        const resp = await getSuratWithRange(
          params.surat,
          surat.awal,
          surat.akhir
        );
        setAyat(resp.data);
      } catch (error) {
        console.error('Error fetching ayat:', error);
      }
    };

    fetchAyat();
  }, [surat.awal, surat.akhir, params.surat]);

  const handleNextPage = () => {
    if (surat.panjangSurat < surat.akhir && Number(surat.nomorSurat) < 114) {
      const newNomorSurat = surat.nomorSurat + 1;
      setSurat((state) => ({
        ...state,
        nomorSurat: newNomorSurat,
        awal: 1,
        akhir: 10,
      }));
      window.scrollTo(0, 0);
      navigate(`/quran/${Number(surat.nomorSurat) + 1}`);
    } else if (Number(surat.nomorSurat) < 114) {
      setSurat((state) => ({
        ...state,
        awal: state.awal + 10,
        akhir: state.akhir + 10,
      }));
      window.scrollTo(0, 0);
    }
  };
  const handlePreviousPage = () => {
    if (surat.awal === 1 && Number(surat.nomorSurat) > 1) {
      const newNomorSurat = surat.nomorSurat - 1;
      setSurat((state) => ({
        ...state,
        nomorSurat: newNomorSurat,
        awal: 1,
        akhir: 10,
      }));
      navigate(`/quran/${Number(surat.nomorSurat) - 1}`);
    } else if (Number(surat.nomorSurat) > 1) {
      setSurat((state) => ({
        ...state,
        awal: state.awal - 10,
        akhir: state.akhir - 10,
      }));
    }
  };
  const styleButton: React.CSSProperties = {
    backgroundColor: '#CD5C08',
    color: 'white',
    padding: '5px 10px',
  };

  return (
    <div
      style={{
        padding: '40px 10% 20px 10%',
        backgroundColor: '#FFF5D9',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          padding: '0 15%',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        <button style={styleButton}>
          <LeftOutlined style={{ marginRight: '5px' }} />
          Al-Fatihah
        </button>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {surat.namaSurat}
        </h2>
        <button style={styleButton}>
          Al-Baqarah
          <RightOutlined style={{ marginLeft: '5px' }} />
        </button>
      </div>
      <div style={{ margin: '0 15%' }}>
        {ayat?.map((item: any) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid grey',
              borderRadius: '10px',
              margin: '10px 0',
              padding: '5px 20px',
            }}
          >
            <div
              style={{
                width: '2%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p
                style={{
                  border: '1px solid grey',
                  padding: '5px 10px',
                  fontWeight: 'bold',
                }}
              >
                {Number(item.ayah).toLocaleString('ar-EG')}
              </p>
            </div>
            <div style={{ width: '98%', height: '100%' }}>
              <div
                style={{
                  padding: '10px 10px',
                  display: 'flex',
                  position: 'relative',
                }}
              >
                <div style={{ width: '98%', margin: '0 20px' }}>
                  <p
                    style={{
                      textAlign: 'right',
                      fontWeight: 'bold',
                      fontSize: '25px',
                    }}
                  >
                    {item.arab}
                  </p>
                  <p style={{ fontStyle: 'italic', padding: '5px 0' }}>
                    {item.latin}
                  </p>
                  <p>{item.text}</p>
                </div>
                <div
                  style={{
                    marginLeft: '10px',
                    position: 'absolute',
                    right: '0',
                    top: '12px',
                    width: '20px',
                    height: '20px',
                    backgroundImage:
                      'radial-gradient(circle, black 2px, transparent 2px)',
                    backgroundSize: '100% 33.33%',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    menu.id !== item.id &&
                    setMenu({ display: true, id: item.id })
                  }
                ></div>
                <div
                  style={
                    menu.display && menu.id === item.id
                      ? {
                          display: 'block',
                          position: 'absolute',
                          top: '10px',
                          padding: '10px',
                          borderRadius: '5px',
                          right: '20px',
                          zIndex: 10,
                          backgroundColor: 'white',
                        }
                      : { display: 'none' }
                  }
                >
                  <ul>
                    <li>Download as Image</li>
                    <li>Play Audio</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          paddingTop: '15px',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <button style={styleButton} onClick={handlePreviousPage}>
          Sebelumnya
        </button>
        <button style={styleButton} onClick={handleNextPage}>
          Berikutnya
        </button>
      </div>
    </div>
  );
};

export default Ayat;
