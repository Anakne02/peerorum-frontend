import { api } from './axios'

export interface CertificateVerificationRequest {
  certName: string
  certNo: string
  issueDate: string
}

export interface ActivityVerificationRequest {
  activityName: string
  period: string
  detail: string
  authKey?: string
}

export interface InternVerificationRequest {
  company: string
  period: string
  detail: string
}

export interface AwardVerificationRequest {
  name: string
  host: string
  date: string
  detail: string
}

export interface GpaVerificationRequest {
  gpa: number
  scoreType: string
  percentile: number
  majorAverage: number
}

export interface LanguageVerificationRequest {
  testName: string
  score: string
  date: string
}

export const submitCertificate = async (request: CertificateVerificationRequest, file: File | null) => {
  const formData = new FormData()
  formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }))
  if (file) {
    formData.append('file', file)
  }
  const response = await api.post('/verification/certificate', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const submitActivity = async (request: ActivityVerificationRequest, file: File | null) => {
  const formData = new FormData()
  formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }))
  if (file) {
    formData.append('file', file)
  }
  const response = await api.post('/verification/activity', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const submitIntern = async (request: InternVerificationRequest) => {
  const response = await api.post('/verification/intern', request)
  return response.data
}

export const submitAward = async (request: AwardVerificationRequest) => {
  const response = await api.post('/verification/award', request)
  return response.data
}

export const submitGpa = async (request: GpaVerificationRequest, file: File | null) => {
  const formData = new FormData()
  formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }))
  if (file) {
    formData.append('file', file)
  }
  const response = await api.post('/verification/gpa', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const submitLanguage = async (request: LanguageVerificationRequest, file: File | null) => {
  const formData = new FormData()
  formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }))
  if (file) {
    formData.append('file', file)
  }
  const response = await api.post('/verification/language', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}
