import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { UpdatePasswordForm } from "@/components/UpdatePasswordForm";
import { PageKicker, PageMain } from "@/components/Page";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Neues Passwort",
};

export default async function UpdatePasswordPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/forgot-password");

  return (
    <PageMain>
      <PageKicker>Mein Bereich</PageKicker>
      <h1 className="text-4xl font-semibold tracking-tight">Neues Passwort festlegen</h1>
      <p className="mb-8 mt-5 text-lg leading-relaxed text-ink/80">
        Verwende mindestens acht Zeichen und kein Passwort, das du bereits anderswo nutzt.
      </p>
      <UpdatePasswordForm />
    </PageMain>
  );
}
