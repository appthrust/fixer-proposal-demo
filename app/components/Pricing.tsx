import { pricing, pricingLabels } from "@/app/content";
import { formatYen, quote, type PriceInputs } from "@/app/pricing";
import { PricingCalculator } from "./PricingCalculator";

const priceInputs: PriceInputs = {
  basePrice: pricing.basePrice,
  includedApps: pricing.includedApps,
  perAppPrice: pricing.perAppPrice,
  annualDiscountPercent: pricing.annualDiscountPercent,
};

export function Pricing() {
  const references = pricing.referenceApps.map((apps) => quote(apps, priceInputs));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 break-inside-avoid">
          <h3 className="font-bold text-slate-900">{pricing.planName}</h3>

          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-xs font-semibold text-slate-500">
                {pricingLabels.base}
              </dt>
              <dd className="mt-1 flex flex-wrap items-baseline gap-x-2">
                <span className="tabular-nums text-4xl font-bold text-blue-800">
                  {formatYen(pricing.basePrice)}
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {pricingLabels.baseUnit}
                </span>
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                  {pricing.includedApps} {pricingLabels.includedSuffix}
                </span>
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt className="text-xs font-semibold text-slate-500">
                  {pricingLabels.perApp}
                </dt>
                <dd className="mt-1 flex items-baseline gap-x-1.5">
                  <span className="tabular-nums text-2xl font-bold text-slate-900">
                    {formatYen(pricing.perAppPrice)}
                  </span>
                  <span className="text-sm text-slate-700">
                    {pricingLabels.perAppUnit}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-slate-500">
                  {pricingLabels.annual}
                </dt>
                <dd className="mt-1 flex items-baseline gap-x-1">
                  <span className="tabular-nums text-2xl font-bold text-slate-900">
                    {pricing.annualDiscountPercent}
                  </span>
                  <span className="text-sm text-slate-700">
                    {pricingLabels.annualSuffix}
                  </span>
                </dd>
              </div>
            </div>
          </dl>

          <ul className="mt-5 space-y-1.5 border-t border-slate-200 pt-4 text-sm text-slate-700">
            {pricing.notes.map((note) => (
              <li key={note} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-slate-400"
                />
                <span>{note}</span>
              </li>
            ))}
          </ul>

          <h4 className="mt-5 text-xs font-semibold text-slate-500">
            {pricingLabels.includes}
          </h4>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {pricing.includes.map((item) => (
              <li
                key={item}
                className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-800"
              >
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs text-slate-500">{pricing.taxNote}</p>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-2 rounded-2xl bg-white px-6 py-4 ring-1 ring-slate-200 break-inside-avoid">
          <p className="font-bold text-slate-900">
            {pricing.community.name}
            <span className="ml-3 text-emerald-700">{pricing.community.price}</span>
          </p>
          <p className="text-sm text-slate-600">{pricing.community.note}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <PricingCalculator
          inputs={priceInputs}
          min={pricing.calculator.min}
          max={pricing.calculator.max}
          defaultApps={pricing.calculator.defaultApps}
          labels={{
            title: pricingLabels.calculatorTitle,
            appsLabel: pricingLabels.calculatorAppsLabel,
            appsUnit: pricingLabels.appsUnit,
            monthly: pricingLabels.monthly,
            yearly: pricingLabels.yearly,
            yen: pricingLabels.yen,
            base: pricingLabels.base,
            extra: pricingLabels.extra,
          }}
        />

        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 break-inside-avoid">
          <table className="w-full text-sm">
            <caption className="px-5 pt-4 text-left text-xs font-semibold text-slate-500">
              {pricingLabels.referenceTitle}（{pricingLabels.taxExcluded}）
            </caption>
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-500">
                <th scope="col" className="px-5 py-2 text-left font-semibold">
                  {pricingLabels.referenceApps}
                </th>
                <th scope="col" className="px-5 py-2 text-right font-semibold">
                  {pricingLabels.monthly}
                </th>
                <th scope="col" className="px-5 py-2 text-right font-semibold">
                  {pricingLabels.yearly}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {references.map((row) => (
                <tr key={row.apps}>
                  <th scope="row" className="px-5 py-2.5 text-left font-semibold text-slate-900">
                    {row.apps} {pricingLabels.appsUnit}
                  </th>
                  <td className="px-5 py-2.5 text-right tabular-nums text-slate-900">
                    {formatYen(row.monthly)} {pricingLabels.yen}
                  </td>
                  <td className="px-5 py-2.5 text-right tabular-nums text-slate-900">
                    {formatYen(row.annual)} {pricingLabels.yen}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
