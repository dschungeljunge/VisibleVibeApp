import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { PageKicker, PageMain } from "@/components/Page";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Anmelden",
};

export default async function LoginPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <PageMain>
      <PageKicker>Dein Arbeitsbereich</PageKicker>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Weiterarbeiten</h1>
      <p className="mb-8 mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
        Melde dich an, um deine VisibleVibe-Methode und deine Projektboards zu speichern und
        auf einem anderen Gerät fortzusetzen.
      </p>
      <AuthForm />
    </PageMain>
  );
}
