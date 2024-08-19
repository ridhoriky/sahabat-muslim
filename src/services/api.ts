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
