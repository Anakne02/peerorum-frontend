import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import SignupWizardLayout from '../../layouts/SignupWizardLayout'

const GRADES = ['1학년', '2학년', '3학년', '4학년', '기타']

export default function SignupStep1Page() {
  const navigate = useNavigate()
  const [grade, setGrade] = useState('4학년')

  return (
    <SignupWizardLayout step={1} totalSteps={3} onBack={() => navigate('/signup')}>
      <h2 className="text-[19px] font-bold text-ink-900">기본 정보를 입력해주세요</h2>
      <p className="mt-1.5 text-[13.5px] text-gray-500">정확한 비교를 위해 필요한 정보입니다.</p>

      <form
        className="mt-6 flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/signup/info/2')
        }}
      >
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink-900">학교 *</label>
          <div className="relative">
            <select
              required
              defaultValue=""
              className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-3 text-[14px] text-ink-900 outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                학교를 선택해주세요
              </option>
              <option>단국대학교</option>
              <option>서울대학교</option>
              <option>연세대학교</option>
              <option>고려대학교</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink-900">
            학과(전공) *
          </label>
          <div className="relative">
            <select
              required
              defaultValue=""
              className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-3 text-[14px] text-ink-900 outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                학과를 선택해주세요
              </option>
              <option>경영학과</option>
              <option>경제학과</option>
              <option>컴퓨터공학과</option>
              <option>디자인학과</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink-900">학년 *</label>
          <div className="flex flex-wrap gap-2">
            {GRADES.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => setGrade(option)}
                className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                  grade === option
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-blue-600 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700"
        >
          다음 →
        </button>
      </form>
    </SignupWizardLayout>
  )
}
