export type PriceInputs = {
  basePrice: number;
  includedApps: number;
  perAppPrice: number;
  annualDiscountPercent: number;
};

export type PriceQuote = {
  apps: number;
  extraApps: number;
  monthly: number;
  annual: number;
};

export function quote(apps: number, inputs: PriceInputs): PriceQuote {
  const extraApps = Math.max(0, apps - inputs.includedApps);
  const monthly = inputs.basePrice + extraApps * inputs.perAppPrice;
  const annual = Math.round(
    (monthly * 12 * (100 - inputs.annualDiscountPercent)) / 100,
  );
  return { apps, extraApps, monthly, annual };
}

const yenFormatter = new Intl.NumberFormat("ja-JP");

export function formatYen(value: number): string {
  return yenFormatter.format(Math.round(value));
}
