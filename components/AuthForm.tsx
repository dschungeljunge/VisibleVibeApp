"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const supabase = createClient();

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });

      setPending(false);
      setMessage(
        error
          ? error.message
          : "Konto erstellt. Bitte bestätige deine E-Mail-Adresse und melde dich danach an.",
      );
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setPending(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="vv-box p-6 sm:p-8">
      <div className="mb-6 flex gap-2">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setMessage("");
          }}
          className={`rounded-md px-3 py-2 ${mode === "login" ? "bg-fhnw font-medium" : "bg-paper"}`}
        >
          Anmelden
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setMessage("");
          }}
          className={`rounded-md px-3 py-2 ${mode === "signup" ? "bg-fhnw font-medium" : "bg-paper"}`}
        >
          Konto erstellen
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
        <label className="block">
          <span className="mb-1 block text-sm text-muted">Passwort</span>
          <input
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            minLength={8}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-md border-2 border-ink px-3 py-2 outline-none focus:ring-2 focus:ring-fhnw"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md border-2 border-ink bg-fhnw px-4 py-2 font-medium disabled:opacity-60"
        >
          {pending ? "Bitte warten …" : mode === "login" ? "Anmelden" : "Konto erstellen"}
        </button>
      </form>

      {mode === "login" ? (
        <Link href="/forgot-password" className="mt-5 inline-block text-sm underline">
          Passwort vergessen?
        </Link>
      ) : null}
      {message ? <p className="mt-5 text-sm text-muted">{message}</p> : null}
    </div>
  );
}
