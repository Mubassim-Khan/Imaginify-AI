import { Sparkles } from "lucide-react";

const circularCopy = "TRUSTED BY \u2022 USED BY TEAMS \u2022 ".split("");

export default function CircularTrustBadge() {
  return (
    <div className="relative mx-auto size-28" aria-label="Trusted and used by creative teams">
      <div className="absolute inset-0 motion-safe:animate-[spin_30s_linear_infinite]">
        {circularCopy.map((character, index) => (
          <span
            aria-hidden="true"
            key={`${character}-${index}`}
            className="absolute left-1/2 top-1/2 text-[7px] font-bold tracking-wide text-[#78716a]"
            style={{
              transform: `translate(-50%, -50%) rotate(${(360 / circularCopy.length) * index}deg) translateY(-47px)`,
            }}
          >
            {character === " " ? "\u00A0" : character}
          </span>
        ))}
      </div>
      <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white bg-[#eaf5ff] text-[#0876df] shadow-[0_10px_25px_rgba(8,118,223,.15)]">
        <Sparkles size={21} />
      </span>
    </div>
  );
}
