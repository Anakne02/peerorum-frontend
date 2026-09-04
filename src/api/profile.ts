import { api } from './axios'

export interface MyCertificateData {
  id: number
  certName: string
  certNo: string
  issueDate: string
  status: string
  fileUrl: string
}

export interface MyActivityData {
  id: number
  activityName: string
  period: string
  detail: string
  authKey: string
  status: string
  fileUrl: string
}

export interface MyInternData {
  id: number
  company: string
  period: string
  detail: string
}

export interface MyAwardData {
  id: number
  name: string
  host: string
  date: string
  detail: string
}

export interface MyProfileData {
  name: string
  nickname: string
  university: string
  major: string
  entranceYear: number
  gpa: number
  majorGpa?: number
  convertedScore?: number
  toeicScore: number
  opicGrade: string
  toeicSpeakingGrade: string
  desiredJob: string
  certificates: MyCertificateData[]
  activities: MyActivityData[]
  interns: MyInternData[]
  awards: MyAwardData[]
}

export const fetchMyProfile = async (): Promise<MyProfileData> => {
  const response = await api.get('/profiles/me')
  return response.data.data
}

export interface ProfileCreateData {
  university: string
  major: string
  entranceYear: number
  desiredJob: string
  nickname: string
}

export const createMyProfile = async (data: ProfileCreateData): Promise<void> => {
  await api.post('/profiles', data)
}

export const updateMyProfile = async (data: {
  nickname?: string
  desiredJob?: string
  entranceYear?: number
}): Promise<void> => {
  await api.put('/profiles/me', data)
}
