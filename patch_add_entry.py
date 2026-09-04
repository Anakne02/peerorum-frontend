import re
with open("src/pages/mypage/SpecEditPage.tsx", "r") as f:
    content = f.read()

old_add_entry = """  const addEntry = (categoryKey: string) => {
    setEntries((prev) => ({ ...prev, [categoryKey]: [...prev[categoryKey], {}] }))
  }"""

new_add_entry = """  const { user } = useAuth()
  const addEntry = (categoryKey: string) => {
    setEntries((prev) => ({ 
      ...prev, 
      [categoryKey]: [
        ...prev[categoryKey], 
        categoryKey === 'gpa' ? { grade: user?.grade || '4학년' } : {}
      ] 
    }))
  }"""

if old_add_entry in content:
    content = content.replace(old_add_entry, new_add_entry)
else:
    print("Could not find addEntry block!")

# Also patch initial state if we can
old_init = """  const [entries, setEntries] = useState<Record<string, Entry[]>>(savedEntries)"""
new_init = """  const [entries, setEntries] = useState<Record<string, Entry[]>>(() => {
    const initialized = { ...savedEntries };
    if (initialized.gpa && initialized.gpa.length > 0 && !initialized.gpa[0].grade) {
      initialized.gpa[0] = { ...initialized.gpa[0], grade: user?.grade || '4학년' };
    }
    return initialized;
  })"""

if old_init in content:
    content = content.replace(old_init, new_init)
else:
    print("Could not find init block!")

with open("src/pages/mypage/SpecEditPage.tsx", "w") as f:
    f.write(content)

print("Patch complete")
