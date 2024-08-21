import { useEffect, useState } from 'react';
import { getAsmaulHusna } from '../services/api';
import TableHusna from '../components/TableHusna';

const AsmaulHusna = () => {
  const [listAsmaulHusna, setListAsmaulHusna] = useState(undefined);
  useEffect(() => {
    getAsmaulHusna().then((response) => setListAsmaulHusna(response.data));
  }, []);

  return (
    <div className='px-[10%]'>
      <TableHusna data={listAsmaulHusna} id='id' />
    </div>
  );
};

export default AsmaulHusna;
