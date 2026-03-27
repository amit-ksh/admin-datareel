import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { EmailSearchCard } from './email-search-card'
import { ACCESS_ORGANISATION_TEST_IDS } from './test-ids'

describe('EmailSearchCard', () => {
  it('renders correctly with initial props', () => {
    const onEmailChange = vi.fn()
    const onFetch = vi.fn()

    render(
      <EmailSearchCard
        email='test@example.com'
        onEmailChange={onEmailChange}
        onFetch={onFetch}
      />,
    )

    const input = screen.getByTestId(
      ACCESS_ORGANISATION_TEST_IDS.EMAIL_SEARCH_CARD.INPUT,
    )
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('test@example.com')

    const button = screen.getByTestId(
      ACCESS_ORGANISATION_TEST_IDS.EMAIL_SEARCH_CARD.SUBMIT_BUTTON,
    )
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
  })

  it('calls onEmailChange when input value changes', () => {
    const onEmailChange = vi.fn()
    const onFetch = vi.fn()

    render(
      <EmailSearchCard
        email=''
        onEmailChange={onEmailChange}
        onFetch={onFetch}
      />,
    )

    const input = screen.getByTestId(
      ACCESS_ORGANISATION_TEST_IDS.EMAIL_SEARCH_CARD.INPUT,
    )
    fireEvent.change(input, { target: { value: 'new@example.com' } })

    expect(onEmailChange).toHaveBeenCalledWith('new@example.com')
  })

  it('calls onFetch when button is clicked', () => {
    const onEmailChange = vi.fn()
    const onFetch = vi.fn()

    render(
      <EmailSearchCard
        email='test@example.com'
        onEmailChange={onEmailChange}
        onFetch={onFetch}
      />,
    )

    const button = screen.getByTestId(
      ACCESS_ORGANISATION_TEST_IDS.EMAIL_SEARCH_CARD.SUBMIT_BUTTON,
    )
    fireEvent.click(button)

    expect(onFetch).toHaveBeenCalled()
  })

  it('disables input and button when loading is true', () => {
    const onEmailChange = vi.fn()
    const onFetch = vi.fn()

    render(
      <EmailSearchCard
        email='test@example.com'
        onEmailChange={onEmailChange}
        onFetch={onFetch}
        loading={true}
      />,
    )

    const input = screen.getByTestId(
      ACCESS_ORGANISATION_TEST_IDS.EMAIL_SEARCH_CARD.INPUT,
    )
    expect(input).toBeDisabled()

    const button = screen.getByTestId(
      ACCESS_ORGANISATION_TEST_IDS.EMAIL_SEARCH_CARD.SUBMIT_BUTTON,
    )
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Fetching...')
  })

  it('disables button when email is empty', () => {
    const onEmailChange = vi.fn()
    const onFetch = vi.fn()

    render(
      <EmailSearchCard
        email=''
        onEmailChange={onEmailChange}
        onFetch={onFetch}
      />,
    )

    const button = screen.getByTestId(
      ACCESS_ORGANISATION_TEST_IDS.EMAIL_SEARCH_CARD.SUBMIT_BUTTON,
    )
    expect(button).toBeDisabled()
  })
})
