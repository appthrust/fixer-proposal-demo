import { column } from "@/app/content";

// Same palette as ArchitectureDiagram so both diagrams read as one set.
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

const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 420;

// Server-side text width estimate (no DOM): full-width glyphs take 1em,
// ASCII letters/digits ~0.62em, spaces ~0.3em. Deliberately generous.
function textWidth(label: string, fontSize: number): number {
  let em = 0;
  for (const char of label) {
    if (char === " ") em += 0.3;
    else if (char.charCodeAt(0) < 0x80) em += 0.66;
    else em += 1;
  }
  return em * fontSize;
}

type Placed = { label: string; index: number; x: number; y: number; width: number };

type FlowOptions = {
  fontSize: number;
  padX: number;
  gap: number;
  rowHeight: number;
  rowGap: number;
  maxWidth: number;
  minWidth?: number;
  extra?: number; // fixed extra width per chip (e.g. a glyph)
};

// Left-to-right chip layout that wraps to a new row when maxWidth is exceeded.
function flow(labels: string[], options: FlowOptions): { placed: Placed[]; height: number } {
  const { fontSize, padX, gap, rowHeight, rowGap, maxWidth, minWidth = 0, extra = 0 } = options;
  const placed: Placed[] = [];
  let x = 0;
  let y = 0;
  labels.forEach((label, index) => {
    const width = Math.max(minWidth, Math.ceil(textWidth(label, fontSize) + padX * 2 + extra));
    if (x > 0 && x + width > maxWidth) {
      x = 0;
      y += rowHeight + rowGap;
    }
    placed.push({ label, index, x, y, width });
    x += width + gap;
  });
  return { placed, height: labels.length === 0 ? 0 : y + rowHeight };
}

// Hand-placed slots for the scattered "before" boxes: centre, rotation, tone.
const BEFORE_SLOTS = [
  { cx: 88, cy: 86, rotate: -5, tone: "slate" },
  { cx: 214, cy: 98, rotate: 4, tone: "rose" },
  { cx: 74, cy: 152, rotate: 6, tone: "rose" },
  { cx: 202, cy: 166, rotate: -3, tone: "slate" },
  { cx: 132, cy: 214, rotate: 2, tone: "slate" },
] as const;

// Hand-wired connectors between some of the before boxes (slot indices).
const BEFORE_WIRES: [number, number][] = [
  [0, 1],
  [0, 2],
  [2, 3],
  [1, 3],
  [2, 4],
];

const BOX_HEIGHT = 38;

