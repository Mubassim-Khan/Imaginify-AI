"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { useInViewOnce } from "./useInViewOnce";

type TextSegment = {
  text: string;
  className?: string;
};

type AnimatedWordsProps = {
  segments: TextSegment[];
  className?: string;
  wordDelay?: number;
};

export default function AnimatedWords({
  segments,
  className,
  wordDelay = 55,
}: AnimatedWordsProps) {
  const { elementRef, isVisible } = useInViewOnce<HTMLSpanElement>(
    "0px 0px -5%",
  );
  const accessibleText = segments.map(({ text }) => text).join(" ");
  let wordIndex = 0;

  return (
    <span ref={elementRef} aria-label={accessibleText} className={className}>
      {segments.map((segment) =>
        segment.text.split(" ").map((word) => {
          const delay = wordIndex++ * wordDelay;
          return (
            <span
              aria-hidden="true"
              className="mr-[.22em] inline-block overflow-hidden align-bottom"
              key={`${word}-${delay}`}
            >
              <span
                style={{ transitionDelay: `${delay}ms` } as CSSProperties}
                className={cn(
                  "inline-block transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:blur-none",
                  isVisible
                    ? "translate-y-0 opacity-100 blur-none"
                    : "translate-y-[115%] opacity-0 blur-[3px]",
                  segment.className,
                )}
              >
                {word}
              </span>
            </span>
          );
        }),
      )}
    </span>
  );
}
