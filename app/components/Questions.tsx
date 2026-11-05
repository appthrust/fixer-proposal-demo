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
            <ul className="mt-2 space-y-1 text-sm text-slate-800">
              {item.details.map((detail) => (
                <li key={detail} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-700" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate-600">{item.why}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
