import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type GlassActionProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "glass" | "light" | "dark";
};

const variants = {
  primary:
    "border-white/25 bg-[linear-gradient(135deg,#1590f3_0%,#0876df_55%,#075db7_100%)] text-white shadow-[0_12px_32px_rgba(8,118,223,.28),inset_0_1px_0_rgba(255,255,255,.35)] hover:shadow-[0_14px_38px_rgba(8,118,223,.38),inset_0_1px_0_rgba(255,255,255,.45)]",
  glass:
    "border-white/80 bg-white/55 text-[#25211e] shadow-[0_10px_30px_rgba(45,39,32,.1),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-xl hover:bg-white/75 hover:shadow-[0_12px_34px_rgba(45,39,32,.14),inset_0_1px_0_white]",
  light:
    "border-white/80 bg-white/85 text-[#0876df] shadow-[0_14px_36px_rgba(12,42,76,.2),inset_0_1px_0_white] backdrop-blur-xl hover:bg-white",
  dark:
    "border-white/15 bg-[#111d38]/85 text-white shadow-[0_12px_30px_rgba(7,15,33,.25),inset_0_1px_0_rgba(255,255,255,.16)] backdrop-blur-xl hover:bg-[#172747]/90",
};

export default function GlassAction({
  href,
  children,
  className,
  variant = "primary",
}: GlassActionProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative isolate inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-semibold transition-[background-color,box-shadow,border-color] duration-500 before:absolute before:inset-y-0 before:left-[-55%] before:w-1/3 before:skew-x-[-22deg] before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent before:opacity-0 before:transition-[left,opacity] before:duration-700 hover:before:left-[125%] hover:before:opacity-100 active:scale-[.985]",
        variants[variant],
        className,
      )}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </Link>
  );
}
