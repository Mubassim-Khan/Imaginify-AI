import { Eraser, ScanLine, WandSparkles } from "lucide-react";
import Image from "next/image";

import ScrollReveal from "@/components/motion/ScrollReveal";
import GlassIcon from "./GlassIcon";
import SectionHeading from "./SectionHeading";

export default function FeaturesSection() {
  return (
    <section id="solutions" className="mx-auto max-w-[1180px] scroll-mt-24 px-5 py-28 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="Everything you need"
        title={
          <>
            A complete creative toolkit.
            <br />
            None of the clutter.
          </>
        }
        description="Focused AI tools that turn everyday image work into a fast, consistent, and genuinely enjoyable process."
        className="mb-14"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <ScrollReveal className="md:col-span-2">
          <article className="group grid overflow-hidden rounded-[24px] border border-[#d8e8f5] bg-[#edf6fe] p-8 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(46,95,133,.12)] md:grid-cols-2 md:p-12">
            <div>
              <GlassIcon>
                <WandSparkles />
              </GlassIcon>
              <h3 className="mb-3 mt-5 text-3xl font-bold tracking-tight">
                Generate beyond the frame
              </h3>
              <p className="max-w-md text-sm leading-6 text-[#615d59]">
                Expand any composition naturally. Imaginify understands context,
                light, and perspective so every extension feels intentional.
              </p>
            </div>
            <div className="mt-8 grid min-h-64 place-items-center rounded-2xl border border-dashed border-[#78afe0] bg-white/50 md:mt-0">
              <div className="relative h-48 w-[78%] overflow-hidden rounded-xl border border-white/70 shadow-xl transition-transform duration-700 group-hover:scale-[1.025]">
                <Image
                  src="/assets/images/toolkit-expand.webp"
                  alt="A coastal photograph naturally expanded beyond its original crop"
                  fill
                  sizes="(min-width: 768px) 380px, 70vw"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-[#101a31]/55 px-2.5 py-1 text-[8px] font-semibold text-white backdrop-blur-lg">
                  Context-aware expansion
                </span>
              </div>
            </div>
          </article>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <article className="group relative min-h-[380px] overflow-hidden rounded-[24px] border border-[#f0d7ca] bg-[#fff1e9] p-8 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(139,78,51,.1)]">
            <GlassIcon className="bg-gradient-to-br from-[#fff8f3] to-[#ffc9b5] text-[#bd5f49]">
              <Eraser />
            </GlassIcon>
            <h3 className="mb-2 mt-5 text-2xl font-bold">Remove the unwanted</h3>
            <p className="max-w-sm text-sm leading-6 text-[#615d59]">
              Erase objects and distractions while AI rebuilds the scene behind
              them.
            </p>
            <div className="absolute -bottom-14 left-8 right-8 h-52 overflow-hidden rounded-[20px] border-8 border-white/40 shadow-xl transition-transform duration-700 group-hover:-translate-y-2">
              <Image
                src="/assets/images/toolkit-remove.webp"
                alt="A distracting blue bottle selected for removal from a styled interior"
                fill
                sizes="(min-width: 768px) 520px, 80vw"
                className="object-cover object-[50%_69%]"
              />
              <span className="absolute left-1/2 top-[61%] h-[34%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-white/95 bg-white/5 shadow-[0_0_0_10px_rgba(255,255,255,.09),0_8px_30px_rgba(35,41,74,.2)] backdrop-blur-[1px]" />
              <span className="absolute bottom-3 right-3 rounded-full border border-white/45 bg-white/65 px-2.5 py-1 text-[8px] font-semibold text-[#70493d] shadow-sm backdrop-blur-xl">
                Select &amp; erase
              </span>
            </div>
          </article>
        </ScrollReveal>

        <ScrollReveal delay={190}>
          <article className="group relative min-h-[380px] overflow-hidden rounded-[24px] border border-[#cfe5d9] bg-[#e9f4ee] p-8 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(45,111,84,.1)]">
            <GlassIcon className="bg-gradient-to-br from-[#f7fff9] to-[#bfe8d5] text-[#267e63]">
              <ScanLine />
            </GlassIcon>
            <h3 className="mb-2 mt-5 text-2xl font-bold">Bring details back</h3>
            <p className="max-w-sm text-sm leading-6 text-[#615d59]">
              Recover texture, clarity, and color from old or low-quality images
              in seconds.
            </p>
            <div className="absolute -bottom-14 left-8 right-8 h-52 overflow-hidden rounded-[20px] border-8 border-white/40 shadow-xl transition-transform duration-700 group-hover:-translate-y-2">
              <Image
                src="/assets/images/toolkit-restore.webp"
                alt="A restored vintage portrait with recovered color and texture"
                fill
                sizes="(min-width: 768px) 520px, 80vw"
                className="object-cover object-center saturate-110"
              />
              <Image
                src="/assets/images/toolkit-restore.webp"
                alt=""
                fill
                sizes="(min-width: 768px) 520px, 80vw"
                className="object-cover object-center grayscale contrast-75 sepia-[.2] blur-[.35px] [clip-path:inset(0_50%_0_0)]"
              />
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/90 shadow-[0_0_18px_white]" />
              <span className="absolute bottom-3 left-3 rounded-full border border-white/35 bg-black/30 px-2 py-1 text-[8px] font-semibold text-white backdrop-blur-lg">
                Before
              </span>
              <span className="absolute bottom-3 right-3 rounded-full border border-white/45 bg-white/70 px-2 py-1 text-[8px] font-semibold text-[#255e4d] backdrop-blur-lg">
                Restored
              </span>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
