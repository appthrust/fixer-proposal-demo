import { builtinApps } from "@/app/content";
import { StatusBadge } from "./StatusBadge";

export function BuiltinApps() {
  return (
    <div className="mt-12">
      <h3 className="text-lg font-bold text-slate-900">{builtinApps.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{builtinApps.lead}</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {builtinApps.items.map((app) => (
          <li
            key={app.name}
            className="flex flex-col gap-2 rounded-xl bg-white p-5 ring-1 ring-slate-200 break-inside-avoid"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-slate-900">{app.name}</p>
              <StatusBadge status={app.status} size="sm" />
            </div>
            <p className="text-sm text-slate-700">{app.role}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-slate-500">{builtinApps.note}</p>
    </div>
  );
}
