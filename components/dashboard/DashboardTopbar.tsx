"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import BrandLogo from "@/components/brand/BrandLogo";
import { SidebarTrigger } from "@/components/ui/sidebar";

import DashboardAccountMenu from "./DashboardAccountMenu";
import { getDashboardPageTitle } from "./navigation";

export default function DashboardTopbar() {
  const pathname = usePathname();
  const title = getDashboardPageTitle(pathname);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5 lg:px-6">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center gap-3 rounded-[22px] bg-white/[.62] px-3 shadow-[0_16px_44px_rgba(35,57,86,.1),inset_0_1px_0_rgba(255,255,255,.75)] ring-1 ring-black/[.055] backdrop-blur-[22px] backdrop-saturate-[150%] sm:px-4">
        <SidebarTrigger className="lg:hidden" />
        <BrandLogo
          className="sm:hidden"
          wordmarkClassName="text-[18px]"
        />
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-[10px] font-bold uppercase tracking-[.14em] text-[#9aa1aa]">
            Imaginify workspace
          </p>
          <p className="mt-0.5 truncate text-sm font-bold tracking-[-.2px] text-[#20242a]">
            {title}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/credits"
            className="hidden h-10 items-center gap-2 rounded-2xl bg-[#e8f4ff]/75 px-3 text-xs font-bold text-[#0876df] shadow-[inset_0_1px_0_rgba(255,255,255,.8)] ring-1 ring-[#0876df]/10 transition hover:bg-[#dcefff] sm:flex"
          >
            <Sparkles size={15} />
            Get credits
          </Link>
          <DashboardAccountMenu />
        </div>
      </div>
    </header>
  );
}
