export const COMMON_TEST_IDS = {
  ERROR_STATE: {
    CONTAINER: 'error-state-container',
    ICON_CONTAINER: 'error-state-icon-container',
    TITLE: 'error-state-title',
    RETRY_BUTTON: 'error-state-retry-button',
    DESCRIPTION: 'error-state-description',
    COPY_ALL_BUTTON: 'error-state-copy-all-button',
    PRIMARY_ACTION_BUTTON: 'error-state-primary-action-button',
    PRIMARY_ACTION_LINK: 'error-state-primary-action-link',
    GO_BACK_BUTTON: 'error-state-go-back-button',
    SUMMARY_TOGGLE: 'error-state-summary-toggle',
    SUMMARY_CONTAINER: 'error-state-summary-container',
    SUMMARY_ITEM: (key: string) => `error-state-summary-item-${key}`,
    SUMMARY_ITEM_COPY: (key: string) => `error-state-summary-item-copy-${key}`,
  },
} as const
