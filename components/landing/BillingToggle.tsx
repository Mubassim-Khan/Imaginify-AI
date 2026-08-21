import { cn } from "@/lib/utils";

type BillingToggleProps = {
  yearly: boolean;
  onChange: (yearly: boolean) => void;
};

export default function BillingToggle({ yearly, onChange }: BillingToggleProps) {
  return (
    <div
      className="relative mx-auto grid w-[292px] grid-cols-2 rounded-full border border-[#dfdbd5] bg-[#eeece8] p-1.5 shadow-[inset_0_1px_3px_rgba(42,36,30,.07)]"
      role="group"
      aria-label="Billing period"
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-1.5 left-1.5 top-1.5 w-[calc(50%-6px)] rounded-full border border-white/80 bg-white shadow-[0_7px_20px_rgba(35,31,27,.12),inset_0_1px_0_rgba(255,255,255,.9)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:duration-0",
          yearly && "translate-x-full",
        )}
      />
      <button
        type="button"
        aria-pressed={!yearly}
        onClick={() => onChange(false)}
        className={cn(
          "relative z-10 h-9 rounded-full px-4 text-xs font-semibold transition-colors duration-300",
          !yearly
            ? "text-[#161412]"
            : "text-[#706a65] hover:text-[#161412]",
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        aria-pressed={yearly}
        onClick={() => onChange(true)}
        className={cn(
          "relative z-10 h-9 rounded-full px-3 text-xs font-semibold transition-colors duration-300",
          yearly
            ? "text-[#161412]"
            : "text-[#706a65] hover:text-[#161412]",
        )}
      >
        Yearly
        <span className="ml-1 rounded-full bg-[#e2f4ea] px-1.5 py-1 text-[8px] uppercase text-[#247156]">
          Save 20%
        </span>
      </button>
    </div>
  );
}
