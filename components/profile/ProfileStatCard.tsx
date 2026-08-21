import type { LucideIcon } from "lucide-react";

type ProfileStatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  detail: string;
};

export default function ProfileStatCard({
  icon: Icon,
  label,
  value,
  detail,
}: ProfileStatCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[24px] bg-white/58 p-5 shadow-[0_20px_55px_rgba(25,48,77,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-inset ring-white/55 backdrop-blur-2xl md:p-6">
      <div className="pointer-events-none absolute -right-10 -top-12 size-32 rounded-full bg-[#68b6ff]/16 blur-3xl transition duration-500 group-hover:bg-[#68b6ff]/24" />
      <div className="relative flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-medium text-[#607084]">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#142235] md:text-4xl">
            {value}
          </p>
          <p className="mt-2 text-xs leading-5 text-[#7b8797]">{detail}</p>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(220,239,255,0.72))] text-[#0876df] shadow-[0_12px_28px_rgba(8,118,223,0.13),inset_0_1px_0_white] ring-1 ring-inset ring-white/80">
          <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
        </span>
      </div>
    </article>
  );
}
