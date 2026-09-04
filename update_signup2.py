with open('src/pages/auth/SignupPage.tsx', 'r') as f:
    content = f.read()

old_handle = """  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 해요.')
      return
    }
    if (password !== passwordConfirm) {
      setPasswordError('비밀번호가 일치하지 않아요.')
      return
    }
    setPasswordError('')
    setStep('terms')
  }"""

new_handle = """  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 해요.')
      return
    }
    if (password !== passwordConfirm) {
      setPasswordError('비밀번호가 일치하지 않아요.')
      return
    }
    setPasswordError('')
    try {
      const result = await signupApi(name, email, password)
      localStorage.setItem('token', result.accessToken)
      localStorage.setItem('uuid', result.uuid)
      localStorage.setItem('role', result.role)
      setStep('basic')
    } catch (err: any) {
      console.error(err)
      const errorMsg = err.response?.data?.message || '회원가입에 실패했습니다.'
      alert(errorMsg)
    }
  }"""

content = content.replace(old_handle, new_handle)

with open('src/pages/auth/SignupPage.tsx', 'w') as f:
    f.write(content)
