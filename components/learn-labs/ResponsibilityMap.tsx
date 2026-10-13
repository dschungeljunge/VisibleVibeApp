"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import {
  RESPONSIBILITY_DEFAULT_ROLE,
  RESPONSIBILITY_FLOW,
  RESPONSIBILITY_GROUPS,
  RESPONSIBILITY_MAP_INTRO,
  RESPONSIBILITY_ROLES,
  RESPONSIBILITY_SOURCES,
  type ResponsibilityRoleId,
} from "@/lib/learn-labs/datenschutz";

const ROLE_BY_ID = new Map(RESPONSIBILITY_ROLES.map((role) => [role.id, role]));

/** Reihenfolge für die Pfeiltasten-Navigation: Gruppen von oben nach unten. */
const ORDERED_ROLE_IDS = RESPONSIBILITY_GROUPS.flatMap((group) => group.roles);

function roleIdAt(index: number): ResponsibilityRoleId {
  const length = ORDERED_ROLE_IDS.length;
  return ORDERED_ROLE_IDS[(index + length) % length];
}

export function ResponsibilityMap() {
  const [selectedId, setSelectedId] = useState<ResponsibilityRoleId>(RESPONSIBILITY_DEFAULT_ROLE);
  const selected = useMemo(
    () => ROLE_BY_ID.get(selectedId) ?? ROLE_BY_ID.get(RESPONSIBILITY_DEFAULT_ROLE)!,
    [selectedId],
  );

  function selectRole(id: ResponsibilityRoleId, focus = false) {
    setSelectedId(id);
    if (focus) {
      requestAnimationFrame(() => {
        document.getElementById(`responsibility-role-${id}`)?.focus();
      });
    }
  }

  function onGroupKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const delta =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (!delta) return;

    event.preventDefault();
    const index = ORDERED_ROLE_IDS.indexOf(selectedId);
    selectRole(roleIdAt(index + delta), true);
  }

  return (
    <section aria-labelledby="responsibility-map-title">
      <h2 id="responsibility-map-title" className="text-2xl font-semibold tracking-tight">
        {RESPONSIBILITY_MAP_INTRO.title}
      </h2>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink/80">
        {RESPONSIBILITY_MAP_INTRO.lead}
      </p>

      <div
        role="radiogroup"
        aria-label="Stakeholder-Map"
        onKeyDown={onGroupKeyDown}
        className="mt-10 space-y-8"
      >
        {RESPONSIBILITY_GROUPS.map((group) => (
          <div key={group.id}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
              {group.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{group.description}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.roles.map((roleId) => {
                const role = ROLE_BY_ID.get(roleId);
                if (!role) return null;
                const active = role.id === selectedId;
                return (
                  <button
                    key={role.id}
                    id={`responsibility-role-${role.id}`}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => selectRole(role.id)}
                    className={`vv-box flex min-h-[5.5rem] flex-col justify-center px-5 py-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                      active
                        ? "bg-fhnw"
                        : "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sketch-lg"
                    }`}
                  >
                    <span className="font-medium leading-snug">{role.title}</span>
                    <span className="mt-1 text-sm text-ink/70">{role.subtitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <ol className="mt-10 grid gap-6 sm:grid-cols-3" aria-label="Freigabekette">
        {RESPONSIBILITY_FLOW.map((step) => (
          <li key={step.title} className="border-t-2 border-ink pt-4">
            <p className="font-medium">{step.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="vv-box mt-8 px-6 py-6 sm:px-8 sm:py-7" aria-live="polite">
        <h3 className="text-xl font-semibold tracking-tight">{selected.title}</h3>
        <div className="mt-5 grid gap-8 sm:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-muted">Muss</h4>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
              {selected.must.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Grenze der Rolle
            </h4>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-ink/70">
              {selected.boundary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm text-muted">
        <span>Grundlagen:</span>
        {RESPONSIBILITY_SOURCES.map((source) => (
          <a
            key={source.href}
            href={source.href}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-ink"
          >
            {source.label}
          </a>
        ))}
      </p>
    </section>
  );
}
