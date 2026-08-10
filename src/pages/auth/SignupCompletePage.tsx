import { useNavigate } from 'react-router-dom'
import { PartyPopper } from 'lucide-react'
import Stepper from '../../components/ui/Stepper'

export default function SignupCompletePage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-14">
      <div className="w-full max-w-[440px] rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <div className="flex justify-center">
          <Stepper
            steps={[{ label: '회원정보입력' }, { label: '약관 및 정책 동의' }, { label: '가입 완료' }]}
            currentIndex={2}
          />
        </div>

        <span className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <PartyPopper className="h-8 w-8" />
        </span>

        <h1 className="mt-5 text-[21px] font-bold text-ink-900">가입이 완료되었습니다!</h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-gray-500">
          이제 나의 스펙을 등록하고
          <br />
          같은 조건의 학생들과 비교해보세요.
        </p>

        <button
          onClick={() => navigate('/mypage/specs')}
          className="mt-7 w-full rounded-xl bg-blue-600 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700"
        >
          시작하기
        </button>
      </div>
    </div>
  )
}
