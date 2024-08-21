import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '/',
    label: (
      <Link to={'/'} rel='noopener noreferrer'>
        Sahabat Muslim
      </Link>
    ),
  },
  {
    key: '/quran',
    label: (
      <Link to={'/quran'} rel='noopener noreferrer'>
        Quran
      </Link>
    ),
  },
  {
    key: '/jadwal',
    label: (
      <Link to={'/jadwal'} rel='noopener noreferrer'>
        Jadwal Sholat
      </Link>
    ),
  },
  {
    key: '/kalender',
    label: (
      <Link to={'/kalender'} rel='noopener noreferrer'>
        Kalender
      </Link>
    ),
  },
  {
    key: '/asmaul-husna',
    label: (
      <Link to={'/asmaul-husna'} rel='noopener noreferrer'>
        Asmaul Husna
      </Link>
    ),
  },

  // {
  //   label: 'Navigation Three - Submenu',
  //   key: 'SubMenu',
  //   icon: <SettingOutlined />,
  //   children: [
  //     {
  //       type: 'group',
  //       label: 'Item 1',
  //       children: [
  //         { label: 'Option 1', key: 'setting:1' },
  //         { label: 'Option 2', key: 'setting:2' },
  //       ],
  //     },
  //     {
  //       type: 'group',
  //       label: 'Item 2',
  //       children: [
  //         { label: 'Option 3', key: 'setting:3' },
  //         { label: 'Option 4', key: 'setting:4' },
  //       ],
  //     },
  //   ],
  // },
];

type Props = {
  location: string;
};

const Navbar = (props: Props) => {
  return (
    <div
      style={{
        padding: '0 10%',
        width: '100%',
        backgroundColor: '#FFF5C9 ',
      }}
    >
      <Menu
        mode='horizontal'
        style={{
          backgroundColor: '#FFF5C9',
        }}
        defaultSelectedKeys={[props.location]}
        items={items}
      >
        {/* <div style={{ margin: '0 auto' }}>
          <Menu.Item key='beranda'>
            <Link to={'/'}>Quran</Link>
          </Menu.Item>
          <Menu.Item key='jadwal'>
            <Link to={'/jadwal'}>Jadwal</Link>
          </Menu.Item>
          <Menu.Item key='kalender'>
            <Link to={'/kalender'}>Kalender</Link>
          </Menu.Item>
          <Menu.Item key='asmaul-husna'>
            <Link to={'/asmaul-husna'}>Asmaul Husna</Link>
          </Menu.Item>
        </div> */}
      </Menu>
    </div>
  );
};

export default Navbar;
