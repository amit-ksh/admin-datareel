export interface CurrentUserResponse {
  permissions: string[]
  tenant_data: Record<string, string>
}

export interface UseCurrentUserParams {
  isProtected: boolean
}
