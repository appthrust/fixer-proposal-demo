import { architecture } from "@/app/content";

export function ValueProps() {
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {architecture.valueProps.map((prop) => (
        <li
          key={prop.title}
          className="rounded-xl border-t-4 border-blue-700 bg-white p-5 shadow-sm ring-1 ring-slate-200 break-inside-avoid"
        >
          <h3 className="font-bold text-slate-900">{prop.title}</h3>
          <p className="mt-2 text-sm text-slate-700">{prop.body}</p>
        </li>
      ))}
    </ul>
  );
}
