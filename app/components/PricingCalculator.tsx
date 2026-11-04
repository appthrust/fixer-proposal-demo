"use client";

import { useId, useState } from "react";
import { formatYen, quote, type PriceInputs } from "@/app/pricing";

export type PricingCalculatorLabels = {
  title: string;
  appsLabel: string;
  appsUnit: string;
  monthly: string;
  yearly: string;
  yen: string;
  base: string;
  extra: string;
};

type PricingCalculatorProps = {
  inputs: PriceInputs;
  min: number;
  max: number;
  defaultApps: number;
  labels: PricingCalculatorLabels;
};

export function PricingCalculator({
  inputs,
  min,
  max,
  defaultApps,
  labels,
}: PricingCalculatorProps) {
  const [draft, setDraft] = useState(String(defaultApps));
  const [apps, setApps] = useState(defaultApps);
  const rangeId = useId();

  const updateFromRange = (value: number) => {
    setApps(value);
    setDraft(String(value));
  };

  const updateFromNumber = (raw: string) => {
    setDraft(raw);
    const parsed = Number(raw);
    if (raw.trim() !== "" && Number.isFinite(parsed)) {
      setApps(Math.min(max, Math.max(min, Math.round(parsed))));
    }
  };

  const result = quote(apps, inputs);

  return (
    <div className="rounded-2xl bg-white p-6 ring-2 ring-blue-700 break-inside-avoid">
      <h3 className="font-bold text-slate-900">{labels.title}</h3>

      <div className="mt-5 flex items-center justify-between gap-4">
        <label htmlFor={rangeId} className="text-sm font-semibold text-slate-700">
          {labels.appsLabel}
        </label>
        <div className="flex items-baseline gap-1.5">
          <input
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={1}
            value={draft}
            aria-label={labels.appsLabel}
            onChange={(event) => updateFromNumber(event.target.value)}
            onBlur={() => setDraft(String(apps))}
            className="w-20 rounded-md border border-slate-300 px-2 py-1 text-right tabular-nums text-lg font-bold text-slate-900 focus:border-blue-700 focus:outline-2 focus:outline-blue-700/30"
          />
          <span className="text-sm text-slate-600">{labels.appsUnit}</span>
        </div>
      </div>

      <input
        id={rangeId}
        type="range"
        min={min}
        max={max}
        step={1}
        value={apps}
        aria-valuetext={`${apps} ${labels.appsUnit}`}
        onChange={(event) => updateFromRange(Number(event.target.value))}
        className="mt-3 w-full cursor-pointer accent-blue-700"
      />
      <div aria-hidden="true" className="mt-1 flex justify-between tabular-nums text-xs text-slate-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      <dl
        aria-live="polite"
        className="mt-5 grid gap-3 rounded-xl bg-blue-50 p-4 sm:grid-cols-2"
      >
        <div>
          <dt className="text-xs font-semibold text-slate-600">{labels.monthly}</dt>
          <dd className="mt-1 tabular-nums text-2xl font-bold text-blue-800">
            {formatYen(result.monthly)}
            <span className="ml-1 text-sm font-semibold text-slate-600">
              {labels.yen}
            </span>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-slate-600">{labels.yearly}</dt>
          <dd className="mt-1 tabular-nums text-2xl font-bold text-blue-800">
            {formatYen(result.annual)}
            <span className="ml-1 text-sm font-semibold text-slate-600">
              {labels.yen}
            </span>
          </dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-slate-600">
        {labels.base} {formatYen(inputs.basePrice)} {labels.yen}
        {result.extraApps > 0
          ? ` ＋ ${labels.extra} ${result.extraApps} ${labels.appsUnit} × ${formatYen(inputs.perAppPrice)} ${labels.yen}`
          : null}
      </p>
    </div>
  );
}
