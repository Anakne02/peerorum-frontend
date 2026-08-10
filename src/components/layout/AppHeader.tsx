import { Link, NavLink } from 'react-router-dom'
import { Bell, ChevronDown } from 'lucide-react'

const NAV_ITEMS = [
  { label: '스펙 비교', to: '/compare' },
  { label: '서비스 소개', to: '/about' },
  { label: '이용 방법', to: '/how-to-use' },
  { label: '고객지원', to: '/support' },
]

export default function AppHeader({
  userLabel = '유경님',
  anonymous = false,
}: {
  userLabel?: string
  anonymous?: boolean
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
            </svg>
          </span>
          <span className="text-[17px] font-bold text-ink-900">Peer Up</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className="text-[14.5px] font-medium text-gray-600 transition-colors hover:text-ink-900"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-gray-600" aria-label="알림">
            <Bell className="h-5 w-5" />
          </button>
          <button className="flex items-center gap-1.5">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white ${
                anonymous ? 'bg-gray-400' : 'bg-blue-600'
              }`}
            >
              {anonymous ? '익' : '유'}
            </span>
            <span className="text-[13.5px] font-medium text-ink-900">{userLabel}</span>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  )
}
