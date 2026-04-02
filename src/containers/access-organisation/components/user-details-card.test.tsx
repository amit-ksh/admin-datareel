import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { UserDetailsCard } from './user-details-card'
import { ACCESS_ORGANISATION_TEST_IDS } from './test-ids'

describe('UserDetailsCard', () => {
  const dummyUser = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'ADMIN',
    lastLogin: '2 hours ago',
    status: 'active' as const,
  }

  it('renders correctly with user details', () => {
    render(<UserDetailsCard user={dummyUser} />)

    expect(
      screen.getByTestId(ACCESS_ORGANISATION_TEST_IDS.USER_DETAILS_CARD.NAME),
    ).toHaveTextContent('John Doe')
    expect(
      screen.getByTestId(ACCESS_ORGANISATION_TEST_IDS.USER_DETAILS_CARD.EMAIL),
    ).toHaveTextContent('john.doe@company.com')
    expect(
      screen.getByTestId(ACCESS_ORGANISATION_TEST_IDS.USER_DETAILS_CARD.ROLE),
    ).toHaveTextContent('ADMIN')
  })
})
