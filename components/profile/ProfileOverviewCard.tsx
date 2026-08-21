import { AtSign, CalendarDays, Mail, Sparkles } from "lucide-react";
import Image from "next/image";

import type { UserProfileDTO } from "@/types/auth";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "IM";

export default function ProfileOverviewCard({
  profile,
  planName,
}: {
  profile: UserProfileDTO;
  planName: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(145deg,rgba(255,255,255,0.78),rgba(234,245,255,0.58))] p-5 shadow-[0_28px_80px_rgba(24,45,73,0.1),inset_0_1px_0_white] ring-1 ring-inset ring-white/70 backdrop-blur-3xl sm:p-7">
      <div className="pointer-events-none absolute -left-20 -top-24 size-56 rounded-full bg-[#79c2ff]/20 blur-[70px]" />
      <div className="pointer-events-none absolute -bottom-24 right-0 size-52 rounded-full bg-[#a9d7ff]/22 blur-[70px]" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-[26px] bg-[linear-gradient(145deg,#1587ed,#075cae)] text-2xl font-semibold tracking-[-0.04em] text-white shadow-[0_18px_42px_rgba(8,118,223,0.25),inset_0_1px_0_rgba(255,255,255,0.4)] ring-4 ring-white/65">
          <span aria-hidden="true">{getInitials(profile.fullName)}</span>
          {profile.photo && (
            <Image
              src={profile.photo}
              alt={`${profile.fullName}'s profile photo`}
              fill
              sizes="96px"
              className="object-cover"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="truncate text-2xl font-semibold tracking-[-0.035em] text-[#142235] sm:text-3xl">
              {profile.fullName}
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0876df]/9 px-3 py-1 text-xs font-semibold text-[#0869c5] ring-1 ring-inset ring-[#0876df]/12">
              <Sparkles aria-hidden="true" size={13} />
              {planName} plan
            </span>
          </div>
          <p className="mt-1.5 text-sm text-[#687789]">
            Your Imaginify creative workspace and account details.
          </p>
        </div>
      </div>

      <dl className="relative mt-7 grid gap-3 sm:grid-cols-3">
        <Detail icon={Mail} label="Email" value={profile.email} />
        <Detail icon={AtSign} label="Username" value={profile.username} />
        <Detail
          icon={CalendarDays}
          label="Member since"
          value={formatDate(profile.memberSince)}
        />
      </dl>
    </article>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl bg-white/52 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ring-1 ring-inset ring-white/60 backdrop-blur-xl">
      <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8995a3]">
        <Icon aria-hidden="true" size={14} />
        {label}
      </dt>
      <dd className="mt-2 truncate text-sm font-medium text-[#27384c]" title={value}>
        {value}
      </dd>
    </div>
  );
}
