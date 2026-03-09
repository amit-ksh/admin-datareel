'use client'
import { useLoginAPI } from '@/api/auth'

export const useLogin = () => {
  const loginMutation = useLoginAPI()
  return {
    loginMutation,
  }
}
