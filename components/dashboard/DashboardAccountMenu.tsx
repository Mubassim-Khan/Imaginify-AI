"use client";

import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function getInitial(name?: string | null, email?: string | null) {
  return (name?.trim()?.[0] || email?.trim()?.[0] || "I").toUpperCase();
}

const providerLabels = {
  credentials: "Email & password",
  github: "GitHub",
  google: "Google",
} as const;

export default function DashboardAccountMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const provider = session?.user?.authProvider;

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open account menu"
        onClick={() => setOpen((current) => !current)}
        className="flex h-10 items-center gap-1 rounded-2xl bg-gradient-to-br from-[#1688ee] to-[#0060c6] pl-3 pr-2 text-xs font-bold text-white shadow-[0_8px_22px_rgba(8,118,223,.22)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1688ee]/35 focus-visible:ring-offset-2 motion-reduce:transform-none"
      >
        <span className="grid size-5 place-items-center">
          {getInitial(session?.user?.name, session?.user?.email)}
        </span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Account options"
          className="absolute right-0 top-[calc(100%+.65rem)] z-50 w-[min(18rem,calc(100vw-2rem))] origin-top-right rounded-[22px] bg-white/[.84] p-2.5 shadow-[0_22px_60px_rgba(28,49,76,.18),inset_0_1px_0_rgba(255,255,255,.9)] ring-1 ring-black/[.065] backdrop-blur-[24px] backdrop-saturate-[155%] animate-in fade-in-0 zoom-in-95 duration-150"
        >
          <div className="rounded-2xl bg-[#edf6ff]/70 px-3.5 py-3 ring-1 ring-inset ring-white/80">
            <p className="truncate text-sm font-bold text-[#24282e]">
              {session?.user?.name || "Imaginify member"}
            </p>
            <p className="mt-1 truncate text-xs text-[#77808c]">
              {session?.user?.email || "Your workspace"}
            </p>
            {provider && (
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[.1em] text-[#0876df]">
                Signed in with {providerLabels[provider]}
              </p>
            )}
          </div>

          <div className="mt-2 grid gap-1">
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex h-11 items-center gap-3 rounded-2xl px-3 text-sm font-semibold text-[#4f5864] transition hover:bg-[#edf6ff] hover:text-[#0876df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1688ee]/30"
            >
              <UserRound size={17} />
              View profile
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex h-11 w-full items-center gap-3 rounded-2xl px-3 text-left text-sm font-semibold text-[#b13a42] transition hover:bg-[#fff0f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d75b63]/30"
            >
              <LogOut size={17} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
