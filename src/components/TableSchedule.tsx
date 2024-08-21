import { Table } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Tanggal',
    dataIndex: 'tanggal',
    key: 'tanggal',
  },
  {
    title: 'Subuh',
    dataIndex: 'subuh',
    key: 'subuh',
  },
  {
    title: 'Dzuhur',
    dataIndex: 'dzuhur',
    key: 'dzuhur',
  },
  {
    title: 'Ashar',
    key: 'ashar',
    dataIndex: 'ashar',
  },
  {
    title: 'Maghrib',
    key: 'maghrib',
    dataIndex: 'maghrib',
  },
  {
    title: 'Isya',
    key: 'isya',
    dataIndex: 'ashar',
  },
];
type Props = { data: undefined | DataType[]; id: string };
const TableSchedule = (props: Props) => {
  const { data, id } = props;
  return <Table columns={columns} dataSource={data} rowKey={id} />;
};
export default TableSchedule;
