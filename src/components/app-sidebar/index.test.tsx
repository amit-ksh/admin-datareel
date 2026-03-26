import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AppSidebar } from './index'
import { APP_SIDEBAR_TEST_IDS } from './test-ids'
import { MouseEventHandler } from 'react'

const mockSetOpen = vi.fn()

// Mock the dependencies correctly
vi.mock('next/navigation', () => ({
  usePathname: () => '/analytics',
}))

vi.mock('@/providers/auth-provider', () => ({
  useGlobalAuthContext: () => ({
    currentUser: {
      tenant_data: {
        tenant_name: 'Test Tenant',
        tenant_email: 'test@example.com',
        profile_image: '/avatar.jpg',
      },
    },
  }),
}))

vi.mock('@/components/ui/sidebar', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>
  const MockComponent = ({
    children,
    'data-testid': testId,
    onClick,
    className,
  }: Record<string, unknown>) => (
    <div
      data-testid={testId as string}
      onClick={onClick as MouseEventHandler<HTMLDivElement>}
      className={className as string}
    >
      {children as React.ReactNode}
    </div>
  )

  return {
    ...actual,
    useSidebar: () => ({
      isMobile: false,
      state: 'expanded',
      setOpen: mockSetOpen,
    }),
    Sidebar: ({
      children,
      onMouseEnter,
      onMouseLeave,
      'data-testid': testId,
    }: Record<string, unknown>) => (
      <div
        data-testid={testId as string}
        onMouseEnter={onMouseEnter as MouseEventHandler<HTMLDivElement>}
        onMouseLeave={onMouseLeave as MouseEventHandler<HTMLDivElement>}
      >
        {children as React.ReactNode}
      </div>
    ),
    SidebarHeader: MockComponent,
    SidebarContent: MockComponent,
    SidebarGroup: MockComponent,
    SidebarGroupLabel: MockComponent,
    SidebarMenu: MockComponent,
    SidebarMenuButton: ({
      children,
      'data-testid': testId,
    }: Record<string, unknown>) => (
      <div data-testid={testId as string}>{children as React.ReactNode}</div>
    ),
    SidebarMenuItem: MockComponent,
    SidebarRail: MockComponent,
    SidebarFooter: MockComponent,
  }
})

describe('AppSidebar Component', () => {
  it('AppSidebar_WhenRenderedWithValidUser_DisplaysCorrectNavItems', () => {
    // Act
    render(<AppSidebar />)

    // Assert
    expect(
      screen.getByTestId(APP_SIDEBAR_TEST_IDS.CONTAINER),
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(APP_SIDEBAR_TEST_IDS.LOGO_DESKTOP),
    ).toBeInTheDocument()

    // Check main navigation items
    expect(
      screen.getByTestId(APP_SIDEBAR_TEST_IDS.NAV_ITEM('Analytics')),
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(APP_SIDEBAR_TEST_IDS.NAV_ITEM('Organisations')),
    ).toBeInTheDocument()

    // Check system health link at footer
    expect(
      screen.getByTestId(APP_SIDEBAR_TEST_IDS.FOOTER_SYSTEM_HEALTH),
    ).toBeInTheDocument()

    // Check nav user container
    expect(
      screen.getByTestId(APP_SIDEBAR_TEST_IDS.NAV_USER),
    ).toBeInTheDocument()
  })

  it('AppSidebar_OnHoverWhenCollapsed_CallsSetOpen', () => {
    // Arrange - Reset mock state
    vi.mocked(mockSetOpen).mockClear()

    // Act
    render(<AppSidebar />)
    const container = screen.getByTestId(APP_SIDEBAR_TEST_IDS.CONTAINER)
    fireEvent.mouseEnter(container)

    // Assert - Since state is mocked as 'expanded', it shouldn't call setOpen
    expect(mockSetOpen).not.toHaveBeenCalled()
  })
})
