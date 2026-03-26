import { PrivateAxios } from '@/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export interface EmailTemplateListitem {
  id: string
  organisation_id: string
  organisation_name: string
  organisation_logo: string | null
  template_name: string
  type: string
  subject: string
  status: 'verified' | 'not-verified'
  updated_at: string
}

export interface ListEmailTemplatesParams {
  search?: string
  status?: 'verified' | 'not-verified'
  email_type?: string
  page?: number
  limit?: number
  organisation_id?: string
  sort_by?: string
  sort_order?: 'asc' | 'desc'
}

export interface ListEmailTemplatesResponse {
  data: EmailTemplateListitem[]
  meta: {
    total: number
    page: number
    limit: number
    last_page: number
  }
}

export interface EmailTemplateDetail {
  id: string
  template_name: string
  email_type: string
  subject: string
  email_body: string
  status: 'verified' | 'not-verified'
}

export const listEmailTemplatesAPI = async (
  params: ListEmailTemplatesParams,
) => {
  const response = await PrivateAxios.get<ListEmailTemplatesResponse>(
    'admin/email-templates',
    {
      params: {
        ...params,
        sort_by: params.sort_by || 'updated_at',
      },
    },
  )
  return response.data
}

export const useListEmailTemplates = (params: ListEmailTemplatesParams) => {
  return useQuery({
    queryKey: ['email-templates', params],
    queryFn: () => listEmailTemplatesAPI(params),
  })
}

export const getEmailTemplateAPI = async (id: string) => {
  const response = await PrivateAxios.get<EmailTemplateDetail>(
    `admin/email-templates/${id}`,
  )
  return response.data
}

export const useGetEmailTemplate = (id: string | null) => {
  return useQuery({
    queryKey: ['email-templates', id],
    queryFn: () => getEmailTemplateAPI(id!),
    enabled: !!id,
  })
}

export const approveEmailTemplateAPI = async (id: string) => {
  const response = await PrivateAxios.post<{ approve: boolean }>(
    `admin/email-templates/${id}/approve`,
  )
  return response.data
}

export const useApproveEmailTemplate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: approveEmailTemplateAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-templates'] })
    },
  })
}
