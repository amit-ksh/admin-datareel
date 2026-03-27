import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { OrganisationsHeader } from './organisations-header'

// Mock sub-components
vi.mock('../onboard-organisation-dialog', () => ({
  OnboardOrganisationDialog: () => (
    <div data-testid='onboard-dialog'>Dialog</div>
  ),
}))

describe('OrganisationsHeader', () => {
  const mockSetFilters = vi.fn()
  const mockResetFilters = vi.fn()
  const defaultParams = { page: 1, page_limit: 10 }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('OrganisationsHeader_WhenRendered_DisplaysTitleAndDescription', () => {
    // Act
    render(
      <OrganisationsHeader
        params={defaultParams}
        setFilters={mockSetFilters}
        resetFilters={mockResetFilters}
      />,
    )

    // Assert
    expect(screen.getByText('Organisations')).toBeInTheDocument()
    expect(
      screen.getByText('Track & manage the organisations'),
    ).toBeInTheDocument()
  })

  it('OrganisationsHeader_WhenSearchInputValueChanges_CallsSetFilters', () => {
    // Act
    render(
      <OrganisationsHeader
        params={defaultParams}
        setFilters={mockSetFilters}
        resetFilters={mockResetFilters}
      />,
    )
    const searchInput = screen.getByPlaceholderText('Search Organisation...')
    fireEvent.change(searchInput, { target: { value: 'test' } })

    // Assert
    expect(mockSetFilters).toHaveBeenCalledWith({ search: 'test' })
  })

  it('OrganisationsHeader_WhenResetButtonClicked_CallsResetFilters', () => {
    // Act
    render(
      <OrganisationsHeader
        params={defaultParams}
        setFilters={mockSetFilters}
        resetFilters={mockResetFilters}
      />,
    )
    const resetButton = screen.getByText('Reset')
    fireEvent.click(resetButton)

    // Assert
    expect(mockResetFilters).toHaveBeenCalled()
  })

  it('OrganisationsHeader_WhenRendered_DisplaysOnboardDialog', () => {
    // Act
    render(
      <OrganisationsHeader
        params={defaultParams}
        setFilters={mockSetFilters}
        resetFilters={mockResetFilters}
      />,
    )

    // Assert
    expect(screen.getByTestId('onboard-dialog')).toBeInTheDocument()
  })
})
