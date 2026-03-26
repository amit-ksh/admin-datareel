import { QUERY_KEYS } from '@/lib/query-keys'
import { useQuery } from '@tanstack/react-query'
import { PrivateAxios } from '.'

const currentUserAPI = () => {
  return PrivateAxios.get<{
    permissions: string[]
    tenant_data: Record<string, string>
  }>(`admin/login`)
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
