import Head from 'next/head';
import React from 'react';
import stylesheet from '../styles/style.scss';

const Header = () => (
  <div>
    <Head>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>WordPress + React Starter Kit Frontend by Postlight</title>
    </Head>
  </div>
);

export default Header;
