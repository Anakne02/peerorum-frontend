import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyPageLayout from '../../layouts/MyPageLayout'
import { useAuth } from '../../context/AuthContext'
import { updateMyProfile } from '../../api/profile'

const GRADE_OPTIONS = ['1학년', '2학년', '3학년', '4학년']

export default function PersonalInfoEditPage() {
  const navigate = useNavigate()
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState({
    name: user?.name ?? '',
    nickname: user?.nickname ?? '',
    email: user?.email ?? '',
    school: user?.school ?? '',
    department: user?.department ?? '',
    grade: user?.grade || GRADE_OPTIONS[0],
    desiredJob: user?.desiredJob ?? '',
  })

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Calculate entranceYear from grade string e.g. '3학년' -> current year - 3 + 1
      const gradeNum = parseInt(form.grade?.replace(/[^0-9]/g, '') || '4')
      const entranceYear = new Date().getFullYear() - gradeNum + 1
      await updateMyProfile({
        nickname: form.nickname,
        desiredJob: form.desiredJob,
        entranceYear,
      })
      updateProfile(form)
      navigate('/mypage/settings/account')
    } catch (e) {
      console.error('Failed to update profile', e)
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MyPageLayout>
      <div>
        <h1 className="text-[22px] font-bold text-ink-900">개인정보 수정</h1>
        <p className="mt-1 text-[13.5px] text-gray-500">
          프로필에 표시되는 기본 정보를 수정할 수 있어요.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-black/[0.02]"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium text-gray-500">이름</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium text-gray-500">
              익명 이름 (닉네임)
            </label>
            <input
              type="text"
              value={form.nickname}
              onChange={(e) => update('nickname', e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-blue-500"
            />
            <p className="mt-1 text-[11.5px] text-gray-400">
              스펙 비교 시 다른 학생들에게 보여지는 이름이에요.
            </p>
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium text-gray-500">이메일</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium text-gray-500">학교</label>
            <input
              type="text"
              value={form.school}
              onChange={(e) => update('school', e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium text-gray-500">학과</label>
            <input
              type="text"
              value={form.department}
              onChange={(e) => update('department', e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium text-gray-500">학년</label>
            <select
              value={form.grade}
              onChange={(e) => update('grade', e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-[13.5px] text-ink-900 outline-none focus:border-blue-500"
            >
              {GRADE_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium text-gray-500">
              희망 직무
            </label>
            <input
              type="text"
              value={form.desiredJob}
              onChange={(e) => update('desiredJob', e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-5">
          <button
            type="button"
            onClick={() => navigate('/mypage/settings/account')}
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-[13.5px] font-medium text-ink-900 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-[13.5px] font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? '저장 중...' : '저장하기'}
          </button>
        </div>
      </form>
    </MyPageLayout>
  )
}
