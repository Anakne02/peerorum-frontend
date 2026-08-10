import type { ReactNode } from 'react'
import AppHeader from '../components/layout/AppHeader'
import MyPageSidebar from '../components/layout/MyPageSidebar'

export default function MyPageLayout({
  children,
  sidebarFooter,
}: {
  children: ReactNode
  sidebarFooter?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader />
      <div className="mx-auto flex max-w-[1400px]">
        <MyPageSidebar footer={sidebarFooter} />
        <main className="min-w-0 flex-1 px-6 py-8 md:px-10">{children}</main>
      </div>
    </div>
  )
}
