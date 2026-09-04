with open('src/pages/auth/OAuth2RedirectHandler.tsx', 'r') as f:
    content = f.read()

# Add error handling and name fetching
new_effect = """  useEffect(() => {
    if (handledRef.current) {
      return
    }

    handledRef.current = true

    const error = searchParams.get('error')
    if (error) {
      let errorMsg = '소셜 로그인에 실패했습니다.'
      if (error === 'account_exists_with_local') errorMsg = '이미 일반 회원가입으로 가입된 이메일입니다. 이메일로 로그인해주세요.'
      else if (error === 'account_exists_with_kakao') errorMsg = '이미 카카오로 가입된 이메일입니다. 카카오로 로그인해주세요.'
      else if (error === 'account_exists_with_google') errorMsg = '이미 구글로 가입된 이메일입니다. 구글로 로그인해주세요.'
      else if (error === 'oauth_email_required') errorMsg = '소셜 로그인 중 이메일 제공을 동의해야 합니다.'
      
      alert(errorMsg)
      navigate('/login', { replace: true })
      return
    }

    const token = searchParams.get('token')
    const role = searchParams.get('role')
    const uuid = searchParams.get('uuid')
    const rawName = searchParams.get('name')
    const decodedName = rawName ? decodeURIComponent(rawName) : 'User'
"""
content = content.replace(
    "  useEffect(() => {\n    if (handledRef.current) {\n      return\n    }\n\n    handledRef.current = true\n\n    const token = searchParams.get('token')",
    new_effect
)

content = content.replace(
    "        login({\n          name: 'User',\n          role: 'user',\n          hasSpec: false,\n        })",
    "        login({\n          name: decodedName,\n          role: 'user',\n          hasSpec: false,\n        })"
)

with open('src/pages/auth/OAuth2RedirectHandler.tsx', 'w') as f:
    f.write(content)
