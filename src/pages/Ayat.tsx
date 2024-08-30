import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  getAllSurat,
  getSuratWithNumber,
  getSuratWithRange,
} from '../services/api';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import SelectSurat from '../components/SelectSurat';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { db } from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { message } from 'antd';

interface AyatItem {
  id: number;
  ayah: string;
  arab: string;
  latin: string;
  text: string;
  audio: string;
}

interface SuratState {
  namaSurat: string;
  nomorSurat: number;
  panjangSurat: number;
  nomorAyat: string;
  panjangSuratSebelum: number;
  awal: number;
  akhir: number;
}

interface SuratData {
  number: string;
  name_id: string;
  number_of_verses: number;
}

const Ayat: React.FC = () => {
  const [menu, setMenu] = useState<{ display: boolean; id: number | null }>({
    display: false,
    id: null,
  });
  const [ayat, setAyat] = useState<AyatItem[]>([]);
  const [allSurat, setAllSurat] = useState<SuratData[] | undefined>(undefined);
  const { user } = useSelector((state: RootState) => state.auth);

  const [surat, setSurat] = useState<SuratState>({
    namaSurat: '',
    nomorSurat: 1,
    nomorAyat: '',
    panjangSuratSebelum: 10,
    panjangSurat: 7,
    awal: 1,
    akhir: 10,
  });
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const nomorAyat = searchParams.get('nomorAyat');
    if (nomorAyat) {
      const awalAyat = nomorAyat.includes('0')
        ? Number(nomorAyat) - 9
        : Math.floor(Number(nomorAyat) / 10) * 10 + 1;

      const akhirAyat = Math.ceil(Number(nomorAyat) / 10) * 10;
      setSurat((state) => ({
        ...state,
        awal: awalAyat,
        akhir: akhirAyat,
      }));
    }
  }, [searchParams]);
  useEffect(() => {
    getAllSurat().then((res) => setAllSurat(res.data));
  }, []);
  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const resp = await getSuratWithNumber(params.surat);
        setSurat((state) => ({
          ...state,
          namaSurat: resp.data?.name_id,
          nomorSurat: resp.data?.number,
          panjangSurat: resp.data?.number_of_verses,
        }));
      } catch (error) {
        console.error('Error fetching surat:', error);
      }
    };

    fetchSurat();
    setSurat((state) => ({
      ...state,
      panjangSuratSebelum: Number(panjangSurat),
    }));
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
    const nomorAyat = searchParams.get('nomorAyat');
    if (nomorAyat) {
      window.scroll(0, 100);
    }
  }, [surat.awal, surat.akhir, params.surat]);
  useEffect(() => {
    const nomorAyat = searchParams.get('nomorAyat');
    if (nomorAyat) {
      const element = document.getElementById(`ayat-${nomorAyat}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [ayat, searchParams]);

  const handleNextSurat = () => {
    removeSearchParams();
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
    removeSearchParams();
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
    removeSearchParams();
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
    removeSearchParams();
    if (surat.awal === 1 && Number(surat.nomorSurat) > 1) {
      const newNomorSurat = Number(surat.nomorSurat) - 1;
      const awalAyat = Math.floor(surat.panjangSuratSebelum / 10) * 10 + 1;
      const akhirAyat = Math.ceil(surat.panjangSuratSebelum / 10) * 10;
      setSurat((state) => ({
        ...state,
        nomorSurat: newNomorSurat,
        awal: awalAyat,
        akhir: akhirAyat,
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
  const handlePlayAudio = (audio: string) => {
    setAudioSrc(audio);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = audio;
        audioRef.current.pause();
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
    }, 100);
  };

  const handleMenuClick = (id: number, nomorAyat: string) => {
    setSurat((state) => ({
      ...state,
      nomorAyat,
    }));

    if (menu.id === id && menu.display) {
      setMenu({ display: false, id: null });
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } else {
      setMenu({ display: true, id });
      audioRef?.current?.pause();
    }
  };

  const getSuratName = (number: string) => {
    const surat = allSurat?.find((s) => s.number === `${number}`);
    return surat ? surat.name_id : '';
  };

  const getPanjangSuratSebelum = (number: string) => {
    const surat = allSurat?.find((s) => s.number === `${number}`);
    return surat ? surat.number_of_verses : '';
  };

  const panjangSurat = getPanjangSuratSebelum(
    `${Number(surat.nomorSurat) - 1}`
  );

  const handleChangeSurat = (value: string) => {
    setSurat((state) => ({
      ...state,
      awal: 1,
      akhir: 10,
    }));
    navigate(`/quran/${value}`);
  };

  const markSurat = async () => {
    if (user) {
      try {
        const markedAyat = {
          nomorSurat: surat.nomorSurat,
          nomorAyat: surat.nomorAyat,
        };
        const userDocRef = doc(db, 'Users', user);
        await updateDoc(userDocRef, { markedAyat });
        message.success('Berhasil Menandai Ayat');
      } catch (error) {
        console.error('Failed to save settings:', error);
      }
    }
  };

  const removeSearchParams = () => {
    setSearchParams('');
  };

  const prevSuratName = getSuratName(`${Number(surat.nomorSurat) - 1}`);
  const nextSuratName = getSuratName(`${Number(surat.nomorSurat) + 1}`);

  return (
    <div className='py-[20px] md:px-[10%] bg-semiBrown min-h-screen'>
      <h2 className='text-2xl font-bold text-center mb-5'>{surat.namaSurat}</h2>

      <div className='flex px-[15%] justify-between gap-[20px]'>
        <button
          className='bg-[#CD5C08] text-white min-w-[150px] py-[5px] px-[10px]'
          onClick={handlePrevSurat}
        >
          <LeftOutlined className='mr-[5px]' />
          {prevSuratName || '-'}
        </button>
        <SelectSurat
          handleChangeSurat={handleChangeSurat}
          allSurat={allSurat}
          namaSurat={surat.namaSurat}
        />
        <button
          className='bg-[#CD5C08] text-white min-w-[150px] py-[5px] px-[10px]'
          onClick={handleNextSurat}
        >
          {nextSuratName || '-'}
          <RightOutlined className='ml-[5px]' />
        </button>
      </div>
      <div className='px-[15%]'>
        {ayat?.map((item) => (
          <div
            key={item.id}
            id={`ayat-${item.ayah}`}
            className='flex items-center rounded-md my-[10px] px-5 py-1 border-2 border-black/20'
          >
            <div className='w-[2%] h-full flex items-center justify-center'>
              <p className='border-2 border-black/20 font-bold py-1 px-2'>
                {item.ayah}
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
                  onClick={() => handleMenuClick(item.id, item.ayah)}
                ></div>
                {menu.display && menu.id === item.id && (
                  <div className='absolute top-3 right-8 md:-right-40 p-2 flex flex-col rounded border border-darkBrown bg-amber-50 shadow-lg z-10'>
                    <p
                      className='cursor-pointer hover:border-b border-darkBrown mb-2'
                      onClick={() => handlePlayAudio(item.audio)}
                    >
                      Play Audio
                    </p>
                    <p
                      onClick={() => markSurat()}
                      className='cursor-pointer hover:border-b border-darkBrown'
                    >
                      Tandai Terakhir Dibaca
                    </p>
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
