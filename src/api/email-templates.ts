import { PrivateAxios } from '@/api'
import {
  EmailTemplateDetail,
  EmailTemplateListResponse,
  ListEmailTemplatesParams,
  UpdateEmailTemplateStatusPayload,
} from '@/types/email-templates'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const getEmailTemplatesAPI = async (
  params: ListEmailTemplatesParams,
) => {
  const response = await PrivateAxios.get<EmailTemplateListResponse>(
    'dashboard/auth/email-templates',
    {
      params: {
        ...params,
        page_limit: params.page_limit || 10,
      },
    },
  )
  return response.data
}

export const useEmailTemplatesAPI = (params: ListEmailTemplatesParams) => {
  return useQuery({
    queryKey: ['email-templates', params],
    queryFn: () => getEmailTemplatesAPI(params),
  })
}

export const updateEmailTemplateStatusAPI = async (
  payload: UpdateEmailTemplateStatusPayload,
) => {
  const { template_id, status } = payload
  const response = await PrivateAxios.patch(
    `dashboard/auth/email-templates/${template_id}/status`,
    { template_id, status },
  )
  return response.data
}

export const useUpdateEmailTemplateStatusAPI = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateEmailTemplateStatusAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-templates'] })
    },
  })
}

export const getEmailTemplateAPI = async (params: {
  template_id?: string
  template_type?: string
  org_id?: string
}) => {
  const response = await PrivateAxios.get<EmailTemplateDetail>(
    'dashboard/auth/email-template',
    {
      params,
    },
  )
  return response.data
}

export const useEmailTemplateAPI = (params: {
  template_id?: string
  template_type?: string
  org_id?: string
}) => {
  return useQuery({
    queryKey: ['email-template', params],
    queryFn: () => getEmailTemplateAPI(params),
    enabled: !!(params.template_id || params.template_type),
  })
}
