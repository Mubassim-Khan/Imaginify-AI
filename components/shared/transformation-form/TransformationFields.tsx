import { SlidersHorizontal } from "lucide-react";
import type { Control } from "react-hook-form";

import { CustomField } from "@/components/shared/CustomField";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { aspectRatioOptions } from "@/constants";
import type { AspectRatioKey } from "@/lib/utils";

import type { TransformationFormValues } from "./schema";

type TransformationFieldsProps = {
  control: Control<TransformationFormValues>;
  type: TransformationTypeKey;
  onSelectField: (
    value: string,
    onChangeField: (value: string) => void,
  ) => void;
  onInputChange: (
    fieldName: string,
    value: string,
    transformationKey: string,
    onChangeField: (value: string) => void,
  ) => void;
};

const inputClassName =
  "h-12 rounded-2xl border-white/80 bg-white/65 px-4 text-sm font-medium text-[#25282c] shadow-sm placeholder:text-[#a0a4aa] focus-visible:ring-[#0876df]/25";

export default function TransformationFields({
  control,
  type,
  onSelectField,
  onInputChange,
}: TransformationFieldsProps) {
  return (
    <section className="rounded-[26px] bg-white/55 p-5 shadow-[0_18px_45px_rgba(43,54,116,0.07)] ring-1 ring-inset ring-white/80 backdrop-blur-2xl sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-xl bg-[#eaf5ff] text-[#0876df] ring-1 ring-inset ring-white">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-[#25282c]">
            Transformation settings
          </h2>
          <p className="mt-0.5 text-xs text-[#858990]">
            Name your image and describe the change you want.
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <CustomField
          control={control}
          name="title"
          formLabel="Image title"
          className="w-full"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Give this creation a name"
              className={inputClassName}
            />
          )}
        />

        {type === "fill" && (
          <CustomField
            control={control}
            name="aspectRatio"
            formLabel="Aspect ratio"
            className="w-full"
            render={({ field }) => (
              <Select
                onValueChange={(value) => onSelectField(value, field.onChange)}
                value={field.value}
              >
                <SelectTrigger className="h-12 w-full rounded-2xl border-white/80 bg-white/65 px-4 text-sm font-medium text-[#25282c] shadow-sm focus:ring-[#0876df]/25">
                  <SelectValue placeholder="Select a canvas size" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-white/80 bg-white/90 backdrop-blur-xl">
                  {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem
                      key={key}
                      value={key}
                      className="cursor-pointer rounded-xl py-3 focus:bg-[#eaf5ff]"
                    >
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(type === "remove" || type === "recolor") && (
          <CustomField
            control={control}
            name="prompt"
            formLabel={
              type === "remove" ? "Object to remove" : "Object to recolor"
            }
            className="w-full"
            render={({ field }) => (
              <Input
                value={field.value}
                placeholder={
                  type === "remove"
                    ? "For example: the chair on the left"
                    : "For example: the blue jacket"
                }
                className={inputClassName}
                onChange={(event) =>
                  onInputChange(
                    "prompt",
                    event.target.value,
                    type,
                    field.onChange,
                  )
                }
              />
            )}
          />
        )}

        {type === "recolor" && (
          <CustomField
            control={control}
            name="color"
            formLabel="Replacement color"
            className="w-full"
            render={({ field }) => (
              <Input
                value={field.value}
                placeholder="For example: warm terracotta"
                className={inputClassName}
                onChange={(event) =>
                  onInputChange(
                    "color",
                    event.target.value,
                    "recolor",
                    field.onChange,
                  )
                }
              />
            )}
          />
        )}
      </div>
    </section>
  );
}
