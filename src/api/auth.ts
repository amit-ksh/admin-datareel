import { PrivateAxios, PublicAxios } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type LoginCredentials = z.infer<typeof loginSchema>

export interface AuthResponse {
  redirect?: string
  [key: string]: unknown
}

export const loginAPI = async (credentials: LoginCredentials) => {
  const response = await PublicAxios.post<AuthResponse>(
    'admin/login',
    credentials,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return response.data
}

export const useLoginAPI = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      if (data?.redirect) {
        window.location.href = data.redirect
      }
      queryClient.invalidateQueries()
    },
  })
}

export const logoutAPI = async () => {
  const response = await PublicAxios.post<AuthResponse>(
    'tenant/logout',
    undefined,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
  return response.data
}

export const useLogoutAPI = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logoutAPI,
    onSuccess: (data) => {
      queryClient.clear()
      if (data?.redirect) {
        window.location.href = data.redirect
      } else {
        window.location.href = '/login' // fallback redirect
      }
    },
  })
}

const refreshTokenAPI = async () => {
  return PublicAxios.post('auth/tenant/refresh', undefined, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const refreshToken = async (error: AxiosError) => {
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
