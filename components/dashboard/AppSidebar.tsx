"use client";

import { LogOut, UserRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import BrandLogo from "@/components/brand/BrandLogo";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import DashboardNav from "./DashboardNav";

function getInitials(name?: string | null, email?: string | null) {
  const source = name?.trim() || email?.split("@")[0] || "Member";
  const pieces = source.split(/\s+/).filter(Boolean);

  return pieces
    .slice(0, 2)
    .map((piece) => piece[0])
    .join("")
    .toUpperCase();
}

export default function AppSidebar() {
  const { data: session } = useSession();
  const displayName = session?.user?.name || "Imaginify member";
  const email = session?.user?.email || "Your workspace";

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="relative px-3 pb-2 pt-5">
        <BrandLogo
          className="min-w-0 overflow-hidden group-data-[state=collapsed]/sidebar:justify-center"
          wordmarkClassName="truncate group-data-[state=collapsed]/sidebar:hidden"
        />
        <SidebarTrigger className="absolute -right-4 top-4 hidden size-8 rounded-full bg-[#f7fbff]/90 shadow-[0_7px_20px_rgba(33,57,88,.12)] lg:grid" />
      </SidebarHeader>

      <SidebarSeparator />
      <DashboardNav />

      <SidebarFooter>
        <SidebarSeparator className="mx-0 mb-3" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Open profile">
              <Link href="/profile">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#1688ee] to-[#0060c6] text-[10px] font-bold text-white shadow-[0_7px_18px_rgba(8,118,223,.22)]">
                  {getInitials(displayName, email)}
                </span>
                <span className="min-w-0 flex-1 group-data-[state=collapsed]/sidebar:hidden">
                  <span className="block truncate text-xs font-bold text-[#24282e]">
                    {displayName}
                  </span>
                  <span className="mt-0.5 block truncate text-[10px] font-medium text-[#9299a3]">
                    {email}
                  </span>
                </span>
                <UserRound
                  size={15}
                  className="shrink-0 text-[#8d95a0] group-data-[state=collapsed]/sidebar:hidden"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/65 text-[#66717f] ring-1 ring-black/[.045]">
                <LogOut size={16} />
              </span>
              <span className="group-data-[state=collapsed]/sidebar:hidden">Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