function BeforeSide() {
  const d = column.diagram;
  const problems = flow(d.beforeProblems, {
    fontSize: 13,
    padX: 10,
    gap: 8,
    rowHeight: 28,
    rowGap: 6,
    maxWidth: 268,
    extra: 16,
  });
  const problemsTop = 254;
  const panelTop = 50;
  const panelHeight = problemsTop + problems.height + 16 - panelTop;
  const slotFor = (index: number) => BEFORE_SLOTS[index % BEFORE_SLOTS.length];

  return (
    <g>
      <rect x={8} y={panelTop} width={284} height={panelHeight} rx={16} fill={SLATE_SOFT} stroke={SLATE_500} strokeWidth={1.25} strokeDasharray="6 5" />
      <text x={20} y={32} fontSize={16} fontWeight={700} fill={SLATE_700}>
        {d.beforeTitle}
      </text>

      {BEFORE_WIRES.filter(([from, to]) => from < d.beforeItems.length && to < d.beforeItems.length).map(([from, to]) => {
        const a = slotFor(from);
        const b = slotFor(to);
        const midX = (a.cx + b.cx) / 2 + (from % 2 === 0 ? 18 : -18);
        const midY = (a.cy + b.cy) / 2;
        return (
          <path
            key={`${from}-${to}`}
            d={`M${a.cx} ${a.cy} Q ${midX} ${midY} ${b.cx} ${b.cy}`}
            fill="none"
            stroke={SLATE_500}
            strokeWidth={1.25}
            strokeDasharray="3 4"
          />
        );
      })}

      {d.beforeItems.map((item, index) => {
        const slot = slotFor(index);
        const width = Math.ceil(textWidth(item, 14) + 28);
        const rose = slot.tone === "rose";
        return (
          <g key={item} transform={`rotate(${slot.rotate} ${slot.cx} ${slot.cy})`}>
            <rect
              x={slot.cx - width / 2}
              y={slot.cy - BOX_HEIGHT / 2}
              width={width}
              height={BOX_HEIGHT}
              rx={6}
              fill={rose ? ROSE_SOFT : "#ffffff"}
              stroke={rose ? ROSE : SLATE_500}
              strokeWidth={1.5}
            />
            <text x={slot.cx} y={slot.cy + 5} textAnchor="middle" fontSize={14} fontWeight={600} fill={rose ? ROSE : SLATE_700}>
              {item}
            </text>
          </g>
        );
      })}

      {problems.placed.map((chip) => {
        const x = 24 + chip.x;
        const y = problemsTop + chip.y;
        return (
          <g key={chip.label}>
            <rect x={x} y={y} width={chip.width} height={28} rx={14} fill={ROSE_SOFT} stroke={ROSE} strokeWidth={1} />
            <path
              d={`M${x + 11} ${y + 10} l8 8 M${x + 19} ${y + 10} l-8 8`}
              stroke={ROSE}
              strokeWidth={1.75}
              strokeLinecap="round"
            />
            <text x={x + 10 + 16} y={y + 19} fontSize={13} fontWeight={600} fill={ROSE}>
              {chip.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function CenterArrow() {
  const label = column.diagram.arrow;
  return (
    <g>
      <text x={372} y={186} textAnchor="middle" fontSize={14} fontWeight={700} fill={BLUE}>
        {label}
      </text>
      <path d="M306 206 H404 V190 L440 222 L404 254 V238 H306 Z" fill={BLUE} />
    </g>
  );
}

const STACK_X = 456;
const STACK_WIDTH = 356;
const STACK_TOP = 50;
const LAYER_PAD = 12;
const LAYER_HEADER = 26;
const LAYER_GAP = 10;
const CHIP_HEIGHT = 30;

type LayerStyle = {
  fill: string;
  stroke: string;
  name: string;
  chipFill: string;
  chipStroke: string;
  chipText: string;
};

const LAYER_STYLES: LayerStyle[] = [
  { fill: BLUE_SOFT, stroke: BLUE_LINE, name: BLUE, chipFill: BLUE, chipStroke: BLUE, chipText: "#ffffff" },
  { fill: EMERALD_SOFT, stroke: EMERALD_LINE, name: EMERALD, chipFill: "#ffffff", chipStroke: EMERALD_LINE, chipText: EMERALD },
  { fill: SLATE_700, stroke: SLATE_700, name: "#ffffff", chipFill: SLATE_500, chipStroke: SLATE_500, chipText: "#ffffff" },
];

function AfterSide() {
  const d = column.diagram;
  const innerWidth = STACK_WIDTH - LAYER_PAD * 2;

  let cursor = STACK_TOP;
  const layers = d.afterLayers.map((layer, layerIndex) => {
    const style = LAYER_STYLES[Math.min(layerIndex, LAYER_STYLES.length - 1)];
    const chips = flow(layer.items, {
      fontSize: 13,
      padX: 10,
      gap: 6,
      rowHeight: CHIP_HEIGHT,
      rowGap: 6,
      maxWidth: innerWidth,
      minWidth: 40,
    });
    const height = LAYER_PAD + LAYER_HEADER + chips.height + LAYER_PAD;
    const top = cursor;
    cursor += height + LAYER_GAP;
    return { layer, layerIndex, style, chips, top, height };
  });
  const stackBottom = cursor - LAYER_GAP;

  const gainHeight = 32;
  const gainGap = 12;
  const gainsHeight = d.afterGains.length * gainHeight + Math.max(0, d.afterGains.length - 1) * gainGap;
  const gainsTop = (STACK_TOP + stackBottom) / 2 - gainsHeight / 2;
  const gainsX = STACK_X + STACK_WIDTH + 26;

  return (
    <g>
      <text x={STACK_X} y={32} fontSize={16} fontWeight={700} fill={BLUE}>
        {d.afterTitle}
      </text>

      {layers.map(({ layer, layerIndex, style, chips, top, height }) => {
        const isTop = layerIndex === 0;
        return (
          <g key={layer.name}>
            <rect x={STACK_X} y={top} width={STACK_WIDTH} height={height} rx={12} fill={style.fill} stroke={style.stroke} strokeWidth={1.5} />
            <text x={STACK_X + LAYER_PAD} y={top + LAYER_PAD + 15} fontSize={14} fontWeight={700} fill={style.name}>
              {layer.name}
            </text>
            {chips.placed.map((chip) => {
              const x = STACK_X + LAYER_PAD + chip.x;
              const y = top + LAYER_PAD + LAYER_HEADER + chip.y;
              const open = isTop && chip.index === layer.items.length - 1;
              return (
                <g key={chip.label}>
                  <rect
                    x={x}
                    y={y}
                    width={chip.width}
                    height={CHIP_HEIGHT}
                    rx={6}
                    fill={open ? "#ffffff" : style.chipFill}
                    stroke={open ? BLUE : style.chipStroke}
                    strokeWidth={1.25}
                    strokeDasharray={open ? "4 3" : undefined}
                  />
                  <text
                    x={x + chip.width / 2}
                    y={y + 20}
                    textAnchor="middle"
                    fontSize={13}
                    fontWeight={600}
                    fill={open ? BLUE : style.chipText}
                  >
                    {chip.label}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Bracket from the stack to the gains */}
      <path
        d={`M${gainsX - 16} ${gainsTop + 6} q -6 0 -6 6 V ${gainsTop + gainsHeight - 12} q 0 6 6 6`}
        fill="none"
        stroke={EMERALD_LINE}
        strokeWidth={1.5}
      />

      {d.afterGains.map((gain, index) => {
        const y = gainsTop + index * (gainHeight + gainGap);
        const width = Math.ceil(textWidth(gain, 13) + 20 + 20);
        return (
          <g key={gain}>
            <rect x={gainsX} y={y} width={width} height={gainHeight} rx={16} fill={EMERALD_SOFT} stroke={EMERALD_LINE} strokeWidth={1.25} />
            <path
              d={`M${gainsX + 11} ${y + 16} l4 4 l8 -8`}
              fill="none"
              stroke={EMERALD}
              strokeWidth={2.25}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x={gainsX + 30} y={y + 21} fontSize={13} fontWeight={700} fill={EMERALD}>
              {gain}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function ColumnDiagram() {
  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-4 break-inside-avoid sm:p-6">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          width="100%"
          role="img"
          aria-labelledby="column-diagram-title"
          className="h-auto w-full min-w-[720px]"
          fontFamily="inherit"
        >
          <title id="column-diagram-title">{column.diagramCaption}</title>
          <BeforeSide />
          <CenterArrow />
          <AfterSide />
        </svg>
      </div>
      <figcaption className="mt-4 text-sm text-slate-600">{column.diagramCaption}</figcaption>
    </figure>
  );
}
