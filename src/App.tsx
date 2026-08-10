import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignupModalProvider } from './context/SignupModalContext'
import SignupModal from './components/auth/SignupModal'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import HowToUsePage from './pages/HowToUsePage'
import SupportPage from './pages/SupportPage'
import LoginPage from './pages/auth/LoginPage'
import MySpecsPage from './pages/mypage/MySpecsPage'
import VerificationStatusPage from './pages/mypage/VerificationStatusPage'
import CompareRequireSpecPage from './pages/compare/CompareRequireSpecPage'
import AnonymousProfileDetailPage from './pages/compare/AnonymousProfileDetailPage'
import CompareSpec2Page from './pages/compare/CompareSpec2Page'

function App() {
  return (
    <BrowserRouter>
      <SignupModalProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-to-use" element={<HowToUsePage />} />
          <Route path="/support" element={<SupportPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/mypage/specs" element={<MySpecsPage />} />
          <Route path="/mypage/verification" element={<VerificationStatusPage />} />

          <Route path="/compare" element={<CompareRequireSpecPage />} />
          <Route path="/compare/:studentId" element={<AnonymousProfileDetailPage />} />
          <Route path="/comparespec2" element={<CompareSpec2Page />} />
        </Routes>

        <SignupModal />
      </SignupModalProvider>
    </BrowserRouter>
  )
}

export default App
