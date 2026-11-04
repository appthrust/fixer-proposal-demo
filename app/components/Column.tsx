import { column } from "@/app/content";
import { ColumnDiagram } from "./ColumnDiagram";

const paragraphClass = "text-base leading-8 text-slate-700 sm:text-[17px] sm:leading-9";

export function Column() {
  const lead = column.paragraphs.slice(0, 2);
  const rest = column.paragraphs.slice(2);
  return (
    <article>
      <div className="max-w-3xl space-y-6">
        {lead.map((paragraph) => (
          <p key={paragraph} className={paragraphClass}>
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-10 print:mt-6">
        <ColumnDiagram />
      </div>

      <div className="mt-10 max-w-3xl space-y-6 print:mt-6">
        <blockquote className="border-l-4 border-blue-700 py-1 pl-5 text-lg leading-8 font-bold text-slate-900 break-inside-avoid sm:text-xl sm:leading-9">
          <p>{column.pullQuote}</p>
        </blockquote>
        {rest.map((paragraph) => (
          <p key={paragraph} className={paragraphClass}>
            {paragraph}
          </p>
        ))}
        <p className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-base leading-8 text-slate-800 break-inside-avoid sm:p-6 sm:text-[17px] sm:leading-9">
          {column.closing}
        </p>
      </div>
    </article>
  );
}
