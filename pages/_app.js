import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Layout from '../components/layout'
import AccountContext from '/contexts/accountContext'
import { useState } from 'react'

export default function MyApp({ 
  Component,
  pageProps: { session, ...pageProps}
}) {

  const [address, setAddress] = useState(null);

  return (
    <AccountContext.Provider value={{address, setAddress}}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </AccountContext.Provider>
    
  )
}