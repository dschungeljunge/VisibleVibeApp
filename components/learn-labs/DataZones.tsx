import {
  DATA_CONTEXT_NOTE,
  DATA_ZONES,
  DATA_ZONES_INTRO,
  type DataZoneId,
} from "@/lib/learn-labs/datenschutz";

const ZONE_DOT: Record<DataZoneId, string> = {
  free: "bg-emerald-500",
  approval: "bg-fhnw",
  taboo: "bg-red-500",
};

export function DataZones() {
  return (
    <section aria-labelledby="data-zones-title">
      <h2 id="data-zones-title" className="text-2xl font-semibold tracking-tight">
        {DATA_ZONES_INTRO.title}
      </h2>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink/80">
        {DATA_ZONES_INTRO.lead}
      </p>

      <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {DATA_ZONES.map((zone) => (
          <div key={zone.id} className="border-t-2 border-ink pt-4">
            <h3 className="flex items-center gap-2.5 text-lg font-semibold">
              <span
                className={`h-2.5 w-2.5 rounded-full ${ZONE_DOT[zone.id]}`}
                aria-hidden
              />
              {zone.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{zone.line}</p>
            <ul className="mt-4 space-y-2 leading-relaxed">
              {zone.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-3xl leading-relaxed text-ink/80">{DATA_CONTEXT_NOTE}</p>
    </section>
  );
}
