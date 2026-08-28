import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";
import { AppChrome } from "@/components/AppChrome";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

// Original-Handschrift von Excalidraw (SIL Open Font License)
const excalifont = localFont({
  src: "./fonts/Excalifont-Regular.woff2",
  variable: "--font-excalifont",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VisibleVibe",
    template: "%s · VisibleVibe",
  },
  description: "Lernen gestalten. Ideen bauen. Lehrpersonen entwickeln Lernapps.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="de" className={`${sourceSans.variable} ${excalifont.variable}`}>
      <body className="font-sans">
        <AppChrome userEmail={user?.email}>{children}</AppChrome>
      </body>
    </html>
  );
}
