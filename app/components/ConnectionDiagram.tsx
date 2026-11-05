import { connection } from "@/app/content";
import { ArrowMarkers, C, Chip, Node, Tag } from "./diagramParts";

export function ConnectionDiagram() {
  const d = connection.diagram;
  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-4 break-inside-avoid sm:p-6">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 1040 500"
          role="img"
          aria-labelledby="connection-title"
          aria-describedby="connection-caption"
          className="h-auto w-full min-w-[760px]"
          fontFamily="inherit"
        >
          <title id="connection-title">{d.title}</title>
          <ArrowMarkers prefix="conn" />

          {/* Customer LAN */}
          <text x={20} y={28} fontSize={18} fontWeight={700} fill={C.blue}>
            {d.boundary}
          </text>
          <rect x={16} y={44} width={1008} height={444} rx={18} fill={C.slateSoft} stroke={C.blue} strokeWidth={2} strokeDasharray="10 6" />

          {/* AI calls stay inside */}
          <rect x={758} y={6} width={250} height={30} rx={15} fill={C.emeraldSoft} stroke={C.emeraldLine} strokeWidth={1.5} />
          <path d="M776 21 l5 5 l10 -10" fill="none" stroke={C.emerald} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          <text x={896} y={26} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.emerald}>
            {d.noInternet}
          </text>

          {/* AppThrust zone */}
          <rect x={104} y={104} width={580} height={330} rx={14} fill="#ffffff" stroke={C.blueLine} strokeWidth={1.5} />
          <text x={120} y={132} fontSize={15} fontWeight={700} fill={C.blue}>
            {d.appthrustZone}
          </text>

          {/* GaiXer zone */}
          <rect x={716} y={104} width={292} height={330} rx={14} fill={C.amberSoft} stroke={C.amberLine} strokeWidth={1.5} />
          <text x={732} y={132} fontSize={15} fontWeight={700} fill={C.amber}>
            {d.gaixerZone}
          </text>
          <Tag x={900} y={93} label={d.gaixerTag} fill={C.amber} color="#ffffff" />

          {/* User */}
          <circle cx={58} cy={200} r={14} fill="none" stroke={C.slate700} strokeWidth={2} />
          <path d="M34 244 a24 20 0 0 1 48 0" fill="none" stroke={C.slate700} strokeWidth={2} />
          <text x={58} y={270} textAnchor="middle" fontSize={14} fontWeight={600} fill={C.slate700}>
            {d.user}
          </text>
          <path d="M86 218 H122" stroke={C.blue} strokeWidth={2} fill="none" markerEnd="url(#conn-blue)" />

          {/* Business app */}
          <Node x={128} y={178} width={150} height={80} title={d.app.title} sub={d.app.sub} fill={C.blue} stroke={C.blue} titleColor="#ffffff" subColor="#dbeafe" />
          <path d="M278 218 H300" stroke={C.blue} strokeWidth={2} fill="none" markerEnd="url(#conn-blue)" />

          {/* Knowledge + embedding */}
          <Node x={306} y={178} width={140} height={80} title={d.knowledge.title} sub={d.knowledge.sub} />
          <path d="M376 258 V292" stroke={C.blue} strokeWidth={2} fill="none" markerEnd="url(#conn-blue)" />
          <Node x={306} y={298} width={140} height={60} title={d.embedding.title} sub={d.embedding.sub} fill={C.emeraldSoft} stroke={C.emeraldLine} titleColor={C.emerald} />
          <path d="M446 218 H470" stroke={C.blue} strokeWidth={2} fill="none" markerEnd="url(#conn-blue)" />

          {/* AI Gateway */}
          <rect x={476} y={148} width={184} height={140} rx={12} fill="#ffffff" stroke={C.blue} strokeWidth={2} />
          <path d="M476 160a12 12 0 0 1 12 -12h160a12 12 0 0 1 12 12v32h-184z" fill={C.blue} />
          <text x={568} y={178} textAnchor="middle" fontSize={17} fontWeight={700} fill="#ffffff">
            {d.gateway.title}
          </text>
          {d.gateway.sub.map((line, index) => (
            <text key={line} x={568} y={228 + index * 26} textAnchor="middle" fontSize={index === 0 ? 15 : 12} fontWeight={index === 0 ? 700 : 500} fill={index === 0 ? C.blue : C.slate700}>
              {line}
            </text>
          ))}

          {/* Today: bundled llm */}
          <path d="M620 288 V332" stroke={C.emeraldLine} strokeWidth={2} fill="none" markerEnd="url(#conn-emerald)" />
          <Node x={476} y={338} width={184} height={72} title={d.llm.title} sub={d.llm.sub} fill={C.emeraldSoft} stroke={C.emeraldLine} titleColor={C.emerald} />
          <Tag x={486} y={326} label={d.llm.tag} fill={C.emerald} color="#ffffff" />

          {/* FIXER environment: GaiXer API gateway → LLM in the PGX */}
          <path d="M660 196 H734" stroke={C.amberLine} strokeWidth={2.25} strokeDasharray="6 4" fill="none" markerEnd="url(#conn-amber)" />
          <rect x={666} y={206} width={64} height={38} rx={4} fill="#ffffff" />
          {d.repoint.map((line, index) => (
            <text key={line} x={698} y={221 + index * 15} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.amber}>
              {line}
            </text>
          ))}
          <Node x={740} y={148} width={244} height={96} title={d.apiGateway.title} sub={d.apiGateway.sub} fill="#ffffff" stroke={C.amberLine} titleColor={C.amber} />
          <path d="M862 244 V292" stroke={C.amberLine} strokeWidth={2} fill="none" markerEnd="url(#conn-amber)" />
          <Node x={740} y={298} width={244} height={80} title={d.gaixerLlm.title} sub={d.gaixerLlm.sub} fill="#ffffff" stroke={C.amberLine} titleColor={C.amber} />

          {/* Direct call from apps */}
          <path d="M203 258 V418 H458 V244 H470" stroke={C.slate500} strokeWidth={1.75} strokeDasharray="5 4" fill="none" markerEnd="url(#conn-slate)" />
          <rect x={226} y={406} width={200} height={24} rx={4} fill="#ffffff" />
          <text x={326} y={423} textAnchor="middle" fontSize={13} fontWeight={600} fill={C.slate700}>
            {d.directCall}
          </text>

          {/* Records on both sides */}
          <Chip cx={394} y={448} label={d.logs.appthrust} color={C.blue} fill={C.blueSoft} stroke={C.blueLine} />
          <Chip cx={862} y={448} label={d.logs.gaixer} color={C.amber} fill="#ffffff" stroke={C.amberLine} />
        </svg>
      </div>
      <figcaption id="connection-caption" className="mt-4 text-sm text-slate-600">
        {d.caption}
      </figcaption>
    </figure>
  );
}
