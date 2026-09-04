import { createContext, useContext, useState, type ReactNode } from 'react'

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
  logout: () => void
  setHasSpec: (hasSpec: boolean) => void
  updateProfile: (partial: Partial<AuthUser>) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  const login: AuthContextValue['login'] = (partial) => {
    setUser({
      name: partial?.name ?? '회원',
      nickname: partial?.nickname ?? '',
      email: partial?.email ?? '',
      school: partial?.school ?? '',
      department: partial?.department ?? '',
      grade: partial?.grade ?? '',
      desiredJob: partial?.desiredJob ?? '',
      hasSpec: partial?.hasSpec ?? false,
      role: partial?.role ?? 'user',
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('uuid')
  }

  const setHasSpec = (hasSpec: boolean) => {
    setUser((prev) => (prev ? { ...prev, hasSpec } : prev))
  }

  const updateProfile = (partial: Partial<AuthUser>) => {
    setUser((prev) => (prev ? { ...prev, ...partial } : prev))
  }

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
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
