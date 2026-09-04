with open("src/pages/compare/AnonymousProfileDetailPage.tsx", "r") as f:
    content = f.read()

# Add imports
if "import { fetchMyProfile" not in content:
    content = content.replace(
        "import { fetchAnonymousProfile",
        "import { fetchMyProfile, MyProfileData } from '../../api/profile'\nimport { fetchAnonymousProfile"
    )

# Add state
if "const [myProfile, setMyProfile]" not in content:
    content = content.replace(
        "const [student, setStudent] = useState<ProfileDetailResponse | null>(null)",
        "const [student, setStudent] = useState<ProfileDetailResponse | null>(null)\n  const [myProfile, setMyProfile] = useState<MyProfileData | null>(null)"
    )

# Add fetch logic
old_fetch = """      try {
        const data = await fetchAnonymousProfile(uuid)
        setStudent(data)
      }"""
new_fetch = """      try {
        const data = await fetchAnonymousProfile(uuid)
        setStudent(data)
        const myData = await fetchMyProfile()
        setMyProfile(myData)
      }"""
content = content.replace(old_fetch, new_fetch)

# Update COMPARE_ROWS
old_compare = """  const COMPARE_ROWS = [
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
  ]"""
new_compare = """  const myCertsCount = myProfile?.certificates?.length || 0;
  const myActivityCount = myProfile?.activities?.length || 0;
  const myInternCount = myProfile?.interns?.length || 0;
  
  const COMPARE_ROWS = [
    { label: '학점', mine: myProfile ? `${myProfile.gpa} / 4.5` : '-', theirs: `${student.gpa} / 4.5` },
    { label: '어학', mine: myProfile ? (myProfile.toeicScore > 0 ? `TOEIC ${myProfile.toeicScore}` : '없음') : '-', theirs: student.toeicScore > 0 ? `TOEIC ${student.toeicScore}` : '없음' },
    {
      label: '자격증',
      mine: myProfile ? `${myCertsCount}개` : '-',
      theirs: `${student.certificates ? student.certificates.length : 0}개`,
    },
    {
      label: '활동',
      mine: myProfile ? (myActivityCount > 0 ? `대외활동 ${myActivityCount}회` : '없음') : '-',
      theirs: contestString === '-' ? activityString : `${activityString} · ${contestString}`,
    },
    { label: '인턴', mine: myProfile ? (myInternCount > 0 ? `${myInternCount}회` : '경험 없음') : '-', theirs: internString === '-' ? '경험 없음' : internString },
  ]"""
content = content.replace(old_compare, new_compare)

with open("src/pages/compare/AnonymousProfileDetailPage.tsx", "w") as f:
    f.write(content)
