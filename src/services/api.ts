import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.myquran.com/v2/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getListCity = async () => {
  const response = await axiosInstance.get('sholat/kota/semua');
  return response.data;
};
export const getScheduleToday = async (idKota: string, tanggal: string) => {
  const response = await axiosInstance.get(
    `sholat/jadwal/${idKota}/${tanggal}`
  );
  return response.data;
};
export const getScheduleMonth = async (
  idKota: string,
  tahun: number | undefined,
  bulan: number | undefined
) => {
  const response = await axiosInstance.get(
    `sholat/jadwal/${idKota}/${tahun}/${bulan}`
  );
  return response.data;
};
export const getAsmaulHusna = async () => {
  const response = await axiosInstance.get(`husna/semua`);
  return response.data;
};
export const getAllSurat = async () => {
  const response = await axiosInstance.get(`quran/surat/semua`);
  return response.data;
};
export const getSuratWithNumber = async (id: string | number | undefined) => {
  const response = await axiosInstance.get(`quran/surat/${id}`);
  return response.data;
};
export const getSuratWithRange = async (
  surat: string | undefined,
  awal: number,
  akhir: number
) => {
  const response = await axiosInstance.get(
    `quran/ayat/${surat}/${awal}-${akhir}`
  );
  return response.data;
};
export const getDoaWithSumber = async (value: string) => {
  const response = await axiosInstance.get(`doa/sumber/${value}`);
  return response.data;
};
