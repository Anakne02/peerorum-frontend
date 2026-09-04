with open('src/pages/compare/AnonymousProfileDetailPage.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "import { getProfileDetail, ProfileDetailResponse } from '../../api/comparison'",
    "import { getProfileDetail } from '../../api/comparison'\nimport type { ProfileDetailResponse } from '../../api/comparison'"
)

content = content.replace(
    "import { MY_SPEC, RANKED_STUDENTS } from '../../data/mockRankings'",
    "import { MY_SPEC } from '../../data/mockRankings'"
)

content = content.replace('{student.gpaPercentile}', '{gpaPercentile}')
content = content.replace('{student.detail.certsPercentile}', '{certsPercentile}')
content = content.replace('{student.certsPercentile}', '{certsPercentile}')
content = content.replace('{student.detail.activityPercentile}', '{activityPercentile}')
content = content.replace('{student.detail.internPercentile}', '{internPercentile}')
content = content.replace('{student.langPercentile}', '{langPercentile}')

with open('src/pages/compare/AnonymousProfileDetailPage.tsx', 'w') as f:
    f.write(content)
