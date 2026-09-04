with open("src/pages/auth/LoginPage.tsx", "r") as f:
    content = f.read()

old_str = """      login({
        name: profile?.name || session.name,
        nickname: profile?.nickname || '',
        email: email.trim(),
        school: profile?.university || '',
        department: profile?.major || '',
        desiredJob: profile?.desiredJob || '',
        role: session.role === 'ROLE_ADMIN' ? 'admin' : 'user',
        hasSpec: true,
      })"""

new_str = """      const currentYear = new Date().getFullYear();
      const gradeNum = profile?.entranceYear ? currentYear - profile.entranceYear + 1 : undefined;
      const gradeStr = gradeNum ? `${Math.min(4, Math.max(1, gradeNum))}학년` : '';

      login({
        name: profile?.name || session.name,
        nickname: profile?.nickname || '',
        email: email.trim(),
        school: profile?.university || '',
        department: profile?.major || '',
        grade: gradeStr,
        desiredJob: profile?.desiredJob || '',
        role: session.role === 'ROLE_ADMIN' ? 'admin' : 'user',
        hasSpec: true,
      })"""

content = content.replace(old_str, new_str)
with open("src/pages/auth/LoginPage.tsx", "w") as f:
    f.write(content)
