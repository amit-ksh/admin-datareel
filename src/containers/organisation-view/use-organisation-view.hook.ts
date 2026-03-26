'use client'

import { useGetOrganisation } from '@/api/organisation'
import { useParams } from 'next/navigation'

export const useOrganisationView = () => {
  const { organisationId } = useParams()
  const { data: organisation, isLoading } = useGetOrganisation(
    organisationId as string,
  )

  return { organisation, isLoading }
}
