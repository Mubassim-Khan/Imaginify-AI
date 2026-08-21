"use client";

import { Download, LoaderCircle, Sparkles } from "lucide-react";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import type { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import type React from "react";

import { dataUrl, debounce, download, getImageSize } from "@/lib/utils";

const TransformedImage = ({
  image,
  type,
  title,
  transformationConfig,
  isTransforming,
  setIsTransforming,
  hasDownload = false,
}: TransformedImageProps) => {
  const downloadHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    download(
      getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      }),
      title,
    );
  };

  return (
    <article className="flex min-w-0 flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#25282c]">Transformed</p>
          <p className="mt-0.5 text-xs text-[#858990]">AI preview</p>
        </div>

        {hasDownload ? (
          <button
            type="button"
            aria-label="Download transformed image"
            className="grid size-9 place-items-center rounded-xl bg-white/70 text-[#0876df] shadow-sm ring-1 ring-inset ring-white transition hover:bg-white"
            onClick={downloadHandler}
          >
            <Download className="size-4" aria-hidden="true" />
          </button>
        ) : (
          <span className="grid size-9 place-items-center rounded-xl bg-white/70 text-[#0876df] ring-1 ring-inset ring-white">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative flex min-h-[340px] flex-1 items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,rgba(234,245,255,.82),rgba(247,246,243,.92))] p-3 ring-1 ring-inset ring-white/85 sm:min-h-[420px]">
          <CldImage
            src={image.publicId}
            alt={image.title || title || "Transformed image"}
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            sizes="(max-width: 767px) 100vw, 50vw"
            placeholder={dataUrl as PlaceholderValue}
            className="h-auto max-h-[620px] w-full rounded-2xl object-contain"
            onLoad={() => {
              setIsTransforming?.(false);
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming?.(false);
              }, 8000)();
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="absolute inset-3 flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#15213d]/78 text-center text-white backdrop-blur-md">
              <span className="grid size-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-inset ring-white/15">
                <LoaderCircle
                  className="size-5 animate-spin motion-reduce:animate-none"
                  aria-hidden="true"
                />
              </span>
              <div>
                <p className="text-sm font-semibold">Creating your preview</p>
                <p className="mt-1 text-xs text-white/65">This may take a moment.</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex min-h-[340px] flex-1 flex-col items-center justify-center gap-4 rounded-[22px] border border-dashed border-[#a9c9df]/70 bg-[linear-gradient(135deg,rgba(234,245,255,.58),rgba(255,255,255,.72))] px-6 text-center shadow-inner sm:min-h-[420px]">
          <span className="grid size-14 place-items-center rounded-2xl bg-white/85 text-[#0876df] shadow-[0_12px_28px_rgba(8,118,223,0.1)] ring-1 ring-inset ring-white">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#34373c]">
              Your preview will appear here
            </p>
            <p className="mt-1.5 text-xs leading-5 text-[#858990]">
              Upload an image, complete the settings, then apply the transformation.
            </p>
          </div>
        </div>
      )}
    </article>
  );
};

export default TransformedImage;
