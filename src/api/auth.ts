import { api } from './axios'

export interface LoginResponse {
  accessToken: string
  uuid: string
  role: string
  name: string
}

export const loginApi = async (email: string, password: string):Promise<LoginResponse> => {
  const response = await api.post('/auth/login', { email, password })
  return response.data.data
}

export const signupApi = async (name: string, email: string, password: string):Promise<LoginResponse> => {
  const response = await api.post('/auth/signup', { name, email, password })
  return response.data.data
}
