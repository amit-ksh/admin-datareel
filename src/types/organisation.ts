import { z } from 'zod'

export const createOrganisationSchema = z.object({
  orgName: z.string().min(1, 'Name is required'),
  adminEmail: z.string().email('Invalid email address'),
  defaultPassword: z.string().min(6, 'Password must be at least 6 characters'),
  logo: z.any().optional(),
  source_org_id: z.string().optional(),
  options: z.string().optional(),
  total_tokens: z.number().int().min(0).default(1),
  infinite_tokens: z.boolean().default(false),
})

export type CreateOrganisationPayload = z.infer<typeof createOrganisationSchema>

export interface OrganisationCounts {
  personas?: number
  avatars?: number
  voices?: number
  videos?: number
  assets?: number
  templates?: number
  content_templates?: number
  render_settings?: number
  pipelines?: number
  clusters?: number
}

export interface Organisation {
  _id: string
  id: string
  created_at: string
  updated_at: string
  organisation_name: string
  organisation_logo: string | null
  tenant_id: string
  roles_permissions: Record<string, string[]>
  languages: string[]
  password?: string | null
  user_id: string | null
  notification: string[] | null
  additional_emails: string[]
  notification_emails: Record<string, string[]>
  unlocked: boolean
  unlocked_at?: string | null
  consent_text?: {
    title: string
  }
  enable_cdn: boolean
  enable_hls: boolean
  enable_content_ai: boolean
  enable_avatar_ai?: boolean
  persona_onboarding_config?: {
    require_thumbnail: boolean
    require_video: boolean
    require_audio: boolean
  }
  daily_report_hour: number | null
  daily_report_timezone: string | null
  enable_daily_report: boolean
  total_tokens: number
  used_tokens: number
  infinite_tokens: boolean
  onboarding_status?: {
    email_verified: boolean
    email_verified_at: string | null
    information_extracted: boolean
    information_extracted_at: string | null
    assets_cloned: boolean
    assets_cloned_at: string | null
    cloning_job_id: string | null
    cloning_details: unknown | null
  }
  counts: OrganisationCounts
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

export interface AccessClientAppPayload {
  email: string
  organisationId: string
}

export interface AccessClientAppResponse {
  message: string
  redirectUrl: string
}

export interface UpdateOrganisationPayload {
  organisation_name?: string
  enable_cdn?: boolean
  enable_hls?: boolean
  enable_content_ai?: boolean
  enable_avatar_ai?: boolean
  persona_onboarding_config?: {
    require_thumbnail?: boolean
    require_video?: boolean
    require_audio?: boolean
  }
}

export interface UpdateOrganisationDetailPayload {
  organisation_name: string
  enable_cdn: boolean
  enable_hls: boolean
  enable_content_ai: boolean
  enable_avatar_ai: boolean
  enable_daily_report: boolean
  daily_report_hour: number
  daily_report_timezone: string
  infinite_tokens: boolean
  total_tokens: number
  additional_emails: string[]
}

export type UnlockType =
  | 'organisation'
  | 'hls'
  | 'cdn'
  | 'content_ai'
  | 'avatar_ai'

export interface UnlockOrganisationParams {
  organisation_id: string
  unlock_type: UnlockType
}
