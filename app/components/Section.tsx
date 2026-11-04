import type { ReactNode } from "react";
import type { SectionHeading } from "@/app/content";

export const containerClass = "mx-auto w-full max-w-[1100px] px-5 sm:px-8";

type SectionProps = {
  heading: SectionHeading;
  tone?: "plain" | "muted";
  children: ReactNode;
};

export function Section({ heading, tone = "plain", children }: SectionProps) {
  const background = tone === "muted" ? "bg-slate-50" : "bg-white";
  return (
    <section
      id={heading.id}
      aria-labelledby={`${heading.id}-title`}
      className={`border-t border-slate-200 py-16 sm:py-20 print:py-8 ${background}`}
    >
      <div className={containerClass}>
        <header className="mb-10 max-w-3xl print:mb-6">
          <p className="tabular-nums text-sm font-semibold text-blue-700">
            {heading.eyebrow}
          </p>
          <h2
            id={`${heading.id}-title`}
            className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            {heading.title}
          </h2>
          {heading.lead ? (
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              {heading.lead}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  );
}
