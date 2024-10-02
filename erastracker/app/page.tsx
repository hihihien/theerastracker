import Link from 'next/link'
import Hero from './components/Hero/Hero'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import SelectShow from './components/SelectShow/SelectShow'

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <SelectShow />
      <Link href="/users">Users</Link>
      <Footer />
    </main>
  )
}
