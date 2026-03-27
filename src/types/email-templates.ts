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
