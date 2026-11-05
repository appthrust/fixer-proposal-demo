import { partnership } from "@/app/content";

export function Partnership() {
  const price = partnership.priceReference;
  return (
    <div>
      <ul className="grid gap-4 lg:grid-cols-3">
        {partnership.options.map((option) => (
          <li
            key={option.key}
            className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200 break-inside-avoid"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-full bg-blue-700 font-bold text-white"
              >
                {option.key}
              </span>
              <h3 className="text-xl font-bold text-slate-900">{option.name}</h3>
            </div>
            <p className="mt-3 text-slate-700">{option.summary}</p>
            <dl className="mt-4 divide-y divide-slate-200 rounded-xl ring-1 ring-slate-200">
              {option.points.map((point) => (
                <div key={point.label} className="grid grid-cols-[5rem_1fr] gap-3 px-4 py-2.5 text-sm">
                  <dt className="font-semibold text-slate-500">{point.label}</dt>
                  <dd className="text-slate-800">{point.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-blue-800">{option.fit}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-2xl bg-slate-900 p-6 text-white break-inside-avoid">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-bold">{price.title}</h3>
          <p className="text-sm text-slate-300">{price.plan}</p>
        </div>
        <dl className="mt-4 grid gap-3 sm:grid-cols-3">
          {price.lines.map((line) => (
            <div key={line.label} className="rounded-xl bg-white/10 px-4 py-3">
              <dt className="text-xs font-semibold text-slate-300">{line.label}</dt>
              <dd className="mt-1 font-bold tabular-nums">{line.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-slate-300">{price.note}</p>
      </div>
    </div>
  );
}
