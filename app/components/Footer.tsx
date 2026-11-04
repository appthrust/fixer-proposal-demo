import { footer } from "@/app/content";
import { containerClass } from "./Section";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div
        className={`${containerClass} flex flex-col gap-2 py-8 text-xs text-slate-500 sm:flex-row sm:justify-between`}
      >
        <p>{footer.disclaimer}</p>
        <p>{footer.copyright}</p>
      </div>
    </footer>
  );
}
