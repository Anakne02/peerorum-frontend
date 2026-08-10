import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CTASection from '../components/landing/CTASection'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
