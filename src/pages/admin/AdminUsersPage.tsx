import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Download, MessageCircle, Plus, RefreshCw, Search, Users, UserCheck, UserCog, UserX } from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout'
import StatTile from '../../components/admin/StatTile'
import { fetchAdminUsers, type AdminUserData, type AdminUserResponse } from '../../api/admin'

const STATUS_STYLE: Record<string, string> = {
  활성: 'bg-emerald-50 text-emerald-600',
  휴면: 'bg-gray-100 text-gray-500',
  정지: 'bg-rose-50 text-rose-600',
}

const VERIFIED_STYLE: Record<string, string> = {
  인증완료: 'bg-blue-50 text-blue-600',
  인증대기: 'bg-amber-50 text-amber-600',
}

const FILTERS = ['상태', '인증 여부', '가입일']

export default function AdminUsersPage() {
  const [data, setData] = useState<AdminUserResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    fetchAdminUsers(page)
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [page])

  const users: AdminUserData[] = data?.users ?? []
  const totalElements = data?.totalElements ?? 0
  const totalPages = data?.totalPages ?? 1

  const filteredUsers = search
    ? users.filter((u) =>
        u.name.includes(search) || u.school.includes(search) || u.major.includes(search)
      )
    : users

  return (
    <AdminLayout>
      <div>
        <h1 className="text-[22px] font-bold text-ink-900">사용자 목록</h1>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="이름, 학교, 전공으로 검색하세요."
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 text-[13.5px] outline-none placeholder:text-gray-400 focus:border-blue-500"
          />
        </div>
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-2.5 text-[13px] font-medium text-ink-900 hover:bg-gray-50"
          >
            {filter}
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
        ))}
        <button
          type="button"
          onClick={() => { setSearch(''); setPage(0); }}
          className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-2.5 text-[13px] font-medium text-gray-500 hover:bg-gray-50"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          필터 초기화
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={Users} iconClassName="bg-blue-50 text-blue-600" label="전체 사용자" value={`${totalElements.toLocaleString()}명`} />
        <StatTile icon={UserCheck} iconClassName="bg-emerald-50 text-emerald-600" label="활성 사용자" value={`${users.filter(u => u.status === '활성').length}명`} />
        <StatTile icon={UserCog} iconClassName="bg-orange-50 text-orange-600" label="휴면 계정" value={`${users.filter(u => u.status === '휴면').length}명`} />
        <StatTile icon={UserX} iconClassName="bg-rose-50 text-rose-600" label="정지 계정" value={`${users.filter(u => u.status === '정지').length}명`} />
      </div>

      <div className="mt-5 rounded-2xl border border-gray-100 bg-white shadow-sm shadow-black/[0.02]">
        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-[13.5px] font-semibold text-ink-900">총 {totalElements.toLocaleString()}명</p>
          <div className="flex items-center gap-2">
            <button type="button" className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-[12.5px] font-medium text-gray-600 hover:bg-gray-50">
              <Download className="h-3.5 w-3.5" />
              내보내기
            </button>
            <button type="button" onClick={() => { setLoading(true); fetchAdminUsers(page).then(setData).finally(() => setLoading(false)) }} aria-label="새로고침" className="flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50">
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-10 text-center text-[13px] text-gray-400">로딩 중...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-y border-gray-100 text-gray-400">
                  <th className="px-5 py-3 font-medium">이름</th>
                  <th className="px-3 py-3 font-medium">익명 ID</th>
                  <th className="px-3 py-3 font-medium">학교</th>
                  <th className="px-3 py-3 font-medium">전공</th>
                  <th className="px-3 py-3 font-medium">학년</th>
                  <th className="px-3 py-3 font-medium">가입일</th>
                  <th className="px-3 py-3 font-medium">상태</th>
                  <th className="px-3 py-3 font-medium">인증 여부</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((row) => (
                  <tr key={row.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-2.5 font-semibold text-ink-900">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[11px] font-bold text-gray-500">
                          {row.name.slice(0, 1)}
                        </span>
                        {row.name}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-gray-500 text-[11px]">{row.id}</td>
                    <td className="px-3 py-3.5 text-gray-500">{row.school}</td>
                    <td className="px-3 py-3.5 text-gray-500">{row.major}</td>
                    <td className="px-3 py-3.5 text-gray-500">{row.grade}</td>
                    <td className="px-3 py-3.5 text-gray-500">{row.joinedAt}</td>
                    <td className="px-3 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${STATUS_STYLE[row.status] ?? 'bg-gray-50 text-gray-500'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${VERIFIED_STYLE[row.verified] ?? 'bg-gray-50 text-gray-500'}`}>
                        {row.verified}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr><td colSpan={8} className="py-10 text-center text-[13px] text-gray-400">사용자가 없습니다.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-[12.5px] text-gray-400">{page * 10 + 1}-{Math.min((page + 1) * 10, totalElements)} / {totalElements.toLocaleString()}명</span>
          <div className="flex items-center gap-1.5">
            <button type="button" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} aria-label="이전" className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + Math.max(0, Math.min(page - 2, totalPages - 5))).map((p) => (
              <button key={p} type="button" onClick={() => setPage(p)} className={`flex h-8 w-8 items-center justify-center rounded-lg text-[12.5px] font-medium ${p === page ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                {p + 1}
              </button>
            ))}
            <button type="button" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} aria-label="다음" className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
