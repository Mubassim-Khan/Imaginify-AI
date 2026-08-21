import { auth } from "@/auth";
import { redirect } from "next/navigation";

import TransformationForm from "@/components/shared/TransformationForm";
import TransformationPageHeader from "@/components/transformations/TransformationPageHeader";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { getImageById } from "@/lib/actions/image.actions";
import { notFound } from "next/navigation";

const Page = async ({ params }: SearchParamProps) => {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const image = await getImageById(id);

  if (!image || String(image.author?._id) !== userId) notFound();

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  if (!transformation) notFound();

  return (
    <div className="space-y-6 pb-10">
      <TransformationPageHeader
        title={transformation.title}
        subtitle="Refine the settings, preview the result, and save your changes."
        icon={transformation.icon}
        mode="Edit"
        creditBalance={user.creditBalance}
      />

      <section aria-label={`${transformation.title} editor`}>
        <TransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </div>
  );
};

export default Page;
