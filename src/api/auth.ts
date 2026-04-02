import { PrivateAxios, PublicAxios } from '@/api'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { AuthResponse, LoginCredentials } from '@/types/auth'
import { CurrentUserResponse } from '@/types/user'
import { QUERY_KEYS } from '@/lib/query-keys'

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

export const meAPI = async () => {
  const response =
    await PrivateAxios.get<CurrentUserResponse>('dashboard/auth/me')
  return response.data
}

export const useMeAPI = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CURRENT_USER],
    queryFn: meAPI,
    ...options,
  })
}

export const logoutAPI = async () => {
  const response = await PrivateAxios.post<AuthResponse>(
    'dashboard/auth/logout',
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
    onSuccess: () => {
      queryClient.clear()
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
