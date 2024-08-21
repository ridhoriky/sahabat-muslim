import { Table } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  arab: string;
  id: number;
  indo: string;
  latin: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'No',
    dataIndex: 'id',
  },
  {
    title: 'Arab',
    dataIndex: 'arab',
  },
  {
    title: 'Indonesia',
    dataIndex: 'indo',
  },
  {
    title: 'Latin',
    dataIndex: 'latin',
  },
];
type Props = { data: undefined | DataType[]; id: string };
const TableHusna = (props: Props) => {
  const { data, id } = props;
  return <Table columns={columns} dataSource={data} rowKey={id} />;
};
export default TableHusna;
