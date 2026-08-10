import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import HowToUsePage from './pages/HowToUsePage'
import SupportPage from './pages/SupportPage'
import LoginPage from './pages/auth/LoginPage'
import SignupIntroPage from './pages/auth/SignupIntroPage'
import SignupStep1Page from './pages/auth/SignupStep1Page'
import SignupStep2Page from './pages/auth/SignupStep2Page'
import SignupStep3Page from './pages/auth/SignupStep3Page'
import SignupTermsPage from './pages/auth/SignupTermsPage'
import SignupCompletePage from './pages/auth/SignupCompletePage'
import MySpecsPage from './pages/mypage/MySpecsPage'
import VerificationStatusPage from './pages/mypage/VerificationStatusPage'
import CompareRequireSpecPage from './pages/compare/CompareRequireSpecPage'
import AnonymousProfileDetailPage from './pages/compare/AnonymousProfileDetailPage'
import CompareSpec1Page from './pages/compare/CompareSpec1Page'
import CompareSpec2Page from './pages/compare/CompareSpec2Page'
import CompareSpec3Page from './pages/compare/CompareSpec3Page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-to-use" element={<HowToUsePage />} />
        <Route path="/support" element={<SupportPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupIntroPage />} />
        <Route path="/signup/info/1" element={<SignupStep1Page />} />
        <Route path="/signup/info/2" element={<SignupStep2Page />} />
        <Route path="/signup/info/3" element={<SignupStep3Page />} />
        <Route path="/signup/terms" element={<SignupTermsPage />} />
        <Route path="/signup/complete" element={<SignupCompletePage />} />

        <Route path="/mypage/specs" element={<MySpecsPage />} />
        <Route path="/mypage/verification" element={<VerificationStatusPage />} />

        <Route path="/compare" element={<CompareRequireSpecPage />} />
        <Route path="/compare/:studentId" element={<AnonymousProfileDetailPage />} />
        <Route path="/comparespec1" element={<CompareSpec1Page />} />
        <Route path="/comparespec2" element={<CompareSpec2Page />} />
        <Route path="/comparespec3" element={<CompareSpec3Page />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
