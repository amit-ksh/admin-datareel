import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './button'

describe('Button UI Component', () => {
  it('Button_WhenRendered_DisplaysCorrectText', () => {
    // Act
    render(<Button>Click Me</Button>)

    // Assert
    expect(screen.getByText('Click Me')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('Click Me')
  })

  it('Button_WhenClicked_CallsOnClickHandler', () => {
    // Arrange
    const handleClick = vi.fn()

    // Act
    render(<Button onClick={handleClick}>Click Me</Button>)
    fireEvent.click(screen.getByRole('button'))

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('Button_WhenDisabled_CannotBeClicked', () => {
    // Arrange
    const handleClick = vi.fn()

    // Act
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>,
    )
    fireEvent.click(screen.getByRole('button'))

    // Assert
    expect(handleClick).not.toHaveBeenCalled()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('Button_WhenVariantProvided_AppliesCorrectDataAttribute', () => {
    // Act
    render(<Button variant='destructive'>Delete</Button>)

    // Assert
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-variant', 'destructive')
  })

  it('Button_WhenSizeProvided_AppliesCorrectDataAttribute', () => {
    // Act
    render(<Button size='sm'>Small Button</Button>)

    // Assert
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-size', 'sm')
  })

  it('Button_WhenAsChildIsUsed_RendersChildElement', () => {
    // Act
    render(
      <Button asChild>
        <a href='/test'>Link Button</a>
      </Button>,
    )

    // Assert
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
    expect(link).toHaveTextContent('Link Button')
    // Slot should merge props
    expect(link).toHaveAttribute('data-slot', 'button')
  })
})
