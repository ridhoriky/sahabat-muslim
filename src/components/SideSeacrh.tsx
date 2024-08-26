import React, { useState } from 'react';
import { Button, Drawer, Input, Space } from 'antd';

const SideComp: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button type='primary' onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title='Basic Drawer'
        placement={'left'}
        closable={false}
        onClose={onClose}
        loading={false}
        open={open}
        key={'left'}
      >
        <p>
          <Input placeholder='makanan' />
        </p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default SideComp;
