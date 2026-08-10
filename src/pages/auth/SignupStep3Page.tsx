import { useNavigate } from 'react-router-dom'
import { CheckCircle2, FolderOpen } from 'lucide-react'
import SignupWizardLayout from '../../layouts/SignupWizardLayout'

const CHECKS = [
  '학점, 어학, 자격증 등 스펙을 등록할 수 있어요.',
  '인증을 통해 신뢰도 높은 비교가 가능해요.',
  '등록한 스펙은 안전하게 보호돼요.',
]

export default function SignupStep3Page() {
  const navigate = useNavigate()

  return (
    <SignupWizardLayout step={3} totalSteps={3} onBack={() => navigate('/signup/info/2')}>
      <h2 className="text-[19px] font-bold text-ink-900">스펙 등록 연동을 준비할게요</h2>
      <p className="mt-1.5 text-[13.5px] text-gray-500">
        입력한 정보를 바탕으로 스펙 등록을 도와드려요.
      </p>

      <div className="mt-6 flex justify-center">
        <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <FolderOpen className="h-9 w-9" />
          <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
            <CheckCircle2 className="h-4 w-4" />
          </span>
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        {CHECKS.map((text) => (
          <div key={text} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
            <p className="text-[13.5px] leading-relaxed text-gray-600">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex gap-3">
        <button
          type="button"
          onClick={() => navigate('/signup/info/2')}
          className="w-full rounded-xl border border-gray-200 py-3 text-[15px] font-semibold text-ink-900 hover:bg-gray-50"
        >
          이전
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup/terms')}
          className="w-full rounded-xl bg-blue-600 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700"
        >
          가입 완료
        </button>
      </div>
    </SignupWizardLayout>
  )
}
