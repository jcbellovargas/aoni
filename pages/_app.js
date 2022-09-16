import '../styles/globals.css'
import Layout from '../components/layout'
import AccountContext from '/contexts/accountContext'
import { useState } from 'react'

export default function MyApp({ Component, pageProps }) {

  const [address, setAddress] = useState(null);

  return (
    <AccountContext.Provider value={{address, setAddress}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AccountContext.Provider>
      
  )
}