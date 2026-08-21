import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionProvider } from "@/components/providers/SessionProvider";

const inter = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Imaginify — AI image editing for modern teams",
  description: "Create, restore, and transform remarkable images with an AI creative workspace built for modern teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", inter.variable)}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
