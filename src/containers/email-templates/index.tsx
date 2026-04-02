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
    template_id,
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
        data={data?.docs || []}
        meta={data?.meta}
        isLoading={isLoading}
        templateId={template_id}
        onPageChange={(page) => updateQueryParams({ page })}
        onReviewTemplate={(id: string | null) =>
          updateQueryParams({ template_id: id })
        }
      />
    </div>
  )
}
