import TransformationForm from "@/components/shared/TransformationForm";
import TransformationPageHeader from "@/components/transformations/TransformationPageHeader";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";

const AddTransformationTypePage = async ({ params }: SearchParamProps) => {
  const { type } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  const transformation = transformationTypes[type];

  if (!userId) redirect("/sign-in");
  if (!transformation) notFound();

  const user = await getUserById(userId);

  return (
    <div className="space-y-6 pb-10">
      <TransformationPageHeader
        title={transformation.title}
        subtitle={transformation.subTitle}
        icon={transformation.icon}
        mode="Create"
        creditBalance={user.creditBalance}
      />
      <section aria-label={`${transformation.title} editor`}>
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </div>
  );
};

export default AddTransformationTypePage;
