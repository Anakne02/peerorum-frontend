with open("src/context/AuthContext.tsx", "r") as f:
    content = f.read()

old_str = """      const nextUser = { ...prev, ...partial }
      localStorage.setItem('name', nextUser.name)
      localStorage.setItem('nickname', nextUser.nickname)
      return nextUser"""

new_str = """      const nextUser = { ...prev, ...partial }
      localStorage.setItem('name', nextUser.name)
      localStorage.setItem('nickname', nextUser.nickname)
      if (nextUser.email) localStorage.setItem('email', nextUser.email)
      if (nextUser.school) localStorage.setItem('school', nextUser.school)
      if (nextUser.department) localStorage.setItem('department', nextUser.department)
      if (nextUser.grade) localStorage.setItem('grade', nextUser.grade)
      if (nextUser.desiredJob) localStorage.setItem('desiredJob', nextUser.desiredJob)
      localStorage.setItem('hasSpec', String(nextUser.hasSpec))
      return nextUser"""

content = content.replace(old_str, new_str)

with open("src/context/AuthContext.tsx", "w") as f:
    f.write(content)
