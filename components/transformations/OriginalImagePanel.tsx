import { ImageIcon } from "lucide-react";
import Image from "next/image";

import { getImageSize } from "@/lib/utils";

type OriginalImagePanelProps = {
  image: any;
};

export default function OriginalImagePanel({ image }: OriginalImagePanelProps) {
  return (
    <article className="flex min-w-0 flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#25282c]">Original</p>
          <p className="mt-0.5 text-xs text-[#858990]">Source image</p>
        </div>
        <span className="grid size-9 place-items-center rounded-xl bg-white/70 text-[#0876df] ring-1 ring-inset ring-white">
          <ImageIcon className="size-4" aria-hidden="true" />
        </span>
      </div>

      <div className="flex min-h-[340px] flex-1 items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,rgba(234,245,255,.82),rgba(247,246,243,.92))] p-3 ring-1 ring-inset ring-white/85 sm:min-h-[420px]">
        <Image
          width={getImageSize(image.transformationType, image, "width")}
          height={getImageSize(image.transformationType, image, "height")}
          src={image.secureURL}
          alt={`Original ${image.title}`}
          sizes="(max-width: 767px) 100vw, 50vw"
          className="h-auto max-h-[620px] w-full rounded-2xl object-contain"
        />
      </div>
    </article>
  );
}
