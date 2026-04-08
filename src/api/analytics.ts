import { format } from 'date-fns'
import { VideoAxios, PrivateAxios } from './index'
import {
  AnalyticsSummaryParams,
  AnalyticsYearlyParams,
  FeedbackOverview,
  FeedbackQueryParams,
  FeedbacksResponse,
  GetFeedbacksParams,
  RatingBreakdown,
  RatingStats,
} from '@/types/analytics'

const formatDate = ({
  start,
  end,
}: {
  start: string | Date
  end: string | Date
}) => {
  const toDateStr = (d: string | Date) => {
    const date = typeof d === 'string' ? new Date(d) : d
    return format(date, 'yyyy-MM-dd')
  }
  return [toDateStr(start), toDateStr(end)]
}

export const getAnalyticsSummary = async ({
  organisationId,
  startDate,
  endDate,
  mode,
  pipelineId,
}: AnalyticsSummaryParams) => {
  const [startD, endD] = formatDate({ start: startDate, end: endDate })
  const params = new URLSearchParams({
    start_date: startD,
    end_date: endD,
    mode: mode || 'cumulative',
  })
  if (pipelineId) params.set('pipeline_id', pipelineId)
  if (organisationId) params.set('organisation_id', organisationId)

  const response = await VideoAxios.get(
    `analytics/summary?${params.toString()}`,
    {},
  )

  return response.data?.data || response.data || {}
}

export const getAnalyticsYearly = async ({
  organisationId,
  year,
  pipelineId,
}: AnalyticsYearlyParams) => {
  const params = new URLSearchParams({
    year: String(year),
  })
  if (pipelineId) params.set('pipeline_id', pipelineId)
  if (organisationId) params.set('organisation_id', organisationId)

  const response = await VideoAxios.get(`analytics/yearly?${params.toString()}`)

  return response.data?.data || response.data || {}
}

export const getReportFile = async (
  type: string,
  startDate: string | Date,
  endDate: string | Date,
  organisationId?: string,
) => {
  const [startD, endD] = formatDate({ start: startDate, end: endDate })

  const params = new URLSearchParams({
    start_date: startD,
    end_date: endD,
  })
  if (organisationId) params.set('organisation_id', organisationId)

  return PrivateAxios.get(
    `notification/download-report/${type}?${params.toString()}`,
    {
      responseType: 'blob',
    },
  )
}

export const getFeedbackOverview = async ({
  organisationId,
  startDate,
  endDate,
  pipelineId = '',
}: FeedbackQueryParams): Promise<FeedbackOverview> => {
  const formatBackendDate = (d: string | Date) => {
    const date = typeof d === 'string' ? new Date(d) : d
    return format(date, 'yyyy-MM-dd HH:mm:ss.SSS')
  }

  const response = await PrivateAxios.get('analytics/feedback/overview', {
    params: {
      pipeline_id: pipelineId,
      start_date: formatBackendDate(startDate),
      end_date: formatBackendDate(endDate),
    },
    headers: {
      'organistion-id': organisationId,
    },
  })

  return response.data?.data?.[0] || response.data?.[0] || {}
}

export const getRatingStats = async ({
  organisationId,
  startDate,
  endDate,
  pipelineId = '',
}: FeedbackQueryParams): Promise<RatingStats> => {
  const formatBackendDate = (d: string | Date) => {
    const date = typeof d === 'string' ? new Date(d) : d
    return format(date, 'yyyy-MM-dd HH:mm:ss.SSS')
  }

  const response = await PrivateAxios.get('analytics/ratings/stats', {
    params: {
      pipeline_id: pipelineId,
      start_date: formatBackendDate(startDate),
      end_date: formatBackendDate(endDate),
    },
    headers: {
      'organistion-id': organisationId,
    },
  })

  return response.data?.data?.[0] || response.data?.[0] || {}
}

export const getRatingBreakdown = async ({
  organisationId,
  startDate,
  endDate,
  pipelineId = '',
}: FeedbackQueryParams): Promise<RatingBreakdown> => {
  const formatBackendDate = (d: string | Date) => {
    const date = typeof d === 'string' ? new Date(d) : d
    return format(date, 'yyyy-MM-dd HH:mm:ss.SSS')
  }

  const response = await PrivateAxios.get('analytics/ratings/breakdown', {
    params: {
      pipeline_id: pipelineId,
      start_date: formatBackendDate(startDate),
      end_date: formatBackendDate(endDate),
    },
    headers: {
      'organistion-id': organisationId,
    },
  })

  return response.data?.data?.[0] || response.data?.[0] || {}
}

export const getFeedbacks = async ({
  organisationId,
  startDate,
  endDate,
  pipelineId = '',
  pagenum = 1,
  comments_only = false,
  assignee = '',
}: GetFeedbacksParams): Promise<FeedbacksResponse> => {
  const formatBackendDate = (d: string | Date) => {
    const date = typeof d === 'string' ? new Date(d) : d
    return format(date, 'yyyy-MM-dd HH:mm:ss.SSS')
  }

  const response = await PrivateAxios.get('analytics/feedbacks', {
    params: {
      pipeline_id: pipelineId,
      start_date: formatBackendDate(startDate),
      end_date: formatBackendDate(endDate),
      pagenum,
      comments_only,
      assignee,
    },
    headers: {
      'organistion-id': organisationId,
    },
  })

  return response.data?.data || response.data || {}
}
