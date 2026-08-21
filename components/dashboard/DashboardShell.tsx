"use client";

import { usePathname } from "next/navigation";

import { Toaster } from "@/components/ui/toaster";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import AppSidebar from "./AppSidebar";
import DashboardTopbar from "./DashboardTopbar";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") return <>{children}</>;

  return (
    <SidebarProvider className="relative isolate overflow-x-clip bg-[#f4f7fa] text-[#20242a]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_90%_5%,rgba(111,184,244,.28),transparent_28%),radial-gradient(circle_at_28%_95%,rgba(173,224,205,.24),transparent_30%),radial-gradient(circle_at_52%_38%,rgba(221,209,243,.2),transparent_25%),linear-gradient(135deg,#f7f8f7_0%,#f1f6fa_48%,#f7f5f1_100%)]"
      />
      <AppSidebar />
      <SidebarInset>
        <DashboardTopbar />
        <div className="mx-auto w-full max-w-[1440px] px-3 pb-10 pt-6 text-base sm:px-5 lg:px-8 lg:pt-8">
          {children}
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
