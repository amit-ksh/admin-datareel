'use client'

import {
  useGetOrganisation,
  useListOrganisationTenants,
  useUpdateOrganisation,
  useUnlockOrganisation,
  useUpdateOrganisationDetail,
} from '@/api/organisation'
import { useParams } from 'next/navigation'
import { useState, useMemo } from 'react'

export const useOrganisationView = () => {
  const { organisationId } = useParams()
  const [tenantPage, setTenantPage] = useState(1)
  const [tenantLimit, setTenantLimit] = useState(10)
  const [tenantStatus, setTenantStatus] = useState<string | undefined>()
  const [tenantSearch, setTenantSearch] = useState<string | undefined>()

  const {
    data: organisationFromApi,
    isLoading: isOrgLoading,
    error: orgError,
  } = useGetOrganisation(organisationId as string)

  const organisation = useMemo(() => {
    if (!organisationFromApi) return null

    return {
      ...organisationFromApi,
      id: organisationFromApi.id || organisationFromApi._id,
    }
  }, [organisationFromApi])

  const {
    mutate: updateOrganisation,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateOrganisation(organisationId as string)

  const {
    data: tenantsResponse,
    isLoading: isTenantsLoading,
    error: tenantsError,
  } = useListOrganisationTenants({
    org_id: organisationId as string,
    page: tenantPage,
    page_limit: tenantLimit,
    tenant_status: tenantStatus,
    search: tenantSearch,
  })

  const {
    mutate: updateOrganisationDetail,
    isPending: isUpdatingDetail,
    error: updateDetailError,
  } = useUpdateOrganisationDetail(organisationId as string)

  const {
    mutate: unlockOrganisation,
    isPending: isUnlocking,
    error: unlockError,
  } = useUnlockOrganisation(organisationId as string)

  return {
    organisation,
    updateOrganisation,
    isUpdating,
    isLoading: isOrgLoading || isTenantsLoading,
    error: orgError,
    updateError,
    tenantsResponse,
    tenantsError,
    tenantPage,
    setTenantPage,
    tenantLimit,
    setTenantLimit,
    tenantStatus,
    setTenantStatus,
    tenantSearch,
    setTenantSearch,
    updateOrganisationDetail,
    isUpdatingDetail,
    updateDetailError,
    unlockOrganisation,
    isUnlocking,
    unlockError,
  }
}
