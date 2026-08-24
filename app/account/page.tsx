import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AccountDataActions } from "@/components/AccountDataActions";
import { PageKicker, PageMain } from "@/components/Page";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Konto",
};

export default async function AccountPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) redirect("/login");

  return (
    <PageMain>
      <PageKicker>Kontoeinstellungen</PageKicker>
      <h1 className="text-4xl font-semibold tracking-tight">Mein Konto</h1>
      <p className="mb-10 mt-4 text-ink/75">{user.email}</p>
      <AccountDataActions email={user.email} />
    </PageMain>
  );
}
