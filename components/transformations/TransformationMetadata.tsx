import { Maximize2, MessageSquareText, Palette, WandSparkles } from "lucide-react";

type TransformationMetadataProps = {
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  transformation: string;
};

const humanize = (value: string) =>
  value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (letter) => letter.toUpperCase());

export default function TransformationMetadata({
  aspectRatio,
  color,
  prompt,
  transformation,
}: TransformationMetadataProps) {
  const items = [
    {
      label: "Transformation",
      value: humanize(transformation),
      icon: WandSparkles,
    },
    ...(prompt
      ? [{ label: "Prompt", value: prompt, icon: MessageSquareText }]
      : []),
    ...(color ? [{ label: "Color", value: color, icon: Palette }] : []),
    ...(aspectRatio
      ? [{ label: "Aspect ratio", value: aspectRatio, icon: Maximize2 }]
      : []),
  ];

  return (
    <dl className="flex flex-wrap gap-2.5">
      {items.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/60 px-3.5 py-2 text-xs shadow-sm ring-1 ring-inset ring-white/80 backdrop-blur-xl"
        >
          <Icon className="size-3.5 shrink-0 text-[#0876df]" aria-hidden="true" />
          <dt className="font-medium text-[#858990]">{label}</dt>
          <dd className="truncate font-semibold text-[#34373c]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
