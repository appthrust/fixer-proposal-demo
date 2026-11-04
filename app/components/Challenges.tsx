import {
  challengeLabels,
  challenges,
  challengesHeading,
  sourceRefs,
} from "@/app/content";

function refIndex(id: string): number {
  const index = sourceRefs.findIndex((ref) => ref.id === id);
  if (index < 0) {
    throw new Error(`Unknown source ref: ${id}`);
  }
  return index + 1;
}

export function Challenges() {
  return (
    <div className="mt-14 print:mt-8">
      <h3 className="text-xl font-bold text-slate-900">
        {challengesHeading.title}
      </h3>
      <p className="mt-2 text-slate-600">{challengesHeading.lead}</p>
      <ol className="mt-6 grid gap-4 lg:grid-cols-2">
        {challenges.map((challenge, index) => (
          <li
            key={challenge.id}
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 break-inside-avoid"
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-900 tabular-nums text-sm font-bold text-white"
              >
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="pt-0.5 font-bold text-slate-900">
                  {challenge.title}
                </h4>
                <span
                  className={
                    challenge.basis === "stated"
                      ? "mt-1 inline-block rounded px-1.5 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-800"
                      : "mt-1 inline-block rounded px-1.5 py-0.5 text-[11px] font-semibold bg-amber-50 text-amber-800"
                  }
                >
                  {challengeLabels[challenge.basis]}
                </span>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-700">{challenge.body}</p>

            <h5 className="mt-4 text-xs font-semibold tracking-wide text-slate-500">
              {challengeLabels.evidence}
            </h5>
            <ul className="mt-1.5 space-y-1.5">
              {challenge.evidence.map((item, i) => {
                const n = refIndex(item.ref);
                return (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <span aria-hidden="true" className="shrink-0 text-slate-400">
                      •
                    </span>
                    <span>
                      {item.fact}
                      <a
                        href={`#source-${item.ref}`}
                        className="ml-1 whitespace-nowrap text-xs text-slate-500 underline decoration-slate-300 underline-offset-2"
                      >
                        [{n}
                        {item.locator ? ` ${item.locator}` : ""}]
                      </a>
                    </span>
                  </li>
                );
              })}
            </ul>

            <h5 className="mt-4 text-xs font-semibold tracking-wide text-slate-500">
              {challengeLabels.inference}
            </h5>
            <p className="mt-1.5 text-sm text-slate-700">{challenge.inference}</p>

            <h5 className="mt-4 text-xs font-semibold tracking-wide text-slate-500">
              {challengeLabels.why}
            </h5>
            <p className="mt-1.5 rounded-lg bg-slate-50 p-3 text-sm text-slate-800">
              {challenge.why}
            </p>
          </li>
        ))}
      </ol>

      <h4 className="mt-8 text-sm font-semibold text-slate-700">
        {challengeLabels.sources}
      </h4>
      <ol className="mt-2 space-y-1 text-xs text-slate-600">
        {sourceRefs.map((ref, i) => (
          <li key={ref.id} id={`source-${ref.id}`} className="flex gap-2">
            <span className="shrink-0 tabular-nums">[{i + 1}]</span>
            <span>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-slate-300 underline-offset-2 hover:text-slate-900"
              >
                {ref.label}
              </a>
              <span className="ml-1 text-slate-400">({ref.date})</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
