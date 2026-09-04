import re

with open('src/pages/compare/AnonymousProfileDetailPage.tsx', 'r') as f:
    content = f.read()

# Add imports for API and React hooks
content = content.replace(
    "import { useState } from 'react'",
    "import { useState, useEffect } from 'react'\nimport { getProfileDetail, ProfileDetailResponse } from '../../api/comparison'"
)

# Find the component definition
comp_start = content.find('export default function AnonymousProfileDetailPage() {')
if comp_start != -1:
    body_start = content.find('{', comp_start) + 1
    
    new_hooks = """
  const [activeTab, setActiveTab] = useState<'spec' | 'timeline'>('spec')
  const { studentId } = useParams<{ studentId: string }>()
  const [student, setStudent] = useState<ProfileDetailResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (studentId) {
      getProfileDetail(studentId)
        .then((data) => {
          setStudent(data)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
          setLoading(false)
        })
    }
  }, [studentId])

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-50">로딩 중...</div>
  }

  if (!student) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-50">사용자를 찾을 수 없습니다.</div>
  }

  const activeGpaIndex = activeGpaBucketIndex(student.gpa)
  
  // Calculate synthetic values if they don't exist in ProfileDetailResponse
  // Since we don't have percentiles from backend, we will use mock-like percentages for now, 
  // or you could calculate them based on actual logic later.
  const gpaPercentile = 5; 
  const langPercentile = 10;
  const certsPercentile = 15;
  const activityPercentile = 20;
  const internPercentile = 25;
  const overallPercentile = 7;

  const activityString = student.activities && student.activities.length > 0 
    ? `대외활동 ${student.activities.length}회` 
    : '-';
    
  const contestString = student.awards && student.awards.length > 0
    ? `공모전 ${student.awards.length}회`
    : '-';
    
  const internString = student.interns && student.interns.length > 0
    ? `인턴 ${student.interns.length}회`
    : '-';

  const STAT_ROW = [
    {
      icon: GraduationCap,
      label: '학점 (4.5 만점)',
      value: `${student.gpa} / 4.5`,
      percentile: `상위 ${gpaPercentile}%`,
    },
    { icon: Globe2, label: '어학', value: student.toeicScore > 0 ? `TOEIC ${student.toeicScore}` : '없음', percentile: `상위 ${langPercentile}%` },
    {
      icon: Award,
      label: '자격증',
      value: `${student.certificates ? student.certificates.length : 0}개`,
      percentile: `상위 ${certsPercentile}%`,
    },
    {
      icon: Briefcase,
      label: '활동',
      value: contestString === '-' ? activityString : `${activityString} · ${contestString}`,
      percentile: `상위 ${activityPercentile}%`,
    },
    {
      icon: Users,
      label: '인턴',
      value: internString === '-' ? '경험 없음' : internString,
      percentile: `상위 ${internPercentile}%`,
    },
  ]

  const COMPARE_ROWS = [
    { label: '학점', mine: `${MY_SPEC.gpa} / 4.5`, theirs: `${student.gpa} / 4.5` },
    { label: '어학', mine: MY_SPEC.lang, theirs: student.toeicScore > 0 ? `TOEIC ${student.toeicScore}` : '없음' },
    {
      label: '자격증',
      mine: `${MY_SPEC.certsCount}개`,
      theirs: `${student.certificates ? student.certificates.length : 0}개`,
    },
    {
      label: '활동',
      mine: MY_SPEC.activity,
      theirs: contestString === '-' ? activityString : `${activityString} · ${contestString}`,
    },
    { label: '인턴', mine: MY_SPEC.intern, theirs: internString === '-' ? '경험 없음' : internString },
  ]
"""
    
    # We replace from body_start to the first return
    return_start = content.find('return (', body_start)
    if return_start != -1:
        content = content[:body_start] + new_hooks + content[return_start:]

# Replace variables in the JSX
content = content.replace('{student.anonId}', '{student.virtualNickname}')
content = content.replace('{student.department}', '{student.major}')
content = content.replace('{student.detail.overallPercentile}', '{overallPercentile}')
content = content.replace('{student.detail.desiredJob}', '{student.desiredJob}')
content = content.replace('{student.gpa}', '{student.gpa}') # this might stay the same, but wait, student.gpa is already a number
content = content.replace('{student.gpaPercentile}', '{gpaPercentile}')
content = content.replace('parseFloat(student.gpa)', 'student.gpa')
content = content.replace('{student.lang}', '{student.toeicScore > 0 ? `TOEIC ${student.toeicScore}` : "없음"}')
content = content.replace('{student.langPercentile}', '{langPercentile}')
content = content.replace('{student.detail.certList.length}', '{student.certificates ? student.certificates.length : 0}')
content = content.replace('{student.detail.certList.map((cert) => (', '{student.certificates && student.certificates.map((cert, idx) => (')
content = content.replace('key={cert}', 'key={idx}')
content = content.replace('{cert}', '{cert.certName}')
content = content.replace('{student.activity}', '{activityString}')
content = content.replace('{student.contest === \'-\' ? \'참여 이력 없음\' : `${student.contest} 수상`}', '{contestString === "-" ? "참여 이력 없음" : `${contestString} 수상`}')
content = content.replace('{student.intern === \'-\' ? \'인턴 경험 없음\' : `인턴 경험 ${student.intern}`}', '{internString === "-" ? "인턴 경험 없음" : `인턴 경험 ${internString}`}')
content = content.replace('{student.detail.internDetail ?? \'등록된 인턴 이력이 없어요.\'}', '{student.interns && student.interns.length > 0 ? student.interns[0].company : "등록된 인턴 이력이 없어요."}')

with open('src/pages/compare/AnonymousProfileDetailPage.tsx', 'w') as f:
    f.write(content)
