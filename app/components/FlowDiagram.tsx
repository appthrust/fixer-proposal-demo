import { useId, type CSSProperties } from "react";
import type { FlowNode, FlowNodeKind } from "@/app/content";

// Hex values shared with ArchitectureDiagram (amber added for data nodes).
const BLUE = "#1d4ed8";
const BLUE_100 = "#dbeafe";
const EMERALD = "#047857";
const EMERALD_SOFT = "#ecfdf5";
const EMERALD_LINE = "#059669";
const ROSE = "#be123c";
const ROSE_SOFT = "#fff1f2";
const AMBER = "#92400e";
const AMBER_SOFT = "#fffbeb";
const AMBER_LINE = "#d97706";
const SLATE_900 = "#0f172a";
const SLATE_700 = "#334155";
const SLATE_500 = "#64748b";
const SLATE_300 = "#cbd5e1";
const WHITE = "#ffffff";

type NodePalette = { fill: string; stroke: string; text: string; sub: string };

export const flowNodePalette: Record<FlowNodeKind, NodePalette> = {
  person: { fill: WHITE, stroke: SLATE_700, text: SLATE_900, sub: SLATE_500 },
  external: { fill: ROSE_SOFT, stroke: ROSE, text: ROSE, sub: SLATE_500 },
  app: { fill: BLUE, stroke: BLUE, text: WHITE, sub: BLUE_100 },
  ai: { fill: EMERALD_SOFT, stroke: EMERALD_LINE, text: EMERALD, sub: SLATE_500 },
  data: { fill: AMBER_SOFT, stroke: AMBER_LINE, text: AMBER, sub: SLATE_500 },
  platform: { fill: SLATE_900, stroke: SLATE_900, text: WHITE, sub: SLATE_300 },
};

const LABEL_SIZE = 14;
const SUB_SIZE = 11;
const PAD_X = 12;
const MIN_NODE_WIDTH = 72;
const MARGIN_X = 6;
const GAP = 22;
const BOUNDARY_GAP = 34;
const NODE_Y = 34;
const NODE_HEIGHT = 60;
const HEIGHT = 112;
// On narrow screens, below this rendered scale the 11px sub text becomes
// unreadable, so the diagram scrolls horizontally instead of shrinking further.
// From lg up (two-column cards) and in print it always fits its container.
const MIN_SCALE = 0.72;

// Approximate advance width: CJK / full-width glyphs are one em, Latin about 0.62 em.
function textWidth(text: string, fontSize: number): number {
  let em = 0;
  for (const char of text) {
    const code = char.codePointAt(0) ?? 0;
    if (char === " ") em += 0.3;
    else if (code >= 0x2e80) em += 1;
    else em += 0.62;
  }
  return em * fontSize;
}

function nodeWidth(node: FlowNode): number {
  const label = textWidth(node.label, LABEL_SIZE);
  const sub = node.sub ? textWidth(node.sub, SUB_SIZE) : 0;
  return Math.max(MIN_NODE_WIDTH, Math.ceil(Math.max(label, sub) + PAD_X * 2));
}

type FlowDiagramProps = {
  flow: FlowNode[];
  boundaryAfter?: number;
  boundaryLabel: string;
  title: string;
};

export function FlowDiagram({ flow, boundaryAfter, boundaryLabel, title }: FlowDiagramProps) {
  const id = useId();
  const titleId = `${id}-title`;
  const markerId = `${id}-arrow`;
  const hasBoundary = boundaryAfter !== undefined && boundaryAfter < flow.length - 1;

  const layout: { node: FlowNode; x: number; width: number }[] = [];
  let boundaryX: number | null = null;
  let cursor = MARGIN_X;
  for (const [index, node] of flow.entries()) {
    if (index > 0) {
      const atBoundary = hasBoundary && index - 1 === boundaryAfter;
      const gap = atBoundary ? BOUNDARY_GAP : GAP;
      if (atBoundary) boundaryX = cursor + gap / 2;
      cursor += gap;
    }
    const nodeW = nodeWidth(node);
    layout.push({ node, x: cursor, width: nodeW });
    cursor += nodeW;
  }
  const width = cursor + MARGIN_X;

  const [outsideLabel, insideLabel] = boundaryLabel.split(" | ");
  const arrowY = NODE_Y + NODE_HEIGHT / 2;

  return (
    <div className="w-full overflow-x-auto print:overflow-visible">
      <svg
        viewBox={`0 0 ${width} ${HEIGHT}`}
        role="img"
        aria-labelledby={titleId}
        className="mx-auto block h-auto w-full max-w-(--flow-width) min-w-(--flow-min-width) lg:min-w-0 print:min-w-0"
        style={
          {
            "--flow-width": `${width}px`,
            "--flow-min-width": `${Math.round(width * MIN_SCALE)}px`,
          } as CSSProperties
        }
        fontFamily="inherit"
      >
        <title id={titleId}>{title}</title>
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0L10 5L0 10z" fill={SLATE_500} />
          </marker>
        </defs>

        {boundaryX !== null ? (
          <g>
            <line
              x1={boundaryX}
              y1={6}
              x2={boundaryX}
              y2={HEIGHT - 4}
              stroke={BLUE}
              strokeWidth={1.5}
              strokeDasharray="5 4"
            />
            <text x={boundaryX - 7} y={20} textAnchor="end" fontSize={SUB_SIZE} fontWeight={700} fill={ROSE}>
              {outsideLabel}
            </text>
            {insideLabel ? (
              <text x={boundaryX + 7} y={20} fontSize={SUB_SIZE} fontWeight={700} fill={BLUE}>
                {insideLabel}
              </text>
            ) : null}
          </g>
        ) : null}

        {layout.slice(1).map(({ x }, index) => {
          const previous = layout[index];
          return (
            <line
              key={`arrow-${x}`}
              x1={previous.x + previous.width + 3}
              y1={arrowY}
              x2={x - 3}
              y2={arrowY}
              stroke={SLATE_500}
              strokeWidth={1.5}
              markerEnd={`url(#${markerId})`}
            />
          );
        })}

        {layout.map(({ node, x, width: nodeW }) => {
          const palette = flowNodePalette[node.kind];
          const centerX = x + nodeW / 2;
          return (
            <g key={`${node.label}-${x}`}>
              <rect
                x={x}
                y={NODE_Y}
                width={nodeW}
                height={NODE_HEIGHT}
                rx={8}
                fill={palette.fill}
                stroke={palette.stroke}
                strokeWidth={1.5}
              />
              <text
                x={centerX}
                y={node.sub ? NODE_Y + 27 : NODE_Y + NODE_HEIGHT / 2 + 5}
                textAnchor="middle"
                fontSize={LABEL_SIZE}
                fontWeight={600}
                fill={palette.text}
              >
                {node.label}
              </text>
              {node.sub ? (
                <text
                  x={centerX}
                  y={NODE_Y + 46}
                  textAnchor="middle"
                  fontSize={SUB_SIZE}
                  fill={palette.sub}
                >
                  {node.sub}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function FlowSwatch({ kind }: { kind: FlowNodeKind }) {
  const palette = flowNodePalette[kind];
  return (
    <svg viewBox="0 0 16 12" aria-hidden="true" className="h-3 w-4 shrink-0">
      <rect x={0.75} y={0.75} width={14.5} height={10.5} rx={3} fill={palette.fill} stroke={palette.stroke} strokeWidth={1.5} />
    </svg>
  );
}
