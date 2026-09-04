with open("src/pages/mypage/SpecEditPage.tsx", "r") as f:
    content = f.read()

import re

old_str = """  const [entries, setEntries] = useState<Record<string, Entry[]>>(() => {
    return CATEGORIES.reduce((acc, cat) => {
      acc[cat.key] =
        contextEntries[cat.key].length > 0
          ? [...contextEntries[cat.key]]
          : cat.key === 'gpa'
            ? [{ gpaAverage: '', convertedScore: '', majorGpaAverage: '', grade: '' }]
            : []
      return acc
    }, {} as Record<string, SpecEntry[]>)
  })"""

new_str = """  const { user } = useAuth()
  const [entries, setEntries] = useState<Record<string, Entry[]>>(() => {
    return CATEGORIES.reduce((acc, cat) => {
      acc[cat.key] =
        contextEntries[cat.key].length > 0
          ? contextEntries[cat.key].map(entry => ({
              ...entry,
              ...(cat.key === 'gpa' && !entry.grade ? { grade: user?.grade || '4학년' } : {})
            }))
          : cat.key === 'gpa'
            ? [{ gpaAverage: '', convertedScore: '', majorGpaAverage: '', grade: user?.grade || '4학년' }]
            : []
      return acc
    }, {} as Record<string, SpecEntry[]>)
  })"""

content = content.replace(old_str, new_str)

with open("src/pages/mypage/SpecEditPage.tsx", "w") as f:
    f.write(content)
