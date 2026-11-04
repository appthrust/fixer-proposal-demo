import { pocPlan } from "@/app/content";

export function PocPlan() {
  return (
    <div className="mb-8 rounded-2xl bg-white p-6 ring-2 ring-blue-700 break-inside-avoid">
      <h3 className="text-lg font-bold text-slate-900">{pocPlan.title}</h3>
      <p className="mt-2 font-semibold text-blue-800">{pocPlan.goal}</p>
      <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {pocPlan.rows.map((row) => (
          <div key={row.label} className="border-l-2 border-slate-200 pl-3">
            <dt className="text-xs font-semibold text-slate-500">{row.label}</dt>
            <dd className="mt-0.5 text-sm text-slate-800">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
