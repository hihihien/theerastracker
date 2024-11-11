import Link from 'next/link'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import App from './components/App'

export default function Home() {
  return (
    <main>
      <NavBar />
      <App/>
      <Link href="/aboutMe" />
      <Footer />
    </main>
  )
}
