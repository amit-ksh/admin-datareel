import { PrivateAxios } from '@/api'
import {
  EmailTemplateDetail,
  ListEmailTemplatesParams,
  ListEmailTemplatesResponse,
} from '@/types/email-templates'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
