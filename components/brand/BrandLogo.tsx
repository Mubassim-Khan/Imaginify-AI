import { Sparkles } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  inverted?: boolean;
  wordmarkClassName?: string;
};

export default function BrandLogo({
  className,
  inverted = false,
  wordmarkClassName,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Imaginify home"
      className={cn(
        "flex items-center gap-2.5 text-xl font-bold tracking-[-.65px]",
        inverted ? "text-white" : "text-[#11100f]",
        className,
      )}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#1688ee] to-[#0060c6] text-white shadow-[0_7px_18px_#0876df30]">
        <Sparkles size={17} />
      </span>
      <span className={cn("brand-wordmark", wordmarkClassName)}>imaginify</span>
    </Link>
  );
}
