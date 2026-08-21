import { Images, Sparkles, WandSparkles } from "lucide-react";

import TransformationLauncher from "./TransformationLauncher";

type StudioHeroProps = {
  creationCount: number;
  displayName?: string | null;
};

export default function StudioHero({
  creationCount,
  displayName,
}: StudioHeroProps) {
  const firstName = displayName?.trim().split(/\s+/)[0];

  return (
    <section className="relative isolate overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#17255d_0%,#183977_48%,#0876df_115%)] px-5 py-7 text-white shadow-[0_28px_70px_rgba(25,40,92,.19)] ring-1 ring-inset ring-white/10 sm:px-7 sm:py-9 lg:px-10 lg:py-10">
      <div
        aria-hidden="true"
        className="absolute -right-28 -top-36 size-80 rounded-full bg-[#62aef0]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-44 left-[26%] size-72 rounded-full bg-[#d6b6f6]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.08),transparent_32%,transparent_72%,rgba(255,255,255,.04))]"
      />

      <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/[.09] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[1.25px] text-[#aadaff] ring-1 ring-inset ring-white/[.12] backdrop-blur-xl">
            <Sparkles size={13} />
            AI creative workspace
          </span>
          <h1 className="mt-5 max-w-3xl text-[38px] font-bold leading-[.98] tracking-[-2.2px] sm:text-5xl lg:text-[54px] lg:tracking-[-3px]">
            {firstName ? `${firstName}, what will you` : "What will you"}
            <span className="block text-[#b9dcff]">reimagine today?</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#d4def0] sm:text-[15px]">
            Start with one of five focused AI tools, then refine and save the
            result in your private creative workspace.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 md:justify-end">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/[.09] px-3.5 py-2 text-xs font-medium text-white/85 ring-1 ring-inset ring-white/[.12] backdrop-blur-xl">
            <WandSparkles size={14} className="text-[#9ed4ff]" />
            5 AI tools
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/[.09] px-3.5 py-2 text-xs font-medium text-white/85 ring-1 ring-inset ring-white/[.12] backdrop-blur-xl">
            <Images size={14} className="text-[#9ed4ff]" />
            {creationCount} {creationCount === 1 ? "creation" : "creations"}
          </span>
        </div>
      </div>

      <TransformationLauncher />
    </section>
  );
}
