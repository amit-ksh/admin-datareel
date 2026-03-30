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
  UpdateOrganisationPayload,
  UnlockOrganisationParams,
  UpdateOrganisationDetailPayload,
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
  if (payload.source_org_id) {
    formData.append('source_org_id', payload.source_org_id)
  }
  if (payload.options) {
    formData.append('options', payload.options)
  }
  formData.append(
    'total_tokens',
    payload.total_tokens ? payload.total_tokens.toString() : '0',
  )

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
  const response = await PrivateAxios.get<Organisation>(
    `dashboard/auth/organisations/${id}`,
  )
  return response.data
}

export const updateOrganisationAPI = async (
  id: string,
  payload: UpdateOrganisationPayload,
) => {
  const response = await PrivateAxios.patch<Organisation>(
    `dashboard/auth/organisations/${id}`,
    payload,
  )
  return response.data
}

export const useGetOrganisation = (id: string) => {
  return useQuery({
    queryKey: ['organisation', id],
    queryFn: () => getOrganisationAPI(id),
    enabled: !!id,
  })
}

export const useUpdateOrganisation = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateOrganisationPayload) =>
      updateOrganisationAPI(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organisation', id] })
      queryClient.invalidateQueries({ queryKey: ['organisations'] })
    },
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

export const unlockOrganisationAPI = async (
  params: UnlockOrganisationParams,
) => {
  const response = await PrivateAxios.put(
    'dashboard/auth/organisation/unlock',
    undefined,
    { params },
  )
  return response.data
}

export const useUnlockOrganisation = (orgId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params: Omit<UnlockOrganisationParams, 'organisation_id'>) =>
      unlockOrganisationAPI({ ...params, organisation_id: orgId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organisation', orgId] })
    },
  })
}

export const updateOrganisationDetailAPI = async (
  id: string,
  payload: UpdateOrganisationDetailPayload,
) => {
  const response = await PrivateAxios.put<Organisation>(
    `dashboard/auth/organisations/${id}`,
    payload,
  )
  return response.data
}

export const useUpdateOrganisationDetail = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateOrganisationDetailPayload) =>
      updateOrganisationDetailAPI(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organisation', id] })
      queryClient.invalidateQueries({ queryKey: ['organisations'] })
    },
  })
}

export const getOrganisationByIdAPI = async (id: string) => {
  const response = await PrivateAxios.get<Organisation>('organisation', {
    params: { id },
  })
  return response.data
}

export const useGetOrganisationById = (id: string) => {
  return useQuery({
    queryKey: ['organisation-by-id', id],
    queryFn: () => getOrganisationByIdAPI(id),
    enabled: !!id,
  })
}
