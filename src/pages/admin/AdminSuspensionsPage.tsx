import { useEffect, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout'
import { fetchAdminSuspensions, type AdminSuspensionData } from '../../api/admin'

const STATUS_STYLE: Record<string, string> = {
  '대기 중': 'bg-orange-50 text-orange-600',
  '검토 중': 'bg-blue-50 text-blue-600',
  '처리 완료': 'bg-emerald-50 text-emerald-600',
}

const TYPE_STYLE: Record<string, string> = {
  정지: 'bg-rose-50 text-rose-600',
  탈퇴: 'bg-gray-100 text-gray-600',
}

export default function AdminSuspensionsPage() {
  const [suspensions, setSuspensions] = useState<AdminSuspensionData[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchAdminSuspensions()
      .then((d) => setSuspensions(d.suspensions))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = search
    ? suspensions.filter((s) => s.name.includes(search) || s.type.includes(search) || s.reason.includes(search))
    : suspensions

  return (
    <AdminLayout>
      <h1 className="text-[22px] font-bold text-ink-900">정지/탈퇴 관리</h1>
      <p className="mt-1.5 text-[13.5px] text-gray-500">
        사용자 정지 및 탈퇴 요청을 관리합니다.
      </p>

      <div className="mt-5 rounded-2xl border border-gray-100 bg-white shadow-sm shadow-black/[0.02]">
        <div className="flex flex-wrap items-center gap-3 px-5 py-4">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="이름, 사용자명, 학교, 이메일 검색"
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 text-[13.5px] outline-none placeholder:text-gray-400 focus:border-blue-500"
            />
          </div>
          <button type="button" className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-2.5 text-[13px] font-medium text-ink-900 hover:bg-gray-50">
            유형
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
          <button type="button" className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-2.5 text-[13px] font-medium text-ink-900 hover:bg-gray-50">
            상태
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
        </div>

        {loading ? (
          <div className="py-10 text-center text-[13px] text-gray-400">로딩 중...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-y border-gray-100 text-gray-400">
                  <th className="px-5 py-3 font-medium">사용자</th>
                  <th className="px-3 py-3 font-medium">학교</th>
                  <th className="px-3 py-3 font-medium">유형</th>
                  <th className="px-3 py-3 font-medium">사유</th>
                  <th className="px-3 py-3 font-medium">요청일</th>
                  <th className="px-3 py-3 font-medium">상태</th>
                  <th className="px-3 py-3 text-right font-medium">관리</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[11px] font-bold text-gray-500">
                          {row.name.slice(0, 1)}
                        </span>
                        <span className="font-semibold text-ink-900">{row.name}</span>
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-gray-500">{row.school}</td>
                    <td className="px-3 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${TYPE_STYLE[row.type] ?? 'bg-gray-100 text-gray-600'}`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-gray-500 max-w-[200px] truncate">{row.reason}</td>
                    <td className="px-3 py-3.5 text-gray-500">{row.requestedAt}</td>
                    <td className="px-3 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${STATUS_STYLE[row.status] ?? 'bg-gray-50 text-gray-500'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <button type="button" className="rounded-lg border border-emerald-200 px-3 py-1.5 text-[12px] font-semibold text-emerald-600 hover:bg-emerald-50">승인</button>
                        <button type="button" className="rounded-lg border border-gray-200 px-3 py-1.5 text-[12px] font-semibold text-gray-500 hover:bg-gray-50">거절</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && !loading && (
                  <tr><td colSpan={7} className="py-10 text-center text-[13px] text-gray-400">정지/탈퇴 요청이 없습니다.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-[12.5px] text-gray-400">전체 {filtered.length}건</span>
        </div>
      </div>
    </AdminLayout>
  )
}
