import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AnalyticsMetricCard } from './analytics-metric-card'
import { ANALYTICS_TEST_IDS } from './test-ids'

import * as React from 'react'

vi.mock('recharts', () => ({
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <svg>{children}</svg>
  ),
  Bar: () => <rect />,
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <svg>{children}</svg>
  ),
  Line: () => <path />,
  Cell: () => <path />,
  Tooltip: () => <div />,
  Legend: () => <div />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  XAxis: () => <g />,
  YAxis: () => <g />,
  CartesianGrid: () => <g />,
}))

describe('AnalyticsMetricCard', () => {
  const defaultProps = {
    title: 'Total Users',
    value: '1,234',
    chartData: [
      { name: 'Jan', value: 100 },
      { name: 'Feb', value: 200 },
    ],
    chartConfig: {
      value: { label: 'Value' },
    },
    chartType: 'bar' as const,
    dataKey: 'value',
  }

  it('renders title and value correctly', () => {
    render(<AnalyticsMetricCard {...defaultProps} />)

    expect(
      screen.getByTestId(ANALYTICS_TEST_IDS.METRIC_CARD.TITLE),
    ).toHaveTextContent('Total Users')
    expect(
      screen.getByTestId(ANALYTICS_TEST_IDS.METRIC_CARD.VALUE),
    ).toHaveTextContent('1,234')
  })

  it('renders trend when provided', () => {
    const propsWithTrend = {
      ...defaultProps,
      trend: { value: 10, label: 'Since last month', direction: 'up' as const },
    }
    render(<AnalyticsMetricCard {...propsWithTrend} />)

    const trend = screen.getByTestId(ANALYTICS_TEST_IDS.METRIC_CARD.TREND)
    expect(trend).toBeInTheDocument()
    expect(trend).toHaveTextContent('10%')
  })
})
