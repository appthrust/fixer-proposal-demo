import { connection } from "@/app/content";
import { ArrowMarkers, C, Node, Tag } from "./diagramParts";

type VmProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  spec: string;
  items: string[];
  accent: string;
  highlightLast?: boolean;
};

function Vm({ x, y, width, height, title, spec, items, accent, highlightLast = false }: VmProps) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={12} fill="#ffffff" stroke={accent} strokeWidth={2} />
      <path d={`M${x} ${y + 12}a12 12 0 0 1 12 -12h${width - 24}a12 12 0 0 1 12 12v22h-${width}z`} fill={accent} />
      <text x={x + width / 2} y={y + 23} textAnchor="middle" fontSize={15} fontWeight={700} fill="#ffffff">
        {title}
      </text>
      <text x={x + width / 2} y={y + 58} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.slate900}>
        {spec}
      </text>
      {items.map((item, index) => {
        const isHighlight = highlightLast && index === items.length - 1;
        const rowY = y + 90 + index * 28;
        return (
          <g key={item}>
            {isHighlight ? (
              <rect x={x + 14} y={rowY - 17} width={width - 28} height={24} rx={6} fill={C.blueSoft} stroke={C.blue} strokeWidth={1.25} />
            ) : null}
            <circle cx={x + 28} cy={rowY - 5} r={3} fill={accent} />
            <text x={x + 40} y={rowY} fontSize={13} fontWeight={isHighlight ? 700 : 500} fill={isHighlight ? C.blue : C.slate700}>
              {item}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function OnpremDiagram() {
  const d = connection.onprem.diagram;
  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-4 break-inside-avoid sm:p-6">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 1040 480"
          role="img"
          aria-labelledby="onprem-title"
          aria-describedby="onprem-caption"
          className="h-auto w-full min-w-[760px]"
          fontFamily="inherit"
        >
          <title id="onprem-title">{d.title}</title>
          <ArrowMarkers prefix="onprem" />

          {/* Customer LAN */}
          <text x={20} y={28} fontSize={18} fontWeight={700} fill={C.blue}>
            {d.boundary}
          </text>
          <rect x={16} y={44} width={1008} height={336} rx={18} fill={C.slateSoft} stroke={C.blue} strokeWidth={2} strokeDasharray="10 6" />

          {/* Inference and business data stay inside */}
          <rect x={738} y={6} width={270} height={30} rx={15} fill={C.emeraldSoft} stroke={C.emeraldLine} strokeWidth={1.5} />
          <path d="M756 21 l5 5 l10 -10" fill="none" stroke={C.emerald} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          <text x={883} y={26} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.emerald}>
            {d.dataStays}
          </text>

          {/* x86 host with two VMs */}
          <rect x={40} y={72} width={600} height={270} rx={14} fill="#ffffff" stroke={C.slate500} strokeWidth={1.5} />
          <text x={56} y={98} fontSize={15} fontWeight={700} fill={C.slate900}>
            {d.host.title}
          </text>
          <text x={624} y={98} textAnchor="end" fontSize={13} fontWeight={600} fill={C.slate700}>
            {d.host.sub}
          </text>
          <Vm x={60} y={116} width={240} height={206} title={d.pmc.title} spec={d.pmc.spec} items={d.pmc.items} accent={C.slate700} />
          <Vm x={380} y={116} width={240} height={206} title={d.worker.title} spec={d.worker.spec} items={d.worker.items} accent={C.blue} highlightLast />

          {/* PMC registers and drives the worker */}
          <path d="M300 220 H374" stroke={C.slate500} strokeWidth={2} fill="none" markerEnd="url(#onprem-slate)" />
          <text x={340} y={210} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.slate700}>
            {d.join[0]}
          </text>
          <text x={340} y={240} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.slate700}>
            {d.join[1]}
          </text>

          {/* What the customer provides */}
          <rect x={690} y={72} width={310} height={100} rx={12} fill="#ffffff" stroke={C.slate500} strokeWidth={1.25} strokeDasharray="4 3" />
          <text x={706} y={96} fontSize={13} fontWeight={700} fill={C.slate900}>
            {d.customer.title}
          </text>
          {d.customer.items.map((item, index) => (
            <g key={item}>
              <circle cx={712} cy={116 + index * 20} r={3} fill={C.slate500} />
              <text x={722} y={121 + index * 20} fontSize={13} fill={C.slate700}>
                {item}
              </text>
            </g>
          ))}

          {/* GaiXer on the same LAN */}
          <rect x={690} y={190} width={310} height={166} rx={14} fill={C.amberSoft} stroke={C.amberLine} strokeWidth={1.5} />
          <text x={706} y={216} fontSize={15} fontWeight={700} fill={C.amber}>
            {d.pgx.title}
          </text>
          <Tag x={900} y={179} label={d.pgx.sub} fill={C.amber} color="#ffffff" />
          <Node x={710} y={234} width={270} height={52} title={d.pgx.items[0]} fill="#ffffff" stroke={C.amberLine} titleColor={C.amber} />
          <path d="M845 286 V296" stroke={C.amberLine} strokeWidth={2} fill="none" markerEnd="url(#onprem-amber)" />
          <Node x={710} y={300} width={270} height={44} title={d.pgx.items[1]} fill="#ffffff" stroke={C.amberLine} titleColor={C.amber} />

          {/* AI Gateway → API gateway */}
          <path d="M606 260 H704" stroke={C.amberLine} strokeWidth={2.25} strokeDasharray="6 4" fill="none" markerEnd="url(#onprem-amber)" />
          <rect x={626} y={218} width={80} height={32} rx={4} fill="#ffffff" />
          {d.aiCall.map((line, index) => (
            <text key={line} x={666} y={231 + index * 14} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.amber}>
              {line}
            </text>
          ))}

          {/* Image pull from the OCI registry (outside the LAN) */}
          <path d="M340 404 V348" stroke={C.amberLine} strokeWidth={2} strokeDasharray="6 4" fill="none" markerEnd="url(#onprem-amber)" />
          <Node x={220} y={410} width={240} height={56} title={d.registry.title} sub={d.registry.sub} fill="#ffffff" stroke={C.amberLine} titleColor={C.amber} dashed />
          {d.registry.note.map((line, index) => (
            <text key={line} x={480} y={434 + index * 18} fontSize={13} fontWeight={index === 0 ? 600 : 700} fill={index === 0 ? C.slate700 : C.amber}>
              {line}
            </text>
          ))}
        </svg>
      </div>
      <figcaption id="onprem-caption" className="mt-4 text-sm text-slate-600">
        {d.caption}
      </figcaption>
    </figure>
  );
}
