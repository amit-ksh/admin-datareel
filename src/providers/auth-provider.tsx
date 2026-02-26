'use client'
import React, { useContext, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useCurrentUserAPI, useLogoutAPI } from '@/api/user'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { AlertTriangle } from 'lucide-react'
import {
  useGetAuthServiceHealth,
  useGetServerContainersHealth,
  useGetVideoServiceHealth,
} from '@/api/server-health'
import { ServicesAlertUI } from '@/components/api-services'
import {
  AuthServerContainersHealthResponse,
  ServerContainersHealthResponse,
  ServiceContainerKeys,
  VideoServerContainersHealthResponse,
} from '@/types/service-health'
import { AxiosResponse } from 'axios'

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

type AuthContextType = {
  currentUser?: {
    permissions: string[]
    tenant_data: Record<string, string>
  }
  isCurrentUserLoading: boolean
  isCurrentUserPending: boolean
  isLogoutPending: boolean
  logoutUser: () => Promise<void>
  // Service health exposure
  authServiceHealthData:
    | AxiosResponse<
        AuthServerContainersHealthResponse,
        Record<string, unknown>,
        Record<string, unknown>
      >
    | undefined
  isAuthServiceHealthLoading: boolean
  isAuthServiceHealthError: boolean
  videoServiceHealthData:
    | AxiosResponse<
        VideoServerContainersHealthResponse,
        Record<string, unknown>,
        Record<string, unknown>
      >
    | undefined
  isVideoServiceHealthLoading: boolean
  isVideoServiceHealthError: boolean
}

// const protectedRoutes = [
//   /^\/analytics$/,
//   /^\/organisations(\/.*)?$/,
//   /^\/access-organisation$/,
//   /^\/$/,
// ] as const

// const unprotectedRoutes = [/^\/login$/] as const

// used for stop current user api fetching
const unblockedRoutesWithAuth = [] as RegExp[]

// const blockedRoutes = [/^\/login$/] as const

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const maintenanceToastShownRef = useRef(false)

  const isProtected = !unblockedRoutesWithAuth.some((route) =>
    route.test(pathname),
  )
  const {
    data: currentUser,
    isLoading: isCurrentUserLoading,
    isPending: isCurrentUserPending,
    isError,
    error,
    refetch: refetchCurrentUser,
  } = useCurrentUserAPI({ isProtected })

  useEffect(() => {
    if (isCurrentUserLoading) return

    if (!currentUser?.data?.permissions.length) {
      refetchCurrentUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentUserLoading])

  const {
    data: authServiceHealthData,
    isLoading: isAuthServiceHealthLoading,
    isError: isAuthServiceHealthError,
  } = useGetAuthServiceHealth()
  const {
    data: videoServiceHealthData,
    isLoading: isVideoServiceHealthLoading,
    isError: isVideoServiceHealthError,
  } = useGetVideoServiceHealth()
  const { data: serverContainersHealthData } = useGetServerContainersHealth()

  useEffect(() => {
    if (unblockedRoutesWithAuth.some((route) => route.test(pathname))) return
    const maintenanceToastShown = maintenanceToastShownRef.current
    const containers = serverContainersHealthData?.data?.containers
    if (!containers) return

    const affectedEntries = Object.entries(containers).filter(
      ([, c]) => c.status !== 'running' || c.state !== 'healthy',
    ) as [
      ServiceContainerKeys,
      ServerContainersHealthResponse['containers'][ServiceContainerKeys],
    ][]
    if (affectedEntries.length === 0 || maintenanceToastShown) return

    const titleNode = (
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <AlertTriangle className='h-4 w-4 text-yellow-600' />
          <span className='font-semibold'>Service Update</span>
        </div>

        <ServicesAlertUI services={affectedEntries} />
      </div>
    )

    toast.warning(titleNode, { duration: 50000 })
    maintenanceToastShownRef.current = true
  }, [serverContainersHealthData, pathname])

  const queryClient = useQueryClient()

  // useEffect(() => {
  //   if (blockedRoutes.some((route) => route.test(pathname))) {
  //     if (isCurrentUserFetched && currentUser) {
  //       router.replace(
  //         new URLSearchParams(window.location.search).get("redirect") ||
  //           "/analytics",
  //       );
  //     }
  //   }
  // }, [currentUser, isCurrentUserFetched, isError, pathname, router]);

  const { mutateAsync: logoutMutateAsync, isPending: isLogoutPending } =
    useLogoutAPI()

  const logoutUser = useCallback(async () => {
    try {
      await logoutMutateAsync()
      window.location.href = `/login?redirect=${encodeURIComponent(pathname + window.location.search)}`
    } catch (err) {
      console.error(err)
    } finally {
      queryClient.clear()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutMutateAsync, pathname, queryClient, router])

  useEffect(() => {
    if (isError && error?.response?.status === 401 && currentUser) {
      logoutUser()
    }
  }, [isError, error?.response?.status, currentUser, logoutUser])

  // useEffect(() => {
  //   if (isCurrentUserFetched) {
  //     if (
  //       !currentUser &&
  //       protectedRoutes.some((route) => route.test(pathname))
  //     ) {
  //       router.replace(
  //         `/login?redirect=${encodeURIComponent(pathname + window.location.search)}`,
  //       );
  //     }
  //   }
  // }, [currentUser, pathname, router, isCurrentUserFetched]);

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser?.data,
        isCurrentUserLoading,
        isCurrentUserPending,
        isLogoutPending,
        logoutUser,
        // Service health exposure
        authServiceHealthData,
        isAuthServiceHealthLoading,
        isAuthServiceHealthError,
        videoServiceHealthData,
        isVideoServiceHealthLoading,
        isVideoServiceHealthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useGlobalAuthContext = () => useContext(AuthContext)

export { AuthProvider }
