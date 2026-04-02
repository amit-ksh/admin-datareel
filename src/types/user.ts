export interface CurrentUserResponse {
  id: string
  name: string
  email: string
  permissions: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface UseCurrentUserParams {
  isProtected: boolean
}
