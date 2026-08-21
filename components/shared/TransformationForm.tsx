"use client";

import { Form } from "@/components/ui/form";

import { InsufficientCreditsModal } from "./InsufficientCreditsModal";
import TransformationActions from "./transformation-form/TransformationActions";
import TransformationFields from "./transformation-form/TransformationFields";
import TransformationWorkspace from "./transformation-form/TransformationWorkspace";
import { useTransformationEditor } from "./transformation-form/useTransformationEditor";

export { formSchema } from "./transformation-form/schema";

const TransformationForm = (props: TransformationFormProps) => {
  const {
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
  } = useTransformationEditor(props);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {props.creditBalance < 1 && <InsufficientCreditsModal />}

        <TransformationFields
          control={form.control}
          type={props.type}
          onSelectField={onSelectField}
          onInputChange={onInputChange}
        />

        <TransformationWorkspace
          control={form.control}
          image={image}
          type={props.type}
          title={form.getValues().title}
          isTransforming={isTransforming}
          setIsTransforming={setIsTransforming}
          transformationConfig={transformationConfig}
          onImageChange={onImageChange}
        />

        <TransformationActions
          action={props.action}
          canSave={Boolean(image?.publicId && transformationConfig)}
          canTransform={props.creditBalance > 0 && newTransformation !== null}
          isSubmitting={isSubmitting}
          isTransforming={isTransforming}
          onTransform={onTransform}
        />
      </form>
    </Form>
  );
};

export default TransformationForm;
