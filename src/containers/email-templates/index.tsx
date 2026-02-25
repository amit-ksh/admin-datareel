'use client'

import { EmailTemplatesHeader } from './components/email-templates-header'
import { EmailTemplatesTable } from './components/email-templates-table'

export default function EmailTemplatesContainer() {
  return (
    <div className='min-h-screen space-y-8'>
      <EmailTemplatesHeader />
      <EmailTemplatesTable />
    </div>
  )
}
