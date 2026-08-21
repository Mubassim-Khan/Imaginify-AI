import {
  ImagePlus,
  Layers3,
  ScanLine,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import GlassIcon from "./GlassIcon";

const editorTools = [
  { icon: Sparkles, label: "Create" },
  { icon: ImagePlus, label: "Restore" },
  { icon: ScanLine, label: "Remove" },
  { icon: Layers3, label: "Recolor" },
];

export default function ProductPreview() {
  return (
    <div
      id="product"
      className="group relative mx-auto max-w-[1060px] scroll-mt-28 overflow-hidden rounded-[22px] border border-white/90 bg-white/75 shadow-[0_35px_80px_#342d251c,0_0_0_1px_#cfc9c244] backdrop-blur-2xl transition-transform duration-700 hover:-translate-y-1"
    >
      <div className="flex h-14 items-center justify-between border-b border-[#e8e4de] bg-[#fffaf5]/75 px-5">
        <span className="flex items-center gap-1.5 text-xs font-bold text-[#0876df]">
          <Sparkles size={13} /> imaginify
        </span>
        <span className="rounded-full bg-[#121e3c] px-2 py-1 text-[9px] font-bold text-white">
          JD
        </span>
      </div>

      <div className="grid min-h-[420px] sm:grid-cols-[170px_1fr]">
        <aside className="hidden flex-col gap-2 border-r border-[#ebe8e3] bg-[#faf9f7] p-4 sm:flex">
          {editorTools.map(({ icon: Icon, label }, index) => (
            <span
              key={label}
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-colors ${
                index === 0
                  ? "bg-[#eaf4fe] text-[#0876df]"
                  : "text-[#817b75] hover:bg-white hover:text-[#4f4a45]"
              }`}
            >
              <Icon size={15} />
              {label}
            </span>
          ))}
        </aside>

        <div className="p-5 sm:p-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <small className="text-[8px] font-bold tracking-[1.3px] text-[#8a847e]">
                GENERATIVE FILL
              </small>
              <h3 className="mt-1 text-xl font-bold tracking-tight">
                Expand your imagination
              </h3>
            </div>
            <button
              type="button"
              className="rounded-full bg-[#0876df] px-4 py-2 text-[10px] text-white transition hover:bg-[#075db7] active:scale-95"
            >
              Export
            </button>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.5fr_.7fr]">
            <div className="relative min-h-72 overflow-hidden rounded-xl bg-gradient-to-br from-[#d9edf4] via-[#b9d0ca] to-[#315753]">
              <span className="absolute right-16 top-10 size-20 rounded-full bg-[#f7d99d] shadow-[0_0_45px_#f8d991] transition-transform duration-1000 group-hover:scale-110" />
              <span className="absolute -bottom-20 -left-10 h-64 w-[120%] rounded-[50%] bg-[#315753]" />
              <span className="absolute left-[45%] top-0 h-full w-px bg-white">
                <i className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md" />
              </span>
              <span className="absolute left-3 top-3 rounded bg-[#172521]/70 px-2 py-1 text-[8px] text-white backdrop-blur-md">
                Original
              </span>
              <span className="absolute right-3 top-3 rounded bg-[#172521]/70 px-2 py-1 text-[8px] text-white backdrop-blur-md">
                AI expanded
              </span>
            </div>

            <div className="rounded-xl border border-[#e9e5df] bg-[#f8f6f3] p-5">
              <GlassIcon className="bg-gradient-to-br from-[#ffe6da] to-[#ffc7b8] text-[#bd5f49]">
                <WandSparkles />
              </GlassIcon>
              <h4 className="mb-2 mt-4 text-sm font-bold">
                Describe the scene
              </h4>
              <p className="rounded-lg border border-[#e7e2dc] bg-white p-3 text-[10px] leading-4 text-[#77716b]">
                Continue the misty landscape with soft morning light
              </p>
              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#121c34] py-3 text-[10px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.12)] transition-[background-color,box-shadow] duration-300 hover:bg-[#1d2945] hover:shadow-[0_10px_28px_rgba(18,28,52,.22),inset_0_1px_0_rgba(255,255,255,.18)] active:scale-[.99]"
              >
                <Sparkles size={14} />
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
