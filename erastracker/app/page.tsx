import Link from 'next/link'
import ProductCard from './components/ProductCard/ProductCard'
import Hero from './components/Hero/Hero'

export default function Home() {
  return (
    <main>
      <Hero />
      <Link href="/users">Users</Link>
      <ProductCard />
    </main>
  )
}
