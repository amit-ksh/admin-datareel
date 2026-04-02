import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ErrorState } from '.'
import { COMMON_TEST_IDS } from './test-ids'

const mockRouterBack = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockRouterBack,
  }),
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}))

// Mock clipboard
const mockClipboardWrite = vi.fn()
Object.assign(navigator, {
  clipboard: {
    writeText: mockClipboardWrite,
  },
})

describe('ErrorState Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('ErrorState_WhenNoPropsProvided_RendersDefaultUnknownError', () => {
    // Act
    render(<ErrorState />)

    // Assert
    expect(
      screen.getByTestId(COMMON_TEST_IDS.ERROR_STATE.CONTAINER),
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(COMMON_TEST_IDS.ERROR_STATE.TITLE),
    ).toHaveTextContent('Something went wrong')
    expect(
      screen.getByTestId(COMMON_TEST_IDS.ERROR_STATE.DESCRIPTION),
    ).toHaveTextContent('Please try again.')
    expect(
      screen.getByTestId(COMMON_TEST_IDS.ERROR_STATE.GO_BACK_BUTTON),
    ).toBeInTheDocument()

    // Summary toggle should be present and expanded by default
    expect(
      screen.getByTestId(COMMON_TEST_IDS.ERROR_STATE.SUMMARY_TOGGLE),
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(COMMON_TEST_IDS.ERROR_STATE.SUMMARY_CONTAINER),
    ).toBeInTheDocument()
  })

  it('ErrorState_WhenPropsProvided_RendersCustomTextAndButtons', () => {
    // Arrange
    const onRetry = vi.fn()
    const primaryAction = {
      label: 'Home',
      onClick: vi.fn(),
    }

    // Act
    render(
      <ErrorState
        title='Custom Error'
        description='Custom description.'
        onRetry={onRetry}
        primaryAction={primaryAction}
      />,
    )

    // Assert
    expect(
      screen.getByTestId(COMMON_TEST_IDS.ERROR_STATE.TITLE),
    ).toHaveTextContent('Custom Error')
    expect(
      screen.getByTestId(COMMON_TEST_IDS.ERROR_STATE.DESCRIPTION),
    ).toHaveTextContent('Custom description.')

    // Check Retry Button
    const retryBtn = screen.getByTestId(
      COMMON_TEST_IDS.ERROR_STATE.RETRY_BUTTON,
    )
    expect(retryBtn).toBeInTheDocument()
    fireEvent.click(retryBtn)
    expect(onRetry).toHaveBeenCalled()

    // Check Primary Action Button
    const primaryBtn = screen.getByTestId(
      COMMON_TEST_IDS.ERROR_STATE.PRIMARY_ACTION_BUTTON,
    )
    expect(primaryBtn).toBeInTheDocument()
    expect(primaryBtn).toHaveTextContent('Home')
    fireEvent.click(primaryBtn)
    expect(primaryAction.onClick).toHaveBeenCalled()

    // Go Back button should not be present
    expect(
      screen.queryByTestId(COMMON_TEST_IDS.ERROR_STATE.GO_BACK_BUTTON),
    ).not.toBeInTheDocument()
  })

  it('ErrorState_WhenCopySummaryIsClicked_WritesToClipboard', async () => {
    // Arrange
    render(<ErrorState />)
    const copyBtn = screen.getByTestId(
      COMMON_TEST_IDS.ERROR_STATE.COPY_ALL_BUTTON,
    )

    // Act
    fireEvent.click(copyBtn)

    // Assert
    expect(mockClipboardWrite).toHaveBeenCalled()
  })

  it('ErrorState_WhenGoBackIsClicked_CallsRouterBack', async () => {
    // Arrange
    render(<ErrorState />)
    const backBtn = screen.getByTestId(
      COMMON_TEST_IDS.ERROR_STATE.GO_BACK_BUTTON,
    )

    // Act
    fireEvent.click(backBtn)

    // Assert
    expect(mockRouterBack).toHaveBeenCalled()
  })

  it('ErrorState_WhenSummaryToggleClicked_CollapsesSummary', () => {
    // Arrange
    render(<ErrorState />)

    // Act & Assert initially open
    expect(
      screen.getByTestId(COMMON_TEST_IDS.ERROR_STATE.SUMMARY_CONTAINER),
    ).toBeInTheDocument()

    // Click toggle
    const toggleBtn = screen.getByTestId(
      COMMON_TEST_IDS.ERROR_STATE.SUMMARY_TOGGLE,
    )
    fireEvent.click(toggleBtn)

    // Should be closed
    expect(
      screen.queryByTestId(COMMON_TEST_IDS.ERROR_STATE.SUMMARY_CONTAINER),
    ).not.toBeInTheDocument()
  })
})
