import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, Lock, Search, Target } from 'lucide-react'
import AppHeader from '../../components/layout/AppHeader'
import PenguinMascot from '../../components/ui/PenguinMascot'
import RankBadge from '../../components/compare/RankBadge'
import RankPagination from '../../components/compare/RankPagination'
import { MY_PERCENTILE, RANKED_STUDENTS, TOTAL_STUDENTS } from '../../data/mockRankings'

const FIELDS = [
  { label: '학교', value: '단국대학교' },
  { label: '학과', value: '경영학과' },
  { label: '학년', value: '4학년' },
  { label: '희망직무', value: '마케팅' },
]

export default function CompareSpec3Page() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader userLabel="익명 사용자" anonymous />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-[22px] font-bold text-ink-900">스펙 비교</h1>
            <p className="mt-1 text-[13.5px] text-gray-500">
              나와 비슷한 조건의 학생들과 스펙을 비교하고, 나의 위치를 확인해보세요.
            </p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-2 text-[12.5px] font-medium text-blue-600">
            <Lock className="h-3.5 w-3.5" />
            모든 정보는 익명으로 안전하게 보호됩니다.
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-black/[0.02]">
          <p className="text-[15px] font-bold text-ink-900">비교 조건 설정</p>
          <p className="text-[12.5px] text-gray-400">나와 비교할 조건을 선택해주세요.</p>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr_260px]">
            {FIELDS.map((field) => (
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
              <label className="mb-1.5 flex items-center gap-1 text-[12.5px] font-medium text-gray-500">
                학점 비교 범위
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-400">4.5</span>
                <input type="range" min={0} max={100} defaultValue={35} className="w-full accent-blue-600" />
                <span className="text-[11px] text-gray-400">3.0</span>
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-gray-300">
                <span>4.5</span>
                <span>4.0</span>
                <span>3.5</span>
                <span>3.0</span>
              </div>
              <p className="mt-1 text-right text-[11px] font-medium text-blue-600">
                선택 범위: 4.3 ~ 3.8
              </p>
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <button className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-[14.5px] font-semibold text-white hover:bg-blue-700">
              <Search className="h-4 w-4" />
              스펙 비교하기
            </button>
          </div>
        </div>

        <h2 className="mb-3 mt-8 text-[16px] font-bold text-ink-900">비교 결과</h2>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm shadow-black/[0.02]">
          <p className="flex items-center gap-1.5 text-[13.5px] text-ink-900">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="font-semibold">단국대학교 · 경영학과 · 4학년 · 마케팅 희망</span>
            <span className="text-gray-400">| 학점 4.3 ~ 3.8</span>
          </p>
          <p className="text-[13px] font-bold text-ink-900">총 {TOTAL_STUDENTS}명</p>
        </div>

        <div className="mt-3 overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm shadow-black/[0.02]">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 text-[12px] text-gray-400">
                <th className="px-4 py-3 font-medium">순위</th>
                <th className="px-4 py-3 font-medium">익명 ID</th>
                <th className="px-4 py-3 font-medium">학점 (4.5 만점)</th>
                <th className="px-4 py-3 font-medium">상위 %</th>
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
                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-bold text-ink-900">{student.gpa} / 4.5</span>
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${100 - student.gpaPercentile}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[12.5px] font-semibold text-blue-600">
                    상위 {student.gpaPercentile}%
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
                    {student.activity}
                    <br />
                    {student.contest}
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

        <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl bg-blue-50 p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600">
              <Target className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-[14px] text-ink-900">
                내 위치는 <span className="font-bold text-blue-600">상위 {MY_PERCENTILE}%</span>{' '}
                입니다.
              </p>
              <p className="text-[12.5px] text-gray-500">
                선택한 조건의 학생 {TOTAL_STUDENTS}명 중, 내 예상 위치입니다.
              </p>
            </div>
          </div>
          <Link
            to="/mypage/specs"
            className="shrink-0 rounded-lg bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-blue-700"
          >
            내 스펙 등록하고 정확한 위치 확인하기 →
          </Link>
        </div>
      </main>
    </div>
  )
}
