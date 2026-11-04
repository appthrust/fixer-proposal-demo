import { crossCutting, packageLabels, packages } from "@/app/content";

export function Packages() {
  return (
    <div>
      <ul className="grid gap-5 lg:grid-cols-3">
        {packages.map((pkg) => (
          <li
            key={pkg.key}
            className={`relative flex flex-col rounded-2xl bg-white p-6 break-inside-avoid ${
              pkg.recommended
                ? "shadow-lg ring-2 ring-blue-700"
                : "ring-1 ring-slate-200"
            }`}
          >
            {pkg.recommended ? (
              <span className="absolute -top-3 right-5 rounded-full bg-blue-700 px-3 py-0.5 text-xs font-bold text-white">
                {packageLabels.recommended}
              </span>
            ) : null}
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg tabular-nums text-lg font-bold ${
                  pkg.recommended
                    ? "bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                {pkg.key}
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                <span className="sr-only">{pkg.key}. </span>
                {pkg.name}
              </h3>
            </div>

            <dl className="mt-5 flex flex-1 flex-col gap-4 text-sm">
              <div>
                <dt className="text-xs font-semibold text-slate-500">
                  {packageLabels.audience}
                </dt>
                <dd className="mt-1 font-semibold text-slate-900">
                  {pkg.audience}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-slate-500">
                  {packageLabels.content}
                </dt>
                <dd className="mt-1 text-slate-800">
                  <p>{pkg.summary}</p>
                  <ul className="mt-2 space-y-1.5">
                    {pkg.points.map((point) => (
                      <li key={point} className="flex gap-2 text-slate-700">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue-700"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="mt-auto rounded-lg bg-slate-50 p-4">
                <dt className="text-xs font-semibold text-slate-500">
                  {packageLabels.poc}
                </dt>
                <dd>
                  <ol className="mt-1 space-y-1">
                    {pkg.pocExamples.map((example) => (
                      <li key={example} className="font-medium text-slate-900">
                        {example}
                      </li>
                    ))}
                  </ol>
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-slate-900 p-6 text-white break-inside-avoid md:flex-row md:items-center md:justify-between">
        <div className="md:max-w-md">
          <h3 className="font-bold">{crossCutting.title}</h3>
          <p className="mt-1 text-sm text-slate-300">{crossCutting.body}</p>
        </div>
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {crossCutting.steps.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              {index > 0 ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-4 text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              ) : null}
              <span className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
