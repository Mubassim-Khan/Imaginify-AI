import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { studioTools } from "./transformationTools";

export default function TransformationLauncher() {
  return (
    <div className="relative z-10 mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {studioTools.map(({ description, icon: Icon, label, route }, index) => (
        <Link
          key={route}
          href={route}
          aria-label={`Open ${label}`}
          className={`group relative min-h-40 overflow-hidden rounded-[20px] bg-white/[.09] p-4 ring-1 ring-inset ring-white/[.13] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[.15] hover:ring-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fd0ff] ${
            index === studioTools.length - 1
              ? "sm:col-span-2 lg:col-span-1"
              : ""
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-white/[.92] text-[#0876df] shadow-[0_10px_24px_rgba(6,32,76,.22)] transition duration-300 group-hover:scale-105 group-hover:rotate-[-3deg]">
              <Icon size={19} strokeWidth={1.9} />
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="text-white/45 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#9ed4ff]"
              size={17}
            />
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-semibold tracking-[-.2px] text-white">
              {label}
            </h2>
            <p className="mt-1.5 text-xs leading-5 text-[#cbd7ed]">
              {description}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="absolute -bottom-10 -right-8 size-24 rounded-full bg-[#62aef0]/0 blur-2xl transition duration-300 group-hover:bg-[#62aef0]/20"
          />
        </Link>
      ))}
    </div>
  );
}
