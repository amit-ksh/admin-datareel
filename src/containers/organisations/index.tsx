'use client'

import { OrganisationsHeader } from './components/organisations-header'
import { OrganisationsTable } from './components/organisations-table'
import { useOrganisations } from './use-organisations.hook'

export default function OrganisationsContainer() {
  const orgs = useOrganisations()

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
