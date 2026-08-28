"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { WALCHWIL_PARTICIPANT_KEY, formatParticipantNames } from "@/lib/walchwil-participant";
import type { WalchwilDate } from "@/lib/walchwil";

type ResponseRow = {
  participant: string;
  slots: string[];
};

const STORAGE_KEY = WALCHWIL_PARTICIPANT_KEY;

function formatNames(names: string[]): string {
  return formatParticipantNames(names);
}

function groupDates(dates: WalchwilDate[]): { group: string; dates: WalchwilDate[] }[] {
  const groups: { group: string; dates: WalchwilDate[] }[] = [];
  for (const date of dates) {
    const name = date.group ?? "";
    const last = groups.at(-1);
    if (last && last.group === name) {
      last.dates.push(date);
    } else {
      groups.push({ group: name, dates: [date] });
    }
  }
  return groups;
}

export function WalchwilPoll({
  pollId,
  participants,
  dates,
  embedded = false,
}: {
  pollId: string;
  participants: string[];
  dates: WalchwilDate[];
  embedded?: boolean;
}) {
  const supabase = useMemo(() => createClient(), []);
  const [me, setMe] = useState<string | null>(null);
  const [rows, setRows] = useState<ResponseRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored =
      window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem("walchwil-poll-name");
    if (stored && participants.includes(stored)) setMe(stored);
  }, [participants]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error: loadError } = await supabase
        .from("walchwil_poll_responses")
        .select("participant, slots")
        .eq("poll_id", pollId);

      if (cancelled) return;
      if (loadError) {
        setError("Die Termine konnten gerade nicht geladen werden.");
        return;
      }
      setError(null);
      setRows((data as ResponseRow[]) ?? []);
    }

    void load();

    const channel = supabase
      .channel(`walchwil-poll-${pollId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "walchwil_poll_responses", filter: `poll_id=eq.${pollId}` },
        () => {
          void load();
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, [pollId, supabase]);

  function namesFor(slotId: string): string[] {
    return participants.filter((name) =>
      rows.some((row) => row.participant === name && row.slots.includes(slotId)),
    );
  }

  async function chooseName(name: string) {
    setMe(name);
    window.localStorage.setItem(STORAGE_KEY, name);
  }

  async function toggleSlot(slotId: string) {
    if (!me || saving) return;
    setSaving(true);
    setError(null);

    const current = rows.find((row) => row.participant === me);
    const nextSlots = current?.slots.includes(slotId)
      ? (current.slots ?? []).filter((slot) => slot !== slotId)
      : [...(current?.slots ?? []), slotId];

    const { error: saveError } = await supabase.from("walchwil_poll_responses").upsert(
      {
        poll_id: pollId,
        participant: me,
        slots: nextSlots,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "poll_id,participant" },
    );

    if (saveError) {
      setError("Das hat nicht gespeichert. Bitte noch einmal versuchen.");
    } else {
      setRows((prev) => {
        const others = prev.filter((row) => row.participant !== me);
        return [...others, { participant: me, slots: nextSlots }];
      });
    }
    setSaving(false);
  }

  const grouped = groupDates(dates);

  return (
    <section className={embedded ? "mt-10 border-t border-ink/20 pt-8" : "mt-12"}>
      <h2 className="text-xl font-semibold tracking-tight">Termine</h2>
      <p className="mt-3 leading-relaxed text-ink/80">
        Zuerst den eigenen Namen wählen, dann die Donnerstage ankreuzen, die gehen.
        Alle Termine beginnen um 17.30 Uhr.
      </p>

      <div className="mt-6 flex flex-wrap gap-1">
        {participants.map((name) => {
          const selected = me === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => void chooseName(name)}
              className={`rounded-md px-3 py-1 ${selected ? "bg-fhnw font-medium" : "hover:bg-fhnw-soft"}`}
            >
              {name}
            </button>
          );
        })}
      </div>
      {!me ? (
        <p className="mt-3 text-sm text-muted">Namen wählen, dann Termine ankreuzen.</p>
      ) : (
        <p className="mt-3 text-sm text-muted">Eingetragen als {me}.</p>
      )}

      {error ? <p className="mt-4 text-sm text-ink">{error}</p> : null}

      <div className="mt-8 flex flex-col gap-10">
        {grouped.map(({ group, dates: groupDatesList }) => (
          <div key={group || groupDatesList[0]?.id}>
            {group ? (
              <h3 className="mb-3 font-hand text-lg">{group}</h3>
            ) : null}
            <div
              className={
                embedded
                  ? "divide-y divide-ink/20 overflow-hidden rounded-2xl border-2 border-ink"
                  : "vv-box divide-y divide-ink/20 overflow-hidden"
              }
            >
              {groupDatesList.map((date) => {
                const names = namesFor(date.id);
                const mine = Boolean(me && names.includes(me));
                return (
                  <button
                    key={date.id}
                    type="button"
                    disabled={!me || saving}
                    onClick={() => void toggleSlot(date.id)}
                    className={`flex w-full flex-col gap-1 px-5 py-4 text-left sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${
                      me ? "hover:bg-fhnw-soft" : ""
                    } ${mine ? "bg-fhnw/40" : ""}`}
                  >
                    <span className="flex items-baseline gap-3">
                      <span
                        className={`mt-0.5 inline-block h-4 w-4 shrink-0 rounded-sm border-2 border-ink ${
                          mine ? "bg-fhnw" : "bg-white"
                        }`}
                        aria-hidden
                      />
                      <span className="font-medium">{date.label}</span>
                    </span>
                    <span className="pl-7 text-sm text-ink/70 sm:pl-0 sm:text-right">
                      {names.length === 0
                        ? "noch niemand"
                        : `${names.length} · ${formatNames(names)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
