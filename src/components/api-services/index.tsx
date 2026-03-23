import { SERVICE_IMPACT_MAP } from '@/lib/api-services'
import {
  ServerContainersHealthResponse,
  ServiceContainerKeys,
} from '@/types/service-health'
import { API_SERVICES_TEST_IDS } from './test-ids'

export const ServicesAlertUI = ({
  services,
}: {
  services: [
    ServiceContainerKeys,
    ServerContainersHealthResponse['containers'][ServiceContainerKeys],
  ][]
}) => {
  return (
    <div className='text-left' data-testid={API_SERVICES_TEST_IDS.CONTAINER}>
      <p
        className='mb-2 text-xs text-gray-700'
        data-testid={API_SERVICES_TEST_IDS.MESSAGE}
      >
        Some platform services are currently down. This may impact certain
        functionality until recovery is complete.
      </p>
      <ul
        className='mt-1 list-inside list-disc space-y-1 px-4 text-sm text-gray-800'
        data-testid={API_SERVICES_TEST_IDS.LIST}
      >
        {services.map(([name]) => {
          const map = SERVICE_IMPACT_MAP[name] || {}
          const label = map.label || name.replace(/_/g, ' ')
          const impacts = map.impacts || ['General functionality']
          return (
            <li key={name} data-testid={API_SERVICES_TEST_IDS.LIST_ITEM(name)}>
              <span
                className='font-medium'
                data-testid={API_SERVICES_TEST_IDS.LIST_ITEM_LABEL(name)}
              >
                {label}:
              </span>{' '}
              <span
                className='text-gray-600'
                data-testid={API_SERVICES_TEST_IDS.LIST_ITEM_IMPACT(name)}
              >
                {impacts.join(', ')}
              </span>
            </li>
          )
        })}
      </ul>
      <div
        className='mt-3 text-xs text-gray-500'
        data-testid={API_SERVICES_TEST_IDS.FOOTER}
      >
        You can monitor live status on the{' '}
        <a
          href='/server-health'
          className='text-blue-600 underline hover:text-blue-500'
          data-testid={API_SERVICES_TEST_IDS.STATUS_LINK}
        >
          status page
        </a>
        .
      </div>
    </div>
  )
}
