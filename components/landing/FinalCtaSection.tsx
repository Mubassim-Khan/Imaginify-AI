import { ArrowRight, Sparkles } from "lucide-react";

import AnimatedWords from "@/components/motion/AnimatedWords";
import ScrollReveal from "@/components/motion/ScrollReveal";
import GlassAction from "./GlassAction";

export default function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-[1180px] px-5 py-24 sm:px-6">
      <ScrollReveal>
        <div className="group relative overflow-hidden rounded-[30px] bg-[#0876df] px-6 py-20 text-center text-white shadow-[0_30px_80px_rgba(8,118,223,.2)]">
          <div className="absolute -left-40 -top-40 size-80 rounded-full bg-[#8fd0ff]/20 blur-sm transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute -bottom-52 -right-52 size-[420px] rounded-full bg-[#213183]/40 blur-sm transition-transform duration-1000 group-hover:scale-110" />
          <div className="relative">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
              <Sparkles />
            </span>
            <h2 className="my-5 text-4xl font-bold leading-none tracking-[-2px] sm:text-6xl">
              <AnimatedWords
                wordDelay={45}
                segments={[{ text: "Your next best image is one click away." }]}
              />
            </h2>
            <p className="text-sm text-[#dceeff]">
              Start with 20 free credits. No credit card, no complicated setup.
            </p>
            <GlassAction
              href="/sign-up"
              variant="light"
              className="mx-auto mt-8 w-max"
            >
              Start creating free <ArrowRight size={17} />
            </GlassAction>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
