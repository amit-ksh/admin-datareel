const { PrivateAxios } = require('@/api')
import { QUERY_KEYS } from '@/lib/query-keys'
import { useMutation, useQuery } from '@tanstack/react-query'
import { PublicAxios } from '.'

const currentUserAPI = () => {
  return PrivateAxios.get(`admin/login`)
}

export const useCurrentUserAPI = ({
  isProtected,
}: {
  isProtected: boolean
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CURRENT_USER, isProtected],
    queryFn: currentUserAPI,
    enabled: isProtected,
  })
}

const logoutAPI = async () => {
  return PublicAxios.post(
    `tenant/logout`,
    {},
    {
      headers: {
        Accept: 'application/json',
      },
    },
  )
}

export const useLogoutAPI = () => {
  return useMutation({
    mutationFn: logoutAPI,
    onSuccess: async () => {
      console.log('User logged out successfully')
    },
  })
}
