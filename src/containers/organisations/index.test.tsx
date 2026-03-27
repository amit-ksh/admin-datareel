import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import OrganisationsContainer from './index'
import { ORGANISATION_TEST_IDS } from './test-ids'

// Mock components
vi.mock('@/components/common/error-state', () => ({
  default: () => <div data-testid='mock-error-state'>Error</div>,
}))

vi.mock('./components/organisations-header', () => ({
  OrganisationsHeader: () => <div data-testid='mock-header'>Header</div>,
}))

vi.mock('./components/organisations-table', () => ({
  OrganisationsTable: () => <div data-testid='mock-table'>Table</div>,
}))

// Mock hook
const mockUseOrganisations = vi.fn()
vi.mock('./use-organisations.hook', () => ({
  useOrganisations: () => mockUseOrganisations(),
}))

describe('OrganisationsContainer', () => {
  it('OrganisationsContainer_WhenLoading_RendersHeaderAndTable', () => {
    // Arrange
    mockUseOrganisations.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
      params: {},
      setFilters: vi.fn(),
      resetFilters: vi.fn(),
      updateQueryParams: vi.fn(),
    })

    // Act
    render(<OrganisationsContainer />)

    // Assert
    expect(
      screen.getByTestId(ORGANISATION_TEST_IDS.CONTAINER),
    ).toBeInTheDocument()
    expect(screen.getByTestId(ORGANISATION_TEST_IDS.HEADER)).toBeInTheDocument()
    expect(screen.getByTestId(ORGANISATION_TEST_IDS.TABLE)).toBeInTheDocument()
  })

  it('OrganisationsContainer_WhenError_RendersErrorState', () => {
    // Arrange
    mockUseOrganisations.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: 'Failed' },
      refetch: vi.fn(),
      params: {},
      setFilters: vi.fn(),
      resetFilters: vi.fn(),
      updateQueryParams: vi.fn(),
    })

    // Act
    render(<OrganisationsContainer />)

    // Assert
    expect(
      screen.getByTestId(ORGANISATION_TEST_IDS.ERROR_STATE),
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId(ORGANISATION_TEST_IDS.CONTAINER),
    ).not.toBeInTheDocument()
  })

  it('OrganisationsContainer_WhenDataAvailable_RendersTableWithData', () => {
    // Arrange
    mockUseOrganisations.mockReturnValue({
      data: { items: [{ id: '1', name: 'Org 1' }], total: 1 },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      params: {},
      setFilters: vi.fn(),
      resetFilters: vi.fn(),
      updateQueryParams: vi.fn(),
    })

    // Act
    render(<OrganisationsContainer />)

    // Assert
    expect(
      screen.getByTestId(ORGANISATION_TEST_IDS.CONTAINER),
    ).toBeInTheDocument()
    expect(screen.getByTestId(ORGANISATION_TEST_IDS.TABLE)).toBeInTheDocument()
  })
})
