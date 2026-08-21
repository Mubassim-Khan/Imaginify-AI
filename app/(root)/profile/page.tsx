import { Images, WalletCards } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ConnectedAccountsCard from "@/components/profile/ConnectedAccountsCard";
import ProfileOverviewCard from "@/components/profile/ProfileOverviewCard";
import ProfilePageHeader from "@/components/profile/ProfilePageHeader";
import ProfileStatCard from "@/components/profile/ProfileStatCard";
import { Collection } from "@/components/shared/Collection";
import { plans } from "@/constants";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserProfile } from "@/lib/actions/user.actions";

const Profile = async ({ searchParams }: SearchParamProps) => {
  const { page } = await searchParams;
  const pageNumber = Math.max(Number(page) || 1, 1);
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/sign-in");

  const [profile, images] = await Promise.all([
    getUserProfile(userId),
    getUserImages({ page: pageNumber, userId }),
  ]);
  const planName =
    plans.find((plan) => plan._id === profile.planId)?.name || "Free";

  return (
    <>
      <ProfilePageHeader />

      <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
        <ProfileOverviewCard profile={profile} planName={planName} />
        <ConnectedAccountsCard
          methods={profile.authMethods}
          lastLoginProvider={profile.lastLoginProvider}
          hasUnclassifiedLegacyOAuth={
            profile.hasUnclassifiedLegacyOAuth
          }
        />
      </section>

      <section className="mt-5 grid gap-5 sm:grid-cols-2">
        <ProfileStatCard
          icon={WalletCards}
          label="Available credits"
          value={profile.creditBalance.toLocaleString()}
          detail="Ready to use across every creative tool"
        />
        <ProfileStatCard
          icon={Images}
          label="Transformations created"
          value={(images?.totalImages || 0).toLocaleString()}
          detail="Your complete workspace history, not just this page"
        />
      </section>

      <section className="mt-10 pb-8 md:mt-14">
        <Collection
          heading="Your creations"
          description="Review every image you have transformed in this workspace."
          images={images?.data}
          totalPages={images?.totalPages}
          page={pageNumber}
        />
      </section>
    </>
  );
};

export default Profile;
