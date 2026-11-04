import { useCases, type UseCase } from "@/app/content";

const kindChipStyles: Record<UseCase["kind"], string> = {
  template: "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-600/30",
  demo: "bg-blue-700 text-white",
  planned: "bg-white text-amber-900 ring-1 ring-inset ring-amber-500",
};

const cardStyles: Record<UseCase["kind"], string> = {
  template: "border border-slate-200 bg-white",
  demo: "border border-blue-300 bg-white shadow-sm ring-1 ring-blue-700/20",
  planned: "border border-dashed border-slate-300 bg-slate-50/60",
};

export function UseCases() {
  const { kindLabels, items, dataUse, labels } = useCases;
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.name}
            className={`flex flex-col rounded-xl p-5 break-inside-avoid ${cardStyles[item.kind]}`}
          >
            <span
              className={`self-start rounded-full px-2.5 py-0.5 text-xs font-semibold ${kindChipStyles[item.kind]}`}
            >
              {kindLabels[item.kind]}
            </span>
            <h3 className="mt-3 font-bold text-slate-900">{item.name}</h3>

            <div className="mt-3 flex flex-1 flex-col gap-1 text-sm">
              <p className="rounded-lg bg-slate-100 px-3 py-2 text-slate-600">
                {item.excelBefore}
              </p>
              <ArrowDown />
              <p className="rounded-lg bg-blue-50 px-3 py-2 font-medium text-slate-900">
                {item.appAfter}
              </p>
            </div>

            {item.kind === "demo" && item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-1.5 self-start rounded-lg bg-blue-700 px-3.5 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 print:bg-white print:p-0 print:text-blue-800"
              >
                {labels.open}
                <ExternalIcon />
                <span className="hidden print:inline">{item.url}</span>
              </a>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 break-inside-avoid">
        <h3 className="text-lg font-bold text-slate-900">{dataUse.title}</h3>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <DataUseList
            title={labels.nowAvailable}
            items={dataUse.available}
            dot="bg-emerald-500"
          />
          <DataUseList
            title={labels.planned}
            items={dataUse.planned}
            dot="bg-slate-400"
          />
        </div>
      </div>
    </div>
  );
}

function DataUseList({
  title,
  items,
  dot,
}: {
  title: string;
  items: string[];
  dot: string;
}) {
  return (
    <section>
      <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-600">
        <span aria-hidden="true" className={`size-2 rounded-full ${dot}`} />
        {title}
      </h4>
      <ul className="mt-2 space-y-1.5 text-sm text-slate-800">
        {items.map((text) => (
          <li key={text} className="flex gap-2">
            <span
              aria-hidden="true"
              className="mt-2 size-1.5 shrink-0 rounded-full bg-slate-300"
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ArrowDown() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mx-auto size-4 shrink-0 text-blue-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 print:hidden"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}
