'use client'

import {
  useGetOrganisation,
  useListOrganisationTenants,
  useUpdateOrganisation,
  useUnlockOrganisation,
  useUpdateOrganisationDetail,
  useGetOrganisationById,
} from '@/api/organisation'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export const useOrganisationView = () => {
  const { organisationId } = useParams()
  const [tenantPage, setTenantPage] = useState(1)
  const [tenantLimit, setTenantLimit] = useState(10)
  const [tenantStatus, setTenantStatus] = useState<string | undefined>()
  const [tenantSearch, setTenantSearch] = useState<string | undefined>()

  const { data: organisationFromApi, isLoading: isOrgLoading } =
    useGetOrganisation(organisationId as string)

  const { data: organisationById, isLoading: isOrgByIdLoading } =
    useGetOrganisationById(organisationId as string)

  const organisation = organisationById || organisationFromApi

  const { mutate: updateOrganisation, isPending: isUpdating } =
    useUpdateOrganisation(organisationId as string)

  const { data: tenantsResponse, isLoading: isTenantsLoading } =
    useListOrganisationTenants({
      org_id: organisationId as string,
      page: tenantPage,
      page_limit: tenantLimit,
      tenant_status: tenantStatus,
      search: tenantSearch,
    })

  const { mutate: updateOrganisationDetail, isPending: isUpdatingDetail } =
    useUpdateOrganisationDetail(organisationId as string)

  const { mutate: unlockOrganisation, isPending: isUnlocking } =
    useUnlockOrganisation(organisationId as string)

  return {
    organisation,
    updateOrganisation,
    isUpdating,
    isLoading: isOrgLoading && isOrgByIdLoading && isTenantsLoading,
    tenantsResponse,
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
    unlockOrganisation,
    isUnlocking,
    organisationById,
    isOrgByIdLoading,
  }
}
