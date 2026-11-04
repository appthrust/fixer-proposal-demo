import { pocTerms, pocTermsLabels, pocTimeline } from "@/app/content";

export function PocTimeline() {
  return (
    <div>
      <ol className="grid gap-4 md:grid-cols-[1fr_1.8fr_1fr_1fr] md:gap-3">
        {pocTimeline.map((phase, index) => {
          const isLast = index === pocTimeline.length - 1;
          return (
            <li key={phase.label} className="flex flex-col break-inside-avoid">
              <div aria-hidden="true" className="mb-3 hidden items-center md:flex">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full tabular-nums text-sm font-bold ${
                    phase.highlight
                      ? "bg-blue-700 text-white"
                      : "bg-white text-blue-800 ring-2 ring-blue-700"
                  }`}
                >
                  {index + 1}
                </span>
                {isLast ? null : (
                  <span className="ml-2 h-0.5 flex-1 bg-blue-200" />
                )}
              </div>
              <div
                className={`flex-1 rounded-xl p-5 ${
                  phase.highlight
                    ? "bg-blue-700 text-white"
                    : "bg-white ring-1 ring-slate-200"
                }`}
              >
                <h3 className="flex flex-wrap items-baseline gap-x-2 text-lg font-bold">
                  <span>{phase.label}</span>
                  {phase.period ? (
                    <span
                      className={`text-sm font-semibold ${
                        phase.highlight ? "text-blue-100" : "text-slate-500"
                      }`}
                    >
                      {phase.period}
                    </span>
                  ) : null}
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className={
                        phase.highlight
                          ? "rounded-lg bg-white/10 px-3 py-2 text-white ring-1 ring-white/20"
                          : "text-slate-700"
                      }
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 break-inside-avoid">
        <h3 className="font-bold text-slate-900">{pocTermsLabels.title}</h3>
        <dl className="mt-4 grid gap-y-1 text-sm md:grid-cols-[auto_1fr] md:gap-x-8 md:gap-y-3">
          <dt className="font-semibold text-slate-500">{pocTermsLabels.plan}</dt>
          <dd className="text-slate-900">{pocTerms.plan}</dd>
          <dt className="mt-3 font-semibold text-slate-500 md:mt-0">
            {pocTermsLabels.environment}
          </dt>
          <dd className="text-slate-900">{pocTerms.environment}</dd>
          <dt className="mt-3 font-semibold text-slate-500 md:mt-0">
            {pocTermsLabels.includes}
          </dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {pocTerms.includes.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-800"
                >
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  );
}
