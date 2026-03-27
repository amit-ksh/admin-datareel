import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { OrganisationList } from './organisation-list'
import { useAccessOrganisation } from '../use-access-organisation.hook'
import { ACCESS_ORGANISATION_TEST_IDS } from './test-ids'
import type { ListOrganisationsResponse } from '@/types/organisation'

vi.mock('../use-access-organisation.hook', () => ({
  useAccessOrganisation: vi.fn(),
}))

const mockedUseAccessOrganisation = vi.mocked(useAccessOrganisation)

type UseAccessOrganisationReturn = ReturnType<typeof useAccessOrganisation>

const mockData: ListOrganisationsResponse = {
  docs: [
    {
      id: '1',
      organisation_name: 'Org 1',
      organisation_logo: 'logo1.png',
      tenant_id: 'tenant-1',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      unlocked: true,
      unlocked_at: '2024-01-01T00:00:00Z',
      enable_cdn: true,
      enable_hls: true,
      enable_content_ai: true,
      enable_avatar_ai: true,
      total_tokens: 1000,
      used_tokens: 500,
      infinite_tokens: false,
      onboarding_status: {
        email_verified: true,
        email_verified_at: '2024-01-01T00:00:00Z',
        information_extracted: true,
        information_extracted_at: '2024-01-01T00:00:00Z',
        assets_cloned: true,
        assets_cloned_at: '2024-01-01T00:00:00Z',
        cloning_job_id: null,
        cloning_details: null,
      },
    },
    {
      id: '2',
      organisation_name: 'Org 2',
      organisation_logo: null,
      tenant_id: 'tenant-2',
      created_at: '2024-01-02T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
      unlocked: false,
      unlocked_at: '',
      enable_cdn: false,
      enable_hls: false,
      enable_content_ai: false,
      enable_avatar_ai: false,
      total_tokens: 1000,
      used_tokens: 0,
      infinite_tokens: false,
      onboarding_status: {
        email_verified: false,
        email_verified_at: null,
        information_extracted: false,
        information_extracted_at: null,
        assets_cloned: false,
        assets_cloned_at: null,
        cloning_job_id: null,
        cloning_details: null,
      },
    },
  ],
  meta: {
    total: 15,
    page: 1,
    limit: 10,
  },
}

describe('OrganisationList', () => {
  const mockRefetch = vi.fn()
  const mockHandleSearch = vi.fn()
  const mockHandleOrgLogin = vi.fn()
  const mockUpdateQueryParams = vi.fn()
  const mockHandleFetch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockedUseAccessOrganisation.mockReturnValue({
      email: '',
      setEmail: vi.fn(),
      searchEmail: '',
      search: '',
      page: 1,
      page_limit: 10,
      data: mockData,
      isLoading: false,
      isAccessPending: false,
      isError: false,
      error: null,
      handleSearch: mockHandleSearch,
      handleFetch: mockHandleFetch,
      handleOrgLogin: mockHandleOrgLogin,
      updateQueryParams: mockUpdateQueryParams,
      refetch: mockRefetch,
    } as unknown as UseAccessOrganisationReturn)
  })

  it('renders organisation list correctly', () => {
    render(<OrganisationList />)

    expect(screen.getByText('Organisations')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument() // Total count badge

    const items = screen.getAllByTestId(
      ACCESS_ORGANISATION_TEST_IDS.ORGANISATION_LIST.ITEM,
    )
    expect(items).toHaveLength(2)

    expect(screen.getByText('Org 1')).toBeInTheDocument()
    expect(screen.getByText('Org 2')).toBeInTheDocument()
  })

  it('shows skeleton when loading', () => {
    mockedUseAccessOrganisation.mockReturnValue({
      isLoading: true,
    } as unknown as UseAccessOrganisationReturn)

    render(<OrganisationList />)
    expect(
      screen.getByTestId(
        ACCESS_ORGANISATION_TEST_IDS.ORGANISATION_LIST.SKELETON,
      ),
    ).toBeInTheDocument()
  })

  it('shows empty state when no organisations', () => {
    mockedUseAccessOrganisation.mockReturnValue({
      data: {
        docs: [],
        meta: { total: 0, page: 1, limit: 10 },
      } as ListOrganisationsResponse,
      isLoading: false,
    } as unknown as UseAccessOrganisationReturn)

    render(<OrganisationList />)
    expect(
      screen.getByTestId(
        ACCESS_ORGANISATION_TEST_IDS.ORGANISATION_LIST.EMPTY_STATE,
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('No organisations found')).toBeInTheDocument()
  })

  it('calls handleSearch when input changes', () => {
    render(<OrganisationList />)

    const searchInput = screen.getByPlaceholderText('Search organisations...')
    fireEvent.change(searchInput, { target: { value: 'new-search' } })

    expect(mockHandleSearch).toHaveBeenCalledWith('new-search')
  })

  it('calls updateQueryParams when pagination buttons are clicked', () => {
    render(<OrganisationList />)

    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)

    expect(mockUpdateQueryParams).toHaveBeenCalledWith({ page: '2' })
  })

  it('calls handleOrgLogin when login button is clicked', () => {
    render(<OrganisationList />)

    const loginButtons = screen.getAllByText('Login')
    fireEvent.click(loginButtons[0])

    expect(mockHandleOrgLogin).toHaveBeenCalledWith(mockData.docs[0])
  })
})
