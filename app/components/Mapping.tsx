import { challenges, mapping, mappingLabels, type Chip } from "@/app/content";
import { StatusBadge } from "./StatusBadge";

export function Mapping() {
  return (
    <div>
      <div
        aria-hidden="true"
        className="mb-3 hidden text-xs font-semibold text-slate-500 md:grid md:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1.6fr)]"
      >
        <span>{mappingLabels.challenge}</span>
        <span />
        <span>{mappingLabels.proposal}</span>
      </div>
      <ol className="space-y-3">
        {mapping.map((row) => {
          const index = challenges.findIndex((c) => c.id === row.challengeId);
          const challenge = challenges[index];
          if (!challenge) {
            throw new Error(`Unknown challenge id in mapping: ${row.challengeId}`);
          }
          return (
            <li
              key={row.challengeId}
              className="grid gap-1 break-inside-avoid md:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1.6fr)] md:gap-0"
            >
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <span
                  aria-hidden="true"
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-900 tabular-nums text-sm font-bold text-white"
                >
                  {index + 1}
                </span>
                <p className="font-bold text-slate-900">
                  <span className="sr-only">{mappingLabels.challenge}: </span>
                  {challenge.title}
                </p>
              </div>
              <Connector />
              <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4">
                <p className="text-sm text-slate-800">
                  <span className="sr-only">{mappingLabels.proposal}: </span>
                  {row.proposal}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {row.chips.map((chip) => (
                    <FeatureChip key={chip.label} chip={chip} />
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Connector() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center py-0.5 text-blue-700 md:py-0"
    >
      <svg
        viewBox="0 0 56 24"
        className="hidden h-6 w-14 md:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h44M42 6l6 6-6 6" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="size-5 md:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 4v15M6 13l6 6 6-6" />
      </svg>
    </div>
  );
}

function FeatureChip({ chip }: { chip: Chip }) {
  return (
    <li
      className={`inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white py-0.5 pl-2.5 text-xs font-medium text-blue-900 ${
        chip.status ? "pr-1" : "pr-2.5"
      }`}
    >
      {chip.label}
      {chip.status ? <StatusBadge status={chip.status} size="sm" /> : null}
    </li>
  );
}
