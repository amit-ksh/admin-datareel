import { PrivateAxios } from '@/api'
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import {
  Organisation,
  OrgTokenBalance,
  UpdateOrgTokensPayload,
  ListOrganisationsParams,
  ListOrganisationTenantsParams,
  ListOrganisationTenantsResponse,
  ListOrganisationsResponse,
  CreateOrganisationPayload,
  AccessClientAppPayload,
  AccessClientAppResponse,
} from '@/types/organisation'

export const listOrganisationsAPI = async (params: ListOrganisationsParams) => {
  const response = await PrivateAxios.get<ListOrganisationsResponse>(
    'dashboard/auth/organisations',
    { params },
  )
  return response.data
}

export const useListOrganisations = (
  params: ListOrganisationsParams,
  options?: Partial<UseQueryOptions<ListOrganisationsResponse>>,
) => {
  return useQuery({
    queryKey: ['organisations', params],
    queryFn: () => listOrganisationsAPI(params),
    ...options,
  })
}

export const useInfiniteListOrganisations = (
  params: Omit<ListOrganisationsParams, 'page'>,
) => {
  return useInfiniteQuery({
    queryKey: ['organisations-infinite', params],
    queryFn: ({ pageParam = 1 }) =>
      listOrganisationsAPI({ ...params, page: pageParam }),
    getNextPageParam: (lastPage: ListOrganisationsResponse) => {
      const { page, total, limit } = lastPage.meta
      return page * limit < total ? page + 1 : undefined
    },
    initialPageParam: 1,
  })
}

export const createOrganisationAPI = async (
  payload: CreateOrganisationPayload,
) => {
  const formData = new FormData()
  formData.append('orgName', payload.orgName)
  formData.append('adminEmail', payload.adminEmail)
  formData.append('defaultPassword', payload.defaultPassword)
  if (payload.logo) {
    formData.append('logo', payload.logo)
  }

  const response = await PrivateAxios.post<{ organisation_id: string }>(
    'dashboard/auth/organisations',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
  return response.data
}

export const useCreateOrganisation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createOrganisationAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organisations'] })
    },
  })
}

export const accessClientAppAPI = async (payload: AccessClientAppPayload) => {
  const response = await PrivateAxios.post<AccessClientAppResponse>(
    'dashboard/auth/access-client-app',
    payload,
  )
  return response.data
}

export const useAccessClientApp = () => {
  return useMutation({
    mutationFn: accessClientAppAPI,
    onSuccess: (data) => {
      if (data?.redirectUrl) {
        window.open(data.redirectUrl, '_blank')
      }
    },
  })
}

export const getOrganisationAPI = async (id: string) => {
  const response = await PrivateAxios.get<Organisation>('organisation/', {
    params: { id },
  })
  return response.data
}

export const useGetOrganisation = (id: string) => {
  return useQuery({
    queryKey: ['organisation', id],
    queryFn: () => getOrganisationAPI(id),
    enabled: !!id,
  })
}

export const listOrganisationTenantsAPI = async (
  params: ListOrganisationTenantsParams,
) => {
  const { org_id, ...rest } = params
  const response = await PrivateAxios.get<ListOrganisationTenantsResponse>(
    `dashboard/auth/organisations/${org_id}/tenants`,
    { params: rest },
  )
  return response.data
}

export const useListOrganisationTenants = (
  params: ListOrganisationTenantsParams,
) => {
  return useQuery({
    queryKey: ['organisation-tenants', params],
    queryFn: () => listOrganisationTenantsAPI(params),
    enabled: !!params.org_id,
  })
}

export const getOrgTokenBalanceAPI = async (orgId: string) => {
  const response = await PrivateAxios.get<OrgTokenBalance>(
    `dashboard/auth/organisations/${orgId}/tokens`,
  )
  return response.data
}

export const useGetOrgTokenBalance = (orgId: string) => {
  return useQuery({
    queryKey: ['organisation-tokens', orgId],
    queryFn: () => getOrgTokenBalanceAPI(orgId),
    enabled: !!orgId,
  })
}

export const updateOrgTokensAPI = async (
  orgId: string,
  payload: UpdateOrgTokensPayload,
) => {
  const response = await PrivateAxios.put<OrgTokenBalance>(
    `dashboard/auth/organisations/${orgId}/tokens`,
    payload,
  )
  return response.data
}

export const useUpdateOrgTokens = (orgId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateOrgTokensPayload) =>
      updateOrgTokensAPI(orgId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['organisation-tokens', orgId],
      })
      queryClient.invalidateQueries({ queryKey: ['organisation', orgId] })
    },
  })
}
