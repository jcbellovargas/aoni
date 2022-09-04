import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <div data-theme="light">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}