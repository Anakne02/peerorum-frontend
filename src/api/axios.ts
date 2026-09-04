import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('token')

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const requestUrl = originalRequest?.url || ''
    const skipsRefresh = [
      '/auth/login',
      '/auth/signup',
      '/auth/refresh',
    ].some((path) => requestUrl.includes(path))

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !skipsRefresh
    ) {
      originalRequest._retry = true

      try {
        const baseURL = (api.defaults.baseURL || '/api').replace(/\/$/, '')
        const refreshResponse = await axios.post(
          `${baseURL}/auth/refresh`,
          null,
          { withCredentials: true },
        )
        const session = refreshResponse.data?.data

        if (!session?.accessToken) {
          throw new Error('새 Access Token이 없습니다.')
        }

        localStorage.setItem('token', session.accessToken)
        if (session.uuid) localStorage.setItem('uuid', session.uuid)
        if (session.role) localStorage.setItem('role', session.role)
        if (session.name) localStorage.setItem('name', session.name)

        originalRequest.headers.Authorization =
          `Bearer ${session.accessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('uuid')
        localStorage.removeItem('name')
        localStorage.removeItem('nickname')
        localStorage.removeItem('hasSpec')
        localStorage.removeItem('uiRole')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
