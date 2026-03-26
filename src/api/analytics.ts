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
