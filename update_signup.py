with open('src/pages/auth/SignupPage.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "type Step = 'account' | 'terms' | 'basic' | 'compare' | 'nickname' | 'complete'",
    "type Step = 'method' | 'account' | 'terms' | 'basic' | 'compare' | 'nickname' | 'complete'"
)

content = content.replace(
    "const STEP_ORDER: Step[] = ['terms', 'basic', 'compare', 'nickname']",
    "const STEP_ORDER: Step[] = ['terms', 'basic', 'compare', 'nickname']"
)

content = content.replace(
    "import { createMyProfile } from '../../api/profile'",
    "import { createMyProfile } from '../../api/profile'\nimport { signupApi } from '../../api/auth'"
)

content = content.replace(
    "export default function SignupPage() {",
    "export default function SignupPage() {"
)

# find useState<Step>('terms')
content = content.replace(
    "const [step, setStep] = useState<Step>('terms')",
    "const [step, setStep] = useState<Step>('method')"
)

# Insert the 'method' step UI
method_ui = """  if (step === 'method') {
    return (
      <AuthLayout>
        <div>
          <h1 className="text-[22px] font-bold text-ink-900">어떤 방법으로 가입할까요?</h1>
          <p className="mt-1.5 text-[13.5px] text-gray-500">
            소셜 계정으로 빠르고 간편하게 시작해보세요.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => window.location.href = '/oauth2/authorization/google'}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3.5 text-[14.5px] font-medium text-ink-900 hover:bg-gray-50"
            >
              <span className="text-[16px] font-bold text-[#4285F4]">G</span>
              Google로 계속하기
            </button>
            <button
              type="button"
              onClick={() => window.location.href = '/oauth2/authorization/kakao'}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#FEE500] bg-[#FEE500] py-3.5 text-[14.5px] font-medium text-[#191600] hover:brightness-95"
            >
              카카오로 계속하기
            </button>
            <button
              type="button"
              onClick={() => alert('Apple 로그인은 현재 준비 중입니다.')}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3.5 text-[14.5px] font-medium text-ink-900 hover:bg-gray-50"
            >
              Apple로 계속하기
            </button>
          </div>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-[12px] text-gray-400">또는</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <button
            type="button"
            onClick={() => setStep('terms')}
            className="w-full rounded-xl bg-blue-600 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-blue-700"
          >
            이메일로 가입하기
          </button>

          <p className="mt-6 text-center text-[13px] text-gray-500">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </AuthLayout>
    )
  }

"""
content = content.replace("  if (step === 'terms') {", method_ui + "  if (step === 'terms') {")


with open('src/pages/auth/SignupPage.tsx', 'w') as f:
    f.write(content)
