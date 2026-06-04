import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SkillTreeProvider } from "../context/SkillTreeContext";
import { Navbar } from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learning App Design Skilltree",
  description: "Ein interaktives Wissens- und Navigationssystem für Learning App Design, Vibe Coding, generative KI und Didaktik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <SkillTreeProvider>
          <Navbar />
          <main className="flex-1 flex flex-col relative">
            {children}
          </main>
        </SkillTreeProvider>
      </body>
    </html>
  );
}
