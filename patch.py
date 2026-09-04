with open("src/pages/compare/CompareSpec2Page.tsx", "r") as f:
    content = f.read()

content = content.replace(
"""  const filteredStudents = profiles.map((p, i) => ({
    anonId: p.anonymousUuid,
    department: p.major,""",
"""  const filteredStudents = profiles.map((p, i) => ({
    anonId: p.virtualNickname || p.anonymousUuid.substring(0, 8),
    uuid: p.anonymousUuid,
    department: p.major,"""
)

content = content.replace(
"""                  <tr
                    key={student.anonId}
                    onClick={() => navigate(`/compare/${encodeURIComponent(student.anonId)}`)}""",
"""                  <tr
                    key={student.uuid}
                    onClick={() => navigate(`/compare/${encodeURIComponent(student.uuid)}`)}"""
)

with open("src/pages/compare/CompareSpec2Page.tsx", "w") as f:
    f.write(content)
