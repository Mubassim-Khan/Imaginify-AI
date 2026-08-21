import { redirect } from "next/navigation";

import { auth } from "@/auth";
import StudioHero from "@/components/dashboard/studio/StudioHero";
import { Collection } from "@/components/shared/Collection";
import { getUserImages } from "@/lib/actions/image.actions";

const Studio = async ({ searchParams }: SearchParamProps) => {
  const { page, query } = await searchParams;
  const pageNumber = Math.max(1, Number(page) || 1);
  const searchQuery = typeof query === "string" ? query : "";
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  const images = await getUserImages({
    page: pageNumber,
    searchQuery,
    userId: session.user.id,
  });

  return (
    <div className="space-y-8 pb-10">
      <StudioHero
        creationCount={images?.totalImages ?? 0}
        displayName={session.user.name}
      />

      <section className="rounded-[24px] bg-white/[.64] p-5 shadow-[0_22px_60px_rgba(52,45,37,.07)] ring-1 ring-inset ring-black/[.045] backdrop-blur-2xl md:p-7">
        <Collection
          hasSearch
          heading="Your recent creations"
          description="Everything you create stays organized in your private workspace."
          emptyDescription="Choose a tool above to create your first polished image."
          emptyTitle="Your workspace is ready"
          images={images?.data}
          totalPages={images?.totalPages}
          page={pageNumber}
        />
      </section>
    </div>
  );
};

export default Studio;
