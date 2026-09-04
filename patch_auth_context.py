with open("src/context/AuthContext.tsx", "r") as f:
    content = f.read()

old_str = """function emptyUser(partial?: Partial<AuthUser>): AuthUser {
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
}"""

new_str = """function emptyUser(partial?: Partial<AuthUser>): AuthUser {
  return {
    name: partial?.name?.trim() || localStorage.getItem('name') || '회원',
    nickname: partial?.nickname ?? localStorage.getItem('nickname') ?? '',
    email: partial?.email ?? localStorage.getItem('email') ?? '',
    school: partial?.school ?? localStorage.getItem('school') ?? '',
    department: partial?.department ?? localStorage.getItem('department') ?? '',
    grade: partial?.grade ?? localStorage.getItem('grade') ?? '',
    desiredJob: partial?.desiredJob ?? localStorage.getItem('desiredJob') ?? '',
    hasSpec: partial?.hasSpec ?? localStorage.getItem('hasSpec') === 'true',
    role: partial?.role ?? getStoredUserRole(),
  }
}"""

old_login_str = """    localStorage.setItem('name', nextUser.name)
    localStorage.setItem('nickname', nextUser.nickname)
    localStorage.setItem('hasSpec', String(nextUser.hasSpec))"""

new_login_str = """    localStorage.setItem('name', nextUser.name)
    localStorage.setItem('nickname', nextUser.nickname)
    localStorage.setItem('email', nextUser.email)
    localStorage.setItem('school', nextUser.school)
    localStorage.setItem('department', nextUser.department)
    localStorage.setItem('grade', nextUser.grade)
    localStorage.setItem('desiredJob', nextUser.desiredJob)
    localStorage.setItem('hasSpec', String(nextUser.hasSpec))"""

content = content.replace(old_str, new_str)
content = content.replace(old_login_str, new_login_str)

with open("src/context/AuthContext.tsx", "w") as f:
    f.write(content)
