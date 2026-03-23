'use client'

import { EmailTemplatesHeader } from './components/email-templates-header'
import { EmailTemplatesTable } from './components/email-templates-table'
import { useEmailTemplates } from './hooks/use-email-templates.hook'

export default function EmailTemplatesContainer() {
  const {
    data,
    isLoading,
    setFilters,
    params,
    updateQueryParams,
    resetFilters,
  } = useEmailTemplates()

  return (
    <div className='min-h-screen space-y-8'>
      <EmailTemplatesHeader
        params={params}
        onFilterChange={setFilters}
        onReset={resetFilters}
      />
      <EmailTemplatesTable
        data={data?.data || []}
        meta={data?.meta}
        isLoading={isLoading}
        onPageChange={(page) => updateQueryParams({ page })}
      />
    </div>
  )
}
