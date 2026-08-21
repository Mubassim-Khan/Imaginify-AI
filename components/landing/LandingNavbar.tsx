"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import BrandLogo from "@/components/brand/BrandLogo";
import { navigationLinks } from "./content";
import GlassAction from "./GlassAction";

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let animationFrame: number | null = null;
    lastScrollY.current = window.scrollY;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      setIsScrolled(currentScrollY > 18);

      if (currentScrollY < 120 || isMenuOpen) {
        setIsVisible(true);
      } else if (scrollDelta > 2) {
        setIsVisible(false);
      } else if (scrollDelta < -2) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
      animationFrame = null;
    };

    const handleScroll = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateNavbar);
      }
    };

    updateNavbar();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, [isMenuOpen]);

  const shouldShowNavbar = isVisible || isMenuOpen;

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        "fixed left-1/2 top-2.5 z-50 w-[calc(100%-20px)] max-w-[1180px] origin-top -translate-x-1/2 rounded-[22px] backdrop-blur-[18px] backdrop-saturate-[1.4] will-change-[transform,opacity,filter] transition-[opacity,background-color,box-shadow,transform,filter] duration-500 motion-reduce:transition-none focus-within:pointer-events-auto focus-within:translate-y-0 focus-within:scale-100 focus-within:opacity-100 focus-within:blur-0 sm:top-[18px] sm:w-[calc(100%-48px)] sm:rounded-full",
        shouldShowNavbar
          ? "translate-y-0 scale-100 opacity-100 blur-0 ease-[cubic-bezier(.16,1,.3,1)]"
          : "pointer-events-none -translate-y-[145%] scale-[.96] opacity-0 blur-[8px] ease-[cubic-bezier(.4,0,1,1)]",
        isScrolled
          ? "bg-white/[.72] shadow-[0_14px_38px_rgba(36,31,25,.12)]"
          : "bg-white/[.56] shadow-[0_8px_30px_rgba(36,31,25,.07)]",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[22px] bg-[linear-gradient(110deg,rgba(255,255,255,.28),rgba(255,255,255,.06)_45%,rgba(225,240,255,.16))] transition-opacity duration-500 motion-reduce:transition-none sm:rounded-full",
          shouldShowNavbar ? "opacity-100 delay-100" : "opacity-30 delay-0",
        )}
      />

      <div
        className={cn(
          "relative flex h-14 items-center justify-between px-3 transition-[opacity,transform] duration-500 motion-reduce:transition-none sm:h-[62px] sm:px-[18px]",
          shouldShowNavbar
            ? "translate-y-0 opacity-100 delay-75"
            : "-translate-y-2 opacity-0 delay-0",
        )}
      >
        <BrandLogo />

        <div className="hidden items-center gap-8 lg:flex">
          {navigationLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="relative py-2 text-sm font-medium text-[#4e4a46] transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-[#0876df] after:transition-all hover:text-[#0876df] hover:after:w-full"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/sign-in"
            className="hidden text-sm font-medium text-[#4e4a46] transition-colors hover:text-[#0876df] sm:block"
          >
            Log in
          </Link>
          <GlassAction
            href="/sign-up"
            className="hidden h-10 px-4 text-xs sm:inline-flex rounded-full"
          >
            Start Creating <ArrowRight size={14} />
          </GlassAction>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-full border border-black/[.06] bg-white/55 text-[#26221f] transition hover:bg-white lg:hidden"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "relative grid overflow-hidden px-3 transition-[grid-template-rows,opacity,padding] duration-300 lg:hidden",
          isMenuOpen
            ? "grid-rows-[1fr] pb-3 opacity-100"
            : "grid-rows-[0fr] pb-0 opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className="grid gap-1 border-t border-black/[.06] pt-3">
            {navigationLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-[#4e4a46] transition hover:bg-white/65 hover:text-[#0876df]"
              >
                {label}
              </a>
            ))}
            <GlassAction
              href="/sign-up"
              className="mt-2 h-11 w-full px-4 text-xs"
            >
              Start Creating <ArrowRight size={14} />
            </GlassAction>
          </div>
        </div>
      </div>
    </nav>
  );
}
