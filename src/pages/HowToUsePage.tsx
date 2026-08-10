import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import HowItWorksSection from '../components/landing/HowItWorksSection'

export default function HowToUsePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  )
}
