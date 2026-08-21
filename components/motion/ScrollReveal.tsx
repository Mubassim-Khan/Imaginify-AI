"use client";

import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useInViewOnce } from "./useInViewOnce";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

const hiddenTransforms: Record<RevealDirection, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  none: "translate-y-0",
};

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const { elementRef, isVisible } = useInViewOnce<HTMLDivElement>();
  const style = { transitionDelay: `${delay}ms` } as CSSProperties;

  return (
    <div
      ref={elementRef}
      style={style}
      className={cn(
        "transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:blur-none",
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100 blur-none"
          : cn("opacity-0 blur-[2px]", hiddenTransforms[direction]),
        className,
      )}
    >
      {children}
    </div>
  );
}
