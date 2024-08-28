import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getAllSurat,
  getSuratWithNumber,
  getSuratWithRange,
} from '../services/api';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Ayat: React.FC = () => {
  const [menu, setMenu] = useState<{ display: boolean; id: number | null }>({
    display: false,
    id: null,
  });
  const [ayat, setAyat] = useState<any[]>([]);
  const [allSurat, setAllSurat] = useState<any>(undefined);

  const [surat, setSurat] = useState({
    namaSurat: '',
    nomorSurat: 1,
    panjangSurat: 7,
    awal: 1,
    akhir: 10,
  });
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllSurat().then((res) => setAllSurat(res.data));
  }, []);

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

  const handleNextSurat = () => {
    if (Number(surat.nomorSurat) < 114) {
      const newNomorSurat = Number(surat.nomorSurat) + 1;
      setSurat((state) => ({
        ...state,
        nomorSurat: newNomorSurat,
        awal: 1,
        akhir: 10,
      }));
      window.scrollTo(0, 0);
      navigate(`/quran/${newNomorSurat}`);
    }
  };
  const handlePrevSurat = () => {
    if (Number(surat.nomorSurat) > 1) {
      const newNomorSurat = Number(surat.nomorSurat) - 1;
      setSurat((state) => ({
        ...state,
        nomorSurat: newNomorSurat,
        awal: 1,
        akhir: 10,
      }));
      navigate(`/quran/${newNomorSurat}`);
    }
  };

  const handleNextPage = () => {
    if (surat.panjangSurat < surat.akhir && Number(surat.nomorSurat) < 114) {
      const newNomorSurat = Number(surat.nomorSurat) + 1;
      setSurat((state) => ({
        ...state,
        nomorSurat: newNomorSurat,
        awal: 1,
        akhir: 10,
      }));
      window.scrollTo(0, 0);
      navigate(`/quran/${newNomorSurat}`);
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
      const newNomorSurat = Number(surat.nomorSurat) - 1;
      setSurat((state) => ({
        ...state,
        nomorSurat: newNomorSurat,
        awal: 1,
        akhir: 10,
      }));
      navigate(`/quran/${newNomorSurat}`);
    } else if (Number(surat.nomorSurat) > 1) {
      setSurat((state) => ({
        ...state,
        awal: state.awal - 10,
        akhir: state.akhir - 10,
      }));
    }
  };

  const handlePlayAudio = (audioUrl: string) => {
    setAudioSrc(audioUrl);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleMenuClick = (id: number, audioUrl: string) => {
    if (menu.id === id && menu.display) {
      setMenu({ display: false, id: null });
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } else {
      setMenu({ display: true, id });
      handlePlayAudio(audioUrl);
    }
  };

  const getSuratName = (number: string) => {
    const surat = allSurat?.find((s: any) => s.number === `${number}`);
    return surat ? surat.name_id : '';
  };

  const prevSuratName = getSuratName(`${Number(surat?.nomorSurat) - 1}`);
  const nextSuratName = getSuratName(`${Number(surat?.nomorSurat) + 1}`);

  return (
    <div className='py-[40px] md:px-[10%] bg-semiBrown min-h-screen'>
      <div className='flex px-[15%] justify-between gap-[20px]'>
        <button
          className='bg-[#CD5C08] text-white min-w-[150px] py-[5px] px-[10px]'
          onClick={handlePrevSurat}
        >
          <LeftOutlined className='mr-[5px]' />
          {prevSuratName || '-'}
        </button>
        <h2 className='text-2xl font-bold'>{surat.namaSurat}</h2>
        <button
          className='bg-[#CD5C08] text-white min-w-[150px] py-[5px] px-[10px]'
          onClick={handleNextSurat}
        >
          {nextSuratName || '-'}
          <RightOutlined className='ml-[5px]' />
        </button>
      </div>
      <div className='px-[15%]'>
        {ayat?.map((item: any) => (
          <div
            key={item.id}
            className='flex items-center rounded-md my-[10px] px-5 py-1 border-2 border-black/20'
          >
            <div className='w-[2%] h-full flex items-center justify-center'>
              <p className='border-2 border-black/20 font-bold py-1 px-2'>
                {Number(item.ayah).toLocaleString('ar-EG')}
              </p>
            </div>
            <div style={{ width: '98%', height: '100%' }}>
              <div className='flex p-3 relative'>
                <div className='w-[98%] mx-5'>
                  <p className='text-end font-bold text-2xl pr-5'>
                    {item.arab}
                  </p>
                  <p className='italic py-1 pr-5'>{item.latin}</p>
                  <p>{item.text}</p>
                </div>
                <div
                  className='absolute top-3 right-3 w-[20px] h-[20px]  cursor-pointer'
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, black 2px, transparent 2px)',
                    backgroundSize: '100% 33.33%',
                  }}
                  onClick={() => handleMenuClick(item.id, item.audioUrl)}
                ></div>
                {menu.display && menu.id === item.id && (
                  <div className='absolute top-3 right-8 p-2 rounded bg-white shadow-lg z-10'>
                    <ul>
                      <li
                        className='py-1 cursor-pointer'
                        onClick={() => handlePlayAudio(item.audioUrl)}
                      >
                        Play Audio
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='pt-4 flex justify-center gap-4'>
        <button
          className='bg-[#CD5C08] text-white min-w-[150px] py-[5px] px-[10px]'
          onClick={handlePreviousPage}
        >
          Sebelumnya
        </button>
        <button
          className='bg-[#CD5C08] text-white min-w-[150px] py-[5px] px-[10px]'
          onClick={handleNextPage}
        >
          Berikutnya
        </button>
      </div>
      <audio
        ref={audioRef}
        src={audioSrc ?? ''}
        onEnded={() => setAudioSrc(null)}
      />
    </div>
  );
};

export default Ayat;
