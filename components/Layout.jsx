import Head from "next/head";
import React from "react";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Smart Pulse</title>
      </Head>
      <main>{children}</main>
    </>
  );
}

export default Layout;
