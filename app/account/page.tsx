import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountDataActions } from "@/components/AccountDataActions";
import { LogoutButton } from "@/components/LogoutButton";
import { PageMain } from "@/components/Page";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Mein Bereich",
};

export default async function AccountPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) redirect("/login");

  return (
    <PageMain>
      <h1 className="text-4xl font-semibold tracking-tight">Mein Bereich</h1>
      <p className="mt-4 text-ink/75">{user.email}</p>

      <section className="vv-box mb-8 mt-10 p-6">
        <h2 className="text-xl font-semibold">Arbeitsbereich</h2>
        <p className="mt-2 text-ink/75">
          Hier findest du deine Boards und kannst dich abmelden.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="inline-block rounded-md border-2 border-ink bg-fhnw px-4 py-2 font-medium"
          >
            Meine Boards
          </Link>
          <LogoutButton className="rounded-md border-2 border-ink bg-white px-4 py-2 font-medium hover:bg-fhnw-soft" />
        </div>
      </section>

      <AccountDataActions email={user.email} />
    </PageMain>
  );
}
