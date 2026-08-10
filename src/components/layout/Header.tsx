import { Link } from 'react-router-dom'

const NAV_ITEMS = [
  { label: '스펙 비교', to: '/compare' },
  { label: '서비스 소개', to: '/about' },
  { label: '이용 방법', to: '/how-to-use' },
  { label: '고객지원', to: '/support' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
            </svg>
          </span>
          <span className="text-[17px] font-bold text-ink-900">Peer Up</span>
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
          <Link
            to="/signup"
            className="rounded-full bg-blue-600 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-blue-700"
          >
            회원가입
          </Link>
        </div>
      </div>
    </header>
  )
}
