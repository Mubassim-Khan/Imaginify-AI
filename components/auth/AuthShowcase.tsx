import { Check, Sparkles } from "lucide-react";

import BrandLogo from "@/components/brand/BrandLogo";

const benefits = [
  "20 free credits to get started",
  "Professional high-resolution exports",
  "No credit card required",
];

export default function AuthShowcase() {
  return (
    <section className="relative hidden min-h-screen overflow-hidden bg-[#213183] px-[6vw] py-10 text-white lg:flex lg:flex-col">
      <BrandLogo className="inline-flex" inverted />

      <div className="relative z-10 my-auto max-w-[540px]">
        <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[1.3px] text-[#8cc9ff]">
          <Sparkles size={13} />
          AI CREATIVE WORKSPACE
        </span>
        <h1 className="my-6 text-7xl font-bold leading-[.94] tracking-[-4px]">
          Make room for
          <br />
          <em className="not-italic text-[#83c8ff]">remarkable.</em>
        </h1>
        <p className="max-w-lg text-base leading-7 text-[#d1d7f0]">
          One calm, focused place to restore, transform, and create images that
          move your work forward.
        </p>
        <ul className="mt-7 grid gap-3">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-center gap-2.5 text-xs text-[#e5e8f7]"
            >
              <Check
                className="rounded-full bg-white/10 p-[3px] text-[#8fd5bf]"
                size={16}
              />
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute -bottom-28 -right-36 size-[420px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#62aef0,#0876df_35%,#391c57_74%)] shadow-[0_0_100px_#62aef055]" />
      <div className="absolute bottom-24 right-48 w-48 -rotate-6 rounded-[22px] border border-white/25 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <Sparkles className="text-[#9ed4ff]" />
        <small className="mt-8 block text-[#cfd6ef]">AI transformation</small>
        <strong className="mt-1 block text-sm">Ready in seconds</strong>
      </div>
      <p className="relative z-10 text-[10px] text-[#aeb7dd]">
        &ldquo;The fastest route from raw image to polished creative.&rdquo;
      </p>
    </section>
  );
}
