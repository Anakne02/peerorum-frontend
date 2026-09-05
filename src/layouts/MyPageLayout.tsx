import { useEffect, type ReactNode } from 'react'
import Header from '../components/layout/Header'
import MyPageSidebar from '../components/layout/MyPageSidebar'
import Footer from '../components/layout/Footer'
import { useAuth } from '../context/AuthContext'
import { useSpec } from '../context/SpecContext'
import { fetchMyProfile } from '../api/profile'


export default function MyPageLayout({
  children,
  sidebarFooter,
}: {
  children: ReactNode
  sidebarFooter?: ReactNode
}) {
  const { user, updateProfile } = useAuth()
  const { loadFromProfile } = useSpec()

  useEffect(() => {
    if (user && user.hasSpec) {
      fetchMyProfile()
        .then((profile) => {
          loadFromProfile(profile)
          
          const currentYear = new Date().getFullYear();
          const gradeNum = profile.entranceYear ? currentYear - profile.entranceYear + 1 : undefined;
          const gradeStr = gradeNum ? `${Math.min(4, Math.max(1, gradeNum))}학년` : '';

          updateProfile({
            name: profile.name,
            nickname: profile.nickname,
            school: profile.university,
            department: profile.major,
            grade: gradeStr,
            desiredJob: profile.desiredJob || '',
          })
        })
        .catch(err => console.error("Failed to fetch profile in MyPageLayout", err))
    }
  }, [user?.hasSpec])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <div className="mx-auto flex w-full max-w-7xl flex-1">
        <MyPageSidebar footer={sidebarFooter} />
        <main className="min-w-0 flex-1 px-6 py-8 md:px-10">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
