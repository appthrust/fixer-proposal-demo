import { navItems, ui } from "@/app/content";
import { containerClass } from "./Section";

export function Nav() {
  return (
    <nav
      aria-label={ui.navAria}
      className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur print:hidden"
    >
      <div className={`${containerClass} flex h-14 items-center gap-4`}>
        <a
          href="#top"
          className="flex shrink-0 items-baseline gap-2 rounded-sm font-bold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
        >
          <span>{ui.brand}</span>
          <span className="hidden text-xs font-medium text-slate-500 xl:inline">
            {ui.brandFor}
          </span>
        </a>
        <ul className="flex min-w-0 flex-1 gap-0 overflow-x-auto [scrollbar-width:none] lg:justify-end">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="block whitespace-nowrap rounded-md px-2 py-1.5 text-[13px] text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-700 lg:text-sm"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
