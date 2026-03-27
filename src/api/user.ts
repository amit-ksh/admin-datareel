import { QUERY_KEYS } from '@/lib/query-keys'
import { CurrentUserResponse, UseCurrentUserParams } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import { PrivateAxios } from '.'

const currentUserAPI = () => {
  return PrivateAxios.get<CurrentUserResponse>(`admin/login`)
}

export const useCurrentUserAPI = ({ isProtected }: UseCurrentUserParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CURRENT_USER, isProtected],
    queryFn: currentUserAPI,
    enabled: isProtected,
  })
}
