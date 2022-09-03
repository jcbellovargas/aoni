import Navbar from './Navbar'
import Footer from './Footer'

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