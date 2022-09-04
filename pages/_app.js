import '../styles/globals.css'
import Layout from '../components/layout'
import React, { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
      
  )
}