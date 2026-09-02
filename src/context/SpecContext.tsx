import { createContext, useContext, useState, type ReactNode } from 'react'

export type SpecCategoryKey = 'gpa' | 'language' | 'certificate' | 'activity' | 'intern' | 'award'

export type SpecEntry = Record<string, string>

export type SpecEntries = Record<SpecCategoryKey, SpecEntry[]>

const EMPTY_ENTRIES: SpecEntries = {
  gpa: [],
  language: [],
  certificate: [],
  activity: [],
  intern: [],
  award: [],
}

interface SpecContextValue {
  entries: SpecEntries
  setCategoryEntries: (categoryKey: SpecCategoryKey, categoryEntries: SpecEntry[]) => void
  resetEntries: () => void
}

const SpecContext = createContext<SpecContextValue | null>(null)

export function SpecProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<SpecEntries>(EMPTY_ENTRIES)

  const setCategoryEntries: SpecContextValue['setCategoryEntries'] = (categoryKey, categoryEntries) => {
    setEntries((prev) => ({ ...prev, [categoryKey]: categoryEntries }))
  }

  const resetEntries = () => setEntries(EMPTY_ENTRIES)

  return (
    <SpecContext.Provider value={{ entries, setCategoryEntries, resetEntries }}>
      {children}
    </SpecContext.Provider>
  )
}

export function useSpec() {
  const ctx = useContext(SpecContext)
  if (!ctx) throw new Error('useSpec must be used within SpecProvider')
  return ctx
}
