export const API_SERVICES_TEST_IDS = {
  CONTAINER: 'api-services-alert-container',
  MESSAGE: 'api-services-alert-message',
  LIST: 'api-services-alert-list',
  LIST_ITEM: (name: string) => `api-services-alert-item-${name}`,
  LIST_ITEM_LABEL: (name: string) => `api-services-alert-item-label-${name}`,
  LIST_ITEM_IMPACT: (name: string) => `api-services-alert-item-impact-${name}`,
  FOOTER: 'api-services-alert-footer',
  STATUS_LINK: 'api-services-alert-status-link',
} as const
