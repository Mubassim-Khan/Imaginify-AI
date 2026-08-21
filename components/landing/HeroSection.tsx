import { ArrowRight, Play } from "lucide-react";

import AnimatedWords from "@/components/motion/AnimatedWords";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Threads from "@/components/react-bits/Threads";
import GlassAction from "./GlassAction";

export default function HeroSection() {
  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#fff_0,#fbfaf8_48%,#f4f1ed_100%)] px-5 pb-28 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] opacity-[.34] mix-blend-multiply [mask-image:linear-gradient(to_bottom,#000_0%,#000_66%,transparent_100%)]">
        <Threads
          color={[0.035, 0.463, 0.875]}
          amplitude={1.15}
          distance={0.32}
          speed={0.72}
          className="scale-110"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.22)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20 [mask-image:radial-gradient(circle_at_center,#000,transparent_72%)]" />

      <div className="relative z-10 mx-auto max-w-[850px] text-center">
        <ScrollReveal>
          <div className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-[#d8e9f9] bg-white/65 px-4 text-[10px] font-bold uppercase tracking-[1.35px] text-[#0876df] shadow-sm backdrop-blur-xl">
            <span className="size-2 shrink-0 rounded-full bg-[#1688ee] shadow-[0_0_0_4px_#1688ee1a]" />
            <span className="relative top-px leading-none">
              AI creative workspace for modern teams
            </span>
          </div>
        </ScrollReveal>

        <h1 className="mx-auto my-6 max-w-[820px] text-5xl font-bold leading-[.98] tracking-[-3px] sm:text-7xl sm:tracking-[-5px] lg:text-[82px]">
          <AnimatedWords
            segments={[
              { text: "Turn ordinary images into" },
              { text: "remarkable work.", className: "text-[#0876df]" },
            ]}
          />
        </h1>

        <ScrollReveal delay={340}>
          <p className="mx-auto max-w-[630px] text-base leading-7 text-[#68635e] sm:text-lg">
            Restore, transform, and reimagine your visuals with one focused AI
            workspace. Beautiful results, without the complicated workflow.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={430}>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <GlassAction href="/sign-up">
              Create for free <ArrowRight size={17} />
            </GlassAction>
            <GlassAction href="#product" variant="glass">
              <span className="grid size-6 place-items-center rounded-full bg-[#e7f3ff] text-[#0876df]">
                <Play size={12} fill="currentColor" />
              </span>
              See how it works
            </GlassAction>
          </div>
          <p className="mt-5 text-xs text-[#716c67]">
            Loved by 12,000+ creative teams
            <span
              className="ml-2 tracking-wider text-[#f19b35]"
              aria-label="5 out of 5 stars"
            >
              {"\u2605\u2605\u2605\u2605\u2605"}
            </span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
