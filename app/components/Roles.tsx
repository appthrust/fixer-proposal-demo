import { roles } from "@/app/content";

export function Roles() {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-slate-200">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th scope="col" className="w-1/4 px-4 py-3 font-semibold">
                {roles.labels.area}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {roles.labels.fixer}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-blue-800">
                {roles.labels.appthrust}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {roles.rows.map((row) => (
              <tr key={row.area} className="align-top">
                <th scope="row" className="px-4 py-3 font-bold text-slate-900">
                  {row.area}
                </th>
                <td className="px-4 py-3 text-slate-700">{row.fixer}</td>
                <td className="px-4 py-3 text-slate-700">{row.appthrust}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-slate-600">{roles.note}</p>
    </div>
  );
}
