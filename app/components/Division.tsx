import { division } from "@/app/content";
import { StatusBadge } from "./StatusBadge";

export function Division() {
  const { labels, rows, note } = division;
  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white max-md:border-0 max-md:bg-transparent">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-100 text-xs font-semibold text-slate-600 max-md:sr-only">
            <tr>
              <th scope="col" className="w-[24%] px-5 py-3">
                {labels.task}
              </th>
              <th scope="col" className="w-[38%] px-5 py-3">
                {labels.department}
              </th>
              <th scope="col" className="bg-blue-50 px-5 py-3 text-blue-900">
                {labels.platform}
              </th>
            </tr>
          </thead>
          <tbody className="md:divide-y md:divide-slate-200 max-md:space-y-3">
            {rows.map((row) => (
              <tr
                key={row.task}
                className="break-inside-avoid max-md:grid max-md:overflow-hidden max-md:rounded-xl max-md:border max-md:border-slate-200 max-md:bg-white"
              >
                <th
                  scope="row"
                  className="align-top font-bold text-slate-900 max-md:flex max-md:flex-wrap max-md:items-center max-md:gap-2 max-md:border-b max-md:border-slate-200 max-md:bg-slate-50 max-md:px-4 max-md:py-3 md:px-5 md:py-4"
                >
                  <span>{row.task}</span>
                  {row.status ? (
                    <span className="md:mt-1.5 md:block">
                      <StatusBadge status={row.status} size="sm" />
                    </span>
                  ) : null}
                </th>
                <td className="align-top text-slate-700 max-md:px-4 max-md:py-3 md:px-5 md:py-4">
                  <CellLabel>{labels.department}</CellLabel>
                  {row.department}
                </td>
                <td className="bg-blue-50/60 align-top text-slate-800 max-md:border-t max-md:border-blue-100 max-md:px-4 max-md:py-3 md:px-5 md:py-4">
                  <CellLabel tone="blue">{labels.platform}</CellLabel>
                  {row.platform}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note ? (
        <p className="mt-6 rounded-2xl bg-slate-900 p-6 text-sm text-slate-300 break-inside-avoid">
          {note}
        </p>
      ) : null}
    </div>
  );
}

/** md 未満では表見出しが隠れるため、セル内に見出しを出す（支援技術は列見出しで読む）。 */
function CellLabel({
  children,
  tone = "slate",
}: {
  children: string;
  tone?: "slate" | "blue";
}) {
  return (
    <span
      aria-hidden="true"
      className={`mb-1 block text-xs font-semibold md:hidden ${
        tone === "blue" ? "text-blue-800" : "text-slate-500"
      }`}
    >
      {children}
    </span>
  );
}
