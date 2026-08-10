import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function SignupWizardLayout({
  step,
  totalSteps,
  onBack,
  children,
}: {
  step: number
  totalSteps: number
  onBack: () => void
  children: ReactNode
}) {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-14">
      <div className="w-full max-w-[440px] rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (step === 1 ? navigate('/signup') : onBack())}
            className="text-gray-400 hover:text-gray-600"
            aria-label="이전"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </button>
          <span className="text-[14px] font-semibold text-ink-900">회원가입</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
            <span className="text-[12px] font-medium text-gray-400">
              {step}/{totalSteps}
            </span>
          </div>
        </div>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}
