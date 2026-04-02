'use client'

import { ErrorState } from '@/components/common/error-state'
import { OrganisationsHeader } from './components/organisations-header'
import { OrganisationsTable } from './components/organisations-table'
import { useOrganisations } from './use-organisations.hook'
import { AxiosError } from 'axios'
import { ORGANISATION_TEST_IDS } from './test-ids'

export default function OrganisationsContainer() {
  const orgs = useOrganisations()

  if (orgs.isError) {
    return (
      <div data-testid={ORGANISATION_TEST_IDS.ERROR_STATE}>
        <ErrorState error={orgs.error as AxiosError} onRetry={orgs.refetch} />
      </div>
    )
  }

  return (
    <div
      className='min-h-screen space-y-8'
      data-testid={ORGANISATION_TEST_IDS.CONTAINER}
    >
      <div data-testid={ORGANISATION_TEST_IDS.HEADER}>
        <OrganisationsHeader
          params={orgs.params}
          setFilters={orgs.setFilters}
          resetFilters={orgs.resetFilters}
        />
      </div>
      <div data-testid={ORGANISATION_TEST_IDS.TABLE}>
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
    </div>
  )
}
