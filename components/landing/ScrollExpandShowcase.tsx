import { Sparkles } from "lucide-react";

import ScrollExpand from "@/components/react-bits/ScrollExpand";
import GlassAction from "./GlassAction";

export default function ScrollExpandShowcase() {
  return (
    <section
      id="product"
      aria-label="Imaginify transformation showcase"
      className="relative scroll-mt-20 bg-[#11182f]"
    >
      <ScrollExpand
        src="/assets/images/imaginify-scroll-hero.webp"
        alt="A coastal landscape transforming from a muted original into a richly finished creative"
        title="See the ordinary become remarkable."
        scrollHint="Scroll to expand the canvas"
        startWidth={44}
        startHeight={62}
        startRadius={28}
        endRadius={0}
        mediaZoom={1.22}
        scrollDistance={1.05}
        holdDistance={0.28}
        smoothing={0.12}
        overlayScrim={0.5}
        useWindowScroll
      >
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[1.4px] text-[#b9ddff] backdrop-blur-xl">
          <Sparkles size={13} /> One focused creative workspace
        </span>
        <h2 className="max-w-3xl text-4xl font-bold leading-none tracking-[-2px] text-white sm:text-6xl sm:tracking-[-3px]">
          Transform the whole frame, without losing the feeling.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
          Imaginify restores detail, extends scenes, and removes distractions
          while keeping light, texture, and perspective beautifully coherent.
        </p>
        <GlassAction href="/sign-up" variant="light" className="mt-7">
          Try it with your image
        </GlassAction>
      </ScrollExpand>
    </section>
  );
}
