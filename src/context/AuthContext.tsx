import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { clearAuthenticationSession } from '../api/auth'
import { api } from '../api/axios'

export type UserRole = 'user' | 'admin'

export interface AuthUser {
  name: string
  nickname: string
  email: string
  school: string
  department: string
  grade: string
  desiredJob: string
  hasSpec: boolean
  role: UserRole
}

interface AuthContextValue {
  user: AuthUser | null
  isLoggedIn: boolean
  isAdmin: boolean
  login: (user?: Partial<AuthUser>) => void
  logout: () => Promise<void>
  setHasSpec: (hasSpec: boolean) => void
  updateProfile: (partial: Partial<AuthUser>) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function getStoredUserRole(): UserRole {
  const storedRole = localStorage.getItem('role')
  const storedUiRole = localStorage.getItem('uiRole')

  if (storedRole === 'ROLE_ADMIN' || storedUiRole === 'admin') {
    return 'admin'
  }

  return 'user'
}

function emptyUser(partial?: Partial<AuthUser>): AuthUser {
  return {
    name: partial?.name?.trim() || localStorage.getItem('name') || '회원',
    nickname: partial?.nickname ?? localStorage.getItem('nickname') ?? '',
    email: partial?.email ?? '',
    school: partial?.school ?? '',
    department: partial?.department ?? '',
    grade: partial?.grade ?? '',
    desiredJob: partial?.desiredJob ?? '',
    hasSpec: partial?.hasSpec ?? localStorage.getItem('hasSpec') === 'true',
    role: partial?.role ?? getStoredUserRole(),
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    return localStorage.getItem('token') ? emptyUser() : null
  })

  const login: AuthContextValue['login'] = useCallback((partial) => {
    const nextUser = emptyUser(partial)

    localStorage.setItem('name', nextUser.name)
    localStorage.setItem('nickname', nextUser.nickname)
    localStorage.setItem('hasSpec', String(nextUser.hasSpec))
    localStorage.setItem('uiRole', nextUser.role)
    setUser(nextUser)
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      clearAuthenticationSession()
      setUser(null)
    }
  }, [])

  const setHasSpec = useCallback((hasSpec: boolean) => {
    localStorage.setItem('hasSpec', String(hasSpec))
    setUser((prev) => (prev ? { ...prev, hasSpec } : prev))
  }, [])

  const updateProfile = useCallback((partial: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) {
        return prev
      }

      const nextUser = { ...prev, ...partial }
      localStorage.setItem('name', nextUser.name)
      localStorage.setItem('nickname', nextUser.nickname)
      return nextUser
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        setHasSpec,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return ctx
}
