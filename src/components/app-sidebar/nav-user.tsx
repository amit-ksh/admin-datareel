"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useGlobalAuthContext } from "@/providers/auth-provider";

interface NavUserProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}
export function NavUser({ user }: NavUserProps) {
  const { logoutUser, isLogoutPending } = useGlobalAuthContext();
  const { isMobile, changePopoverOpen } = useSidebar();

  return (
    <SidebarMenu className="flex items-center justify-center">
      <SidebarMenuItem className="w-full">
        <DropdownMenu onOpenChange={changePopoverOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="bg-gray-50 w-full hover:bg-gray-50 data-[state=open]:bg-gray-50 data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center"
            >
              <Avatar className="size-8 overflow-hidden rounded-full">
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                  width={256}
                  height={256}
                />
                <AvatarFallback className="overflow-hidden rounded-full">
                  {user.name.charAt(0) + user.name.charAt(1)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-white"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="group cursor-pointer hover:bg-destructive/20 focus:bg-destructive/20 focus-visible:bg-destructive/20 hover:text-destructive  focus:text-destructive focus-visible:outline-destructive"
              onClick={logoutUser}
              disabled={isLogoutPending}
            >
              <LogOut className="group:hover:text-destructive group:focus:text-destructive" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
