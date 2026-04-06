'use client'

import { Suspense } from 'react'
import { Separator } from '@/components/ui/separator'
import { EmailSearchCard } from './components/email-search-card'
import {
  OrganisationList,
  OrganisationSkeleton,
} from './components/organisation-list'
import { useAccessOrganisation } from './use-access-organisation.hook'

interface UserDetails {
  name: string
  email: string
  role: string
  lastLogin: string
  status: 'active' | 'inactive'
}

export default function AccessOrganisationContainer() {
  const { email, setEmail, isLoading, handleFetch } = useAccessOrganisation()

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
            loading={isLoading}
          />
          {/* {searchEmail && !isLoading && (
            <UserDetailsCard user={{ ...dummyUser, email: searchEmail }} />
          )} */}
        </div>

        <Separator className='mb-8' />

        {/* Organisations Section */}
        <Suspense fallback={<OrganisationSkeleton />}>
          <OrganisationList />
        </Suspense>
      </div>
    </div>
  )
}
