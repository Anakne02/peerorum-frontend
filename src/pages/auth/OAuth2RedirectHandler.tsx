import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useSpec } from '../../context/SpecContext'
import { fetchMyProfile } from '../../api/profile'


export default function OAuth2RedirectHandler() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const { loadFromProfile } = useSpec()


  const handledRef = useRef(false)

  useEffect(() => {
    if (handledRef.current) {
      return
    }

    handledRef.current = true

    const token = searchParams.get('token')
    const role = searchParams.get('role')
    const uuid = searchParams.get('uuid')
    const normalizedRole =
      role === 'ROLE_GUEST' ||
      role === 'ROLE_USER' ||
      role === 'ROLE_ADMIN'
        ? role
        : 'ROLE_USER'

    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    localStorage.setItem('token', token)

    localStorage.setItem('role', normalizedRole)

    if (uuid) {
      localStorage.setItem('uuid', uuid)
    }

    const processLogin = async () => {
      if (normalizedRole === 'ROLE_GUEST') {
        login({
          name: 'User',
          role: 'user',
          hasSpec: false,
        })
        navigate('/signup', { replace: true })
      } else {
        try {
          const profile = await fetchMyProfile()
          login({
            name: profile.name,
            nickname: profile.nickname,
            school: profile.university,
            department: profile.major,
            desiredJob: profile.desiredJob,
            role: normalizedRole === 'ROLE_ADMIN' ? 'admin' : 'user',
            hasSpec: true,
          })
          loadFromProfile(profile)
        } catch (e) {
          console.error('Failed to fetch profile', e)
          login({
            name: 'User',
            role: normalizedRole === 'ROLE_ADMIN' ? 'admin' : 'user',
            hasSpec: true,
          })
        }

        if (normalizedRole === 'ROLE_ADMIN') {
          navigate('/admin', { replace: true })
        } else {
          navigate('/mypage/specs', { replace: true })
        }
      }
    }
    processLogin()
  }, [
    searchParams,
    navigate,
    login,
  ])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center text-gray-500">
        로그인 처리 중입니다...
      </div>
    </div>
  )
}
