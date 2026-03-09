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
  const onboarded =
    searchParams.get('onboarded') === 'true'
      ? true
      : searchParams.get('onboarded') === 'false'
        ? false
        : undefined
  const sort_by = (searchParams.get('sort_by') ||
    'joined_at') as ListOrganisationsParams['sort_by']
  const sort_order = (searchParams.get('sort_order') ||
    'desc') as ListOrganisationsParams['sort_order']
  const join_at_start = searchParams.get('join_at_start') || undefined
  const join_at_end = searchParams.get('join_at_end') || undefined
  const min_feedback = searchParams.get('min_feedback')
    ? Number(searchParams.get('min_feedback'))
    : undefined

  const params: ListOrganisationsParams = useMemo(
    () => ({
      page,
      page_limit,
      search: search || undefined,
      onboarded,
      sort_by,
      sort_order,
      join_at_start,
      join_at_end,
      min_feedback,
    }),
    [
      page,
      page_limit,
      search,
      onboarded,
      sort_by,
      sort_order,
      join_at_start,
      join_at_end,
      min_feedback,
    ],
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
      join_at_start: undefined,
      join_at_end: undefined,
      min_feedback: undefined,
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
