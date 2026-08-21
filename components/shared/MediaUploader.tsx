"use client";

import { ImagePlus, RefreshCw, Upload } from "lucide-react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import type { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import type React from "react";

import { useToast } from "@/hooks/use-toast";
import { dataUrl, getImageSize } from "@/lib/utils";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  image: any;
  publicId: string;
  type: string;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast();

  const onUploadSuccessHandler = (result: any) => {
    setImage((previousImage: any) => ({
      ...previousImage,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));

    onValueChange(result?.info?.public_id);

    toast({
      title: "Image uploaded",
      description: "Your source image is ready to transform.",
      duration: 3000,
      className: "bg-green-100 text-green-900",
    });
  };

  const onUploadErrorHandler = () => {
    toast({
      title: "Upload failed",
      description: "Please try the upload again.",
      duration: 3000,
      className: "bg-red-100 text-red-900",
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="mak_imaginify"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <article className="flex min-w-0 flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#25282c]">Original</p>
              <p className="mt-0.5 text-xs text-[#858990]">Source image</p>
            </div>
            <span className="grid size-9 place-items-center rounded-xl bg-white/70 text-[#0876df] ring-1 ring-inset ring-white">
              <ImagePlus className="size-4" aria-hidden="true" />
            </span>
          </div>

          {publicId ? (
            <div className="group relative flex min-h-[340px] flex-1 items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,rgba(234,245,255,.82),rgba(247,246,243,.92))] p-3 ring-1 ring-inset ring-white/85 sm:min-h-[420px]">
              <CldImage
                src={publicId}
                alt="Source image"
                width={getImageSize(type, image, "width")}
                height={getImageSize(type, image, "height")}
                sizes="(max-width: 767px) 100vw, 50vw"
                placeholder={dataUrl as PlaceholderValue}
                className="h-auto max-h-[620px] w-full rounded-2xl object-contain"
              />
              <button
                type="button"
                onClick={() => open()}
                className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-2 text-xs font-semibold text-[#34373c] opacity-100 shadow-[0_10px_25px_rgba(17,25,33,0.12)] ring-1 ring-inset ring-white backdrop-blur-xl transition hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
              >
                <RefreshCw className="size-3.5" aria-hidden="true" />
                Replace
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => open()}
              className="group flex min-h-[340px] flex-1 flex-col items-center justify-center gap-4 rounded-[22px] border border-dashed border-[#92bddd]/70 bg-[linear-gradient(135deg,rgba(234,245,255,.68),rgba(255,255,255,.72))] px-6 text-center shadow-inner transition duration-300 hover:border-[#0876df]/55 hover:bg-[#eaf5ff]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0876df]/35 sm:min-h-[420px]"
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-white/85 text-[#0876df] shadow-[0_12px_28px_rgba(8,118,223,0.12)] ring-1 ring-inset ring-white transition duration-300 group-hover:-translate-y-0.5">
                <Upload className="size-5" aria-hidden="true" />
              </span>
              <span>
                <strong className="block text-sm font-semibold text-[#25282c]">
                  Upload a source image
                </strong>
                <small className="mt-1.5 block text-xs leading-5 text-[#858990]">
                  Choose a clear JPG, PNG, or WebP image.
                </small>
              </span>
            </button>
          )}
        </article>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
