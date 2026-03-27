'use client'
import { useLoginAPI } from '@/api/auth'
import { type AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

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
      toast.error(
        (error as AxiosError<{ detail: string }>)?.response?.data?.detail,
      )
    }
  }

  return {
    handleLogin,
    isLoginPending,
  }
}
