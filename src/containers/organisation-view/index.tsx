'use client'

import { OrganisationViewHeader } from './components/organisation-view-header'
import { OrganisationAnalytics } from './components/organisation-analytics'
import { OrganisationOverview } from './components/organisation-overview'
import { OrganisationTenants } from './components/organisation-tenants'
import { OrganisationFeedback } from './components/organisation-feedback'
import { OrganisationProjectsAssets } from './components/organisation-projects-assets'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function OrganisationViewContainer() {
  return (
    <div className='flex min-h-screen flex-col'>
      <OrganisationViewHeader />

      <Tabs
        defaultValue='overview'
        className='relative w-full flex-1 space-y-0'
      >
        <div className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-18 z-10 rounded-lg shadow-sm backdrop-blur'>
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
              className='pnpmrounded-md h-full px-6 text-sm'
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
          <OrganisationAnalytics />
        </TabsContent>

        <TabsContent
          value='feedback'
          className='p-2 pb-16 ring-0 focus-visible:ring-0 focus-visible:outline-none'
        >
          <OrganisationFeedback />
        </TabsContent>

        <TabsContent
          value='projects-assets'
          className='p-2 pb-16 ring-0 focus-visible:ring-0 focus-visible:outline-none'
        >
          <OrganisationProjectsAssets />
        </TabsContent>
      </Tabs>
    </div>
  )
}
