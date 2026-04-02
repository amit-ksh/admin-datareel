import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoginContainer from './index'
import { LOGIN_TEST_IDS } from './test-ids'

// Mock Next.js components
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

// Mock hooks
vi.mock('@/hooks/use-collage-texture', () => ({
  useCollageTexture: () => ({
    texture: {},
    dimensions: { width: 100, height: 100, aspectRatio: 1 },
    isLoading: false,
  }),
}))

const mockHandleLogin = vi.fn((e) => e.preventDefault())
const mockUseLogin = vi.fn()
vi.mock('./use-login.hook', () => ({
  useLogin: () => mockUseLogin(),
}))

// Mock sub-components
vi.mock('./components', () => ({
  LoginScene: () => <div data-testid='mock-login-scene'>Mock Login Scene</div>,
}))

describe('LoginContainer', () => {
  it('LoginContainer_WhenRendered_DisplaysLoginForm', () => {
    // Arrange
    mockUseLogin.mockReturnValue({
      handleLogin: mockHandleLogin,
      isLoginPending: false,
    })

    // Act
    render(<LoginContainer />)

    // Assert
    expect(screen.getByTestId(LOGIN_TEST_IDS.FORM)).toBeInTheDocument()
    expect(screen.getByTestId(LOGIN_TEST_IDS.EMAIL_INPUT)).toBeInTheDocument()
    expect(
      screen.getByTestId(LOGIN_TEST_IDS.PASSWORD_INPUT),
    ).toBeInTheDocument()
    expect(screen.getByTestId(LOGIN_TEST_IDS.SUBMIT_BUTTON)).toBeInTheDocument()
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    expect(screen.getByTestId('mock-login-scene')).toBeInTheDocument()
  })

  it('LoginContainer_WhenFormSubmitted_CallsHandleLogin', () => {
    // Arrange
    mockUseLogin.mockReturnValue({
      handleLogin: mockHandleLogin,
      isLoginPending: false,
    })

    // Act
    render(<LoginContainer />)
    const form = screen.getByTestId(LOGIN_TEST_IDS.FORM)
    fireEvent.submit(form)

    // Assert
    expect(mockHandleLogin).toHaveBeenCalled()
  })

  it('LoginContainer_WhenLoginIsPending_DisablesSubmitButton', () => {
    // Arrange
    mockUseLogin.mockReturnValue({
      handleLogin: vi.fn(),
      isLoginPending: true,
    })

    // Act
    render(<LoginContainer />)

    // Assert
    const submitButton = screen.getByTestId(LOGIN_TEST_IDS.SUBMIT_BUTTON)
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent('Logging in...')
  })
})
