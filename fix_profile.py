with open("src/api/profile.ts", "r") as f:
    content = f.read()

old_str = """export interface MyProfileData {
  name: string
  nickname: string
  university: string
  major: string
  entranceYear: number
  gpa: number
  toeicScore: number
  opicGrade: string"""
new_str = """export interface MyProfileData {
  name: string
  nickname: string
  university: string
  major: string
  entranceYear: number
  gpa: number
  majorGpa?: number
  convertedScore?: number
  toeicScore: number
  opicGrade: string"""

content = content.replace(old_str, new_str)
with open("src/api/profile.ts", "w") as f:
    f.write(content)
