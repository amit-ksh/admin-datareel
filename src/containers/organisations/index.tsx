'use client'

import { OrganisationsHeader } from './components/organisations-header'
import { OrganisationsTable } from './components/organisations-table'

export default function OrganisationsContainer() {
  return (
    <div className='min-h-screen space-y-8'>
      <OrganisationsHeader />
      <OrganisationsTable />
    </div>
  )
}
