"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/account/password`,
    });

    setPending(false);
    setMessage(
      "Falls ein Konto mit dieser Adresse existiert, wurde eine E-Mail zum Zurücksetzen gesendet.",
    );
  }

  return (
    <form onSubmit={submit} className="vv-box space-y-5 p-6 sm:p-8">
      <label className="block">
        <span className="mb-1 block text-sm text-muted">E-Mail-Adresse</span>
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border-2 border-ink px-3 py-2 outline-none focus:ring-2 focus:ring-fhnw"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md border-2 border-ink bg-fhnw px-4 py-2 font-medium disabled:opacity-60"
      >
        {pending ? "Wird gesendet …" : "Reset-Link senden"}
      </button>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </form>
  );
}
