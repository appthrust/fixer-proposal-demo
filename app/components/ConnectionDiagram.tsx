import { connection } from "@/app/content";

const BLUE = "#1d4ed8";
const BLUE_SOFT = "#eff6ff";
const BLUE_LINE = "#93c5fd";
const EMERALD = "#047857";
const EMERALD_SOFT = "#ecfdf5";
const EMERALD_LINE = "#059669";
const AMBER = "#b45309";
const AMBER_SOFT = "#fffbeb";
const AMBER_LINE = "#d97706";
const SLATE_900 = "#0f172a";
const SLATE_700 = "#334155";
const SLATE_500 = "#64748b";
const SLATE_SOFT = "#f8fafc";

type NodeProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  sub?: string;
  fill?: string;
  stroke?: string;
  titleColor?: string;
  subColor?: string;
  dashed?: boolean;
};

function Node({
  x,
  y,
  width,
  height,
  title,
  sub,
  fill = BLUE_SOFT,
  stroke = BLUE_LINE,
  titleColor = SLATE_900,
  subColor = SLATE_700,
  dashed = false,
}: NodeProps) {
  const cx = x + width / 2;
  const cy = y + height / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={10}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.5}
        strokeDasharray={dashed ? "6 4" : undefined}
      />
      <text x={cx} y={sub ? cy - 4 : cy + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={titleColor}>
        {title}
      </text>
      {sub ? (
        <text x={cx} y={cy + 18} textAnchor="middle" fontSize={13} fill={subColor}>
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function ProviderTag({ x, y, label, fill, color }: { x: number; y: number; label: string; fill: string; color: string }) {
  const width = label.length * 13 + 20;
  return (
    <g>
      <rect x={x} y={y} width={width} height={22} rx={11} fill={fill} />
      <text x={x + width / 2} y={y + 15} textAnchor="middle" fontSize={12} fontWeight={700} fill={color}>
        {label}
      </text>
    </g>
  );
}

export function ConnectionDiagram() {
  const d = connection.diagram;
  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-4 break-inside-avoid sm:p-6">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 1040 460"
          role="img"
          aria-labelledby="connection-title"
          aria-describedby="connection-caption"
          className="h-auto w-full min-w-[760px]"
          fontFamily="inherit"
        >
          <title id="connection-title">{d.title}</title>
          <defs>
            <marker id="conn-arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill={BLUE} />
            </marker>
            <marker id="conn-arrow-emerald" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill={EMERALD_LINE} />
            </marker>
            <marker id="conn-arrow-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill={AMBER_LINE} />
            </marker>
          </defs>

          {/* Closed customer environment */}
          <text x={20} y={28} fontSize={18} fontWeight={700} fill={BLUE}>
            {d.boundary}
          </text>
          <rect x={16} y={40} width={1008} height={404} rx={18} fill={SLATE_SOFT} stroke={BLUE} strokeWidth={2} strokeDasharray="10 6" />

          {/* No route to the internet */}
          <rect x={758} y={56} width={250} height={36} rx={18} fill={EMERALD_SOFT} stroke={EMERALD_LINE} strokeWidth={1.5} />
          <path d="M782 74 l5 5 l10 -10" fill="none" stroke={EMERALD} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          <text x={898} y={80} textAnchor="middle" fontSize={14} fontWeight={700} fill={EMERALD}>
            {d.noInternet}
          </text>

          {/* User */}
          <circle cx={80} cy={192} r={14} fill="none" stroke={SLATE_700} strokeWidth={2} />
          <path d="M56 236 a24 20 0 0 1 48 0" fill="none" stroke={SLATE_700} strokeWidth={2} />
          <text x={80} y={262} textAnchor="middle" fontSize={14} fontWeight={600} fill={SLATE_700}>
            {d.user}
          </text>
          <path d="M112 210 H154" stroke={BLUE} strokeWidth={2} fill="none" markerEnd="url(#conn-arrow-blue)" />

          {/* Business app */}
          <Node x={160} y={170} width={170} height={80} title={d.app.title} sub={d.app.sub} fill={BLUE} stroke={BLUE} titleColor="#ffffff" subColor="#dbeafe" />
          <path d="M330 210 H364" stroke={BLUE} strokeWidth={2} fill="none" markerEnd="url(#conn-arrow-blue)" />

          {/* Knowledge + embedding */}
          <Node x={370} y={170} width={170} height={80} title={d.knowledge.title} sub={d.knowledge.sub} />
          <path d="M455 250 V294" stroke={BLUE} strokeWidth={2} fill="none" markerEnd="url(#conn-arrow-blue)" />
          <Node x={370} y={300} width={170} height={64} title={d.embedding.title} sub={d.embedding.sub} fill={EMERALD_SOFT} stroke={EMERALD_LINE} titleColor={EMERALD} />
          <path d="M540 210 H574" stroke={BLUE} strokeWidth={2} fill="none" markerEnd="url(#conn-arrow-blue)" />

          {/* AI Gateway */}
          <rect x={580} y={140} width={180} height={140} rx={12} fill="#ffffff" stroke={BLUE} strokeWidth={2} />
          <path d="M580 152a12 12 0 0 1 12 -12h156a12 12 0 0 1 12 12v32h-180z" fill={BLUE} />
          <text x={670} y={170} textAnchor="middle" fontSize={17} fontWeight={700} fill="#ffffff">
            {d.gateway.title}
          </text>
          {d.gateway.sub.map((line, index) => (
            <text key={line} x={670} y={214 + index * 26} textAnchor="middle" fontSize={index === 0 ? 15 : 12} fontWeight={index === 0 ? 700 : 500} fill={index === 0 ? BLUE : SLATE_700}>
              {line}
            </text>
          ))}

          {/* Providers */}
          <path d="M760 190 C 790 190 790 155 814 155" stroke={EMERALD_LINE} strokeWidth={2} fill="none" markerEnd="url(#conn-arrow-emerald)" />
          <Node x={820} y={110} width={190} height={90} title={d.llm.title} sub={d.llm.sub} fill={EMERALD_SOFT} stroke={EMERALD_LINE} titleColor={EMERALD} />
          <ProviderTag x={830} y={98} label={d.llm.tag} fill={EMERALD} color="#ffffff" />

          <path d="M760 240 C 790 240 790 295 814 295" stroke={AMBER_LINE} strokeWidth={2} strokeDasharray="6 4" fill="none" markerEnd="url(#conn-arrow-amber)" />
          <Node x={820} y={250} width={190} height={90} title={d.gaixer.title} sub={d.gaixer.sub} fill={AMBER_SOFT} stroke={AMBER_LINE} titleColor={AMBER} dashed />
          <ProviderTag x={830} y={238} label={d.gaixer.tag} fill={AMBER} color="#ffffff" />

          {/* Direct call from apps */}
          <path d="M245 250 V404 H670 V286" stroke={SLATE_500} strokeWidth={1.75} strokeDasharray="5 4" fill="none" markerEnd="url(#conn-arrow-blue)" />
          <rect x={359} y={392} width={196} height={24} rx={4} fill={SLATE_SOFT} />
          <text x={457} y={409} textAnchor="middle" fontSize={13} fontWeight={600} fill={SLATE_700}>
            {d.directCall}
          </text>
        </svg>
      </div>
      <figcaption id="connection-caption" className="mt-4 text-sm text-slate-600">
        {d.caption}
      </figcaption>
    </figure>
  );
}
