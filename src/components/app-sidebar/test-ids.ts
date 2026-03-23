export const APP_SIDEBAR_TEST_IDS = {
  CONTAINER: 'app-sidebar-container',
  LOGO_DESKTOP: 'app-sidebar-logo-desktop',
  LOGO_MOBILE: 'app-sidebar-logo-mobile',
  NAV_GROUP_LABEL: (title: string) => `app-sidebar-nav-group-label-${title}`,
  NAV_ITEM: (title: string) => `app-sidebar-nav-item-${title}`,
  FOOTER_SYSTEM_HEALTH: 'app-sidebar-footer-system-health',
  NAV_USER: 'app-sidebar-nav-user',
} as const
