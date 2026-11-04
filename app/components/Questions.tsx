import { questions } from "@/app/content";

export function Questions() {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {questions.map((item, index) => (
        <li
          key={item.topic}
          className="flex gap-4 rounded-xl bg-white p-5 ring-1 ring-slate-200 break-inside-avoid"
        >
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-50 tabular-nums font-bold text-blue-700"
          >
            {index + 1}
          </span>
          <div className="min-w-0 [overflow-wrap:anywhere]">
            <h3 className="text-sm font-semibold text-blue-700">{item.topic}</h3>
            <p className="mt-1 font-bold text-slate-900">{item.question}</p>
            <p className="mt-2 text-sm text-slate-600">{item.why}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
