import { statusLabels, type FeatureStatus } from "@/app/content";

const badgeStyles: Record<FeatureStatus, string> = {
  verified: "bg-emerald-50 text-emerald-800 ring-emerald-600/30",
  available: "bg-emerald-50 text-emerald-800 ring-emerald-600/30",
  developing: "bg-amber-50 text-amber-900 ring-amber-600/40",
  planned: "bg-slate-100 text-slate-700 ring-slate-500/30",
};

const dotStyles: Record<FeatureStatus, string> = {
  verified: "bg-emerald-500",
  available: "bg-emerald-500",
  developing: "bg-amber-500",
  planned: "bg-slate-400",
};

type StatusBadgeProps = {
  status: FeatureStatus;
  size?: "sm" | "md";
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const sizing =
    size === "sm" ? "gap-1 px-1.5 py-px text-[11px]" : "gap-1.5 px-2.5 py-0.5 text-xs";
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full font-semibold ring-1 ring-inset ${sizing} ${badgeStyles[status]}`}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dotStyles[status]}`} />
      {statusLabels[status]}
    </span>
  );
}
