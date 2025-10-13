import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import TradingTools from '@/components/TradingTools'
import TradingTiers from '@/components/TradingTiers'
import TraderTestimonials from '@/components/TraderTestimonials'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <HowItWorks />
        <TradingTools />
        <TradingTiers />
        <TraderTestimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
