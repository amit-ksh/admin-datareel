'use client'

import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
  SidebarGroupLabel,
  useSidebar,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NavUser } from './nav-user'
import { APP_SIDEBAR_TEST_IDS } from './test-ids'
import {
  Building2Icon,
  ChevronRightIcon,
  ClapperboardIcon,
  DoorOpenIcon,
  ActivityIcon,
  MailIcon,
} from 'lucide-react'
import { Separator } from '../ui/separator'
import { cn } from '@/lib/utils'

export function AppSidebar({ ...props }) {
  const pathname = usePathname()

  const { isMobile, state, setOpen } = useSidebar()

  const items = {
    navMain: [
      {
        title: '',
        url: '#',
        show: true,
        items: [
          {
            title: 'Analytics',
            url: '/analytics',
            icon: ClapperboardIcon,
            hasAccess: true,
            isActive: pathname.startsWith('/analytics'),
          },
          {
            title: 'Organisations',
            url: '/organisations',
            icon: Building2Icon,
            hasAccess: true,
            isActive: pathname.startsWith('/organisations'),
          },
          {
            title: 'Access Organisations',
            url: '/access-organisation',
            icon: DoorOpenIcon,
            hasAccess: true,
            isActive: pathname.startsWith('/access-organisation'),
          },
          {
            title: 'Email Templates',
            url: '/email-templates',
            icon: MailIcon,
            hasAccess: true,
            isActive: pathname.startsWith('/email-templates'),
          },
        ],
      },
    ],
  }

  // Handle hover-to-expand only when currently collapsed on desktop
  const hoverExpandedRef = React.useRef(false)

  const handleMouseEnter = React.useCallback(() => {
    if (!isMobile && state === 'collapsed') {
      hoverExpandedRef.current = true
      setOpen(true)
    }
  }, [isMobile, state, setOpen])

  const handleMouseLeave = React.useCallback(() => {
    if (!isMobile && hoverExpandedRef.current) {
      hoverExpandedRef.current = false
      setOpen(false)
    }
  }, [isMobile, setOpen])

  return (
    <Sidebar
      collapsible='icon'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={APP_SIDEBAR_TEST_IDS.CONTAINER}
      {...props}
    >
      <SidebarHeader className='p-0 group-data-[collapsible=icon]:mt-2'>
        <div className='flex items-start gap-2 select-none'>
          <Image
            src={
              state === 'collapsed'
                ? '/datareel/brand/Monogram.jpg'
                : '/datareel/brand/logo-dark.svg'
            }
            alt='DataReel Logo'
            width={256}
            height={256}
            className='mx-auto hidden h-16 rounded group-data-[collapsible=icon]:h-auto group-data-[collapsible=icon]:w-[calc(100%-8px)] dark:block'
            data-testid={APP_SIDEBAR_TEST_IDS.LOGO_DESKTOP}
          />
          <Image
            src={
              state === 'collapsed'
                ? '/datareel/brand/Monogram.jpg'
                : '/datareel/brand/logo-light.svg'
            }
            alt='DataReel Logo'
            width={256}
            height={256}
            className='mx-auto block h-16 rounded group-data-[collapsible=icon]:h-auto group-data-[collapsible=icon]:w-[calc(100%-8px)] dark:hidden'
            data-testid={APP_SIDEBAR_TEST_IDS.LOGO_MOBILE}
          />
        </div>
      </SidebarHeader>
      <SidebarContent
        className={cn(
          'flex h-16 items-center p-0 group-data-[collapsible=icon]:mt-4',
        )}
      >
        <SidebarGroup>
          <SidebarMenu className={'space-y-4'}>
            {items.navMain.map((item, menuIdx) => {
              if (!item.show) return null
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarGroupLabel
                    className='h-auto font-semibold tracking-[0.01em] uppercase'
                    data-testid={APP_SIDEBAR_TEST_IDS.NAV_GROUP_LABEL(
                      item.title,
                    )}
                  >
                    {item.title}
                  </SidebarGroupLabel>

                  <SidebarMenu className='p-2 group-data-[collapsible=icon]:p-0'>
                    {item.items?.map((subItem) => {
                      if (!subItem.hasAccess) return null
                      return (
                        <SidebarMenuItem
                          key={subItem.title}
                          className='text-medium'
                        >
                          <SidebarMenuButton
                            isActive={subItem.isActive}
                            className='group'
                            data-testid={APP_SIDEBAR_TEST_IDS.NAV_ITEM(
                              subItem.title,
                            )}
                            asChild
                          >
                            <Link href={subItem.url}>
                              <subItem.icon className='group-data-[active=true]:text-tremor-brand size-4' />
                              <span className='truncate group-data-[collapsible=icon]:hidden'>
                                {subItem.title}
                              </span>
                              {subItem.isActive && (
                                <ChevronRightIcon className='ml-auto' />
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>

                  {/* Show divider between groups only when collapsed (icon mode) */}
                  {menuIdx < items.navMain.length - 1 && (
                    <Separator className='mt-2 hidden bg-gray-300 group-data-[collapsible=icon]:mt-4 group-data-[collapsible=icon]:mb-2 group-data-[collapsible=icon]:block' />
                  )}
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className='px-2 group-data-[collapsible=icon]:p-0'>
          <SidebarMenuItem className='text-medium'>
            <SidebarMenuButton
              isActive={pathname.startsWith('/server-health')}
              className='group'
              data-testid={APP_SIDEBAR_TEST_IDS.FOOTER_SYSTEM_HEALTH}
              asChild
            >
              <Link href='/server-health' target='_blank'>
                <ActivityIcon className='group-data-[active=true]:text-tremor-brand size-4' />
                <span className='truncate group-data-[collapsible=icon]:hidden'>
                  System Health
                </span>
                {pathname.startsWith('/server-health') && (
                  <ChevronRightIcon className='ml-auto' />
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div data-testid={APP_SIDEBAR_TEST_IDS.NAV_USER}>
          <NavUser />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
