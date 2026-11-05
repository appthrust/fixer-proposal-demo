import { background } from "@/app/content";

export function Background() {
  const gaixer = background.gaixer;
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <figure className="rounded-2xl bg-white p-6 ring-1 ring-slate-300 break-inside-avoid">
          <figcaption className="text-xs font-semibold text-slate-500">
            {background.proposal.label}
          </figcaption>
          <blockquote className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">
            「{background.proposal.quote}」
          </blockquote>
          <p className="mt-3 text-sm text-slate-600">{background.proposal.note}</p>
        </figure>

        <span aria-hidden="true" className="flex items-center justify-center text-blue-700">
          <svg
            viewBox="0 0 24 24"
            className="size-7 rotate-90 md:rotate-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </span>

        <div className="rounded-2xl bg-blue-700 p-6 text-white break-inside-avoid">
          <p className="text-xs font-semibold text-blue-100">{background.understanding.label}</p>
          <p className="mt-2 text-lg font-bold sm:text-xl">{background.understanding.summary}</p>
        </div>
      </div>

      <section
        aria-labelledby="background-gaixer-title"
        className="mt-8 rounded-2xl bg-white p-6 ring-1 ring-slate-200 break-inside-avoid"
      >
        <h3 id="background-gaixer-title" className="text-lg font-bold text-slate-900">
          {gaixer.title}
        </h3>
        <p className="mt-2 text-slate-700">{gaixer.summary}</p>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <p className="text-xs font-semibold text-slate-500">{gaixer.layersLabel}</p>
            <ol className="mt-2 flex flex-col-reverse gap-1.5">
              {gaixer.layers.map((layer) => (
                <li key={layer.name} className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5">
                  <p className="text-sm font-bold text-amber-900">{layer.name}</p>
                  <p className="mt-0.5 text-xs text-slate-700">{layer.role}</p>
                </li>
              ))}
            </ol>
          </div>
          <dl className="grid content-start gap-4">
            {gaixer.facts.map((fact) => (
              <div key={fact.title} className="border-l-2 border-amber-500 pl-3">
                <dt className="text-sm font-bold text-slate-900">{fact.title}</dt>
                <dd className="mt-1 text-sm text-slate-700">{fact.body}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-5 text-xs text-slate-500">{gaixer.source}</p>
      </section>

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {background.points.map((point) => (
          <li
            key={point.title}
            className="rounded-xl border-t-4 border-blue-700 bg-white p-5 shadow-sm ring-1 ring-slate-200 break-inside-avoid"
          >
            <h3 className="font-bold text-slate-900">{point.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{point.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
