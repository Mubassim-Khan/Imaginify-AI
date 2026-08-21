import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlassIconProps = {
  children: ReactNode;
  className?: string;
};

export default function GlassIcon({ children, className }: GlassIconProps) {
  return (
    <span
      className={cn(
        "grid size-12 place-items-center rounded-2xl border border-white/80 bg-[#eaf5ff] text-[#0876df] shadow-[0_10px_24px_#44392b18] backdrop-blur-xl [&>svg]:size-5",
        className,
      )}
    >
      {children}
    </span>
  );
}
