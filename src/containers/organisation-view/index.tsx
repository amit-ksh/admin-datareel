'use client'

import { OrganisationViewHeader } from './components/organisation-view-header'
import { OrganisationAnalytics } from './components/organisation-analytics'
import { OrganisationOverview } from './components/organisation-overview'
import { OrganisationTenants } from './components/organisation-tenants'
import { OrganisationFeedback } from './components/organisation-feedback'
import { OrganisationProjectsAssets } from './components/organisation-projects-assets'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useOrganisationView } from './use-organisation-view.hook'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/common/error-state/error-state'
import { AxiosError } from 'axios'

export default function OrganisationViewContainer() {
  const { organisation, isLoading, error } = useOrganisationView()

  if (isLoading) {
    return (
      <div className='flex min-h-screen flex-col space-y-8 p-4'>
        <div className='flex items-center gap-4'>
          <Skeleton className='size-16 rounded-lg' />
          <div className='space-y-2'>
            <Skeleton className='h-8 w-48' />
            <Skeleton className='h-4 w-32' />
          </div>
        </div>
        <Skeleton className='h-12 w-full' />
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <Skeleton className='h-64' />
          <Skeleton className='h-64' />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <ErrorState
          error={error as AxiosError}
          title='Failed to load organisation'
          description='We encountered an error while fetching the organisation details.'
        />
      </div>
    )
  }

  if (!organisation) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <ErrorState
          error={(error ?? {}) as AxiosError}
          title='Organisation not found'
          description='The organisation you are looking for does not exist or you do not have access.'
        />
      </div>
    )
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <OrganisationViewHeader />

      <Tabs
        defaultValue='overview'
        className='relative w-full flex-1 space-y-0'
      >
        <div className='bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-18 z-10 rounded-lg shadow-sm backdrop-blur'>
          <TabsList className='bg-muted/50 h-12 w-full justify-start rounded-lg p-1'>
            <TabsTrigger
              value='overview'
              className='h-full rounded-md px-6 text-sm'
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value='tenants'
              className='h-full rounded-md px-6 text-sm'
            >
              Tenants
            </TabsTrigger>
            <TabsTrigger
              value='analytics'
              className='h-full rounded-md px-6 text-sm'
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value='feedback'
              className='h-full rounded-md px-6 text-sm'
            >
              Feedback
            </TabsTrigger>
            <TabsTrigger
              value='projects-assets'
              className='h-full rounded-md px-6 text-sm'
            >
              Project & Assets
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value='overview'
          className='p-2 pb-16 ring-0 focus-visible:ring-0 focus-visible:outline-none'
        >
          <OrganisationOverview />
        </TabsContent>

        <TabsContent
          value='tenants'
          className='p-2 pb-16 ring-0 focus-visible:ring-0 focus-visible:outline-none'
        >
          <OrganisationTenants />
        </TabsContent>

        <TabsContent
          value='analytics'
          className='p-2 pb-16 ring-0 focus-visible:ring-0 focus-visible:outline-none'
        >
          <OrganisationAnalytics organisationId={organisation.id} />
        </TabsContent>

        <TabsContent
          value='feedback'
          className='p-2 pb-16 ring-0 focus-visible:ring-0 focus-visible:outline-none'
        >
          <OrganisationFeedback organisationId={organisation.id} />
        </TabsContent>

        <TabsContent
          value='projects-assets'
          className='p-2 pb-16 ring-0 focus-visible:ring-0 focus-visible:outline-none'
        >
          <OrganisationProjectsAssets counts={organisation.counts} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
