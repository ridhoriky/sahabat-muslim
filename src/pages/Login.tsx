import React, { CSSProperties } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const styleContainer: CSSProperties = {
  minWidth: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FFF5D9',
};

const styleCard: CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '5px',
  padding: '20px 30px',
};

const Login: React.FC = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { email = '', password = '' } = values;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response?.user);
    } catch (error) {
      alert('email dan password tidak valid');
    }
  };

  return (
    <div style={styleContainer}>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={styleCard}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <h2
          style={{
            textAlign: 'center',
            WebkitTextStroke: '0.2px black',
            color: 'black',
            fontSize: '20px',
            fontWeight: 'bold',
            paddingBottom: '25px',
          }}
        >
          Login
        </h2>

        <Form.Item<FieldType>
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Masukkan email anda' },
            { type: 'email', message: 'Masukkan email dengan benar' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
          name='password'
          rules={[
            { required: true, message: 'Masukkan password' },
            { min: 8, message: 'Panjang password minimal 8 karakter' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Ingat saya</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type='primary'
            style={{ backgroundColor: '#CD5C08' }}
            htmlType='submit'
          >
            Masuk
          </Button>
        </Form.Item>
        <h2
          style={{
            textAlign: 'center',
            WebkitTextStroke: '0.2px black',
            color: 'black',
            fontSize: '16px',
            marginTop: '20px',
          }}
        >
          Belum Punya akun?{' '}
          <Link
            to={'/register'}
            className='text-darkBrown hover:text-darkBrown font-bold'
          >
            Daftar{' '}
          </Link>
        </h2>
      </Form>
    </div>
  );
};

export default Login;
