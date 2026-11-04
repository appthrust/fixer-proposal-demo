import { company } from "@/app/content";

export function Company() {
  return (
    <div>
      <p className="text-lg font-bold text-slate-900">
        {company.name}
        <span className="ml-2 text-sm font-normal text-slate-500">
          {company.nameEn}
        </span>
      </p>
      <p className="mt-1 text-slate-700">{company.tagline}</p>

      <h3 className="mt-8 text-sm font-semibold tracking-wide text-slate-500">
        {company.labels.certifications}
      </h3>
      <ul className="mt-3 grid gap-4 md:grid-cols-2">
        {company.certifications.map((cert) => (
          <li
            key={cert.number}
            className="flex gap-4 rounded-xl bg-white p-5 ring-1 ring-slate-200 break-inside-avoid"
          >
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </span>
            <div>
              <p className="font-bold text-slate-900">
                {cert.label}
                <span className="ml-2 text-sm font-normal tabular-nums text-slate-500">
                  {cert.number}
                </span>
              </p>
              <p className="mt-1 text-sm text-slate-700">{cert.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold tracking-wide text-slate-500">
            {company.labels.overview}
          </h3>
          <dl className="mt-3 divide-y divide-slate-200 rounded-xl bg-white ring-1 ring-slate-200">
            {company.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[7rem_1fr] gap-3 px-5 py-3 text-sm">
                <dt className="text-slate-500">{fact.label}</dt>
                <dd className="text-slate-800">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-slate-500">
              {company.labels.business}
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-800">
              {company.business.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-blue-700">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-slate-500">
              {company.labels.customers}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {company.customers.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-white px-3 py-1 text-sm text-slate-800 ring-1 ring-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-slate-500">{company.labels.source}</p>
    </div>
  );
}
