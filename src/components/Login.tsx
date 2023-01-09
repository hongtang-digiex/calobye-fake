/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/quotes */
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styles from '../styles/Login.module.css';

import Button from '@mui/material/Button';

import Cookies from 'universal-cookie';

import axios from 'axios';

export default function Login() {
  const [token, setToken]: any = useState();
  const [userName, setUserName] = useState();
  const [passWord, setPassWord] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  const inputUserName: any = useRef();
  const inputPass: any = useRef();
  const router = useRouter();

  const hashPass = require('md5');
  const http = require('http');

  const valueUser = () => {
    setUserName(
      inputUserName.current.value == ''
        ? 'không UserName để trống !!!'
        : inputUserName.current.value.length > 0
        ? ''
        : inputUserName.current.value,
    );
    setPassWord(
      inputPass.current.value == ''
        ? 'không PassWord để trống !!!'
        : inputPass.current.value.length > 0
        ? ''
        : hashPass(inputPass.current.value),
    );
    setIsDisabled(
      inputUserName.current.value == '' || inputPass.current.value == '',
    );
  };

  const loginClick = async () => {
    const response: any = await axios
      .post(
        'https://dev-api.digiex.asia/calobye-be-dev/api/auth/login',
        // '{\n  "login_id": "string",\n  "password_hash": "string",\n  "user_role": "SYSTEM_ADMIN",\n  "keep_login": true\n}',
        {
          login_id: userName,
          password_hash: passWord,
          user_role: 'SYSTEM_ADMIN',
          keep_login: true,
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res: any) => {
        const result = res?.data?.status;
        setToken(result == 200 ? 'Oke' : 'Incorrect password or account');
        result == 200 ? router.push('/') : null;
      })
      .catch((error: any) => error);
    console.log(token);
  };

  return (
    <>
      <div className={`${styles.login} text-black`}>
        <div className={`${styles.title}`}>CALOBYE</div>
        <form className={`${styles.form}`}>
          <input
            className={`${styles.input} rounded`}
            type="text"
            ref={inputUserName}
            name="uname"
            onChange={valueUser}
            placeholder="UserName..."
          />{' '}
          <br />
          <span className={`text-red-500`}>{userName}</span>
          <br />
          <input
            className={`${styles.input} rounded`}
            type="password"
            ref={inputPass}
            name="pass"
            onChange={valueUser}
            placeholder="PassWord..."
          />
          <br />
          <span className={`text-red-500`}>{passWord}</span>
          <br />
          <Button
            disabled={isDisabled}
            className={`${styles.button} mt-16 rounded text-white`}
            onClick={loginClick}
            variant="contained"
          >
            Login
          </Button>
          <div className={`text-red-500`}>{token}</div>
        </form>
      </div>
    </>
  );
}
