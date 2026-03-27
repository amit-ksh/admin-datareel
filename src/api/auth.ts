import { PrivateAxios, PublicAxios } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthResponse, LoginCredentials } from '@/types/auth'

export const loginAPI = async (credentials: LoginCredentials) => {
  const response = await PublicAxios.post<AuthResponse>(
    'dashboard/auth/login',
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

export const impersonateLoginAPI = async (payload: {
  org_id: string
  email: string
}) => {
  const response = await PrivateAxios.post<AuthResponse>(
    'admin/impersonate',
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return response.data
}

export const useImpersonateLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: impersonateLoginAPI,
    onSuccess: (data) => {
      if (data?.redirect) {
        window.location.href = data.redirect
      }
      queryClient.invalidateQueries()
    },
  })
}
