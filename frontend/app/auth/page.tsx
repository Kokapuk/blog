'use client';

import { UserDTO } from '@/utils/types';
import axios from 'axios';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import styles from '../../styles/Auth.module.scss';

export type AuthType = 'Sign In' | 'Sign Up';

const Auth = () => {
  const [authType, setAuthType] = useState<AuthType>('Sign Up');
  const [userDTO, setUserDTO] = useState<UserDTO>({ login: '', password: '' });
  const router = useRouter();

  useEffect(() => {
    if (document.cookie.includes('session')) {
      router.push('/dashboard');
    }
  }, []);

  const toggleAuthType = () => {
    setAuthType((prev) => (prev === 'Sign Up' ? 'Sign In' : 'Sign Up'));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await axios.post(`/api/${authType === 'Sign Up' ? 'signUp' : 'signIn'}`, userDTO);
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classNames('paper', styles.form)}>
      <h3>{authType}</h3>
      <input
        value={userDTO.login}
        onChange={(e) => setUserDTO((prev) => ({ ...prev, login: e.target.value }))}
        type='text'
        minLength={3}
        maxLength={12}
        placeholder='Login'
        required
      />
      <input
        value={userDTO.password}
        onChange={(e) => setUserDTO((prev) => ({ ...prev, password: e.target.value }))}
        type='password'
        minLength={6}
        maxLength={32}
        placeholder='Password'
        required
      />
      <button>{authType}</button>
      <button className='button__low-attention' type='button' onClick={toggleAuthType}>
        {authType === 'Sign Up' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Auth;
