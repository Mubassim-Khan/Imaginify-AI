type CompanyLogoProps = {
  name: string;
};

export default function CompanyLogo({ name }: CompanyLogoProps) {
  const className = "size-7 shrink-0";

  if (name === "Vercel") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
        <path d="M12 3 23 21H1L12 3Z" fill="currentColor" />
      </svg>
    );
  }

  if (name === "Notion") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 17V7l8 10V7" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (name === "Linear") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="m5.5 7.5 11 11M4 11l9 9M8 4l12 12" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (name === "Loom") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
        <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" stroke="currentColor" strokeWidth="2.6" />
        <circle cx="12" cy="12" r="4" fill="#fff" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (name === "Raycast") {
    return (
      <svg aria-hidden="true" className={`${className} text-[#e5484d]`} viewBox="0 0 24 24">
        <path d="m5 3 16 16-2 2L3 5l2-2Zm7 2 7 7v-7h-7ZM5 12l7 7H5v-7Z" fill="currentColor" />
      </svg>
    );
  }

  if (name === "Arc") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
        <path d="M4 18.5C5.5 9 8.8 5 12 5s6.5 4 8 13.5M7.5 18.5c.8-5.8 2.5-8.7 4.5-8.7s3.7 2.9 4.5 8.7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={`${className} text-[#146ef5]`} viewBox="0 0 24 24">
      <path d="M3 6.5 7.5 19l4.5-8 4.5 8L21 6.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}
