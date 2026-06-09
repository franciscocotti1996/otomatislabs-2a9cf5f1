import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/i18n/LanguageContext";
import { Brain, Zap, Target, Workflow, Shield, TrendingUp, ArrowRight } from "lucide-react";
import { MessageCircle, Mail, Database, ShoppingCart, Phone, Calendar } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

const FEATURE_ICONS = [Brain, Zap, Target, Workflow, Shield, TrendingUp];

const WHATSAPP_PHONE = "5491134213579";
const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

// Static, defined once outside the component (avoids per-render allocations).
const NODES = [
  { id: "wa", label: "WhatsApp", icon: MessageCircle, angle: -90 },
  { id: "mail", label: "Email", icon: Mail, angle: -30 },
  { id: "crm", label: "CRM", icon: Database, angle: 30 },
  { id: "shop", label: "E-commerce", icon: ShoppingCart, angle: 90 },
  { id: "call", label: "Llamadas", icon: Phone, angle: 150 },
  { id: "cal", label: "Agenda", icon: Calendar, angle: 210 },
] as const;

// Precompute trig once (60 nodes wouldn't matter, 6 even less, but avoids re-doing on every render).
const NODE_GEOMETRY = NODES.map((n) => {
  const rad = (n.angle * Math.PI) / 180;
  return {
    id: n.id,
    // SVG coordinates (260 viewBox, radius 100 from center 130,130)
    svgX: 130 + Math.cos(rad) * 100,
    svgY: 130 + Math.sin(rad) * 100,
    // Percent positions inside the 260×260 wrapper (38.46 = 100/260*100)
    pctX: 50 + Math.cos(rad) * 38.46,
    pctY: 50 + Math.sin(rad) * 38.46,
  };
});

const ACTIVITY_FEED = [
  "→ Respondiendo consulta en WhatsApp",
  "→ Actualizando contacto en CRM",
  "→ Agendando reunión automáticamente",
  "→ Enviando seguimiento por email",
  "→ Procesando pedido de e-commerce",
  "→ Calificando lead entrante",
];

const AIAgentsSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { t } = useLanguage();
  const features = t.aiAgents.features.map((f, i) => ({ ...f, icon: FEATURE_ICONS[i] }));
  const services = t.aiAgents.cta.services;
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0].id);
  const selectedService = services.find((s) => s.id === selectedServiceId) ?? services[0];
  const whatsappUrl = buildWhatsAppUrl(selectedService.message);

  // Use module-level constants
  const nodes = NODES;
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [pinnedNode, setPinnedNode] = useState<string | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);
  const [feedIdx, setFeedIdx] = useState(0);

  // Detect reduced-motion + coarse pointer (mobile) — both lower the animation budget.
  const motionMode = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return { reduced: false, lite: false, staticMode: false };
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lite = window.matchMedia("(hover: none), (max-width: 768px)").matches;
    // Low-end device heuristics: very few CPU cores, low RAM, or save-data on.
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const lowCores = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency > 0 && nav.hardwareConcurrency <= 4;
    const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2;
    const saveData = !!nav.connection?.saveData;
    // Manual override for QA: ?fallback=static
    const forced = typeof window.location !== "undefined" &&
      new URLSearchParams(window.location.search).get("fallback") === "static";
    const staticMode = forced || reduced || saveData || (lite && (lowCores || lowMem));
    return { reduced, lite, staticMode };
  }, []);
  const { reduced, lite, staticMode } = motionMode;

  // Pause cycling when the section is off-screen, the user is interacting,
  // or reduced motion is requested. requestAnimationFrame'd intervals would be
  // overkill here; we just gate them.
  useEffect(() => {
    if (!isVisible || hoveredNode || pinnedNode || reduced) return;
    const cycleMs = lite ? 2400 : 1600;
    const feedMs = lite ? 3000 : 2200;
    const a = window.setInterval(() => setActiveNodeIdx((i) => (i + 1) % NODES.length), cycleMs);
    const b = window.setInterval(() => setFeedIdx((i) => (i + 1) % ACTIVITY_FEED.length), feedMs);
    return () => { clearInterval(a); clearInterval(b); };
  }, [isVisible, hoveredNode, pinnedNode, reduced, lite]);

  const activeId = pinnedNode ?? hoveredNode ?? nodes[activeNodeIdx].id;
  const activeGeom = NODE_GEOMETRY.find((g) => g.id === activeId) ?? NODE_GEOMETRY[0];
  const activeTargetX = activeGeom.svgX;
  const activeTargetY = activeGeom.svgY;

  // Single switch to pause every CSS animation in the graph when the section
  // is off-screen or the user prefers reduced motion. Keeps GPU/CPU idle.
  const animationsActive = isVisible && !reduced && !staticMode;
  const playState = animationsActive ? "running" : "paused";

  return (
    <section
      ref={ref}
      id="agentes-ia"
      className={`relative py-20 md:py-28 overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Background gradient & glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-96 w-[50rem] max-w-full rounded-full bg-primary/10 blur-3xl" />

      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16 max-w-3xl mx-auto">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
            {t.aiAgents.eyebrow}
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight">
            {t.aiAgents.titleA}{" "}
            <span className="text-gradient">{t.aiAgents.titleB}</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            {t.aiAgents.intro}
          </p>
        </div>

        {/* Central definition card — creative split layout */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="glass-card rounded-2xl md:rounded-[2rem] border border-primary/20 relative overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Content side */}
              <div className="md:w-3/5 p-8 md:p-10 lg:p-12 relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-primary font-heading font-semibold text-[10px] uppercase tracking-widest">
                      {t.aiAgents.eyebrow}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl md:text-2xl lg:text-[1.65rem] leading-tight mb-4">
                    {t.aiAgents.definition.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-[0.97rem] leading-relaxed mb-8">
                    {t.aiAgents.definition.body}
                  </p>

                  {/* Benefit micro-cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>, label: t.aiAgents.definition.tags[0] },
                      { icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, label: t.aiAgents.definition.tags[1] },
                      { icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>, label: t.aiAgents.definition.tags[2] },
                      { icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: t.aiAgents.definition.tags[3] },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-primary/10 hover:border-primary/30 transition-colors group/item"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary/20 transition-colors shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium text-foreground/90 leading-snug">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual engine side */}
              <div className="md:w-2/5 bg-[#041424] relative min-h-[360px] md:min-h-full overflow-hidden flex flex-col">
                {/* Subtle grid background */}
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(46,169,152,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(46,169,152,0.6) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                {/* Interactive node network (or static fallback) */}
                <div className="relative flex-1 flex items-center justify-center py-8 px-4">
                  {staticMode ? (
                    <div
                      className="relative w-full max-w-[260px] aspect-square mx-auto"
                      aria-label="Red de canales conectados al núcleo de IA"
                    >
                      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 260 260" role="img" preserveAspectRatio="xMidYMid meet">
                        <title>Agentes IA conectados a múltiples canales</title>
                        {NODE_GEOMETRY.map((g) => (
                          <line
                            key={g.id}
                            x1="130" y1="130" x2={g.svgX} y2={g.svgY}
                            stroke="rgba(46,169,152,0.4)" strokeWidth={1.25} strokeLinecap="round"
                          />
                        ))}
                        <circle cx="130" cy="130" r="55" fill="none" stroke="rgba(46,169,152,0.22)" />
                        <circle cx="130" cy="130" r="100" fill="none" stroke="rgba(46,169,152,0.14)" strokeDasharray="2 6" />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center shadow-[0_0_30px_rgba(46,169,152,0.4)]">
                          <Brain className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                      </div>
                      {nodes.map((node) => {
                        const geom = NODE_GEOMETRY.find((g) => g.id === node.id)!;
                        const Icon = node.icon;
                        return (
                          <div
                            key={node.id}
                            className="absolute"
                            style={{ left: `${geom.pctX}%`, top: `${geom.pctY}%`, transform: "translate(-50%, -50%)" }}
                          >
                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border bg-[#0a2030] border-primary/50 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                              <Icon className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-primary" />
                            </div>
                            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 text-[9px] sm:text-[10px] font-heading font-semibold tracking-wider uppercase whitespace-nowrap text-white/80">
                              {node.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                  <>
                  {/* Local keyframes for fluid micro-animations */}
                  <style>{`
                    @keyframes nodeFloat {
                      0%,100% { transform: translate(-50%, -50%) translateY(0px); }
                      50% { transform: translate(-50%, -50%) translateY(-4px); }
                    }
                    @keyframes dashFlow {
                      to { stroke-dashoffset: -40; }
                    }
                    @keyframes ringPulse {
                      0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
                      100% { transform: translate(-50%, -50%) scale(1.9); opacity: 0; }
                    }
                    @keyframes clickRipple {
                      0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.9; }
                      100% { transform: translate(-50%, -50%) scale(2.4); opacity: 0; }
                    }
                  `}</style>
                  <div className="relative w-[260px] h-[260px]">
                    {/* SVG connection lines */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 260 260">
                      <defs>
                        <radialGradient id="packetGlow">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                          <stop offset="40%" stopColor="#2ea998" stopOpacity="1" />
                          <stop offset="100%" stopColor="#2ea998" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="activeLine" gradientUnits="userSpaceOnUse"
                          x1="130" y1="130" x2={activeTargetX} y2={activeTargetY}>
                          <stop offset="0%" stopColor="#2ea998" stopOpacity="1" />
                          <stop offset="100%" stopColor="#2ea998" stopOpacity="0.4" />
                        </linearGradient>
                      </defs>
                      {nodes.map((node) => {
                        const geom = NODE_GEOMETRY.find((g) => g.id === node.id)!;
                        const isActive = node.id === activeId;
                        // Inactive lines: skip the dashFlow animation entirely — six infinite
                        // animations on mobile is a wasted GPU/CPU budget.
                        const lineAnim = isActive && animationsActive
                          ? "dashFlow 1.2s linear infinite"
                          : "none";
                        return (
                          <line
                            key={node.id}
                            x1="130"
                            y1="130"
                            x2={geom.svgX}
                            y2={geom.svgY}
                            stroke={isActive ? "url(#activeLine)" : "rgba(46,169,152,0.22)"}
                            strokeWidth={isActive ? 2 : 1}
                            strokeDasharray={isActive ? "6 4" : "2 5"}
                            strokeLinecap="round"
                            style={{
                              animation: lineAnim,
                              animationPlayState: playState,
                              // drop-shadow filter is GPU-expensive on mobile — only on desktop.
                              filter: isActive && !lite ? "drop-shadow(0 0 4px rgba(46,169,152,0.7))" : "none",
                              transition: "stroke-width 500ms cubic-bezier(0.34,1.56,0.64,1), stroke 400ms ease",
                            }}
                          />
                        );
                      })}
                      <circle cx="130" cy="130" r="55" fill="none" stroke="rgba(46,169,152,0.15)" />
                      <circle cx="130" cy="130" r="100" fill="none" stroke="rgba(46,169,152,0.08)" strokeDasharray="2 6" />
                      {/* Data packet — SMIL <animate> is the cheapest moving-element option in SVG
                          but still costs on low-end mobile. Render only while visible and not lite/reduced. */}
                      {animationsActive && !lite && (
                      <circle key={`packet-${activeId}`} r="5" fill="url(#packetGlow)">
                        <animate
                          attributeName="cx"
                          from="130"
                          to={activeTargetX}
                          dur="1.1s"
                          repeatCount="indefinite"
                          calcMode="spline"
                          keySplines="0.4 0 0.2 1"
                        />
                        <animate
                          attributeName="cy"
                          from="130"
                          to={activeTargetY}
                          dur="1.1s"
                          repeatCount="indefinite"
                          calcMode="spline"
                          keySplines="0.4 0 0.2 1"
                        />
                        <animate
                          attributeName="opacity"
                          values="0;1;1;0"
                          keyTimes="0;0.15;0.85;1"
                          dur="1.1s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      )}
                    </svg>

                    {/* Central brain core */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center shadow-[0_0_40px_rgba(46,169,152,0.45)] relative">
                        <Brain className="w-8 h-8 text-white" />
                        {animationsActive && (
                          <span className="absolute inset-0 rounded-2xl border border-primary/60 animate-ping" />
                        )}
                      </div>
                    </div>

                    {/* Orbiting channel nodes */}
                    {nodes.map((node, idx) => {
                      const geom = NODE_GEOMETRY.find((g) => g.id === node.id)!;
                      const isActive = node.id === activeId;
                      const isPinned = node.id === pinnedNode;
                      const Icon = node.icon;
                      // Skip the floating idle animation in lite/reduced mode — six infinite
                      // transform animations cost more than they're worth on weak hardware.
                      const floatAnim = animationsActive && !lite
                        ? `nodeFloat 4s ease-in-out ${idx * 0.4}s infinite`
                        : "none";
                      return (
                        <button
                          key={node.id}
                          type="button"
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                          onFocus={() => setHoveredNode(node.id)}
                          onBlur={() => setHoveredNode(null)}
                          onClick={() => {
                            setPinnedNode((p) => (p === node.id ? null : node.id));
                            setRippleKey((k) => k + 1);
                          }}
                          aria-pressed={isPinned}
                          aria-label={node.label}
                          className="absolute group/node focus:outline-none"
                          style={{
                            left: `${geom.pctX}%`,
                            top: `${geom.pctY}%`,
                            animation: floatAnim,
                            animationPlayState: playState,
                            // willChange is a strong hint — apply only to the node currently animating.
                            willChange: isActive ? "transform" : "auto",
                          }}
                        >
                          {/* Pulsing halo around active node */}
                          {isActive && (
                            <>
                              <span
                                className="absolute left-1/2 top-1/2 w-11 h-11 rounded-xl border-2 border-primary pointer-events-none"
                                style={{
                                  animation: "ringPulse 1.6s ease-out infinite",
                                  animationPlayState: playState,
                                }}
                              />
                              {/* Second halo layer only on desktop — doubles GPU work. */}
                              {!lite && (
                                <span
                                  className="absolute left-1/2 top-1/2 w-11 h-11 rounded-xl border-2 border-primary pointer-events-none"
                                  style={{
                                    animation: "ringPulse 1.6s ease-out 0.8s infinite",
                                    animationPlayState: playState,
                                  }}
                                />
                              )}
                            </>
                          )}
                          {/* Click ripple */}
                          {isPinned && (
                            <span
                              key={rippleKey}
                              className="absolute left-1/2 top-1/2 w-11 h-11 rounded-xl bg-primary/40 pointer-events-none"
                              style={{ animation: "clickRipple 0.7s ease-out forwards" }}
                            />
                          )}
                          <div
                            className={`relative w-11 h-11 rounded-xl flex items-center justify-center border ${
                              isActive
                                ? `bg-primary border-primary ${lite ? "" : "shadow-[0_0_24px_rgba(46,169,152,0.7)]"}`
                                : "bg-[#0a2030] border-primary/30 hover:border-primary/70"
                            }`}
                            style={{
                              transform: `scale(${isPinned ? 1.2 : isActive ? 1.12 : 1})`,
                              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color 300ms ease, border-color 300ms ease, box-shadow 400ms ease",
                            }}
                          >
                            <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-primary/80"}`} />
                          </div>
                          <span
                            className={`absolute left-1/2 top-full mt-1.5 text-[10px] font-heading font-semibold tracking-wider uppercase whitespace-nowrap ${
                              isActive ? "text-primary" : "text-white/40"
                            }`}
                            style={{
                              transform: `translate(-50%, ${isActive ? "3px" : "0"})`,
                              transition: "transform 400ms cubic-bezier(0.34,1.56,0.64,1), color 300ms ease",
                            }}
                          >
                            {node.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  </>
                  )}
                </div>

                {/* Live activity feed */}
                <div className="relative mx-5 mb-5 rounded-xl border border-primary/20 bg-black/30 backdrop-blur-sm p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full bg-primary ${staticMode ? "" : "animate-pulse"}`}
                      style={{ animationPlayState: playState }}
                    />
                    <span className="text-[9px] font-heading font-bold tracking-[0.25em] uppercase text-primary">
                      Agente activo
                    </span>
                  </div>
                  <p
                    key={feedIdx}
                    className={`text-xs text-white/80 font-mono leading-snug ${staticMode ? "" : "animate-fade-in"}`}
                  >
                    {staticMode ? ACTIVITY_FEED[0] : ACTIVITY_FEED[feedIdx]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card rounded-xl p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        {/* CTA */}
        <div className="mt-14 md:mt-16 max-w-2xl mx-auto text-center">
          <div className="glass-card rounded-2xl p-8 md:p-10 border border-primary/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
            <div className="relative">
              <h3 className="font-heading font-bold text-xl md:text-2xl mb-3">
                {t.aiAgents.cta.title}
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                {t.aiAgents.cta.body}
              </p>
              <p className="text-sm font-medium mb-3 text-foreground/80">
                {t.aiAgents.cta.servicePrompt}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {services.map((service) => {
                  const isSelected = service.id === selectedServiceId;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedServiceId(service.id)}
                      aria-pressed={isSelected}
                      className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium border transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background/50 text-foreground/80 border-primary/20 hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {service.label}
                    </button>
                  );
                })}
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                {t.aiAgents.cta.button}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAgentsSection;
