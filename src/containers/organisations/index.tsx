'use client'

import ErrorState from '@/components/common/error-state'
import { OrganisationsHeader } from './components/organisations-header'
import { OrganisationsTable } from './components/organisations-table'
import { useOrganisations } from './use-organisations.hook'
import { AxiosError } from 'axios'

export default function OrganisationsContainer() {
  const orgs = useOrganisations()

  if (orgs.isError) {
    return (
      <ErrorState error={orgs.error as AxiosError} onRetry={orgs.refetch} />
    )
  }

  return (
    <div className='min-h-screen space-y-8'>
      <OrganisationsHeader
        params={orgs.params}
        setFilters={orgs.setFilters}
        resetFilters={orgs.resetFilters}
      />
      <OrganisationsTable
        data={orgs.data}
        isLoading={orgs.isLoading}
        isError={orgs.isError}
        error={orgs.error}
        refetch={orgs.refetch}
        params={orgs.params}
        updateQueryParams={orgs.updateQueryParams}
      />
    </div>
  )
}
