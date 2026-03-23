'use client'

import { useCallback, useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import {
  useListEmailTemplates,
  ListEmailTemplatesParams,
} from '@/api/email-templates'

export const useEmailTemplates = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') as
    | 'verified'
    | 'not-verified'
    | undefined
  const email_type = searchParams.get('email_type') || undefined
  const organisation_id = searchParams.get('organisation_id') || undefined
  const sort_by = searchParams.get('sort_by') || 'updated_at'
  const sort_order = (searchParams.get('sort_order') || 'desc') as
    | 'asc'
    | 'desc'

  const params: ListEmailTemplatesParams = useMemo(
    () => ({
      page,
      limit,
      search: search || undefined,
      status: (status as 'verified' | 'not-verified') || undefined,
      email_type,
      organisation_id,
      sort_by,
      sort_order,
    }),
    [
      page,
      limit,
      search,
      status,
      email_type,
      organisation_id,
      sort_by,
      sort_order,
    ],
  )

  const { data, isLoading, isError, error, refetch } =
    useListEmailTemplates(params)

  const updateQueryParams = useCallback(
    (updates: Record<string, string | number | boolean | null | undefined>) => {
      const newParams = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          newParams.delete(key)
        } else {
          newParams.set(key, String(value))
        }
      })
      router.push(`${pathname}?${newParams.toString()}`)
    },
    [pathname, router, searchParams],
  )

  const setFilters = (filters: Partial<ListEmailTemplatesParams>) => {
    updateQueryParams({
      ...filters,
      page: 1, // Reset to first page on filter change
    })
  }

  const resetFilters = () => {
    router.push(pathname)
  }

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    params,
    setFilters,
    resetFilters,
    updateQueryParams,
  }
}
