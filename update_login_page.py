with open('src/pages/auth/LoginPage.tsx', 'r') as f:
    content = f.read()

# Replace the imports
content = content.replace(
    "import { useAuth } from '../../context/AuthContext'",
    "import { useAuth } from '../../context/AuthContext'\nimport { loginApi } from '../../api/auth'\nimport { useSearchParams } from 'react-router-dom'"
)

# Add useSearchParams, error state, and password state to LoginPage
start_idx = content.find('export default function LoginPage() {')
if start_idx != -1:
    body_start = content.find('{', start_idx) + 1
    new_vars = """
  const [searchParams] = useSearchParams()
  const errorParam = searchParams.get('error')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState(
    errorParam === 'oauth_email_required' ? '소셜 로그인 중 이메일 제공을 동의해야 합니다.' :
    errorParam ? '로그인에 실패했습니다.' : ''
  )
"""
    content = content[:body_start] + new_vars + content[body_start:]

# Replace handleSubmit
content = content.replace(
    "  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    if (email.trim().toLowerCase() === ADMIN_EMAIL) {\n      login({ name: '관리자', role: 'admin' })\n    } else {\n      login({ role: 'user' })\n    }\n    navigate('/compare')\n  }",
    """  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    try {
      const result = await loginApi(email, password)
      localStorage.setItem('token', result.accessToken)
      localStorage.setItem('uuid', result.uuid)
      localStorage.setItem('role', result.role)
      
      login({ name: result.name, role: result.role === 'ROLE_ADMIN' ? 'admin' : 'user' })
      if (result.role === 'ROLE_ADMIN') {
        navigate('/admin')
      } else {
        navigate('/mypage/specs')
      }
    } catch (err: any) {
      console.error(err)
      setErrorMsg('이메일 또는 비밀번호가 틀립니다.')
    }
  }"""
)

# Add password onChange
content = content.replace(
    """<input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[14px] outline-none placeholder:text-gray-400 focus:border-blue-500"
          />""",
    """<input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[14px] outline-none placeholder:text-gray-400 focus:border-blue-500"
          />
          {errorMsg && <p className="text-[13px] text-red-500">{errorMsg}</p>}"""
)

with open('src/pages/auth/LoginPage.tsx', 'w') as f:
    f.write(content)
