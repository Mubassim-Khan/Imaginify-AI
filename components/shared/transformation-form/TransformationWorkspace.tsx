import type { Control } from "react-hook-form";

import { CustomField } from "@/components/shared/CustomField";
import MediaUploader from "@/components/shared/MediaUploader";
import TransformedImage from "@/components/shared/TransformedImage";

import type { TransformationFormValues } from "./schema";

type TransformationWorkspaceProps = {
  control: Control<TransformationFormValues>;
  image: any;
  isTransforming: boolean;
  onImageChange: React.Dispatch<React.SetStateAction<any>>;
  setIsTransforming: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  transformationConfig: Transformations | null;
  type: TransformationTypeKey;
};

export default function TransformationWorkspace({
  control,
  image,
  isTransforming,
  onImageChange,
  setIsTransforming,
  title,
  transformationConfig,
  type,
}: TransformationWorkspaceProps) {
  return (
    <section className="grid min-h-[420px] grid-cols-1 gap-6 rounded-[28px] bg-white/55 p-4 shadow-[0_24px_65px_rgba(43,54,116,0.09)] ring-1 ring-inset ring-white/80 backdrop-blur-2xl sm:p-6 lg:grid-cols-2">
      <CustomField
        control={control}
        name="publicId"
        className="flex size-full flex-col"
        render={({ field }) => (
          <MediaUploader
            onValueChange={field.onChange}
            setImage={onImageChange}
            publicId={field.value}
            image={image}
            type={type}
          />
        )}
      />

      <TransformedImage
        image={image}
        type={type}
        title={title}
        isTransforming={isTransforming}
        setIsTransforming={setIsTransforming}
        transformationConfig={transformationConfig}
      />
    </section>
  );
}
