'use client'

import { useCallback, useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import {
  useListOrganisations,
  ListOrganisationsParams,
} from '@/api/organisation'

export const useOrganisations = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const page_limit = Number(searchParams.get('page_limit')) || 10
  const search = searchParams.get('search') || ''

  const params: ListOrganisationsParams = useMemo(
    () => ({
      page,
      page_limit,
      search: search || undefined,
    }),
    [page, page_limit, search],
  )

  const { data, isLoading, isError, error, refetch } =
    useListOrganisations(params)

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

  const setFilters = (filters: Partial<ListOrganisationsParams>) => {
    updateQueryParams({
      ...filters,
      page: 1, // Reset to first page on filter change
    })
  }

  const resetFilters = () => {
    updateQueryParams({
      search: undefined,
      page: 1,
    })
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
