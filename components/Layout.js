import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
    <div data-theme="light">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <script src="node_modules/particlesjs/src/particles.js"></script>
    </div>

    </>
  )
}