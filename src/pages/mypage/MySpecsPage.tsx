import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Award,
  Briefcase,
  Building2,
  FileEdit,
  FileText,
  GraduationCap,
  Globe2,
  Target,
  Trophy,
  Users,
} from 'lucide-react'
import MyPageLayout from '../../layouts/MyPageLayout'
import PenguinMascot from '../../components/ui/PenguinMascot'
import PenguinHero from '../../components/ui/PenguinHero'
import RankPagination from '../../components/compare/RankPagination'
import { useAuth } from '../../context/AuthContext'
import { useSpec, type SpecEntry } from '../../context/SpecContext'

const REGISTERABLE_ITEMS = [
  { icon: GraduationCap, label: '학점', description: '재학중이거나 1학년일 경우 학점을 등록해요.' },
  { icon: Globe2, label: '어학', description: 'TOEIC, TOEFL, OPIc 등 어학 성적을 등록해요.' },
  { icon: Award, label: '자격증', description: '취득한 자격증과 유효기간을 등록해요.' },
  { icon: Briefcase, label: '대외활동', description: '대외활동 및 봉사활동을 등록해요.' },
  { icon: Users, label: '인턴', description: '인턴 경험을 등록해요.' },
  { icon: Trophy, label: '수상', description: '수상 내역과 성과를 등록해요.' },
]

const CERTS_PAGE_SIZE = 6
const ACTIVITIES_PAGE_SIZE = 4

const EMPTY_STATE_TEXT = '아직 등록된 항목이 없어요.'

function DetailCard({
  icon: Icon,
  title,
  pagination,
  children,
}: {
  icon: typeof GraduationCap
  title: string
  pagination?: React.ReactNode
  children: React.ReactNode
}) {
  const header = (
    <div className="mb-4 flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon className="h-4 w-4" />
      </span>
      <h3 className="text-[14.5px] font-bold text-ink-900">{title}</h3>
    </div>
  )

  if (!pagination) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm shadow-black/[0.02]">
        {header}
        {children}
      </div>
    )
  }

  return (
    <div className="flex h-72 flex-col rounded-2xl border border-gray-100 bg-white p-5 pb-3 shadow-sm shadow-black/[0.02]">
      {header}
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      {pagination}
    </div>
  )
}

function EmptyCardState() {
  return <p className="text-[12.5px] text-gray-400">{EMPTY_STATE_TEXT}</p>
}

function GpaCard({ gpaEntry }: { gpaEntry?: SpecEntry }) {
  if (!gpaEntry) {
    return (
      <DetailCard icon={GraduationCap} title="학업">
        <EmptyCardState />
      </DetailCard>
    )
  }

  const average = Number.parseFloat(gpaEntry.gpaAverage ?? '')
  const percent = Number.isFinite(average) ? Math.min(100, Math.max(0, (average / 4.5) * 100)) : 0

  return (
    <DetailCard icon={GraduationCap} title="학업">
      <div>
        <span className="text-[20px] font-bold text-ink-900">
          {gpaEntry.gpaAverage || '-'} / 4.5
        </span>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-blue-600" style={{ width: `${percent}%` }} />
        </div>
        {gpaEntry.majorGpaAverage && (
          <p className="mt-1.5 text-[11.5px] text-gray-400">
            전공 평점평균 {gpaEntry.majorGpaAverage} / 4.5
          </p>
        )}
      </div>
    </DetailCard>
  )
}

