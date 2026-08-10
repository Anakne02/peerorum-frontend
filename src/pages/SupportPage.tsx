import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FeedbackSection from '../components/landing/FeedbackSection'

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <FeedbackSection />
      </main>
      <Footer />
    </div>
  )
}
