import Hero from '../components/hero/Hero'
import Villas from './Villas'
import PageThree from '../components/services/PageThree'

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black text-white">
      <Hero />
      <Villas />
      <PageThree />
    </main>
  )
}
