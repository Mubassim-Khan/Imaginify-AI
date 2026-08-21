import ScrollReveal from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  inverted?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  inverted = false,
}: SectionHeadingProps) {
  return (
    <ScrollReveal className={cn("mx-auto max-w-[700px] text-center", className)}>
      <span
        className={cn(
          "text-[10px] font-bold uppercase tracking-[1.4px]",
          inverted ? "text-[#8bc8ff]" : "text-[#0876df]",
        )}
      >
        {eyebrow}
      </span>
      <h2 className="my-4 text-4xl font-bold leading-none tracking-[-2px] sm:text-6xl sm:tracking-[-3px]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mx-auto max-w-xl text-base leading-7",
            inverted ? "text-[#cdd5f1]" : "text-[#6b6661]",
          )}
        >
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
