"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCldImageUrl } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { addImage, updateImage } from "@/lib/actions/image.actions";
import { updateCredits } from "@/lib/actions/user.actions";
import {
  aspectRatioOptions,
  creditFee,
  defaultValues,
  transformationTypes,
} from "@/constants";
import {
  type AspectRatioKey,
  debounce,
  deepMergeObjects,
} from "@/lib/utils";

import { formSchema, type TransformationFormValues } from "./schema";

export function useTransformationEditor({
  action,
  data = null,
  userId,
  type,
  config = null,
}: TransformationFormProps) {
  const router = useRouter();
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(
      data && (type === "restore" || type === "removeBackground")
        ? transformationType.config
        : null
    );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] =
    useState<Transformations | null>(config);
  const [, startTransition] = useTransition();

  const initialValues =
    data && action === "Update"
      ? {
          title: data.title,
          aspectRatio: data.aspectRatio,
          color: data.color,
          prompt: data.prompt,
          publicId: data.publicId,
        }
      : defaultValues;

  const form = useForm<TransformationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (values: TransformationFormValues) => {
    setIsSubmitting(true);

    if (data || image) {
      const transformationUrl = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      });

      const imageData = {
        title: values.title,
        publicId: image?.publicId,
        transformationType: type,
        width: image?.width,
        height: image?.height,
        config: transformationConfig,
        secureURL: image?.secureURL,
        transformationURL: transformationUrl,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
      };

      if (action === "Add") {
        try {
          const newImage = await addImage({
            image: imageData,
            userId,
            path: "/studio",
          });

          if (newImage) {
            form.reset();
            setImage(data);
            router.push(`/transformations/${newImage._id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (action === "Update") {
        try {
          const updatedImage = await updateImage({
            image: {
              ...imageData,
              _id: data!._id,
            },
            userId,
            path: `/transformations/${data!._id}`,
          });

          if (updatedImage) {
            router.push(`/transformations/${updatedImage._id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    setIsSubmitting(false);
  };

  const onSelectField = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey];
    setImage((previousImage: any) => ({
      ...previousImage!,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));
    setNewTransformation(transformationType.config);

    return onChangeField(value);
  };

  const onInputChange = (
    fieldName: string,
    value: string,
    transformationKey: string,
    onChangeField: (value: string) => void
  ) => {
    debounce(() => {
      setNewTransformation((previousTransformation) => ({
        ...previousTransformation,
        [transformationKey]: {
          ...(previousTransformation as any)?.[transformationKey],
          [fieldName === "prompt" ? "prompt" : "to"]: value,
        },
      }));
    }, 1000)();

    return onChangeField(value);
  };

  const onTransform = () => {
    setIsTransforming(true);
    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    );
    setNewTransformation(null);

    startTransition(async () => {
      await updateCredits(userId, creditFee);
    });
  };

  const onImageChange: React.Dispatch<React.SetStateAction<any>> = (value) => {
    setImage(value);
    if (type === "restore" || type === "removeBackground") {
      setNewTransformation(transformationType.config);
    }
  };

  return {
    form,
    image,
    isSubmitting,
    isTransforming,
    newTransformation,
    transformationConfig,
    onImageChange,
    onInputChange,
    onSelectField,
    onSubmit,
    onTransform,
    setIsTransforming,
  };
}
