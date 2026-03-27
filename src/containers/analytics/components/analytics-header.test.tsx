import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AnalyticsHeader } from './analytics-header'
import { ANALYTICS_TEST_IDS } from './test-ids'
import * as React from 'react'

vi.mock('./organisation-select-popover', () => ({
  OrganisationSelectPopover: vi.fn(() => <div>OrganisationSelect</div>),
}))

vi.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuItem: ({
    children,
    onClick,
  }: {
    children: React.ReactNode
    onClick: () => void
  }) => (
    <div onClick={onClick} data-testid='dropdown-item'>
      {children}
    </div>
  ),
  DropdownMenuLabel: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuSeparator: () => <hr />,
}))

vi.mock('@/components/ui/tabs', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactMock = require('react')
  const TabsContext = ReactMock.createContext({
    onValueChange: (v: string) => {
      console.log(v)
    },
  })
  return {
    Tabs: ({
      children,
      onValueChange,
    }: {
      children: React.ReactNode
      onValueChange: (v: string) => void
    }) => (
      <TabsContext.Provider value={{ onValueChange }}>
        {children}
      </TabsContext.Provider>
    ),
    TabsList: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    TabsTrigger: ({
      children,
      value,
    }: {
      children: React.ReactNode
      value: string
    }) => {
      const { onValueChange } = ReactMock.useContext(TabsContext)
      return <button onClick={() => onValueChange(value)}>{children}</button>
    },
    TabsContent: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  }
})

describe('AnalyticsHeader', () => {
  const mockOnModeChange = vi.fn()
  const mockSetSelectedOrgId = vi.fn()
  const mockSetDateRange = vi.fn()
  const mockOnDownloadReport = vi.fn()

  const defaultProps = {
    mode: 'cohort',
    onModeChange: mockOnModeChange,
    selectedOrgId: 'all',
    setSelectedOrgId: mockSetSelectedOrgId,
    dateRange: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
    },
    setDateRange: mockSetDateRange,
    onDownloadReport: mockOnDownloadReport,
  }

  it('renders title and date range correctly', () => {
    render(<AnalyticsHeader {...defaultProps} />)

    expect(
      screen.getByTestId(ANALYTICS_TEST_IDS.HEADER.TITLE),
    ).toHaveTextContent('Analytics')
    expect(
      screen.getByTestId(ANALYTICS_TEST_IDS.HEADER.DATE_RANGE),
    ).toBeInTheDocument()
    // It should contain January 01 and Januray 31 in the text
    expect(
      screen.getByTestId(ANALYTICS_TEST_IDS.HEADER.DATE_RANGE),
    ).toHaveTextContent('Jan 01, 2024')
    expect(
      screen.getByTestId(ANALYTICS_TEST_IDS.HEADER.DATE_RANGE),
    ).toHaveTextContent('Jan 31, 2024')
  })

  it('calls onModeChange when tabs are clicked', () => {
    render(<AnalyticsHeader {...defaultProps} />)

    const cumulativeTab = screen.getByText('Cumulative')
    fireEvent.click(cumulativeTab)

    expect(mockOnModeChange).toHaveBeenCalledWith('cumulative')
  })

  it('calls onDownloadReport when export menu item is clicked', () => {
    render(<AnalyticsHeader {...defaultProps} />)

    const exportBtn = screen.getByText('Export')
    fireEvent.click(exportBtn)

    const deliveryReport = screen.getByText('Delivery Report (CSV)')
    fireEvent.click(deliveryReport)

    expect(mockOnDownloadReport).toHaveBeenCalledWith(
      'performance',
      'Delivery Report',
    )
  })
})
