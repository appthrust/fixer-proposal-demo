import { hero } from "@/app/content";
import { containerClass } from "./Section";

export function Hero() {
  return (
    <header
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-blue-700"
      />
      <div className={`${containerClass} py-16 sm:py-24 print:py-10`}>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 ring-1 ring-slate-200">
            {hero.customer}
          </span>
          <time
            dateTime={hero.date}
            className="rounded-full bg-white px-3 py-1 tabular-nums text-slate-600 ring-1 ring-slate-200"
          >
            {hero.date}
          </time>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900 sm:text-5xl">
          {hero.title}
        </h1>

        <p className="mt-6 max-w-4xl border-l-4 border-blue-700 pl-5 text-xl font-semibold text-balance text-blue-800 sm:text-2xl">
          {hero.thesis}
        </p>

        <p className="mt-6 max-w-3xl text-base text-slate-600 sm:text-lg">
          {hero.coexistence}
        </p>

        <ol className="mt-10 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
          {hero.flow.map((step, index) => {
            const isPartner = index === 0;
            return (
              <li key={step.role} className="contents">
                {index > 0 ? <FlowArrow /> : null}
                <div
                  className={`rounded-xl p-5 break-inside-avoid ${
                    isPartner
                      ? "bg-white ring-1 ring-slate-300"
                      : "bg-blue-700 text-white"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold ${
                      isPartner ? "text-slate-500" : "text-blue-100"
                    }`}
                  >
                    {step.product}
                  </p>
                  <p
                    className={`mt-1 text-lg font-bold ${
                      isPartner ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {step.role}
                  </p>
                  <p
                    className={`mt-1 text-sm ${
                      isPartner ? "text-slate-600" : "text-blue-50"
                    }`}
                  >
                    {step.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-10 text-sm text-slate-500">{hero.presenter}</p>
      </div>
    </header>
  );
}

function FlowArrow() {
  return (
    <span
      aria-hidden="true"
      className="flex items-center justify-center text-blue-700"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-6 rotate-90 md:rotate-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}
