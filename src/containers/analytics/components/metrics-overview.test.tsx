import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MetricsOverview } from './metrics-overview'

describe('MetricsOverview', () => {
  const defaultProps = {
    organization: {
      count: '150',
      trend: '+12%',
      onboardedPercent: 75,
    },
    metrics: {
      totalVideos: {
        value: '1,200',
        trend: '+5%',
        trendColor: 'text-green-500',
      },
      completed: { value: '950', trend: '+8%', trendColor: 'text-green-500' },
      approved: { value: '900', trend: '+4%', trendColor: 'text-green-500' },
      delivered: { value: '850', trend: '+3%', trendColor: 'text-green-500' },
      seen: { value: '800', trend: '+2%', trendColor: 'text-green-500' },
    },
    completion: {
      value: '12',
      trend: '+1 since last week',
    },
  }

  it('renders organization count and onboarded percentage', () => {
    render(<MetricsOverview {...defaultProps} />)

    expect(screen.getByText('150')).toBeInTheDocument()
    expect(screen.getByText('75%')).toBeInTheDocument()
    expect(screen.getByText('+12%')).toBeInTheDocument()
  })

  it('renders all metrics correctly', () => {
    render(<MetricsOverview {...defaultProps} />)

    expect(screen.getByText('TOTAL VIDEOS')).toBeInTheDocument()
    expect(screen.getByText('1,200')).toBeInTheDocument()

    expect(screen.getByText('COMPLETED')).toBeInTheDocument()
    expect(screen.getByText('950')).toBeInTheDocument()

    expect(screen.getByText('APPROVED')).toBeInTheDocument()
    expect(screen.getByText('900')).toBeInTheDocument()
  })

  it('renders completion metric correctly', () => {
    render(<MetricsOverview {...defaultProps} />)

    expect(screen.getByText('75%+ COMPLETION')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('+1 since last week')).toBeInTheDocument()
  })
})
