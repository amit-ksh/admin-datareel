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

export interface AccessClientAppPayload {
  email: string
  organisationId: string
}

export interface AccessClientAppResponse {
  message: string
  redirectUrl: string
}
