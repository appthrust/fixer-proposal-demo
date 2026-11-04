import { comparison, type ComparisonRow } from "@/app/content";

export function Comparison() {
  const { title, labels, rows, note } = comparison;
  return (
    <div className="mt-14 print:mt-8">
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white max-md:border-0 max-md:bg-transparent">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-100 text-xs font-semibold text-slate-600 max-md:sr-only">
            <tr>
              <th scope="col" className="w-[22%] px-5 py-3">
                {labels.aspect}
              </th>
              <th scope="col" className="w-[39%] px-5 py-3">
                {labels.nocode}
              </th>
              <th scope="col" className="px-5 py-3">
                {labels.appthrust}
              </th>
            </tr>
          </thead>
          <tbody className="md:divide-y md:divide-slate-200 max-md:space-y-3">
            {rows.map((row) => (
              <tr
                key={row.aspect}
                className="break-inside-avoid max-md:grid max-md:overflow-hidden max-md:rounded-xl max-md:border max-md:border-slate-200 max-md:bg-white"
              >
                <th
                  scope="row"
                  className="align-top font-bold text-slate-900 max-md:border-b max-md:border-slate-200 max-md:bg-slate-50 max-md:px-4 max-md:py-3 md:px-5 md:py-4"
                >
                  {row.aspect}
                </th>
                <ComparisonCell
                  row={row}
                  side="nocode"
                  label={labels.nocode}
                  advantageLabel={labels.advantage}
                />
                <ComparisonCell
                  row={row}
                  side="appthrust"
                  label={labels.appthrust}
                  advantageLabel={labels.advantage}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <p className="mt-4 text-sm text-slate-500">{note}</p> : null}
    </div>
  );
}

function ComparisonCell({
  row,
  side,
  label,
  advantageLabel,
}: {
  row: ComparisonRow;
  side: "nocode" | "appthrust";
  label: string;
  advantageLabel: string;
}) {
  const advantaged = row.advantage === side;
  return (
    <td
      className={`align-top max-md:px-4 max-md:py-3 md:px-5 md:py-4 ${
        side === "appthrust" ? "max-md:border-t max-md:border-slate-200" : ""
      } ${advantaged ? "bg-emerald-50/70 text-slate-900" : "text-slate-700"}`}
    >
      <span
        aria-hidden="true"
        className="mb-1 block text-xs font-semibold text-slate-500 md:hidden"
      >
        {label}
      </span>
      <span className="flex gap-2">
        {advantaged ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="mt-0.5 size-4 shrink-0 text-emerald-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        ) : null}
        <span>
          {advantaged ? <span className="sr-only">{advantageLabel}: </span> : null}
          {side === "nocode" ? row.nocode : row.appthrust}
        </span>
      </span>
    </td>
  );
}
