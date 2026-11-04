import {
  featureTableLabels,
  features,
  ui,
  type FeatureStatus as Status,
} from "@/app/content";
import { StatusBadge } from "./StatusBadge";

const statusOrder: Status[] = ["available", "developing", "planned"];

export function FeatureStatus() {
  return (
    <div>
      <ul aria-label={ui.statusSummaryAria} className="mb-5 flex flex-wrap gap-2">
        {statusOrder.map((status) => (
          <li
            key={status}
            className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm ring-1 ring-slate-200"
          >
            <StatusBadge status={status} />
            <span className="tabular-nums font-semibold text-slate-900">
              {features.filter((f) => f.status === status).length}
            </span>
          </li>
        ))}
      </ul>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-100 text-xs font-semibold text-slate-600 max-md:sr-only">
            <tr>
              <th scope="col" className="w-[30%] px-5 py-3">
                {featureTableLabels.name}
              </th>
              <th scope="col" className="px-5 py-3">
                {featureTableLabels.description}
              </th>
              <th scope="col" className="w-[22%] px-5 py-3">
                {featureTableLabels.status}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {features.map((feature) => (
              <tr
                key={feature.name}
                className="break-inside-avoid max-md:grid max-md:gap-1.5 max-md:px-5 max-md:py-4"
              >
                <th
                  scope="row"
                  className="align-top font-bold text-slate-900 md:px-5 md:py-4"
                >
                  {feature.name}
                </th>
                <td className="align-top text-slate-700 md:px-5 md:py-4">
                  {feature.description}
                </td>
                <td className="align-top md:px-5 md:py-4">
                  <StatusBadge status={feature.status} />
                  {feature.note ? (
                    <p className="mt-1.5 text-xs text-slate-500">{feature.note}</p>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
