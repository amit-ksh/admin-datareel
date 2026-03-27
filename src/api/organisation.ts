import { PrivateAxios } from '@/api'
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export const createOrganisationSchema = z.object({
  orgName: z.string().min(1, 'Name is required'),
  adminEmail: z.string().email('Invalid email address'),
  defaultPassword: z.string().min(6, 'Password must be at least 6 characters'),
  logo: z.any().optional(),
})

export type CreateOrganisationPayload = z.infer<typeof createOrganisationSchema>

export interface Organisation {
  id: string
  organisation_name: string
  organisation_logo: string | null
  tenant_id: string
  enable_cdn: boolean
  enable_hls: boolean
  enable_content_ai: boolean
  enable_avatar_ai: boolean
  unlocked: boolean
  unlocked_at: string
  created_at: string
  updated_at: string
  total_tokens: number
  used_tokens: number
  infinite_tokens: boolean
  onboarding_status: {
    email_verified: boolean
    email_verified_at: string | null
    information_extracted: boolean
    information_extracted_at: string | null
    assets_cloned: boolean
    assets_cloned_at: string | null
    cloning_job_id: string | null
    cloning_details: unknown | null
  }
  persona_onboarding_config?: {
    require_thumbnail: boolean
    require_video: boolean
    require_audio: boolean
  }
}

export interface OrgTokenBalance {
  organisation_id: string
  total_tokens: number
  used_tokens: number
  remaining_tokens: number | null
  infinite_tokens: boolean
}

export interface UpdateOrgTokensPayload {
  total_tokens?: number | null
  infinite_tokens?: boolean | null
  reset_used?: boolean
}

export interface ListOrganisationsParams {
  email?: string
  page?: number
  page_limit?: number
  search?: string
  onboarded?: boolean
  join_at_start?: string
  join_at_end?: string
  min_feedback?: number
  sort_by?: 'feedback_score' | 'last_video' | 'joined_at' | 'videos'
  sort_order?: 'asc' | 'desc'
}

export interface ListOrganisationTenantsParams {
  org_id: string
  page?: number
  page_limit?: number
  tenant_status?: string
  search?: string
}

export interface OrganisationTenant {
  tenant_id: string
  tenant_name: string
  tenant_email: string
  role: string
  role_active: boolean
  onboarded: boolean
  created_at: string
}

export interface ListOrganisationTenantsResponse {
  summary: {
    total: number
    active: number
    inactive: number
  }
  tenants: OrganisationTenant[]
  meta: {
    page: number
    limit: number
    total: number
  }
}

export interface ListOrganisationsResponse {
  docs: Organisation[]
  meta: {
    total: number
    page: number
    limit: number
  }
}

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

export interface AccessClientAppPayload {
  email: string
  organisationId: string
}

export interface AccessClientAppResponse {
  message: string
  redirectUrl: string
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
