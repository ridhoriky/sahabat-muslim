import React, { CSSProperties } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { setDoc, doc } from 'firebase/firestore';
import SignInwithGoogle from '../components/SignInwithGoogle';

type FieldType = {
  email?: string;
  password?: string;
  confirmPassowrd?: string;
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
  width: '40%',
  backgroundColor: 'white',
  borderRadius: '5px',
  padding: '20px 30px',
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { email = '', password = '' } = values;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: email,
          photo: '',
          saveSetting: {},
          markedSurat: {},
        });
        navigate('/login');
      }
    } catch (error) {
      alert('Pendaftaran gagal');
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
          Register
        </h2>

        <div className='text-center flex flex-col justify-center items-center'>
          <SignInwithGoogle text='Daftar' />
        </div>

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
        <Form.Item
          name='password'
          label='Kata Sandi'
          rules={[
            {
              required: true,
              message: 'masukkan password anda',
            },
            {
              min: 8,
              message: 'password minimal 8 karakter',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Konfirmasi Kata Sandi'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Masukkan ulang kata sandi anda',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Kata sandi tidak sama'));
              },
            }),
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
            Daftar
          </Button>
        </Form.Item>

        <h2
          style={{
            textAlign: 'center',
            WebkitTextStroke: '0.2px black',
            color: 'black',
            fontSize: '14px',
            marginTop: '20px',
          }}
        >
          Sudah Punya akun?{' '}
          <Link
            to={'/login'}
            className='text-darkBrown hover:text-darkBrown font-bold'
          >
            Login{' '}
          </Link>
        </h2>
      </Form>
    </div>
  );
};

export default Register;
