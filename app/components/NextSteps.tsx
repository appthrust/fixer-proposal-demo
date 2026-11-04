import { contact, nextSteps } from "@/app/content";

export function NextSteps() {
  return (
    <div>
      <ol className="grid gap-4 md:grid-cols-3">
        {nextSteps.map((step, index) => (
          <li
            key={step.title}
            className="relative rounded-xl bg-white p-6 ring-1 ring-slate-200 break-inside-avoid"
          >
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-full bg-blue-700 tabular-nums font-bold text-white"
            >
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{step.body}</p>
            {index < nextSteps.length - 1 ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="absolute top-1/2 -right-[1.1rem] z-10 hidden size-5 -translate-y-1/2 text-blue-700 md:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col gap-1 rounded-2xl bg-blue-700 px-6 py-5 text-white break-inside-avoid sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-blue-100">{contact.lead}</p>
        <p className="sm:text-right">
          <span className="block text-lg font-bold">{contact.name}</span>
          <span className="block text-sm text-blue-100">{contact.company}</span>
        </p>
      </div>
    </div>
  );
}
