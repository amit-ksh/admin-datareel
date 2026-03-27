import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './input'

describe('Input UI Component', () => {
  it('Input_WhenRendered_DisplaysPlaceholder', () => {
    // Act
    render(<Input placeholder='Enter email' />)

    // Assert
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('Input_WhenValueProvided_DisplaysValue', () => {
    // Act
    render(<Input value='test@example.com' readOnly />)

    // Assert
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
  })

  it('Input_WhenTextChanged_CallsOnChangeHandler', () => {
    // Arrange
    const handleChange = vi.fn()

    // Act
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new value' } })

    // Assert
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('Input_WhenDisabled_IsNotInteractive', () => {
    // Act
    render(<Input disabled />)

    // Assert
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('Input_WhenRequired_HasRequiredAttribute', () => {
    // Act
    render(<Input required />)

    // Assert
    expect(screen.getByRole('textbox')).toBeRequired()
  })

  it('Input_WhenTypeIsProvided_SetsInputType', () => {
    // Act
    render(<Input type='password' placeholder='Pass' />)

    // Assert
    // getByPlaceholderText for password type works but doesn't have role 'textbox'
    const input = screen.getByPlaceholderText('Pass')
    expect(input).toHaveAttribute('type', 'password')
  })
})
