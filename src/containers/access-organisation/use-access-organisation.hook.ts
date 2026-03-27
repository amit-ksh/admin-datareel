'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { AxiosError } from 'axios'
import { useListOrganisations, useAccessClientApp } from '@/api/organisation'
import { ListOrganisationsParams, Organisation } from '@/types/organisation'
import { toast } from 'sonner'

export const useAccessOrganisation = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchEmail = searchParams.get('email') || ''
  const [email, setEmail] = useState(searchEmail)

  const page = Number(searchParams.get('page')) || 1
  const page_limit = Number(searchParams.get('page_limit')) || 10
  const search = searchParams.get('search') || ''

  const params: ListOrganisationsParams = useMemo(
    () => ({
      page,
      page_limit,
      search: search || undefined,
      email: searchEmail || undefined,
    }),
    [page, page_limit, search, searchEmail],
  )

  const {
    data,
    isLoading: isListLoading,
    isFetching: isListFetching,
    isError,
    error,
    refetch,
  } = useListOrganisations(params, {
    enabled: Boolean(searchEmail),
  })

  const { mutate: accessClientApp, isPending: isAccessPending } =
    useAccessClientApp()

  const updateQueryParams = useCallback(
    (updates: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          newParams.delete(key)
        } else {
          newParams.set(key, value)
        }
      })
      router.push(`${pathname}?${newParams.toString()}`)
    },
    [pathname, router, searchParams],
  )

  const handleFetch = useCallback(() => {
    if (email.trim()) {
      updateQueryParams({ email: email.trim(), page: '1' })
    }
  }, [email, updateQueryParams])

  const handleOrgLogin = useCallback(
    (org: Organisation) => {
      if (searchEmail) {
        accessClientApp(
          { organisationId: org.id, email: searchEmail },
          {
            onError: (err) => {
              const axiosError = err as AxiosError<{ detail: string }>
              const errorMessage =
                axiosError.response?.data?.detail ||
                'Failed to access organisation'
              toast.error(errorMessage)
            },
          },
        )
      } else {
        toast.error('Please enter an email first')
      }
    },
    [accessClientApp, searchEmail],
  )

  const handleSearch = useCallback(
    (val: string) => {
      updateQueryParams({ search: val || null, page: '1' })
    },
    [updateQueryParams],
  )

  return {
    // State
    email,
    setEmail,
    searchEmail,
    search,
    page,
    page_limit,
    data,

    // Loading/Error states
    isLoading: isListLoading || isListFetching,
    isAccessPending,
    isError,
    error,

    // Actions
    handleFetch,
    handleOrgLogin,
    handleSearch,
    updateQueryParams,
    refetch,
  }
}
