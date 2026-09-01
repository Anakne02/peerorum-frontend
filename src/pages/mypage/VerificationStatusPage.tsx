import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Award,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Lock,
  Globe2,
} from 'lucide-react'
import MyPageLayout from '../../layouts/MyPageLayout'
import PenguinHero from '../../components/ui/PenguinHero'
import RankPagination from '../../components/compare/RankPagination'
import { useAuth } from '../../context/AuthContext'
import { useSpec } from '../../context/SpecContext'

const PAGE_SIZE = 5

const TABS = ['전체', '인증 완료', '인증 대기']

const STATUS_STYLE: Record<string, string> = {
  완료: 'bg-emerald-50 text-emerald-600',
  대기: 'bg-amber-50 text-amber-600',
}

export default function VerificationStatusPage() {
  const [activeTab, setActiveTab] = useState('전체')
  const [page, setPage] = useState(1)
  const { user } = useAuth()
  const { entries } = useSpec()
  const navigate = useNavigate()

  const items = [
    ...(entries.gpa[0]
      ? [
          {
            icon: GraduationCap,
            item: '학점',
            content: `${entries.gpa[0].gpaAverage ?? '-'} / 4.5`,
            status: entries.gpa[0]._status === 'verified' ? '완료' : '대기',
            date: entries.gpa[0].date ?? '-',
          },
        ]
      : []),
    ...entries.language.map((entry) => ({
      icon: Globe2,
      item: `어학 (${entry.test || '어학'})`,
      content: `${entry.test ?? ''} ${entry.score ?? ''}`.trim(),
      status: entry._status === 'verified' ? '완료' : '대기',
      date: entry.date ?? '-',
    })),
    ...entries.certificate.map((entry) => ({
      icon: Award,
      item: `자격증 (${entry.name || '자격증'})`,
      content: entry.name ?? '-',
      status: entry._status === 'verified' ? '완료' : '대기',
      date: entry.date ?? '-',
    })),
  ]

  const totalRegisteredCount =
    entries.gpa.length +
    entries.language.length +
    entries.certificate.length +
    entries.activity.length +
    entries.intern.length +
    entries.award.length

  const SUMMARY = [
    { label: '총 등록 항목 수', value: totalRegisteredCount, icon: FileText, tone: 'bg-blue-50 text-blue-600' },
    {
      label: '인증 완료',
      value: items.filter((item) => item.status === '완료').length,
      icon: CheckCircle2,
      tone: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: '인증 대기',
      value: items.filter((item) => item.status === '대기').length,
      icon: Clock,
      tone: 'bg-amber-50 text-amber-600',
    },
  ]

  const selectTab = (tab: string) => {
    setActiveTab(tab)
    setPage(1)
  }

  const filtered =
    activeTab === '전체' ? items : items.filter((item) => `인증 ${item.status}` === activeTab)

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  if (!user?.hasSpec) {
    return (
      <MyPageLayout>
        <div>
          <h1 className="text-[22px] font-bold text-ink-900">인증 현황</h1>
          <p className="mt-1 text-[13.5px] text-gray-500">
            내가 등록한 스펙의 인증 상태를 확인할 수 있어요.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm shadow-black/[0.02]">
          <PenguinHero className="mx-auto h-28 w-28" />
          <h2 className="mt-5 text-[18px] font-bold text-ink-900">아직 등록된 스펙이 없어요</h2>
          <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-gray-500">
            스펙을 등록하면 인증 진행 상태를 이곳에서 확인할 수 있어요.
          </p>
          <button
            type="button"
            onClick={() => navigate('/mypage/specs/register')}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-blue-700"
          >
            스펙 등록하기
          </button>
        </div>
      </MyPageLayout>
    )
  }

  return (
    <MyPageLayout>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-ink-900">인증 현황</h1>
          <p className="mt-1 text-[13.5px] text-gray-500">
            내가 등록한 스펙의 인증 상태를 확인할 수 있어요.
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-2 text-[12.5px] font-medium text-blue-600">
          <Lock className="h-3.5 w-3.5" />
          모든 정보는 익명으로 안전하게 보호됩니다.
        </span>
      </div>

      <h2 className="mb-4 mt-8 text-[16px] font-bold text-ink-900">인증 현황 요약</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {SUMMARY.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm shadow-black/[0.02]"
          >
            <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.tone}`}>
              <stat.icon className="h-4.5 w-4.5" />
            </span>
            <p className="mt-3 text-[22px] font-bold text-ink-900">{stat.value}</p>
            <p className="text-[12.5px] text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => selectTab(tab)}
            className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm shadow-black/[0.02]">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-100 text-[12.5px] text-gray-400">
              <th className="px-5 py-3.5 font-medium">항목</th>
              <th className="px-5 py-3.5 font-medium">내용</th>
              <th className="px-5 py-3.5 font-medium">
                <span className="flex items-center gap-1">
                  인증 상태
                  <ArrowUpDown className="h-3 w-3" />
                </span>
              </th>
              <th className="px-5 py-3.5 font-medium">등록일</th>
              <th className="px-5 py-3.5 font-medium">관리</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-[13px] text-gray-400">
                  인증 대상 항목이 없어요. 학점, 어학, 자격증을 등록하면 여기에 표시돼요.
                </td>
              </tr>
            )}
            {pageItems.map((row, index) => (
              <tr key={`${row.item}-${index}`} className="border-b border-gray-50 last:border-none">
                <td className="px-5 py-4">
                  <span className="flex items-center gap-2 text-[13.5px] font-medium text-ink-900">
                    <row.icon className="h-4 w-4 text-gray-400" />
                    {row.item}
                  </span>
                </td>
                <td className="px-5 py-4 text-[13.5px] text-ink-900">{row.content}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${STATUS_STYLE[row.status]}`}
                  >
                    인증 {row.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-[13px] text-gray-400">{row.date}</td>
                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() => navigate('/mypage/specs/edit')}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-[12.5px] font-medium text-gray-600 hover:bg-gray-50"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <RankPagination currentPage={currentPage} totalPages={totalPages} onChange={setPage} />
      </div>

      <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-blue-50 p-5">
        <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-blue-600" />
        <p className="text-[13.5px] text-blue-700">
          <span className="font-semibold">인증 대기 중인 항목이 있나요?</span> 증빙자료 확인이
          끝나는 대로 인증 완료 상태로 자동 반영돼요.
        </p>
      </div>
    </MyPageLayout>
  )
}
