import { auth } from "@/auth";
import TransformedImage from "@/components/shared/TransformedImage";
import OriginalImagePanel from "@/components/transformations/OriginalImagePanel";
import TransformationDetailActions from "@/components/transformations/TransformationDetailActions";
import TransformationMetadata from "@/components/transformations/TransformationMetadata";
import TransformationPageHeader from "@/components/transformations/TransformationPageHeader";
import { transformationTypes } from "@/constants";
import { getImageById } from "@/lib/actions/image.actions";
import { notFound, redirect } from "next/navigation";

const ImageDetails = async ({ params }: SearchParamProps) => {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/sign-in");

  const image = await getImageById(id);
  if (!image) notFound();

  if (String(image.author?._id) !== userId) notFound();

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];
  if (!transformation) notFound();

  return (
    <div className="space-y-6 pb-10">
      <TransformationPageHeader
        title={image.title}
        subtitle="Compare the source with the finished transformation and review the settings used."
        icon={transformation.icon}
        mode="Result"
      />

      <TransformationMetadata
        transformation={image.transformationType}
        prompt={image.prompt}
        color={image.color}
        aspectRatio={image.aspectRatio}
      />

      <section className="rounded-[28px] bg-white/55 p-4 shadow-[0_24px_65px_rgba(43,54,116,0.09)] ring-1 ring-inset ring-white/80 backdrop-blur-2xl sm:p-6">
        <div className="grid min-h-[420px] grid-cols-1 gap-6 lg:grid-cols-2">
          <OriginalImagePanel image={image} />
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>
      </section>

      <TransformationDetailActions imageId={image._id} />
    </div>
  );
};

export default ImageDetails;
