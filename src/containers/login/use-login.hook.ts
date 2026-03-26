'use client'
import { useLoginAPI } from '@/api/auth'
import { useRouter } from 'next/navigation'

export const useLogin = () => {
  const router = useRouter()

  const loginMutation = useLoginAPI()

  const { mutateAsync: loginMutate, isPending: isLoginPending } = loginMutation

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await loginMutate({ email, password })
      router.push('/analytics')
    } catch (error) {
      console.error(error)
    }
  }

  return {
    handleLogin,
    isLoginPending,
  }
}
