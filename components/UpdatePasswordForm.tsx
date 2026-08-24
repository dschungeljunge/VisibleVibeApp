"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (password !== confirmation) {
      setMessage("Die Passwörter stimmen nicht überein.");
      return;
    }

    setPending(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setPending(false);

    if (error) {
      setMessage("Das Passwort konnte nicht geändert werden. Bitte fordere einen neuen Link an.");
      return;
    }

    router.push("/account?password=updated");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="vv-box space-y-5 p-6 sm:p-8">
      <label className="block">
        <span className="mb-1 block text-sm text-muted">Neues Passwort</span>
        <input
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-md border-2 border-ink px-3 py-2 outline-none focus:ring-2 focus:ring-fhnw"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-muted">Passwort wiederholen</span>
        <input
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          className="w-full rounded-md border-2 border-ink px-3 py-2 outline-none focus:ring-2 focus:ring-fhnw"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md border-2 border-ink bg-fhnw px-4 py-2 font-medium disabled:opacity-60"
      >
        {pending ? "Wird geändert …" : "Passwort ändern"}
      </button>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </form>
  );
}
