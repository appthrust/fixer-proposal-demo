import type { Metadata } from "next";
import { hearing } from "./content";
import { HearingSheetClient } from "./HearingSheetClient";

export const metadata: Metadata = {
  title: `${hearing.title} | ${hearing.subtitle}`,
  robots: { index: false, follow: false },
};

export default function HearingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <HearingSheetClient />
    </main>
  );
}
