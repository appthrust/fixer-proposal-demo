import { connection } from "@/app/content";
import { ConnectionDiagram } from "./ConnectionDiagram";

export function Connection() {
  return (
    <div>
      <ConnectionDiagram />

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {connection.points.map((point) => (
          <li
            key={point.title}
            className="rounded-xl border-t-4 border-blue-700 bg-white p-5 shadow-sm ring-1 ring-slate-200 break-inside-avoid"
          >
            <h3 className="font-bold text-slate-900">{point.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{point.body}</p>
          </li>
        ))}
      </ul>

      <aside
        aria-labelledby="connection-confirm-title"
        className="mt-8 rounded-2xl border-2 border-amber-500 bg-amber-50 p-6 break-inside-avoid"
      >
        <h3 id="connection-confirm-title" className="font-bold text-amber-900">
          {connection.confirm.title}
        </h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-800 marker:font-semibold marker:text-amber-700">
          {connection.confirm.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-amber-900">{connection.confirm.note}</p>
      </aside>
    </div>
  );
}
