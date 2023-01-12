/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-document-import-in-page */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import Product from '@/components/Product/Product';
import SideMenu from '@/components/SideMenu';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';

export default function products() {
  const { asPath }: NextRouter = useRouter();
  return (
    <div className={`container  mx-auto`}>
      <Head>
        <title>Product Management</title>
        <meta
          name="description"
          content="Products"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`h-[100vh]`}>
        <div>Side menu</div>
        <div className={`flex gap-6 w-[100%`}>
          <SideMenu currentPath={asPath} />
          <Product />
        </div>
      </div>
    </div>
  );
}