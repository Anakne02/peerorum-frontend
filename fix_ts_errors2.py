with open('src/pages/compare/AnonymousProfileDetailPage.tsx', 'r') as f:
    content = f.read()

content = content.replace('student.gpaPercentile', 'gpaPercentile')
content = content.replace('student.langPercentile', 'langPercentile')
content = content.replace('{student.detail.majorAvgGpa} / 4.5', '제공 안됨')

with open('src/pages/compare/AnonymousProfileDetailPage.tsx', 'w') as f:
    f.write(content)
