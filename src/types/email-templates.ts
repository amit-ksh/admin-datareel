export type EmailTemplateStatus =
  | 'PENDING'
  | 'VERIFIED'
  | 'REJECTED'
  | 'DEFAULT'

export type EmailTemplateType =
  | 'CONFIRMATION'
  | 'INVITATION'
  | 'REINVITE'
  | 'RESHOOT'
  | 'WELCOME'
  | 'RESET_PASSWORD'
  | 'FAILURE_REPORT'
  | 'SUCCESS_NOTIFICATION'
  | 'DAILY_REPORT'
  | 'RESEND_VERIFICATION'

export interface EmailTemplate {
  id: string
  org_id: string
  name: string
  email_type: EmailTemplateType
  subject: string
  status: EmailTemplateStatus | null
  created_at: string
  organisation_name: string
}

export interface EmailTemplateListResponse {
  docs: EmailTemplate[]
  meta: {
    page: number
    limit: number
    total: number
  }
}

export interface EmailTemplateDetail {
  _id: string
  org_id: string
  name: string
  subject: string
  body_s3_key: string
  email_type: EmailTemplateType
  custom_variables: Record<string, unknown> | null
  verified: boolean
  is_deleted: boolean
  created_at: string
  updated_at: string
  status: EmailTemplateStatus | null
  body: string
}

export interface ListEmailTemplatesParams {
  page?: number
  page_limit?: number
  org_id?: string
  status?: EmailTemplateStatus
  type?: EmailTemplateType
}

export interface UpdateEmailTemplateStatusPayload {
  template_id: string
  status: EmailTemplateStatus
}
