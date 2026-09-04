with open("src/pages/mypage/SpecEditPage.tsx", "r") as f:
    content = f.read()

old_str = """      // 2. Fetch fresh data from backend and load it into context
      const profileData = await fetchMyProfile()
      loadFromProfile(profileData)
      
      setHasSpec(true)"""

new_str = """      // 2. Fetch fresh data from backend and load it into context
      const profileData = await fetchMyProfile()
      loadFromProfile(profileData)
      updateProfile({
        name: profileData.name,
        nickname: profileData.nickname,
        school: profileData.university,
        department: profileData.major,
        grade: profileData.entranceYear ? `${Math.min(4, Math.max(1, new Date().getFullYear() - profileData.entranceYear + 1))}학년` : undefined,
        desiredJob: profileData.desiredJob || '',
      })
      
      setHasSpec(true)"""

content = content.replace(old_str, new_str)

with open("src/pages/mypage/SpecEditPage.tsx", "w") as f:
    f.write(content)
