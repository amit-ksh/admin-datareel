'use client'

import {
  useGetOrganisation,
  useListOrganisationTenants,
} from '@/api/organisation'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export const useOrganisationView = () => {
  const { organisationId } = useParams()
  const [tenantPage, setTenantPage] = useState(1)
  const [tenantLimit, setTenantLimit] = useState(10)
  const [tenantStatus, setTenantStatus] = useState<string | undefined>()
  const [tenantSearch, setTenantSearch] = useState<string | undefined>()

  const { data: organisation, isLoading: isOrgLoading } = useGetOrganisation(
    organisationId as string,
  )

  const { data: tenantsResponse, isLoading: isTenantsLoading } =
    useListOrganisationTenants({
      org_id: organisationId as string,
      page: tenantPage,
      page_limit: tenantLimit,
      tenant_status: tenantStatus,
      search: tenantSearch,
    })

  return {
    organisation,
    isLoading: isOrgLoading || isTenantsLoading,
    tenantsResponse,
    tenantPage,
    setTenantPage,
    tenantLimit,
    setTenantLimit,
    tenantStatus,
    setTenantStatus,
    tenantSearch,
    setTenantSearch,
  }
}
