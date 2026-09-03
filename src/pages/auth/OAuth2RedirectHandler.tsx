import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  clearAuthenticationSession,
  refreshAuthentication,
  saveAuthenticationSession,
} from '../../api/auth'
import { fetchMyProfile } from '../../api/profile'
import { useAuth } from '../../context/AuthContext'

export default function OAuth2RedirectHandler() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const handledRef = useRef(false)

  useEffect(() => {
    if (handledRef.current) {
      return
    }

    handledRef.current = true

    const completeLogin = async () => {
      const token = searchParams.get('token')
      const role = searchParams.get('role')
      const uuid = searchParams.get('uuid')

      if (!token) {
        navigate('/login?error=oauth2_failed', { replace: true })
        return
      }

      localStorage.setItem('token', token)
      if (role) localStorage.setItem('role', role)
      if (uuid) localStorage.setItem('uuid', uuid)

      try {
        const session = await refreshAuthentication()
        saveAuthenticationSession(session)

        if (session.role === 'ROLE_GUEST') {
          login({
            name: session.name,
            role: 'user',
            hasSpec: false,
          })
          navigate('/signup?mode=onboarding', { replace: true })
          return
        }

        let profile
        try {
          profile = await fetchMyProfile()
        } catch (profileError) {
          console.error('Failed to fetch profile after OAuth2 login', profileError)
        }

        login({
          name: profile?.name || session.name,
          nickname: profile?.nickname || '',
          school: profile?.university || '',
          department: profile?.major || '',
          desiredJob: profile?.desiredJob || '',
          role: session.role === 'ROLE_ADMIN' ? 'admin' : 'user',
          hasSpec: true,
        })

        navigate(
          session.role === 'ROLE_ADMIN' ? '/admin' : '/mypage/specs',
          { replace: true },
        )
      } catch (error) {
        console.error('Failed to complete OAuth2 login', error)
        clearAuthenticationSession()
        navigate('/login?error=oauth2_failed', { replace: true })
      }
    }

    void completeLogin()
  }, [searchParams, navigate, login])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center text-gray-500">
        로그인 처리 중입니다...
      </div>
    </div>
  )
}
