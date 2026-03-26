'use client'

import { useQuery } from '@tanstack/react-query'
import {
  getAnalyticsSummary,
  getAnalyticsYearly,
  getReportFile,
} from '@/api/analytics'
import { listOrganisationsAPI } from '@/api/organisation'
import { useMemo } from 'react'
import { subDays, format, parseISO, isValid } from 'date-fns'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useAnalytics = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const updateUrl = (params: Record<string, string | null | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString())
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        newParams.delete(key)
      } else {
        newParams.set(key, value)
      }
    })
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false })
  }

  const fromParam = searchParams.get('from')
  const toParam = searchParams.get('to')
  const modeParam = searchParams.get('mode')
  const orgIdParam = searchParams.get('orgId')
  const yearParam = searchParams.get('year')
  const pageParam = searchParams.get('page')

  const VALID_MODES = ['cumulative', 'cohort']
  const mode = VALID_MODES.includes(modeParam || '')
    ? (modeParam as 'cumulative' | 'cohort')
    : 'cumulative'

  const page = pageParam ? parseInt(pageParam) : 1

  const dateRange = useMemo(() => {
    const start = fromParam ? parseISO(fromParam) : subDays(new Date(), 30)
    const end = toParam ? parseISO(toParam) : new Date()

    return {
      startDate: isValid(start) ? start : subDays(new Date(), 30),
      endDate: isValid(end) ? end : new Date(),
    }
  }, [fromParam, toParam])

  const selectedOrgId = orgIdParam || ''
  const year = yearParam ? parseInt(yearParam) : new Date().getFullYear()

  const setDateRange = (range: { startDate: Date; endDate: Date }) => {
    updateUrl({
      from: format(range.startDate, 'yyyy-MM-dd'),
      to: format(range.endDate, 'yyyy-MM-dd'),
    })
  }

  const setMode = (newMode: string) => {
    updateUrl({ mode: newMode })
  }

  const setSelectedOrgId = (id: string) => {
    updateUrl({ orgId: id })
  }

  const setYear = (newYear: number) => {
    updateUrl({ year: newYear.toString() })
  }

  const setPage = (newPage: number) => {
    updateUrl({ page: newPage.toString() })
  }

  const { data: organisationsData, isLoading: isLoadingOrgs } = useQuery({
    queryKey: ['organisations'],
    queryFn: () =>
      listOrganisationsAPI({
        page: 1,
        page_limit: 10,
        sort_by: 'videos',
        sort_order: 'desc',
      }),
  })

  const { data: summaryData, isLoading: isLoadingSummary } = useQuery({
    queryKey: ['analyticsSummary', selectedOrgId, dateRange, mode],
    queryFn: () =>
      getAnalyticsSummary({
        organisationId: selectedOrgId,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        mode,
      }),
  })

  const { data: yearlyData, isLoading: isLoadingYearly } = useQuery({
    queryKey: ['analyticsYearly', selectedOrgId, year],
    queryFn: () =>
      getAnalyticsYearly({
        organisationId: selectedOrgId,
        year,
      }),
  })

  const handleGetReportFile = async (type: string, label: string) => {
    try {
      const response = await getReportFile(
        type,
        dateRange.startDate,
        dateRange.endDate,
        selectedOrgId,
      )
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `${label.split(' ').join('-').toLowerCase()}-${selectedOrgId}-${format(dateRange.startDate, 'yyyy-MM-dd')}-${format(dateRange.endDate, 'yyyy-MM-dd')}.csv`,
      )
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success(`${label} downloaded successfully`)
    } catch (error) {
      console.error(error)
      toast.error('Failed to download report')
    }
  }

  return {
    summaryData,
    isLoadingSummary,
    yearlyData,
    isLoadingYearly,
    organisationsData,
    isLoadingOrgs,
    selectedOrgId,
    setSelectedOrgId,
    dateRange,
    setDateRange,
    year,
    setYear,
    mode,
    setMode,
    page,
    setPage,
    handleGetReportFile,
  }
}
