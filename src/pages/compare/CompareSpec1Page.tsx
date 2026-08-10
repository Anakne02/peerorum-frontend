import { Link } from 'react-router-dom'
import {
  Bell,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Filter,
  List,
  Lock,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import PenguinMascot from '../../components/ui/PenguinMascot'
import RankBadge from '../../components/compare/RankBadge'
import RankPagination from '../../components/compare/RankPagination'
import { MY_PERCENTILE, RANKED_STUDENTS, TOTAL_STUDENTS } from '../../data/mockRankings'

const HERO_STEPS = [
  { icon: Filter, label: '조건 선택' },
  { icon: List, label: '스펙 비교' },
  { icon: BarChart3, label: '나의 위치' },
]

const NAV_ITEMS = ['스펙 비교', '서비스 소개', '이용 방법', '고객지원']

const SELECTED_CONDITIONS = ['서울대학교', '경영학과', '4학년', '마케팅 직무', '학점 4.00 ~ 3.50']

export default function CompareSpec1Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-br from-blue-500 to-blue-700 px-6 pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
                </svg>
              </span>
              <span className="text-[17px] font-bold text-white">Peer Up</span>
            </Link>
            <nav className="hidden items-center gap-8 md:flex">
              {NAV_ITEMS.map((item) => (
                <a key={item} href="#" className="text-[14.5px] font-medium text-white/90 hover:text-white">
                  {item}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Bell className="h-5 w-5 text-white/80" />
              <button className="flex items-center gap-1.5 text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-[11px] font-bold">
                  익
                </span>
                <span className="text-[13.5px] font-medium">익명 사용자</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-80" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
            <div>
              <h1 className="text-[26px] font-bold leading-snug text-white">
                비교할 조건을 선택하고
                <br />
                익명 스펙을 확인해보세요
              </h1>
              <p className="mt-2 text-[13.5px] text-white/80">
                같은 조건의 학생들이 어디까지 왔는지 확인하고,
                <br />
                나의 위치를 파악해보세요.
              </p>
            </div>

            <div className="flex items-center">
              {HERO_STEPS.map((step, index) => (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${
                        index === 0 ? 'bg-white text-blue-600' : 'bg-white/15 text-white'
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </span>
                    <span className="text-[12px] font-medium text-white/90">{step.label}</span>
                  </div>
                  {index < HERO_STEPS.length - 1 && <div className="mx-3 mb-6 h-px w-10 bg-white/30" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto -mt-4 grid max-w-7xl gap-6 px-6 pb-12 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-black/5">
          <p className="mb-4 flex items-center gap-1.5 text-[14px] font-bold text-ink-900">
            <SlidersHorizontal className="h-4 w-4 text-blue-600" />
            비교 조건 설정
          </p>

          <div className="flex flex-col gap-4">
            {[
              { label: '1. 학교', value: '서울대학교' },
              { label: '2. 학과', value: '경영학과' },
              { label: '3. 학년', value: '4학년' },
              { label: '4. 희망 직무', value: '마케팅' },
            ].map((field) => (
              <div key={field.label}>
                <label className="mb-1.5 block text-[12.5px] font-medium text-gray-500">
                  {field.label}
                </label>
                <div className="relative">
                  <select
                    defaultValue={field.value}
                    className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2.5 text-[13px] text-ink-900 outline-none focus:border-blue-500"
                  >
                    <option>{field.value}</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            ))}

            <div>
              <label className="mb-2 block text-[12.5px] font-medium text-gray-500">
                5. 학점 구간 설정
              </label>
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>4.5</span>
                <span>3.0</span>
              </div>
              <input type="range" min={0} max={100} defaultValue={45} className="mt-1 w-full accent-blue-600" />
              <div className="mt-1 flex justify-between text-[10.5px] text-gray-400">
                <span>4.5</span>
                <span>4.0</span>
                <span>3.5</span>
                <span>3.0</span>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-3">
              <p className="text-[11.5px] text-blue-400">선택 범위</p>
              <p className="text-[14px] font-bold text-blue-700">4.00 ~ 3.50</p>
            </div>

            <p className="text-[12px] text-gray-400">
              비교 대상: <span className="font-semibold text-ink-900">{TOTAL_STUDENTS}명의 학생</span>
            </p>

            <button className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-3 text-[14px] font-semibold text-white hover:bg-blue-700">
              <Search className="h-4 w-4" />
              스펙 비교하기 →
            </button>
            <button className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2.5 text-[13px] font-medium text-gray-500 hover:bg-gray-50">
              <RotateCcw className="h-3.5 w-3.5" />
              조건 초기화
            </button>
          </div>
        </aside>

        <section>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm shadow-black/[0.02]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {SELECTED_CONDITIONS.map((condition) => (
                  <span
                    key={condition}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-[12px] font-medium text-gray-600"
                  >
                    {condition}
                  </span>
                ))}
              </div>
              <button className="text-[12.5px] font-medium text-blue-600 hover:underline">
                조건 수정 ✎
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="flex items-center gap-1 text-[15px] font-bold text-ink-900">
                학점 내림차순 (선택 범위 내)
              </p>
              <p className="text-[12.5px] text-gray-400">
                선택 범위의 상위 학생 순으로 정렬됩니다.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[14px] font-bold text-ink-900">총 {TOTAL_STUDENTS}명</p>
              <p className="text-[11px] text-gray-400">※ 익명 데이터</p>
            </div>
          </div>

          <div className="mt-3 overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm shadow-black/[0.02]">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[12px] text-gray-400">
                  <th className="px-4 py-3 font-medium">순위</th>
                  <th className="px-4 py-3 font-medium">익명 ID</th>
                  <th className="px-4 py-3 font-medium">학점 (4.5만점)</th>
                  <th className="px-4 py-3 font-medium">어학</th>
                  <th className="px-4 py-3 font-medium">자격증</th>
                  <th className="px-4 py-3 font-medium">활동</th>
                  <th className="px-4 py-3 font-medium">인턴</th>
                  <th className="px-4 py-3 font-medium">상세</th>
                </tr>
              </thead>
              <tbody>
                {RANKED_STUDENTS.map((student) => (
                  <tr key={student.anonId} className="border-b border-gray-50 last:border-none">
                    <td className="px-4 py-3.5">
                      <RankBadge rank={student.rank} />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <PenguinMascot className="h-8 w-8" />
                        <div>
                          <p className="text-[13px] font-semibold text-ink-900">{student.anonId}</p>
                          <p className="text-[11px] text-gray-400">{student.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-[13.5px] font-bold text-ink-900">{student.gpa} /4.5</p>
                      <p className="text-[11px] text-blue-600">상위 {student.gpaPercentile}%</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-[13px] text-ink-900">{student.lang}</p>
                      <p className="text-[11px] text-blue-600">상위 {student.langPercentile}%</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-[13px] text-ink-900">{student.certs}</p>
                      <p className="text-[11px] text-blue-600">상위 {student.certsPercentile}%</p>
                    </td>
                    <td className="px-4 py-3.5 text-[12.5px] leading-snug text-ink-900">
                      인턴 {student.intern}
                      <br />
                      {student.activity}
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-ink-900">{student.intern}</td>
                    <td className="px-4 py-3.5">
                      <ChevronRight className="h-4 w-4 text-gray-300" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RankPagination />
          </div>

          <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-2xl bg-blue-50 p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-blue-700"
                style={{ background: `conic-gradient(#2563eb 0% ${100 - MY_PERCENTILE}%, #dbeafe ${100 - MY_PERCENTILE}% 100%)` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  상위
                  <br />
                  {MY_PERCENTILE}%
                </span>
              </div>
              <div>
                <p className="text-[14.5px] font-bold text-ink-900">
                  나의 위치는 <span className="text-blue-600">상위 {MY_PERCENTILE}%</span> 입니다.
                </p>
                <p className="text-[12.5px] text-gray-500">
                  선택한 조건의 학생 {TOTAL_STUDENTS}명 중, 내 예상 위치입니다.
                </p>
                <p className="mt-0.5 text-[11.5px] text-gray-400">
                  ✓ 정확한 위치는 내 스펙을 등록하면 확인할 수 있어요.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <PenguinMascot className="h-9 w-9" />
              <Link
                to="/mypage/specs"
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-blue-700"
              >
                내 스펙 등록하기 →
              </Link>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[11.5px] text-gray-400">
            <Lock className="h-3.5 w-3.5" />
            내 정보는 익명으로 안전하게 보호됩니다.
          </p>
        </section>
      </main>
    </div>
  )
}
