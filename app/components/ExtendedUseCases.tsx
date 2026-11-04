import { extendedUseCases, type FlowNodeKind } from "@/app/content";
import { FlowDiagram, FlowSwatch } from "./FlowDiagram";
import { StatusBadge } from "./StatusBadge";

export function ExtendedUseCases() {
  const { labels, items } = extendedUseCases;
  const legendKinds = Object.keys(labels.legend) as FlowNodeKind[];
  return (
    <div>
      <ul className="grid gap-5 lg:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-5 break-inside-avoid"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-slate-900">{item.name}</h3>
              <span className="mt-0.5">
                <StatusBadge status={item.status} size="sm" />
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-700">{item.summary}</p>

            <div className="-mx-5 mt-4 flex min-h-32 items-center border-y border-slate-100 bg-slate-50/70 px-1 py-2">
              <FlowDiagram
                flow={item.flow}
                boundaryAfter={item.boundaryAfter}
                boundaryLabel={labels.boundary}
                title={`${item.name}: ${item.flow.map((node) => node.label).join(" → ")}`}
              />
            </div>

            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="text-xs font-semibold text-slate-500">{labels.basis}</dt>
                <dd className="mt-0.5 text-slate-600">{item.basis}</dd>
              </div>
              {item.caveat ? (
                <div>
                  <dt className="text-xs font-semibold text-slate-500">{labels.caveat}</dt>
                  <dd className="mt-0.5 text-slate-600">{item.caveat}</dd>
                </div>
              ) : null}
            </dl>
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">
        {legendKinds.map((kind) => (
          <li key={kind} className="inline-flex items-center gap-1.5">
            <FlowSwatch kind={kind} />
            {labels.legend[kind]}
          </li>
        ))}
      </ul>
    </div>
  );
}
