'use client'

import { useQuery } from '@tanstack/react-query'
import {
  getFeedbackOverview,
  getRatingStats,
  getRatingBreakdown,
  getFeedbacks,
  downloadFeedbacks,
} from '@/api/analytics'
import { useMemo, useCallback, useState } from 'react'
import { subDays, format, parseISO, isValid } from 'date-fns'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export const useOrganisationFeedback = (organisationId: string) => {
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
  const pageParam = searchParams.get('page')
  const assigneeParam = searchParams.get('assignee')
  const commentsOnlyParam = searchParams.get('comments_only')
  const ratingParam = searchParams.get('rating')

  const page = pageParam ? parseInt(pageParam) : 1
  const assignee = assigneeParam || ''
  const commentsOnly = commentsOnlyParam === 'true'
  const rating = ratingParam ? parseInt(ratingParam) : undefined

  const dateRange = useMemo(() => {
    const start = fromParam ? parseISO(fromParam) : subDays(new Date(), 30)
    const end = toParam ? parseISO(toParam) : new Date()

    return {
      startDate: isValid(start) ? start : subDays(new Date(), 30),
      endDate: isValid(end) ? end : new Date(),
    }
  }, [fromParam, toParam])

  const setDateRange = (range: { startDate: Date; endDate: Date }) => {
    updateUrl({
      from: format(range.startDate, 'yyyy-MM-dd'),
      to: format(range.endDate, 'yyyy-MM-dd'),
    })
  }

  const setPage = (newPage: number) => {
    updateUrl({ page: newPage.toString() })
  }

  const setAssignee = (newAssignee: string) => {
    updateUrl({ assignee: newAssignee, page: '1' })
  }

  const setCommentsOnly = (val: boolean) => {
    updateUrl({ comments_only: val ? 'true' : 'false', page: '1' })
  }

  const setRating = (newRating: number | undefined) => {
    updateUrl({ rating: newRating?.toString() ?? null, page: '1' })
  }

  const [isExporting, setIsExporting] = useState(false)

  const handleExportCSV = useCallback(async () => {
    try {
      setIsExporting(true)
      const startD = format(dateRange.startDate, 'dd-MM-yyyy')
      const endD = format(dateRange.endDate, 'dd-MM-yyyy')
      const filename = `feedback-table-${startD}-${endD}.csv`

      const resp = await downloadFeedbacks({
        organisationId,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        comments_only: commentsOnly,
        rating,
      })

      const url = window.URL.createObjectURL(new Blob([resp.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (e) {
      console.error('Failed to download feedback CSV', e)
    } finally {
      setIsExporting(false)
    }
  }, [organisationId, dateRange, commentsOnly, rating])

  const { data: overviewData, isLoading: isLoadingOverview } = useQuery({
    queryKey: ['feedbackOverview', organisationId, dateRange],
    queryFn: () =>
      getFeedbackOverview({
        organisationId,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }),
    enabled: !!organisationId,
  })

  const { data: ratingStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['ratingStats', organisationId, dateRange],
    queryFn: () =>
      getRatingStats({
        organisationId,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }),
    enabled: !!organisationId,
  })

  const { data: ratingBreakdown, isLoading: isLoadingBreakdown } = useQuery({
    queryKey: ['ratingBreakdown', organisationId, dateRange],
    queryFn: () =>
      getRatingBreakdown({
        organisationId,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }),
    enabled: !!organisationId,
  })

  const { data: feedbacksData, isLoading: isLoadingFeedbacks } = useQuery({
    queryKey: [
      'feedbacks',
      organisationId,
      dateRange,
      page,
      assignee,
      commentsOnly,
      rating,
    ],
    queryFn: () =>
      getFeedbacks({
        organisationId,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        pagenum: page,
        assignee,
        comments_only: commentsOnly,
        rating,
      }),
    enabled: !!organisationId,
  })

  return {
    overviewData,
    ratingStats,
    ratingBreakdown,
    feedbacksData,
    isLoading:
      isLoadingOverview ||
      isLoadingStats ||
      isLoadingBreakdown ||
      isLoadingFeedbacks,
    dateRange,
    setDateRange,
    page,
    setPage,
    assignee,
    setAssignee,
    commentsOnly,
    setCommentsOnly,
    rating,
    setRating,
    handleExportCSV,
    isExporting,
  }
}
