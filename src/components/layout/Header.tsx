import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import { useSignupModal } from '../../context/SignupModalContext'

const NAV_ITEMS = [
  { label: '스펙 비교', to: '/compare' },
  { label: '서비스 소개', to: '/about' },
  { label: '이용 방법', to: '/how-to-use' },
  { label: '고객지원', to: '/support' },
]

export default function Header() {
  const { open: openSignupModal } = useSignupModal()

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-[15px] font-medium text-gray-600 transition-colors hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link to="/login" className="text-[15px] font-medium text-gray-600 hover:text-ink-900">
            로그인
          </Link>
          <button
            type="button"
            onClick={openSignupModal}
            className="rounded-full bg-blue-600 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-blue-700"
          >
            회원가입
          </button>
        </div>
      </div>
    </header>
  )
}
