import { facts, ui } from "@/app/content";

export function FactCards() {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {facts.map((fact, index) => (
        <div
          key={fact.label}
          className={`flex flex-col rounded-xl border border-slate-200 bg-white p-5 break-inside-avoid ${
            index < 3 ? "lg:col-span-2" : "lg:col-span-3"
          }`}
        >
          <dt className="order-2 mt-2 text-sm font-semibold text-slate-800">
            {fact.label}
          </dt>
          <dd className="order-1 text-2xl font-bold text-blue-800 sm:text-3xl">
            {fact.value}
          </dd>
          <dd className="order-3 mt-1 text-sm text-slate-600">{fact.note}</dd>
          <dd className="order-4 mt-auto pt-3 text-xs text-slate-500">
            {ui.source}: {fact.source}
          </dd>
        </div>
      ))}
    </dl>
  );
}
