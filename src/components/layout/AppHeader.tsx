import { Link, NavLink } from 'react-router-dom'
import { Bell, ChevronDown } from 'lucide-react'
import Logo from '../ui/Logo'

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
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <Link to="/" className="flex items-center">
          <Logo />
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
