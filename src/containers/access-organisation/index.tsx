'use client'

import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { EmailSearchCard } from './components/email-search-card'
import { UserDetailsCard } from './components/user-details-card'
import { OrganisationList } from './components/organisation-list'

interface UserDetails {
  name: string
  email: string
  role: string
  lastLogin: string
  status: 'active' | 'inactive'
}

interface Organisation {
  id: string
  name: string
  activeTenants: number
}

const dummyUser: UserDetails = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'ADMIN',
  lastLogin: '2 hours ago',
  status: 'active',
}

const dummyOrganisations: Organisation[] = [
  { id: '1', name: 'Acme Global Corporation', activeTenants: 5 },
  { id: '2', name: 'Starlight Industries Ltd', activeTenants: 12 },
]

export default function AccessOrganisationContainer() {
  const [email, setEmail] = useState('')
  const [fetched, setFetched] = useState(true) // default true to show the dummy state

  const handleFetch = () => {
    if (email.trim()) {
      setFetched(true)
    }
  }

  const handleLogin = (org: Organisation) => {
    console.log('Logging into:', org)
  }

  return (
    <div className='min-h-screen'>
      <div className='flex-1'>
        {/* Page Title */}
        <div className='mb-8'>
          <h1 className='text-foreground text-2xl font-bold tracking-tight'>
            Organisation Access
          </h1>
          <p className='text-muted-foreground mt-1 text-sm'>
            Enter user email to fetch organisation details and access your
            dashboard.
          </p>
        </div>

        {/* Top Row: Email Input + User Details */}
        <div className='mb-10 grid grid-cols-1 gap-4 md:grid-cols-[2fr_3fr]'>
          <EmailSearchCard
            email={email}
            onEmailChange={setEmail}
            onFetch={handleFetch}
          />
          {fetched && <UserDetailsCard user={dummyUser} />}
        </div>

        <Separator className='mb-8' />

        {/* Organisations Section */}
        {fetched && (
          <OrganisationList
            organisations={dummyOrganisations}
            onLogin={handleLogin}
          />
        )}
      </div>
    </div>
  )
}
