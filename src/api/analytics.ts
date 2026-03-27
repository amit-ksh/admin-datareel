import { format } from 'date-fns'
import { VideoAxios, PrivateAxios } from './index'

const formatDate = ({
  start,
  end,
}: {
  start: string | Date
  end: string | Date
}) => {
  const format = (d: string | Date) => {
    const date = typeof d === 'string' ? new Date(d) : d
    return date.toISOString()
  }
  return [format(start), format(end)]
}

export const getAnalyticsSummary = async ({
  organisationId,
  startDate,
  endDate,
  mode,
  pipelineId,
}: {
  organisationId?: string
  startDate: string | Date
  endDate: string | Date
  mode?: string
  pipelineId?: string
}) => {
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
}: {
  organisationId?: string
  year: number | string
  pipelineId?: string
}) => {
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

export interface FeedbackOverview {
  total_feedbacks: number
  average_rating: number
  total_comments: number
  total_positive_rating: number
}

export interface RatingStats {
  min_rating: number
  max_rating: number
  average_rating: number
  min_more_info: number
  max_more_info: number
  average_more_info: number
  min_more_videos: number
  max_more_videos: number
  average_more_videos: number
}

export interface RatingBreakdown {
  rating_counts: Record<string, number>
}

export interface FeedbackItem {
  _id: {
    results_id: string
    name: string
  }
  latest_feedback_at: string
  average_rating: number[]
  average_more_info: number[]
  average_more_videos: number[]
  feedback: string[]
}

export interface FeedbacksResponse {
  data: FeedbackItem[]
  total_pages: number
}

export const getFeedbackOverview = async ({
  organisationId,
  startDate,
  endDate,
  pipelineId = '',
}: {
  organisationId: string
  startDate: string | Date
  endDate: string | Date
  pipelineId?: string
}): Promise<FeedbackOverview> => {
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
}: {
  organisationId: string
  startDate: string | Date
  endDate: string | Date
  pipelineId?: string
}): Promise<RatingStats> => {
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
}: {
  organisationId: string
  startDate: string | Date
  endDate: string | Date
  pipelineId?: string
}): Promise<RatingBreakdown> => {
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
}: {
  organisationId: string
  startDate: string | Date
  endDate: string | Date
  pipelineId?: string
  pagenum?: number
  comments_only?: boolean
  assignee?: string
}): Promise<FeedbacksResponse> => {
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
