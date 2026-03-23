import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ServicesAlertUI } from './index'
import { API_SERVICES_TEST_IDS } from './test-ids'
import { ServiceContainerKeys } from '@/types/service-health'

// Mock the external dependency to ensure isolation
vi.mock('@/lib/api-services', () => ({
  SERVICE_IMPACT_MAP: {
    auth_service: {
      label: 'Database API',
      impacts: ['Data reads', 'Data writes'],
    },
  },
}))

describe('ServicesAlertUI Component', () => {
  it('ServicesAlertUI_WhenProvidedWithServices_RendersCorrectly', () => {
    const mockServices = [
      [
        'auth_service',
        { status: 'healthy', state: 'healthy', restart_count: 0, health: {} },
      ],
      [
        'unknown_service' as ServiceContainerKeys,
        {
          status: 'unhealthy',
          state: 'unhealthy',
          restart_count: 0,
          health: {},
        },
      ],
    ] as Parameters<typeof ServicesAlertUI>[0]['services']

    // Act
    render(<ServicesAlertUI services={mockServices} />)

    // Assert
    expect(
      screen.getByTestId(API_SERVICES_TEST_IDS.CONTAINER),
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(API_SERVICES_TEST_IDS.MESSAGE),
    ).toBeInTheDocument()
    expect(screen.getByTestId(API_SERVICES_TEST_IDS.LIST)).toBeInTheDocument()
    expect(screen.getByTestId(API_SERVICES_TEST_IDS.FOOTER)).toBeInTheDocument()
    expect(
      screen.getByTestId(API_SERVICES_TEST_IDS.STATUS_LINK),
    ).toHaveAttribute('href', '/server-health')

    // Verify known service from mock map
    expect(
      screen.getByTestId(API_SERVICES_TEST_IDS.LIST_ITEM('auth_service')),
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(API_SERVICES_TEST_IDS.LIST_ITEM_LABEL('auth_service')),
    ).toHaveTextContent('Database API:')
    expect(
      screen.getByTestId(
        API_SERVICES_TEST_IDS.LIST_ITEM_IMPACT('auth_service'),
      ),
    ).toHaveTextContent('Data reads, Data writes')

    // Verify unknown service fallback behavior
    expect(
      screen.getByTestId(API_SERVICES_TEST_IDS.LIST_ITEM('unknown_service')),
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(
        API_SERVICES_TEST_IDS.LIST_ITEM_LABEL('unknown_service'),
      ),
    ).toHaveTextContent('unknown service:')
    expect(
      screen.getByTestId(
        API_SERVICES_TEST_IDS.LIST_ITEM_IMPACT('unknown_service'),
      ),
    ).toHaveTextContent('General functionality')
  })

  it('ServicesAlertUI_WhenProvidedWithEmptyArray_RendersSafely', () => {
    const mockServices: Parameters<typeof ServicesAlertUI>[0]['services'] = []

    // Act
    render(<ServicesAlertUI services={mockServices} />)

    // Assert
    expect(
      screen.getByTestId(API_SERVICES_TEST_IDS.CONTAINER),
    ).toBeInTheDocument()
    expect(screen.getByTestId(API_SERVICES_TEST_IDS.LIST)).toBeEmptyDOMElement()
  })
})
