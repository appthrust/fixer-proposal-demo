import { architecture } from "@/app/content";

const BLUE = "#1d4ed8";
const BLUE_SOFT = "#eff6ff";
const BLUE_LINE = "#93c5fd";
const EMERALD = "#047857";
const EMERALD_SOFT = "#ecfdf5";
const EMERALD_LINE = "#059669";
const ROSE = "#be123c";
const ROSE_SOFT = "#fff1f2";
const SLATE_900 = "#0f172a";
const SLATE_700 = "#334155";
const SLATE_500 = "#64748b";
const SLATE_SOFT = "#f8fafc";

type BoxProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  fill?: string;
  stroke?: string;
  textColor?: string;
};

function LabeledBox({
  x,
  y,
  width,
  height,
  label,
  fill = BLUE_SOFT,
  stroke = BLUE_LINE,
  textColor = SLATE_900,
}: BoxProps) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={8} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <text
        x={x + width / 2}
        y={y + height / 2 + 5}
        textAnchor="middle"
        fontSize={14}
        fontWeight={600}
        fill={textColor}
      >
        {label}
      </text>
    </g>
  );
}

export function ArchitectureDiagram() {
  const d = architecture.diagram;
  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-4 break-inside-avoid sm:p-6">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 1040 520"
          role="img"
          aria-labelledby="architecture-title"
          aria-describedby="architecture-caption"
          className="h-auto w-full min-w-[720px]"
          fontFamily="inherit"
        >
          <title id="architecture-title">{architecture.title}</title>
          <defs>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill={BLUE} />
            </marker>
            <marker id="arrow-emerald" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill={EMERALD_LINE} />
            </marker>
          </defs>

          {/* Customer AWS account boundary */}
          <text x={20} y={40} fontSize={18} fontWeight={700} fill={BLUE}>
            {d.boundaryTitle}
            <tspan fontSize={15} fontWeight={500} fill={SLATE_500}>
              {d.boundaryFuture}
            </tspan>
          </text>
          <rect x={16} y={56} width={760} height={448} rx={18} fill={SLATE_SOFT} stroke={BLUE} strokeWidth={2} strokeDasharray="10 6" />

          {/* Data stays inside */}
          <rect x={560} y={74} width={200} height={36} rx={18} fill={EMERALD_SOFT} stroke={EMERALD_LINE} strokeWidth={1.5} />
          <path d="M586 92 l5 5 l10 -10" fill="none" stroke={EMERALD} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          <text x={680} y={98} textAnchor="middle" fontSize={15} fontWeight={700} fill={EMERALD}>
            {d.dataStays}
          </text>

          {/* Control plane */}
          <rect x={40} y={160} width={190} height={220} rx={12} fill="#ffffff" stroke={BLUE} strokeWidth={2} />
          <path d="M40 172a12 12 0 0 1 12 -12h166a12 12 0 0 1 12 12v32h-190z" fill={BLUE} />
          <text x={135} y={188} textAnchor="middle" fontSize={15} fontWeight={700} fill="#ffffff">
            {d.controlPlaneTitle}
          </text>
          {d.controlPlaneItems.map((item, index) => (
            <text key={item} x={135} y={238 + index * 36} textAnchor="middle" fontSize={14} fill={SLATE_700}>
              {item}
            </text>
          ))}

          {/* Delivery arrows */}
          <path d="M230 236 H282" stroke={BLUE} strokeWidth={2} fill="none" markerEnd="url(#arrow-blue)" />
          <text x={256} y={226} textAnchor="middle" fontSize={12} fontWeight={600} fill={BLUE}>
            {d.deliver}
          </text>
          <path d="M230 340 C 262 340 258 420 282 420" stroke={BLUE} strokeWidth={2} fill="none" markerEnd="url(#arrow-blue)" />
          <path d="M480 422 H496" stroke={BLUE} strokeWidth={2} strokeDasharray="4 4" fill="none" markerEnd="url(#arrow-blue)" />

          {/* Main site cluster */}
          <rect x={290} y={124} width={400} height={240} rx={14} fill="#ffffff" stroke={SLATE_700} strokeWidth={1.5} />
          <text x={310} y={152} fontSize={15} fontWeight={700} fill={SLATE_900}>
            {d.mainClusterTitle}
          </text>
          <LabeledBox x={308} y={168} width={177} height={48} label={d.businessApp} fill={BLUE} stroke={BLUE} textColor="#ffffff" />
          <LabeledBox x={495} y={168} width={177} height={48} label={d.toolBuilder} />
          <LabeledBox x={308} y={230} width={177} height={48} label={d.knowledge} />
          <LabeledBox x={495} y={230} width={177} height={48} label={d.embedding} fill={EMERALD_SOFT} stroke={EMERALD_LINE} textColor={EMERALD} />
          <LabeledBox x={308} y={292} width={364} height={48} label={d.directory} />

          {/* Other site clusters */}
          <LabeledBox x={290} y={392} width={190} height={60} label={d.overseasCluster} fill="#ffffff" stroke={SLATE_700} />
          <g>
            <rect x={500} y={392} width={190} height={60} rx={8} fill="#ffffff" stroke={SLATE_500} strokeWidth={1.5} strokeDasharray="6 4" />
            <text x={595} y={427} textAnchor="middle" fontSize={14} fontWeight={600} fill={SLATE_700}>
              {d.moreClusters}
            </text>
          </g>

          {/* Egress control shield on the boundary */}
          <path d="M690 244 H744" stroke={BLUE} strokeWidth={2} fill="none" markerEnd="url(#arrow-blue)" />
          <path
            d="M776 208 L806 219 V244 C806 264 794 276 776 284 C758 276 746 264 746 244 V219 Z"
            fill={BLUE}
            stroke="#ffffff"
            strokeWidth={2}
          />
          <path d="M764 245 l8 8 l16 -16" fill="none" stroke="#ffffff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          <rect x={706} y={304} width={140} height={46} rx={6} fill="#ffffff" />
          <text x={776} y={322} textAnchor="middle" fontSize={14} fontWeight={700} fill={BLUE}>
            {d.egress}
          </text>
          <text x={776} y={342} textAnchor="middle" fontSize={13} fontWeight={700} fill="#b45309">
            {d.egressStatus}
          </text>

          {/* Allowed external LLM */}
          <path d="M808 236 C 850 236 846 186 886 186" stroke={EMERALD_LINE} strokeWidth={2} fill="none" markerEnd="url(#arrow-emerald)" />
          <rect x={890} y={150} width={140} height={72} rx={10} fill="#ffffff" stroke={EMERALD_LINE} strokeWidth={1.5} />
          {d.allowed.map((line, index) => (
            <text key={line} x={960} y={181 + index * 22} textAnchor="middle" fontSize={14} fontWeight={600} fill={EMERALD}>
              {line}
            </text>
          ))}

          {/* Blocked destinations */}
          <path d="M808 254 C 850 254 846 336 890 336" stroke={ROSE} strokeWidth={2} strokeDasharray="5 4" fill="none" />
          <path d="M841 288 l14 14 M855 288 l-14 14" stroke={ROSE} strokeWidth={3} strokeLinecap="round" />
          <rect x={890} y={304} width={140} height={64} rx={10} fill={ROSE_SOFT} stroke={ROSE} strokeWidth={1.5} strokeDasharray="5 4" />
          {d.blocked.map((line, index) => (
            <text
              key={line}
              x={960}
              y={331 + index * 22}
              textAnchor="middle"
              fontSize={14}
              fontWeight={index === 1 ? 700 : 500}
              fill={ROSE}
            >
              {line}
            </text>
          ))}
        </svg>
      </div>
      <figcaption id="architecture-caption" className="mt-4 text-sm text-slate-600">
        {architecture.description}
      </figcaption>
    </figure>
  );
}
