import { connection, type ConnectionForm } from "@/app/content";
import { ConnectionDiagram } from "./ConnectionDiagram";
import { OnpremDiagram } from "./OnpremDiagram";
import { StatusBadge } from "./StatusBadge";

function FormHeader({ form, tone }: { form: ConnectionForm; tone: "primary" | "pending" }) {
  const badge = tone === "primary" ? "bg-blue-700 text-white" : "bg-amber-500 text-white";
  const status =
    tone === "primary"
      ? "bg-blue-50 text-blue-800 ring-blue-700/30"
      : "bg-amber-50 text-amber-900 ring-amber-600/40";
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span
          aria-hidden="true"
          className={`flex size-9 items-center justify-center rounded-full font-bold ${badge}`}
        >
          {form.key}
        </span>
        <h3 className="text-xl font-bold text-slate-900">
          <span className="sr-only">形 {form.key}: </span>
          {form.name}
        </h3>
        <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ring-1 ring-inset ${status}`}>
          {form.status}
        </span>
      </div>
      <p className="mt-3 text-slate-700">{form.summary}</p>
    </div>
  );
}

const splitStyles = {
  gaixer: { card: "border-amber-500 bg-white", title: "text-amber-900", dot: "bg-amber-500" },
  appthrust: { card: "border-blue-700 bg-white", title: "text-blue-800", dot: "bg-blue-700" },
  overlap: { card: "border-slate-500 bg-slate-50", title: "text-slate-900", dot: "bg-slate-500" },
} as const;

export function Connection() {
  const { formA, match, onprem, formB, split } = connection;
  return (
    <div className="space-y-12">
      {/* 形 A */}
      <section aria-label={`形 ${formA.key}`} className="space-y-6">
        <FormHeader form={formA} tone="primary" />
        <ConnectionDiagram />

        <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-slate-200 break-inside-avoid">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="px-4 pt-4 pb-2 text-left font-bold text-slate-900">{match.title}</caption>
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th scope="col" className="w-1/2 px-4 py-3 font-semibold text-amber-900">
                  {match.labels.gaixer}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-blue-800">
                  {match.labels.appthrust}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {match.rows.map((row) => (
                <tr key={row.gaixer} className="align-top">
                  <td className="px-4 py-3 font-semibold text-slate-900">{row.gaixer}</td>
                  <td className="px-4 py-3 text-slate-700">{row.appthrust}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-4 pt-1 pb-4 text-xs text-slate-500">{match.note}</p>
        </div>

        {/* AppThrust のオンプレ配置 */}
        <div className="space-y-6 pt-4">
          <div>
            <h4 className="text-lg font-bold text-slate-900">{onprem.title}</h4>
            <p className="mt-2 text-slate-700">{onprem.lead}</p>
          </div>
          <OnpremDiagram />
          <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="break-inside-avoid">
              <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-slate-200">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <caption className="px-4 pt-4 pb-2 text-left font-bold text-slate-900">
                    {onprem.specs.title}
                  </caption>
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th scope="col" className="w-1/4 px-4 py-3 font-semibold">
                        {onprem.specs.labels.item}
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        {onprem.specs.labels.value}
                      </th>
                      <th scope="col" className="w-24 px-4 py-3 font-semibold">
                        {onprem.specs.labels.status}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {onprem.specs.rows.map((row) => (
                      <tr key={row.item} className="align-top">
                        <th scope="row" className="px-4 py-3 font-bold text-slate-900">
                          {row.item}
                        </th>
                        <td className="px-4 py-3 text-slate-700">{row.value}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={row.status} size="sm" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-slate-500">{onprem.specs.note}</p>
            </div>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 break-inside-avoid">
              <h5 className="font-bold text-slate-900">{onprem.requirements.title}</h5>
              <dl className="mt-3 space-y-3">
                {onprem.requirements.items.map((item) => (
                  <div key={item.title} className="border-l-2 border-slate-300 pl-3">
                    <dt className="text-sm font-semibold text-slate-900">{item.title}</dt>
                    <dd className="mt-0.5 text-sm text-slate-700">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 形 B */}
      <section aria-label={`形 ${formB.key}`} className="space-y-6">
        <FormHeader form={formB} tone="pending" />
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="break-inside-avoid">
            <p className="text-xs font-semibold text-slate-500">{formB.stackLabel}</p>
            <ol className="mt-2 flex flex-col gap-1.5">
              {formB.stack.map((row) => (
                <li
                  key={row.layer}
                  className={
                    row.highlight
                      ? "rounded-lg border-2 border-dashed border-blue-700 bg-blue-50 px-4 py-2.5"
                      : "rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5"
                  }
                >
                  <p className={`text-sm font-bold ${row.highlight ? "text-blue-800" : "text-amber-900"}`}>
                    {row.layer}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-700">{row.content}</p>
                </li>
              ))}
            </ol>
          </div>
          <aside
            aria-labelledby="connection-verify-title"
            className="rounded-2xl border-2 border-amber-500 bg-amber-50 p-6 break-inside-avoid"
          >
            <h4 id="connection-verify-title" className="font-bold text-amber-900">
              {formB.verify.title}
            </h4>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-800 marker:font-semibold marker:text-amber-700">
              {formB.verify.items.map((item) => (
                <li key={item.title}>
                  <span className="font-semibold text-slate-900">{item.title}: </span>
                  {item.body}
                </li>
              ))}
            </ol>
          </aside>
        </div>
        <p className="text-sm font-semibold text-blue-800">{formB.note}</p>
      </section>

      {/* 分担 */}
      <section aria-labelledby="connection-split-title">
        <h3 id="connection-split-title" className="text-lg font-bold text-slate-900">
          {split.title}
        </h3>
        <p className="mt-1 text-sm text-slate-600">{split.lead}</p>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {split.columns.map((column) => {
            const style = splitStyles[column.key];
            return (
              <li
                key={column.key}
                className={`rounded-xl border-t-4 p-5 shadow-sm ring-1 ring-slate-200 break-inside-avoid ${style.card}`}
              >
                <h4 className={`font-bold ${style.title}`}>{column.title}</h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className={`mt-2 size-1.5 shrink-0 rounded-full ${style.dot}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm font-semibold text-slate-900">{split.note}</p>
      </section>
    </div>
  );
}
