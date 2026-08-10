import { Link, useNavigate } from 'react-router-dom'
import { ClipboardList, Link2, Target } from 'lucide-react'
import AuthLayout from '../../layouts/AuthLayout'
import Stepper from '../../components/ui/Stepper'

const STEPS = [
  {
    icon: ClipboardList,
    label: 'STEP 1',
    title: '기본 정보',
    description: '학교, 학과, 학년 정보를 입력해주세요.',
  },
  {
    icon: Target,
    label: 'STEP 2',
    title: '비교 조건 설정',
    description: '나와 비슷한 학생을 찾기 위한 비교 조건을 설정해주세요.',
  },
  {
    icon: Link2,
    label: 'STEP 3',
    title: '스펙 등록 연동',
    description: '나의 스펙을 등록하고 인증하며 성장 리포트를 준비하세요.',
  },
]

export default function SignupIntroPage() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="flex justify-end text-[13px] text-gray-400">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="ml-1 font-semibold text-blue-600 hover:underline">
            로그인
          </Link>
        </div>

        <h1 className="mt-2 text-[22px] font-bold text-ink-900">회원가입</h1>
        <p className="mt-1 text-[13.5px] text-gray-500">
          피어오름에서 나의 스펙을 관리하고 성장해보세요
        </p>

        <div className="mt-6 flex justify-center">
          <Stepper
            steps={[{ label: '기본 정보' }, { label: '비교 조건' }, { label: '스펙 연결' }]}
            currentIndex={0}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-gray-50 p-4">
          {STEPS.map((step) => (
            <div key={step.title} className="flex items-start gap-3 rounded-xl bg-white p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <step.icon className="h-4.5 w-4.5" />
              </span>
              <div>
                <span className="text-[11px] font-semibold text-blue-600">{step.label}</span>
                <p className="text-[14px] font-semibold text-ink-900">{step.title}</p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-gray-500">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/signup/info/1')}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700"
        >
          회원가입 시작
        </button>

        <p className="mt-4 text-center text-[12px] leading-relaxed text-gray-400">
          가입하면 서비스의 이용약관 및 개인정보처리방침에
          <br />
          동의하는 것으로 간주됩니다.
        </p>
      </div>
    </AuthLayout>
  )
}
