import { ArrowLeft, Coins } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TransformationPageHeaderProps = {
  creditBalance?: number;
  icon: string;
  mode: "Create" | "Edit" | "Result";
  subtitle: string;
  title: string;
};

export default function TransformationPageHeader({
  creditBalance,
  icon,
  mode,
  subtitle,
  title,
}: TransformationPageHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-[28px] bg-white/60 p-6 shadow-[0_24px_65px_rgba(43,54,116,0.09)] ring-1 ring-inset ring-white/75 backdrop-blur-2xl sm:p-8">
      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#696d73] transition-colors hover:text-[#0876df]"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to studio
          </Link>

          <div className="mt-5 flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-white to-[#e9f5ff] shadow-[0_10px_25px_rgba(8,118,223,0.12)] ring-1 ring-inset ring-white">
              <Image
                src={`/assets/icons/${icon}`}
                alt=""
                width={23}
                height={23}
                aria-hidden="true"
              />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#0876df]">
                {mode} transformation
              </p>
              <h1 className="mt-1.5 text-3xl font-bold tracking-[-0.045em] text-[#17191c] sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#696d73]">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {typeof creditBalance === "number" && (
          <div className="inline-flex w-fit items-center gap-3 rounded-2xl bg-[#eaf5ff]/80 px-4 py-3 text-[#185b96] ring-1 ring-inset ring-white/90">
            <span className="grid size-8 place-items-center rounded-xl bg-white/80 text-[#0876df] shadow-sm">
              <Coins className="size-4" aria-hidden="true" />
            </span>
            <span>
              <strong className="block text-sm leading-none">
                {creditBalance.toLocaleString()}
              </strong>
              <small className="mt-1 block text-[11px] font-medium text-[#5680a5]">
                credits available
              </small>
            </span>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-[#62aef0]/15 blur-3xl" />
    </header>
  );
}
