"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { dashboardNavGroups } from "./navigation";

function isNavigationItemActive(pathname: string, route: string) {
  if (route === "/studio") return pathname === route;
  if (route === "/profile" || route === "/credits") return pathname.startsWith(route);
  return pathname === route;
}

export default function DashboardNav() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarContent>
      {dashboardNavGroups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => {
              const isActive = isNavigationItemActive(pathname, item.route);
              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.route}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                  >
                    <Link
                      href={item.route}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setOpenMobile(false)}
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/65 text-[#66717f] shadow-[inset_0_1px_0_rgba(255,255,255,.8)] ring-1 ring-black/[.045] transition group-data-[active=true]/menu-button:bg-[#0876df] group-data-[active=true]/menu-button:text-white group-data-[state=collapsed]/sidebar:size-9">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                      <span className="truncate group-data-[state=collapsed]/sidebar:hidden">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
