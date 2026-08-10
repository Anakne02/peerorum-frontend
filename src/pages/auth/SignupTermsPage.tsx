import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, Lock, SquareCheck } from 'lucide-react'
import Stepper from '../../components/ui/Stepper'

const TERMS = [
  {
    key: 'service',
    title: '이용약관 (필수)',
    body: `제 1조 (목적)
본 약관은 대학생 스펙 인증 및 정보 공유 플랫폼(이하 "서비스")을 운영하는 운영팀(이하 "운영자")과 서비스를 이용하는 회원 간의 권리, 의무 및 책임사항과 서비스 이용에 필요한 사항을 규정함을 목적으로 합니다.

제 2조 (정의)
① "서비스"란 회원이 자신의 스펙을 등록하고 인증받아 익명으로 정보를 공유하고 비교할 수 있도록 제공되는 온라인 플랫폼을 의미합니다.
② "회원"이란 본 약관에 동의하고 회원가입을 완료하여 서비스를 이용하는 자를 말합니다.
③ "스펙정보"란 학점, 어학성적, 자격증, 대외활동, 공모전, 인턴십, 교육 이수 내역 등 회원이 등록하는 객관적인 정보를 의미합니다.
④ "증빙자료"란 스펙 정보의 사실 여부를 확인하기 위하여 회원이 제출하는 성적증명서, 자격증, 어학성적표, 활동 확인서 등의 자료를 의미합니다.
⑤ "인증"이란 운영자가 제출된 증빙자료를 검토하여 해당 스펙 정보의 사실 여부를 확인하는 절차를 의미합니다.`,
  },
  {
    key: 'privacy',
    title: '개인정보처리방침 (필수)',
    body: `제 1조 (개인정보의 처리 목적)
운영자는 다음의 목적을 위하여 개인정보를 처리합니다.
1. 회원가입 및 회원 관리
· 회원 식별 및 가입 의사 확인
· 회원 자격 유지 및 관리
· 중복 가입 및 부정 이용 방지
· 회원 문의 및 불만 처리`,
  },
  {
    key: 'certification',
    title: '스펙 인증 운영정책 (필수)',
    body: `제 1조 (목적)
본 운영정책은 피어오름(이하 "서비스")에서 제공하는 스펙 인증 서비스의 운영 기준 및 절차를 규정함으로써, 정확하고 신뢰할 수 있는 정보를 제공하는 것을 목적으로 합니다.

제 2조 (인증 대상)
회원은 다음 항목에 대하여 인증을 신청할 수 있습니다.
· 학점`,
  },
]

export default function SignupTermsPage() {
  const navigate = useNavigate()
  const [checked, setChecked] = useState<Record<string, boolean>>({
    service: true,
    privacy: true,
    certification: true,
  })

  const allChecked = Object.values(checked).every(Boolean)

  const toggleAll = () => {
    const next = !allChecked
    setChecked({ service: next, privacy: next, certification: next })
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between border-b border-gray-100 px-8 py-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
            </svg>
          </span>
          <span className="text-[15px] font-bold text-ink-900">Peer Up</span>
        </Link>
        <a href="#" className="text-[13px] text-gray-400 hover:text-gray-600">
          도움말
        </a>
      </header>

      <main className="mx-auto max-w-[640px] px-6 py-12">
        <div className="flex justify-center">
          <Stepper
            steps={[{ label: '회원정보입력' }, { label: '약관 및 정책 동의' }, { label: '가입 완료' }]}
            currentIndex={1}
          />
        </div>

        <h1 className="mt-8 text-center text-[24px] font-bold text-ink-900">
          서비스 이용을 위해 약관 및 정책에 동의해주세요
        </h1>
        <p className="mt-2 text-center text-[14px] text-gray-500">
          모든 약관 및 정책을 확인하신 후 동의해 주세요.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {TERMS.map((term) => (
            <div key={term.key} className="rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 text-[14px] font-semibold text-ink-900">
                  <input
                    type="checkbox"
                    checked={checked[term.key]}
                    onChange={(e) =>
                      setChecked((prev) => ({ ...prev, [term.key]: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  {term.title}
                </label>
                <a href="#" className="text-[12.5px] text-gray-400 hover:text-gray-600">
                  전체보기 ↗
                </a>
              </div>
              <div className="mt-3 h-28 overflow-y-auto whitespace-pre-line rounded-xl bg-gray-50 p-3 text-[12px] leading-relaxed text-gray-500">
                {term.body}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={toggleAll}
          className="mt-5 flex w-full items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3.5"
        >
          <span className="flex items-center gap-2 text-[13.5px] font-medium text-blue-700">
            <SquareCheck className="h-4.5 w-4.5" />
            모든 약관 및 정책에 동의합니다. (선택 포함)
          </span>
          <span
            className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold ${
              allChecked ? 'bg-blue-600 text-white' : 'bg-white text-gray-400'
            }`}
          >
            <Check className="h-3.5 w-3.5" />
            전체 동의
          </span>
        </button>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/signup/info/3')}
            className="w-full rounded-xl border border-gray-200 py-3 text-[15px] font-semibold text-ink-900 hover:bg-gray-50"
          >
            이전
          </button>
          <button
            type="button"
            disabled={!allChecked}
            onClick={() => navigate('/signup/complete')}
            className="w-full rounded-xl bg-blue-600 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            다음
          </button>
        </div>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-[12px] text-gray-400">
          <Lock className="h-3.5 w-3.5" />
          안전한 회원 정보 보호를 위해 SSL 암호화를 적용하고 있습니다.
        </p>
      </main>
    </div>
  )
}
