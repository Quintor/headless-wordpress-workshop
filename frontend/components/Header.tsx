import Head from 'next/head';
import React from 'react';
import stylesheet from '../styles/style.scss';

const Header = () => (
  <>
    <Head>
      <style
        dangerouslySetInnerHTML={{ __html: (stylesheet as unknown) as string }}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>Star Wars 🌌 - WordPress + Next.JS</title>
    </Head>
  </>
);

export default Header;