function LanguageCard({ languageEntries }: { languageEntries: SpecEntry[] }) {
  if (languageEntries.length === 0) {
    return (
      <DetailCard icon={Globe2} title="어학">
        <EmptyCardState />
      </DetailCard>
    )
  }

  return (
    <DetailCard icon={Globe2} title="어학">
      <div className="flex flex-col gap-4">
        {languageEntries.map((entry, index) => {
          const numericScore = Number.parseFloat(entry.score ?? '')
          const showBar = Number.isFinite(numericScore) && entry.test?.startsWith('TOEIC')
          const percent = showBar ? Math.min(100, Math.max(0, (numericScore / 990) * 100)) : 0

          return (
            <div key={`${entry.test}-${index}`}>
              <span className="text-[13px] font-medium text-gray-500">{entry.test || '어학'}</span>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[18px] font-bold text-ink-900">{entry.score || '-'}</span>
                {showBar && (
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: `${percent}%` }} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </DetailCard>
  )
}

function CertsCard({ certEntries }: { certEntries: SpecEntry[] }) {
  const [page, setPage] = useState(1)

  if (certEntries.length === 0) {
    return (
      <DetailCard icon={Award} title="자격증">
        <EmptyCardState />
      </DetailCard>
    )
  }

  const totalPages = Math.max(1, Math.ceil(certEntries.length / CERTS_PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const items = certEntries.slice((currentPage - 1) * CERTS_PAGE_SIZE, currentPage * CERTS_PAGE_SIZE)

  return (
    <DetailCard
      icon={Award}
      title="자격증"
      pagination={
        <RankPagination currentPage={currentPage} totalPages={totalPages} onChange={setPage} />
      }
    >
      <ul className="flex flex-col gap-2.5">
        {items.map((cert, index) => (
          <li key={`${cert.name}-${index}`} className="flex items-center justify-between text-[13.5px]">
            <span className="font-medium text-ink-900">{cert.name}</span>
            <span className="text-gray-400">{cert.date}</span>
          </li>
        ))}
      </ul>
    </DetailCard>
  )
}

function ActivitiesCard({ activityEntries }: { activityEntries: SpecEntry[] }) {
  const [page, setPage] = useState(1)

  if (activityEntries.length === 0) {
    return (
      <DetailCard icon={Briefcase} title="대외활동">
        <EmptyCardState />
      </DetailCard>
    )
  }

  const totalPages = Math.max(1, Math.ceil(activityEntries.length / ACTIVITIES_PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const items = activityEntries.slice(
    (currentPage - 1) * ACTIVITIES_PAGE_SIZE,
    currentPage * ACTIVITIES_PAGE_SIZE,
  )

  return (
    <DetailCard
      icon={Briefcase}
      title="대외활동"
      pagination={
        <RankPagination currentPage={currentPage} totalPages={totalPages} onChange={setPage} />
      }
    >
      <ul className="flex flex-col gap-2.5">
        {items.map((activity, index) => (
          <li key={`${activity.name}-${index}`} className="text-[13.5px]">
            <p className="font-medium text-ink-900">{activity.name}</p>
            <p className="text-[12px] text-gray-400">{activity.period}</p>
          </li>
        ))}
      </ul>
    </DetailCard>
  )
}

function InternshipsCard({ internEntries }: { internEntries: SpecEntry[] }) {
  const [page, setPage] = useState(1)

  if (internEntries.length === 0) {
    return (
      <DetailCard icon={Users} title="인턴 경험">
        <EmptyCardState />
      </DetailCard>
    )
  }

  const totalPages = internEntries.length
  const currentPage = Math.min(page, totalPages)
  const intern = internEntries[currentPage - 1]

  return (
    <DetailCard
      icon={Users}
      title="인턴 경험"
      pagination={
        <RankPagination currentPage={currentPage} totalPages={totalPages} onChange={setPage} />
      }
    >
      <p className="text-[13.5px] font-medium text-ink-900">{intern.company}</p>
      <p className="text-[12px] text-gray-400">{intern.period}</p>
      {intern.detail && <p className="mt-2.5 text-[12.5px] text-gray-500">{intern.detail}</p>}
    </DetailCard>
  )
}

function AwardsCard({ awardEntries }: { awardEntries: SpecEntry[] }) {
  const [page, setPage] = useState(1)

  if (awardEntries.length === 0) {
    return (
      <DetailCard icon={Trophy} title="수상">
        <EmptyCardState />
      </DetailCard>
    )
  }

  const totalPages = awardEntries.length
  const currentPage = Math.min(page, totalPages)
  const award = awardEntries[currentPage - 1]

  return (
    <DetailCard
      icon={Trophy}
      title="수상"
      pagination={
        <RankPagination currentPage={currentPage} totalPages={totalPages} onChange={setPage} />
      }
    >
      <p className="text-[13.5px] font-medium text-ink-900">{award.name}</p>
      <p className="text-[12px] text-gray-400">{award.date}</p>
      {award.host && <p className="mt-2.5 text-[12.5px] text-gray-500">주최: {award.host}</p>}
      {award.detail && <p className="mt-1 text-[12.5px] text-gray-500">{award.detail}</p>}
    </DetailCard>
  )
}

export default function MySpecsPage() {
  const { user } = useAuth()
  const { entries } = useSpec()
  const navigate = useNavigate()

  if (!user?.hasSpec) {
    return (
      <MyPageLayout>
        <div>
          <h1 className="text-[22px] font-bold text-ink-900">내 스펙</h1>
          <p className="mt-1 text-[13.5px] text-gray-500">
            등록한 스펙을 관리하고, 성장 과정을 한눈에 확인해보세요.
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm shadow-black/[0.02]">
          <PenguinHero className="mx-auto h-28 w-28" />
          <h2 className="mt-5 text-[18px] font-bold text-ink-900">아직 등록된 스펙이 없어요</h2>
          <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-gray-500">
            학점, 어학, 자격증, 대외활동, 인턴, 수상 등
            <br />내 스펙을 등록하고 다른 학생들과 비교해보세요!
          </p>
          <button
            type="button"
            onClick={() => navigate('/mypage/specs/register')}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-blue-700"
          >
            스펙 등록하기
          </button>

          <p className="mt-8 text-[12.5px] font-medium text-gray-400">등록 가능한 항목</p>
          <div className="mx-auto mt-4 grid max-w-2xl grid-cols-3 gap-3 sm:grid-cols-6">
            {REGISTERABLE_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1.5 rounded-xl bg-gray-50 px-2 py-3"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm shadow-black/[0.02]">
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="text-[12px] font-semibold text-ink-900">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-gray-400">
            스펙을 등록할수록 더 정확한 비교와 분석이 가능해져요!
          </p>
        </div>
      </MyPageLayout>
    )
  }

  const gpaEntry = entries.gpa[0]

  const profileFields = [
    { icon: Building2, label: '학교', value: user.school || '미입력' },
    { icon: FileText, label: '학과', value: user.department || '미입력' },
    { icon: GraduationCap, label: '학년', value: user.grade || '미입력' },
    { icon: Target, label: '희망 직무', value: user.desiredJob || '미입력' },
    {
      icon: Award,
      label: '전공 학점',
      value: gpaEntry?.majorGpaAverage ? `${gpaEntry.majorGpaAverage} / 4.5` : '미등록',
    },
    {
      icon: Award,
      label: '평균 학점',
      value: gpaEntry?.gpaAverage ? `${gpaEntry.gpaAverage} / 4.5` : '미등록',
    },
  ]

  const primaryLanguage = entries.language[0]
  const languageSummary = primaryLanguage
    ? `${primaryLanguage.test || '어학'} ${primaryLanguage.score ?? ''}`.trim() +
      (entries.language.length > 1 ? ` 외 ${entries.language.length - 1}건` : '')
    : '미등록'

  const summaryStats = [
    { icon: Globe2, label: '어학', value: languageSummary },
    { icon: Award, label: '자격증', value: `${entries.certificate.length}개` },
    { icon: Briefcase, label: '대외활동', value: `${entries.activity.length}회` },
    { icon: Users, label: '인턴', value: `${entries.intern.length}회` },
    { icon: Trophy, label: '수상', value: `${entries.award.length}회` },
  ]

  const profileLine = [
    [user.school, user.department, user.grade].filter(Boolean).join(' ') || '학교 정보 미입력',
    user.desiredJob ? `${user.desiredJob} 희망` : '희망 직무 미입력',
  ].join(' · ')

  return (
    <MyPageLayout>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-ink-900">내 스펙</h1>
          <p className="mt-1 text-[13.5px] text-gray-500">
            등록한 스펙을 관리하고, 성장 과정을 한눈에 확인해보세요.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => navigate('/mypage/specs/edit')}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-blue-700"
          >
            <FileEdit className="h-3.5 w-3.5" />
            스펙 수정하기
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm shadow-black/[0.02]">
        <div className="flex items-center gap-4">
          <PenguinMascot className="h-14 w-14" />
          <div>
            <span className="flex items-center gap-1.5">
              <span className="text-[16px] font-bold text-ink-900">{user.name}</span>
              {user.nickname && (
                <span className="text-[12.5px] font-medium text-gray-400">({user.nickname})</span>
              )}
            </span>
            <p className="mt-0.5 text-[13px] text-gray-500">{profileLine}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-3 lg:grid-cols-6">
          {profileFields.map((field) => (
            <div key={field.label} className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                <field.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11.5px] text-gray-400">{field.label}</p>
                <p className="text-[13px] font-bold text-ink-900">{field.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-3 lg:grid-cols-5">
          {summaryStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                <stat.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11.5px] text-gray-400">{stat.label}</p>
                <p className="text-[13px] font-bold text-ink-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="mb-4 mt-8 text-[16px] font-bold text-ink-900">상세 스펙</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <GpaCard gpaEntry={gpaEntry} />
        <LanguageCard languageEntries={entries.language} />
        <CertsCard certEntries={entries.certificate} />
        <ActivitiesCard activityEntries={entries.activity} />
        <InternshipsCard internEntries={entries.intern} />
        <AwardsCard awardEntries={entries.award} />
      </div>
    </MyPageLayout>
  )
}
