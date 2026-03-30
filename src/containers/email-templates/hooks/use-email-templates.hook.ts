'use client'

import { useCallback, useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useEmailTemplatesAPI } from '@/api/email-templates'
import {
  ListEmailTemplatesParams,
  EmailTemplateStatus,
  EmailTemplateType,
} from '@/types/email-templates'

export const useEmailTemplates = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const page_limit = Number(searchParams.get('page_limit')) || 10
  const template_id = searchParams.get('template_id') || undefined
  const org_id = searchParams.get('org_id') || undefined
  const status = searchParams.get('status') as EmailTemplateStatus | undefined
  const type = searchParams.get('type') as EmailTemplateType | undefined

  const params: ListEmailTemplatesParams = useMemo(
    () => ({
      page,
      page_limit,
      org_id,
      status,
      type,
    }),
    [page, page_limit, org_id, status, type],
  )

  const { data, isLoading, isError, error, refetch } =
    useEmailTemplatesAPI(params)

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
    template_id,
    setFilters,
    resetFilters,
    updateQueryParams,
  }
}
