with open("src/api/compare.ts", "r") as f:
    content = f.read()

old_interface = """export interface CompareSpecProfile {
  anonymousUuid: string
  virtualNickname: string
  gpa: number
  toeicScore: number
  desiredJob: string
  major?: string
  verificationCount?: number
}"""
new_interface = """export interface CompareSpecProfile {
  anonymousUuid: string
  virtualNickname: string
  gpa: number
  toeicScore: number
  desiredJob: string
  major?: string
  verificationCount?: number
  internCount?: number
  activityCount?: number
}"""
if "internCount?: number" not in content:
    content = content.replace(old_interface, new_interface)

with open("src/api/compare.ts", "w") as f:
    f.write(content)
