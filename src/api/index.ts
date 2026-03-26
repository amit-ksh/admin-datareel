import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const API_VERSION = {
  V1: `api/v1`,
  V2: `api/v2`,
}

export const PublicAxiosWithoutVersion = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
})

export const VideoAxiosWithoutVersion = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VIDEO_API_BASE_URL,
})

export const VideoAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VIDEO_API_BASE_URL + API_VERSION.V2,
  withCredentials: true,
})

export const PublicAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + API_VERSION.V1,
  withCredentials: true,
})

export const PrivateAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + API_VERSION.V1,
  withCredentials: true,
})

const refreshTokenAPI = async () => {
  return PublicAxios.post('auth/tenant/refresh', undefined, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const refreshToken = async (error: AxiosError) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retry?: boolean
  }
  if (
    error.response &&
    error.response.status === 401 &&
    !originalRequest?._retry
  ) {
    originalRequest._retry = true
    try {
      const response = await refreshTokenAPI()
      console.log('Interceptors', response)

      return PrivateAxios(originalRequest)
    } catch (refreshError) {
      console.log(refreshError)
      return Promise.reject(refreshError)
    }
  }
  return Promise.reject(error)
}

PrivateAxios.interceptors.response.use((response) => response, refreshToken)
