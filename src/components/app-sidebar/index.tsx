"use client";

import * as React from "react";

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
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavUser } from "./nav-user";
import {
  Building2Icon,
  ChevronRightIcon,
  ClapperboardIcon,
  DoorOpenIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { useGlobalAuthContext } from "@/providers/auth-provider";

export function AppSidebar({ ...props }) {
  const pathname = usePathname();
  const { currentUser } = useGlobalAuthContext();

  const { isMobile, state, setOpen } = useSidebar();

  const items = {
    navMain: [
      {
        title: "",
        url: "#",
        show: true,
        items: [
          {
            title: "Analytics",
            url: "/analytics",
            icon: ClapperboardIcon,
            hasAccess: true,
            isActive: pathname.startsWith("/analytics"),
          },
          {
            title: "Organisations",
            url: "/organisations",
            icon: Building2Icon,
            hasAccess: true,
            isActive: pathname.startsWith("/organisations"),
          },
          {
            title: "Access Organisations",
            url: "/access-organisation",
            icon: DoorOpenIcon,
            hasAccess: true,
            isActive: pathname.startsWith("/access-organisation"),
          },
        ],
      },
    ],
    user: {
      name: currentUser?.data?.tenant_data?.tenant_name || "Anonymous",
      email: currentUser?.data?.tenant_data?.tenant_email,
      avatar: currentUser?.data.tenant_data?.profile_image,
    },
  };

  // Handle hover-to-expand only when currently collapsed on desktop
  const hoverExpandedRef = React.useRef(false);

  const handleMouseEnter = React.useCallback(() => {
    if (!isMobile && state === "collapsed") {
      hoverExpandedRef.current = true;
      setOpen(true);
    }
  }, [isMobile, state, setOpen]);

  const handleMouseLeave = React.useCallback(() => {
    if (!isMobile && hoverExpandedRef.current) {
      hoverExpandedRef.current = false;
      setOpen(false);
    }
  }, [isMobile, setOpen]);

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <SidebarHeader className="group-data-[collapsible=icon]:mt-2 p-0">
        <div className="flex items-start gap-2 select-none">
          <Image
            src={
              state === "collapsed"
                ? "/datareel/brand/Monogram.jpg"
                : "/datareel/brand/logo-dark.svg"
            }
            alt="DataReel Logo"
            width={256}
            height={256}
            className="rounded h-16 group-data-[collapsible=icon]:w-[calc(100%-8px)] mx-auto group-data-[collapsible=icon]:h-auto dark:block hidden"
          />
          <Image
            src={
              state === "collapsed"
                ? "/datareel/brand/Monogram.jpg"
                : "/datareel/brand/logo-light.svg"
            }
            alt="DataReel Logo"
            width={256}
            height={256}
            className="rounded h-16 group-data-[collapsible=icon]:w-[calc(100%-8px)] mx-auto group-data-[collapsible=icon]:h-auto dark:hidden block"
          />
        </div>
      </SidebarHeader>
      <SidebarContent
        className={cn(
          "flex p-0 items-center h-16 group-data-[collapsible=icon]:mt-4",
        )}
      >
        <SidebarGroup>
          <SidebarMenu className={"space-y-4"}>
            {items.navMain.map((item, menuIdx) => {
              if (!item.show) return null;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarGroupLabel className="h-auto font-semibold uppercase tracking-[0.01em]">
                    {item.title}
                  </SidebarGroupLabel>

                  <SidebarMenu className="p-2 group-data-[collapsible=icon]:p-0">
                    {item.items?.map((subItem) => {
                      if (!subItem.hasAccess) return null;
                      return (
                        <SidebarMenuItem
                          key={subItem.title}
                          className="text-medium"
                        >
                          <SidebarMenuButton
                            isActive={subItem.isActive}
                            className="group"
                            asChild
                          >
                            <Link href={subItem.url}>
                              <subItem.icon className="size-4 group-data-[active=true]:text-tremor-brand" />
                              <span className="truncate group-data-[collapsible=icon]:hidden">
                                {subItem.title}
                              </span>
                              {subItem.isActive && (
                                <ChevronRightIcon className="ml-auto" />
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>

                  {/* Show divider between groups only when collapsed (icon mode) */}
                  {menuIdx < items.navMain.length - 1 && (
                    <Separator className="mt-2 hidden bg-gray-300 group-data-[collapsible=icon]:mb-2 group-data-[collapsible=icon]:mt-4 group-data-[collapsible=icon]:block" />
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={items.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
