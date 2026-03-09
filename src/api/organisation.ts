import { PrivateAxios } from '@/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

export const createOrganisationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  logo: z.string().optional(),
})

export type CreateOrganisationPayload = z.infer<typeof createOrganisationSchema>

export interface Organisation {
  id: string
  name: string
  logo?: string
  joined_at: string
  onboarded: boolean
  total_videos: number
  views: number
  last_video_creation_date: string | null
  avg_feedback: number
  video_views_counts: number
  activeTenants?: number
}

export interface ListOrganisationsParams {
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

export interface ListOrganisationsResponse {
  data: Organisation[]
  meta: {
    total: number
    page: number
    page_limit: number
    last_page: number
  }
}

export const listOrganisationsAPI = async (params: ListOrganisationsParams) => {
  const response = await PrivateAxios.get<ListOrganisationsResponse>(
    'admin/organisations',
    { params },
  )
  return response.data
}

export const useListOrganisations = (params: ListOrganisationsParams) => {
  return useQuery({
    queryKey: ['organisations', params],
    queryFn: () => listOrganisationsAPI(params),
  })
}

export const createOrganisationAPI = async (
  payload: CreateOrganisationPayload,
) => {
  const response = await PrivateAxios.post<{ new_org_id: string }>(
    'admin/organisations',
    payload,
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
