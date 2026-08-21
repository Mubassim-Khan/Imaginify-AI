import { Eraser, ImagePlus, Layers3, Sparkles } from "lucide-react";

import AnimatedWords from "@/components/motion/AnimatedWords";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { workflowSteps } from "./content";
import GlassIcon from "./GlassIcon";

export default function WorkflowSection() {
  return (
    <section className="mx-auto grid max-w-[1180px] items-center gap-16 px-5 py-24 sm:px-6 lg:grid-cols-2">
      <div>
        <ScrollReveal>
          <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-[#0876df]">
            Built for momentum
          </span>
        </ScrollReveal>
        <h2 className="my-4 text-4xl font-bold leading-none tracking-[-2px] sm:text-6xl">
          <AnimatedWords
            wordDelay={38}
            segments={[{ text: "From upload to done in three simple steps." }]}
          />
        </h2>
        <ScrollReveal delay={160}>
          <p className="text-base leading-7 text-[#6b6661]">
            No prompt engineering. No complex controls. Just a fluid workflow
            that gets out of your way.
          </p>
        </ScrollReveal>

        <div className="mt-8 divide-y divide-[#dedad4] border-y border-[#dedad4]">
          {workflowSteps.map((step, index) => (
            <ScrollReveal key={step.number} delay={180 + index * 90}>
              <div className="group grid grid-cols-[38px_1fr] gap-4 py-4">
                <span className="grid size-8 place-items-center rounded-full bg-[#e8f3fd] text-[9px] font-bold text-[#0876df] transition duration-300 group-hover:scale-110 group-hover:bg-[#0876df] group-hover:text-white">
                  {step.number}
                </span>
                <p className="text-xs leading-5 text-[#77716b]">
                  <strong className="block text-sm text-[#1a1817]">
                    {step.title}
                  </strong>
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ScrollReveal direction="left" delay={120}>
        <div className="group relative grid h-[460px] place-items-center overflow-hidden rounded-[28px] border border-white bg-[radial-gradient(circle,#fff_0,#f0f7fc_57%,#e8f2fa_100%)] shadow-[0_24px_70px_rgba(41,78,106,.13)]">
          <div className="absolute size-72 rounded-full border border-[#9bbfdd]/40 transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute size-[420px] rounded-full border border-[#9bbfdd]/30 transition-transform duration-1000 group-hover:scale-95" />
          <span className="relative grid size-24 place-items-center rounded-3xl bg-[#0876df] text-white shadow-xl transition duration-500 group-hover:rotate-3 group-hover:scale-105">
            <Sparkles size={30} />
          </span>
          <span className="absolute left-[20%] top-[18%] transition duration-700 group-hover:-translate-y-2 group-hover:translate-x-1">
            <GlassIcon>
              <ImagePlus />
            </GlassIcon>
          </span>
          <span className="absolute right-[16%] top-[30%] transition duration-700 group-hover:-translate-x-2 group-hover:translate-y-1">
            <GlassIcon className="bg-[#ffe6da] text-[#bd5f49]">
              <Eraser />
            </GlassIcon>
          </span>
          <span className="absolute bottom-[15%] left-[18%] transition duration-700 group-hover:-translate-x-1 group-hover:-translate-y-2">
            <GlassIcon className="bg-[#dff4e9] text-[#267e63]">
              <Layers3 />
            </GlassIcon>
          </span>
        </div>
      </ScrollReveal>
    </section>
  );
}
