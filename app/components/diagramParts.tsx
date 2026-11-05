// 03 技術接続の SVG 図で共有する色と部品。

export const C = {
  blue: "#1d4ed8",
  blueSoft: "#eff6ff",
  blueLine: "#93c5fd",
  emerald: "#047857",
  emeraldSoft: "#ecfdf5",
  emeraldLine: "#059669",
  amber: "#b45309",
  amberSoft: "#fffbeb",
  amberLine: "#d97706",
  slate900: "#0f172a",
  slate700: "#334155",
  slate500: "#64748b",
  slateSoft: "#f8fafc",
} as const;

/** Rough SVG text width: full-width (CJK) glyphs ≈ fontSize, ASCII ≈ 0.6 × fontSize. */
export function textWidth(text: string, fontSize: number) {
  let width = 0;
  for (const char of text) {
    width += char.charCodeAt(0) > 0xff ? fontSize : fontSize * 0.6;
  }
  return width;
}

/** Arrowhead markers `${prefix}-blue|emerald|amber|slate`; prefix keeps ids unique per SVG. */
export function ArrowMarkers({ prefix }: { prefix: string }) {
  const colors = { blue: C.blue, emerald: C.emeraldLine, amber: C.amberLine, slate: C.slate500 };
  return (
    <defs>
      {Object.entries(colors).map(([name, fill]) => (
        <marker
          key={name}
          id={`${prefix}-${name}`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10z" fill={fill} />
        </marker>
      ))}
    </defs>
  );
}

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

export function Node({
  x,
  y,
  width,
  height,
  title,
  sub,
  fill = C.blueSoft,
  stroke = C.blueLine,
  titleColor = C.slate900,
  subColor = C.slate700,
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

/** Pill label placed on a node's top edge. */
export function Tag({ x, y, label, fill, color }: { x: number; y: number; label: string; fill: string; color: string }) {
  const width = textWidth(label, 12) + 20;
  return (
    <g>
      <rect x={x} y={y} width={width} height={22} rx={11} fill={fill} />
      <text x={x + width / 2} y={y + 15} textAnchor="middle" fontSize={12} fontWeight={700} fill={color}>
        {label}
      </text>
    </g>
  );
}

/** Small boxed note centred on `cx`. */
export function Chip({ cx, y, label, color, fill, stroke }: { cx: number; y: number; label: string; color: string; fill: string; stroke: string }) {
  const width = textWidth(label, 12) + 28;
  return (
    <g>
      <rect x={cx - width / 2} y={y} width={width} height={26} rx={6} fill={fill} stroke={stroke} strokeWidth={1.25} />
      <text x={cx} y={y + 17} textAnchor="middle" fontSize={12} fontWeight={600} fill={color}>
        {label}
      </text>
    </g>
  );
}
