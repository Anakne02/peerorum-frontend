import { useNavigate } from 'react-router-dom'
import { ChevronDown, Info } from 'lucide-react'
import SignupWizardLayout from '../../layouts/SignupWizardLayout'

export default function SignupStep2Page() {
  const navigate = useNavigate()

  return (
    <SignupWizardLayout step={2} totalSteps={3} onBack={() => navigate('/signup/info/1')}>
      <h2 className="text-[19px] font-bold text-ink-900">비교 조건을 설정해주세요</h2>
      <p className="mt-1.5 text-[13.5px] text-gray-500">나와 비슷한 학생들을 추적할 수 있어요.</p>

      <form
        className="mt-6 flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/signup/info/3')
        }}
      >
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink-900">희망 직무 *</label>
          <div className="relative">
            <select
              required
              defaultValue=""
              className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-3 text-[14px] text-ink-900 outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                희망 직무를 선택해주세요
              </option>
              <option>마케팅</option>
              <option>영업</option>
              <option>기획</option>
              <option>개발</option>
              <option>디자인</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-xl bg-blue-50 p-3.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
          <p className="text-[12.5px] leading-relaxed text-blue-700">
            선택하신 정보는 나중에 마이페이지에서 언제든지 변경하실 수 있습니다.
          </p>
        </div>

        <div className="mt-1 flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/signup/info/1')}
            className="w-full rounded-xl border border-gray-200 py-3 text-[15px] font-semibold text-ink-900 hover:bg-gray-50"
          >
            이전
          </button>
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700"
          >
            다음 →
          </button>
        </div>
      </form>
    </SignupWizardLayout>
  )
}
