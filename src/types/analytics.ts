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

export interface AnalyticsSummaryParams {
  organisationId?: string
  startDate: string | Date
  endDate: string | Date
  mode?: string
  pipelineId?: string
}

export interface AnalyticsYearlyParams {
  organisationId?: string
  year: number | string
  pipelineId?: string
}

export interface FeedbackQueryParams {
  organisationId: string
  startDate: string | Date
  endDate: string | Date
  pipelineId?: string
}

export interface GetFeedbacksParams extends FeedbackQueryParams {
  pagenum?: number
  comments_only?: boolean
  assignee?: string
  rating?: number
}

export interface DownloadFeedbacksParams extends FeedbackQueryParams {
  comments_only?: boolean
  rating?: number
}

export interface MonthlyVideoCount {
  month: string
  videos: number
  approval: number
  delivered: number
  seen: number
}

export interface MonthlyVideoCountApi {
  month_label: string
  total_videos: number
  approved_videos: number
  delivered_videos: number
  seen_videos: number
}
