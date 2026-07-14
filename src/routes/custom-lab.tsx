import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  OPTIONS, LEVELS, COMPONENT_STEPS, STATS_META, PRESETS, BASE_STATS,
  type ComponentType, type Level, type StatKey, type ComponentOption,
  getOption,
} from "@/data/customLab";
import { WHATSAPP_NUMBER, waLink, formatPrice } from "@/data/catalog";

export const Route = createFileRoute("/custom-lab")({
  head: () => ({
    meta: [
      { title: "HC Custom Lab — Diseñá tu patín de hockey | Hockey Cuyo" },
      { name: "description", content: "Configurá tu patín ideal componente por componente. Asesor experto, precio en tiempo real y compra directa por WhatsApp." },
      { property: "og:title", content: "HC Custom Lab — Configurador Premium" },
      { property: "og:description", content: "Diseñá tu patín de hockey sobre patines en tiempo real." },
    ],
  }),
  component: CustomLabPage,
});

type Config = Partial<Record<ComponentType, string>>;

function clamp(n: number, min = 0, max = 10) { return Math.max(min, Math.min(max, n)); }

function computeTotals(config: Config) {
  const items = COMPONENT_STEPS
    .map(s => getOption(config[s.type]))
    .filter(Boolean) as ComponentOption[];

  const price = items.reduce((acc, o) => acc + o.price, 0);
  const weight = items.reduce((acc, o) => acc + o.weightG, 0);

  const stats: Record<StatKey, number> = { ...BASE_STATS };
  for (const o of items) {
    for (const [k, v] of Object.entries(o.stats)) {
      stats[k as StatKey] = clamp(stats[k as StatKey] + (v as number));
    }
  }
  return { items, price, weight, stats };
}

function detectLevel(config: Config): Level | null {
  const items = COMPONENT_STEPS
    .map(s => getOption(config[s.type]))
    .filter(Boolean) as ComponentOption[];
  if (!items.length) return null;
  const score: Record<Level, number> = { economia: 0, competicion: 0, pro: 0, elite: 0 };
  items.forEach(o => { score[o.level] += 1; });
  return (Object.entries(score).sort((a, b) => b[1] - a[1])[0][0]) as Level;
}

// Este es el placeholder temporal que se va a mostrar ahora en /custom-lab
function CustomLabPage() {
  return (
    <div style={{
      minHeight: "65vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "24px",
      maxWidth: "600px",
      margin: "0 auto"
    }}>
      <h1 style={{ 
        fontSize: "36px", 
        marginBottom: "16px", 
        fontWeight: 800,
        background: "var(--grad-primary)", 
        WebkitBackgroundClip: "text", 
        backgroundClip: "text", 
        color: "transparent" 
      }}>
        Custom Lab
      </h1>
      <p style={{ 
        fontSize: "18px", 
        color: "var(--muted)", 
        marginBottom: "36px", 
        lineHeight: 1.6 
      }}>
        Muy pronto vas a poder armar tu patín a medida acá. <br/>
        Mientras tanto, escribinos por WhatsApp y te asesoramos personalmente.
      </p>
      <a 
        href={waLink("¡Hola! Quería consultar sobre el armado de un patín a medida.")}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: "var(--wa)",
          color: "#00220e",
          padding: "16px 32px",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: "15px",
          transition: "transform 0.2s",
          boxShadow: "0 10px 30px -10px rgba(37,211,102,.5)"
        }}
      >
        Consultar por WhatsApp
      </a>
    </div>
  );
}

// Renombramos el original para que no se borre el código y se pueda reactivar fácil
function CustomLabPage_Desactivado() {
  const [config, setConfig] = useState<Config>(() => {
    const preset = PRESETS.find(p => p.id === "competicion")!;
    return { ...preset.setup };
  });
  const [activeStep, setActiveStep] = useState<ComponentType>("bota");
  const [activeLevelFilter, setActiveLevelFilter] = useState<Level | "todos">("todos");

  const totals = useMemo(() => computeTotals(config), [config]);
  const detectedLevel = useMemo(() => detectLevel(config), [config]);

  const pick = (type: ComponentType, id: string) => {
    setConfig(prev => ({ ...prev, [type]: id }));
  };
  const clear = (type: ComponentType) => {
    setConfig(prev => { const n = { ...prev }; delete n[type]; return n; });
  };
  const applyPreset = (level: Level) => {
    const p = PRESETS.find(x => x.id === level)!;
    setConfig({ ...p.setup });
    setActiveStep("bota");
  };

  const optionsForStep = OPTIONS.filter(o =>
    o.type === activeStep && (activeLevelFilter === "todos" || o.level === activeLevelFilter)
  );

  const waMessage = useMemo(() => {
    const lines = [
      "Hola Hockey Cuyo 👋",
      "Quiero comprar este patín personalizado del HC Custom Lab.",
      "",
      "Configuración:",
      ...COMPONENT_STEPS.map(s => {
        const o = getOption(config[s.type]);
        return `• ${s.title}: ${o ? `${o.name}${o.brand ? ` (${o.brand})` : ""}` : "—"}`;
      }),
      "",
      `Nivel detectado: ${detectedLevel ? LEVELS.find(l => l.id === detectedLevel)!.name : "—"}`,
      `Peso estimado: ${(totals.weight / 1000).toFixed(2)} kg`,
      `Precio total: ${formatPrice(totals.price)}`,
    ];
    return lines.join("\n");
  }, [config, totals, detectedLevel]);

  const adviceMsgs = useMemo(
    () => COMPONENT_STEPS
      .map(s => getOption(config[s.type]))
      .filter((o): o is ComponentOption => Boolean(o?.advice))
      .map(o => ({ id: o.id, title: o.name, text: o.advice! })),
    [config]
  );

  return (
    <div className="hc-lab">
      {/* HERO */}
      <header className="hc-lab__hero">
        <div className="hc-lab__hero-inner">
          <Link to="/" className="hc-lab__back">← Volver</Link>
          <p className="hc-lab__eyebrow">HC CUSTOM LAB</p>
          <h1 className="hc-lab__title">Diseñá tu patín. <span>Pieza por pieza.</span></h1>
          <p className="hc-lab__sub">
            Una experiencia interactiva para armar tu patín ideal con asesoría experta y compra directa por WhatsApp.
          </p>
        </div>
      </header>

      {/* PRESETS */}
      <section className="hc-lab__presets">
        <span className="hc-lab__presets-label">Empezá con un preset:</span>
        {PRESETS.map(p => (
          <button key={p.id}
            className={`hc-chip ${detectedLevel === p.id ? "hc-chip--on" : ""}`}
            onClick={() => applyPreset(p.id)}>
            {p.name}
          </button>
        ))}
      </section>

      {/* MAIN GRID */}
      <section className="hc-lab__grid">
        {/* IZQUIERDA — CONFIGURACIÓN */}
        <aside className="hc-panel hc-panel--left">
          <h3 className="hc-panel__title">Configuración</h3>
          <nav className="hc-steps">
            {COMPONENT_STEPS.map((s, i) => {
              const selected = getOption(config[s.type]);
              return (
                <button key={s.type}
                  className={`hc-step ${activeStep === s.type ? "hc-step--active" : ""}`}
                  onClick={() => setActiveStep(s.type)}>
                  <span className="hc-step__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="hc-step__body">
                    <span className="hc-step__title">{s.icon} {s.title}</span>
                    <span className="hc-step__value">
                      {selected ? selected.name : (s.required ? "Elegir" : "Opcional")}
                    </span>
                  </span>
                  {selected && <span className="hc-step__dot" />}
                </button>
              );
            })}
          </nav>

          <div className="hc-filters">
            {(["todos", ...LEVELS.map(l => l.id)] as const).map(lv => (
              <button key={lv}
                className={`hc-pill ${activeLevelFilter === lv ? "hc-pill--on" : ""}`}
                onClick={() => setActiveLevelFilter(lv as Level | "todos")}>
                {lv === "todos" ? "Todos" : LEVELS.find(l => l.id === lv)!.name}
              </button>
            ))}
          </div>

          <div className="hc-options">
            {optionsForStep.map(o => {
              const isOn = config[activeStep] === o.id;
              return (
                <button key={o.id}
                  className={`hc-opt ${isOn ? "hc-opt--on" : ""}`}
                  onClick={() => pick(activeStep, o.id)}>
                  <div className="hc-opt__sw" style={{ background: o.layer?.color || "linear-gradient(135deg,#222,#444)" }} />
                  <div className="hc-opt__body">
                    <div className="hc-opt__name">{o.name}</div>
                    <div className="hc-opt__meta">{o.brand} · {LEVELS.find(l => l.id === o.level)!.name}</div>
                  </div>
                  <div className="hc-opt__price">{formatPrice(o.price)}</div>
                </button>
              );
            })}
            {!COMPONENT_STEPS.find(s => s.type === activeStep)!.required && config[activeStep] && (
              <button className="hc-opt hc-opt--clear" onClick={() => clear(activeStep)}>
                Quitar {activeStep}
              </button>
            )}
          </div>
        </aside>

        {/* CENTRO — RENDER */}
        <div className="hc-panel hc-panel--center">
          <div className="hc-stage">
            <div className="hc-stage__grid" aria-hidden />
            <div className="hc-skate" key={Object.values(config).join("|")}>
              {[...COMPONENT_STEPS]
                .map(s => getOption(config[s.type]))
                .filter(Boolean)
                .sort((a, b) => (a!.layer?.z ?? 0) - (b!.layer?.z ?? 0))
                .map((o) => (
                  <div key={o!.id} className="hc-layer" style={{
                    background: o!.layer?.color
                      ? `linear-gradient(135deg, ${o!.layer.color}, rgba(0,0,0,.4))`
                      : "transparent",
                  }}>
                    <span className="hc-layer__label">{o!.layer?.label ?? o!.name}</span>
                  </div>
                ))}
            </div>
            <p className="hc-stage__hint">Render en vivo · arquitectura preparada para 3D</p>
          </div>

          {/* STATS */}
          <div className="hc-stats">
            <h4 className="hc-block__title">Performance</h4>
            <div className="hc-stats__grid">
              {STATS_META.map(s => {
                const v = totals.stats[s.key];
                return (
                  <div key={s.key} className="hc-stat">
                    <div className="hc-stat__row">
                      <span>{s.label}</span><span className="hc-stat__val">{v.toFixed(1)}</span>
                    </div>
                    <div className="hc-stat__bar"><div style={{ width: `${(v / 10) * 100}%` }} /></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COMPARADOR */}
          <div className="hc-compare">
            <h4 className="hc-block__title">Comparador de configuraciones</h4>
            <div className="hc-compare__wrap">
              <table className="hc-table">
                <thead>
                  <tr>
                    <th>Componente</th>
                    {PRESETS.map(p => (
                      <th key={p.id} className={detectedLevel === p.id ? "is-on" : ""}>{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPONENT_STEPS.map(step => (
                    <tr key={step.type}>
                      <td>{step.icon} {step.title}</td>
                      {PRESETS.map(p => {
                        const o = getOption(p.setup[step.type]);
                        return <td key={p.id} className={detectedLevel === p.id ? "is-on" : ""}>{o ? o.name : "—"}</td>;
                      })}
                    </tr>
                  ))}
                  <tr className="hc-table__total">
                    <td>Precio</td>
                    {PRESETS.map(p => {
                      const total = Object.values(p.setup).reduce((acc, id) => acc + (getOption(id)?.price ?? 0), 0);
                      return <td key={p.id} className={detectedLevel === p.id ? "is-on" : ""}>{formatPrice(total)}</td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* DERECHA — RESUMEN + IA */}
        <aside className="hc-panel hc-panel--right">
          <div className="hc-summary">
            <p className="hc-summary__eyebrow">Mi Patín</p>
            <p className="hc-summary__level">
              {detectedLevel ? LEVELS.find(l => l.id === detectedLevel)!.name : "Sin nivel"}
              <span>{detectedLevel ? LEVELS.find(l => l.id === detectedLevel)!.tagline : "Elegí componentes"}</span>
            </p>
            <div className="hc-summary__price">{formatPrice(totals.price)}</div>
            <div className="hc-summary__meta">
              <span>Peso est. <b>{(totals.weight / 1000).toFixed(2)} kg</b></span>
              <span>Piezas <b>{totals.items.length}/{COMPONENT_STEPS.length}</b></span>
            </div>

            <ul className="hc-summary__list">
              {COMPONENT_STEPS.map(s => {
                const o = getOption(config[s.type]);
                return (
                  <li key={s.type} className={o ? "" : "is-empty"}>
                    <span className="hc-summary__k">{s.icon} {s.title}</span>
                    <span className="hc-summary__v">{o ? o.name : "—"}</span>
                  </li>
                );
              })}
            </ul>

            <div className="hc-summary__actions">
              <a className="hc-btn hc-btn--wa"
                 href={waLink(waMessage)} target="_blank" rel="noopener noreferrer">
                Comprar por WhatsApp
              </a>
              <button className="hc-btn hc-btn--ghost"
                onClick={() => {
                  try {
                    localStorage.setItem("hc_custom_lab_v1", JSON.stringify(config));
                    alert("Configuración guardada en este dispositivo.");
                  } catch { /* noop */ }
                }}>
                Guardar
              </button>
              <button className="hc-btn hc-btn--ghost"
                onClick={async () => {
                  const url = `${window.location.origin}/custom-lab`;
                  const text = `${waMessage}\n\nMirá la web: ${url}`;
                  try {
                    if (navigator.share) await navigator.share({ title: "Mi patín HC Custom Lab", text });
                    else { await navigator.clipboard.writeText(text); alert("Resumen copiado al portapapeles."); }
                  } catch { /* noop */ }
                }}>
                Compartir
              </button>
            </div>
            <p className="hc-summary__note">WhatsApp: +{WHATSAPP_NUMBER}</p>
          </div>

          <div className="hc-ai">
            <div className="hc-ai__head">
              <span className="hc-ai__pulse" />
              <div>
                <p className="hc-ai__title">Asesor Hockey Cuyo IA</p>
                <p className="hc-ai__sub">Análisis de tu configuración</p>
              </div>
            </div>
            <ul className="hc-ai__list">
              {adviceMsgs.length === 0 && (
                <li className="hc-ai__msg hc-ai__msg--empty">Elegí algún componente para recibir recomendaciones.</li>
              )}
              {adviceMsgs.map(m => (
                <li key={m.id} className="hc-ai__msg">
                  <b>{m.title}</b>
                  <span>{m.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <CustomLabStyles />
    </div>
  );
}

function CustomLabStyles() {
  // Estilos scoped del Custom Lab. Mantienen la estética dark+rojo del sitio.
  return (
    <style>{`
      .hc-lab { padding: 120px 24px 80px; max-width: 1480px; margin: 0 auto; }
      .hc-lab__hero { text-align: center; margin-bottom: 32px; }
      .hc-lab__back { color: var(--muted); text-decoration: none; font-size: 13px; opacity: .7; }
      .hc-lab__back:hover { color: var(--fg); }
      .hc-lab__eyebrow { margin: 20px 0 8px; letter-spacing: .3em; font-size: 11px; color: var(--accent); }
      .hc-lab__title { font-size: clamp(36px, 5vw, 64px); margin: 0; font-weight: 800; letter-spacing: -.02em; line-height: 1; }
      .hc-lab__title span { background: var(--grad-primary); -webkit-background-clip: text; background-clip: text; color: transparent; }
      .hc-lab__sub { color: var(--muted); max-width: 640px; margin: 16px auto 0; }

      .hc-lab__presets { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 28px; }
      .hc-lab__presets-label { font-size: 12px; color: var(--muted); margin-right: 4px; }
      .hc-chip {
        background: var(--bg-3); color: var(--fg); border: 1px solid var(--border);
        padding: 8px 16px; border-radius: 999px; font-size: 13px; cursor: pointer; transition: all .2s;
      }
      .hc-chip:hover { border-color: var(--border-strong); transform: translateY(-1px); }
      .hc-chip--on { background: var(--accent); border-color: var(--accent); color: #fff; box-shadow: 0 10px 30px -10px rgba(255,42,42,.55); }

      .hc-lab__grid {
        display: grid; gap: 20px;
        grid-template-columns: 320px minmax(0, 1fr) 340px;
        align-items: start;
      }
      @media (max-width: 1180px) { .hc-lab__grid { grid-template-columns: 280px minmax(0,1fr); } .hc-panel--right { grid-column: 1 / -1; } }
      @media (max-width: 860px)  { .hc-lab__grid { grid-template-columns: 1fr; } }

      .hc-panel {
        background: linear-gradient(180deg, var(--bg-3), var(--bg-2));
        border: 1px solid var(--border); border-radius: 20px; padding: 20px;
        position: sticky; top: 100px;
      }
      .hc-panel--center { position: static; padding: 0; background: transparent; border: 0; }
      @media (max-width: 1180px) { .hc-panel { position: static; } }

      .hc-panel__title { margin: 0 0 14px; font-size: 14px; letter-spacing: .2em; color: var(--muted); text-transform: uppercase; }

      .hc-steps { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
      .hc-step {
        display: flex; align-items: center; gap: 12px; text-align: left;
        background: transparent; border: 1px solid transparent; color: var(--fg);
        padding: 10px 12px; border-radius: 12px; cursor: pointer; transition: all .2s;
      }
      .hc-step:hover { background: rgba(255,255,255,.03); }
      .hc-step--active { background: rgba(255,42,42,.08); border-color: rgba(255,42,42,.35); }
      .hc-step__num { font-size: 11px; color: var(--muted); width: 24px; }
      .hc-step__body { display: flex; flex-direction: column; flex: 1; min-width: 0; }
      .hc-step__title { font-size: 13px; font-weight: 600; }
      .hc-step__value { font-size: 11px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .hc-step__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 12px var(--accent); }

      .hc-filters { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
      .hc-pill { background: transparent; border: 1px solid var(--border); color: var(--muted); padding: 5px 10px; font-size: 11px; border-radius: 999px; cursor: pointer; }
      .hc-pill--on { background: var(--fg); color: #000; border-color: var(--fg); }

      .hc-options { display: flex; flex-direction: column; gap: 8px; max-height: 420px; overflow: auto; padding-right: 4px; }
      .hc-options::-webkit-scrollbar { width: 6px; } .hc-options::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
      .hc-opt {
        display: flex; align-items: center; gap: 12px;
        background: var(--bg-2); border: 1px solid var(--border); color: var(--fg);
        padding: 10px; border-radius: 14px; cursor: pointer; text-align: left; transition: all .2s;
        animation: hcFade .25s ease;
      }
      .hc-opt:hover { transform: translateY(-1px); border-color: var(--border-strong); }
      .hc-opt--on { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent), 0 10px 30px -15px rgba(255,42,42,.6); }
      .hc-opt__sw { width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0; box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); }
      .hc-opt__body { flex: 1; min-width: 0; }
      .hc-opt__name { font-size: 13px; font-weight: 600; }
      .hc-opt__meta { font-size: 11px; color: var(--muted); }
      .hc-opt__price { font-size: 13px; font-weight: 700; color: var(--accent); white-space: nowrap; }
      .hc-opt--clear { justify-content: center; color: var(--muted); border-style: dashed; }

      .hc-stage {
        position: relative; height: clamp(320px, 50vh, 520px); border-radius: 20px;
        background: radial-gradient(ellipse at 50% 60%, rgba(255,42,42,.18), transparent 60%), linear-gradient(180deg, #0a0a0a, #050505);
        border: 1px solid var(--border); overflow: hidden; display: flex; align-items: center; justify-content: center;
        margin-bottom: 20px;
      }
      .hc-stage__grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
        background-size: 40px 40px;
        mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
      }
      .hc-skate { position: relative; width: min(80%, 480px); aspect-ratio: 16/10; display: grid; place-items: center; animation: hcFloat 6s ease-in-out infinite; }
      .hc-layer {
        position: absolute; inset: 10%;
        border-radius: 80px 30px 30px 80px / 60px 30px 30px 60px;
        display: flex; align-items: flex-end; justify-content: flex-start;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.06), 0 30px 60px -20px rgba(0,0,0,.7);
        animation: hcFadeIn .45s ease;
      }
      .hc-layer:nth-child(1) { inset: 30% 8% 30% 8%; border-radius: 12px; opacity: .9; } /* plancha */
      .hc-layer:nth-child(2) { inset: 8% 12% 28% 12%; }                                  /* bota */
      .hc-layer:nth-child(3) { inset: 62% 10% 12% 10%; border-radius: 999px; height: 24%; } /* ruedas */
      .hc-layer:nth-child(4) { inset: 25% 4% 25% 78%; border-radius: 8px; }              /* freno */
      .hc-layer:nth-child(5) { inset: 18% 78% 30% 4%; border-radius: 50% 30% 30% 50%; }  /* puntera */
      .hc-layer__label { font-size: 10px; padding: 4px 8px; background: rgba(0,0,0,.5); border-radius: 999px; margin: 8px; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.85); }
      .hc-stage__hint { position: absolute; bottom: 10px; right: 14px; font-size: 10px; color: var(--muted); margin: 0; letter-spacing: .12em; text-transform: uppercase; }

      .hc-block__title { margin: 0 0 14px; font-size: 14px; letter-spacing: .2em; color: var(--muted); text-transform: uppercase; }

      .hc-stats {
        background: var(--bg-3); border: 1px solid var(--border); border-radius: 20px;
        padding: 20px; margin-bottom: 20px;
      }
      .hc-stats__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }
      .hc-stat__row { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); margin-bottom: 6px; }
      .hc-stat__val { color: var(--fg); font-weight: 700; }
      .hc-stat__bar { height: 6px; background: rgba(255,255,255,.06); border-radius: 999px; overflow: hidden; }
      .hc-stat__bar div { height: 100%; background: var(--grad-primary); border-radius: 999px; transition: width .5s cubic-bezier(.2,.8,.2,1); }

      .hc-compare { background: var(--bg-3); border: 1px solid var(--border); border-radius: 20px; padding: 20px; }
      .hc-compare__wrap { overflow-x: auto; }
      .hc-table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 560px; }
      .hc-table th, .hc-table td { padding: 10px 12px; text-align: left; border-bottom: 1px solid var(--border); }
      .hc-table th { color: var(--muted); font-weight: 500; text-transform: uppercase; letter-spacing: .12em; font-size: 11px; }
      .hc-table .is-on { background: rgba(255,42,42,.08); color: var(--fg); }
      .hc-table__total td { font-weight: 700; }

      .hc-summary__eyebrow { font-size: 11px; letter-spacing: .25em; color: var(--muted); text-transform: uppercase; margin: 0 0 4px; }
      .hc-summary__level { margin: 0; font-size: 22px; font-weight: 800; display: flex; flex-direction: column; }
      .hc-summary__level span { font-size: 12px; color: var(--muted); font-weight: 400; margin-top: 2px; }
      .hc-summary__price { font-size: 34px; font-weight: 900; margin: 14px 0 4px; background: var(--grad-primary); -webkit-background-clip: text; background-clip: text; color: transparent; }
      .hc-summary__meta { display: flex; gap: 14px; font-size: 12px; color: var(--muted); margin-bottom: 16px; }
      .hc-summary__list { list-style: none; padding: 0; margin: 0 0 18px; border-top: 1px solid var(--border); }
      .hc-summary__list li { display: flex; justify-content: space-between; gap: 10px; font-size: 12px; padding: 8px 0; border-bottom: 1px solid var(--border); }
      .hc-summary__list .is-empty .hc-summary__v { color: rgba(255,255,255,.25); }
      .hc-summary__k { color: var(--muted); }
      .hc-summary__v { color: var(--fg); font-weight: 600; text-align: right; max-width: 60%; }
      .hc-summary__actions { display: grid; gap: 8px; }
      .hc-btn { padding: 12px 16px; border-radius: 12px; font-weight: 700; font-size: 14px; cursor: pointer; border: 0; text-align: center; text-decoration: none; display: block; transition: all .2s; }
      .hc-btn--wa { background: var(--wa); color: #00220e; box-shadow: 0 14px 30px -10px rgba(37,211,102,.5); }
      .hc-btn--wa:hover { transform: translateY(-2px); }
      .hc-btn--ghost { background: transparent; color: var(--fg); border: 1px solid var(--border-strong); }
      .hc-btn--ghost:hover { border-color: var(--accent); color: var(--accent); }
      .hc-summary__note { font-size: 11px; color: var(--muted); text-align: center; margin: 10px 0 0; }

      .hc-ai { margin-top: 20px; background: linear-gradient(180deg, rgba(139,92,255,.08), rgba(255,42,42,.04)); border: 1px solid var(--border); border-radius: 20px; padding: 18px; }
      .hc-ai__head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
      .hc-ai__pulse { width: 10px; height: 10px; border-radius: 50%; background: var(--accent-3); box-shadow: 0 0 0 0 var(--accent-3); animation: hcPulse 1.8s infinite; }
      .hc-ai__title { margin: 0; font-size: 14px; font-weight: 700; }
      .hc-ai__sub { margin: 0; font-size: 11px; color: var(--muted); }
      .hc-ai__list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
      .hc-ai__msg { background: rgba(0,0,0,.35); border: 1px solid var(--border); border-radius: 12px; padding: 10px 12px; font-size: 12px; display: flex; flex-direction: column; gap: 2px; animation: hcFade .3s ease; }
      .hc-ai__msg b { font-size: 11px; color: var(--accent-2); letter-spacing: .04em; }
      .hc-ai__msg span { color: var(--muted); line-height: 1.45; }
      .hc-ai__msg--empty { color: var(--muted); text-align: center; }

      @keyframes hcFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
      @keyframes hcFadeIn { from { opacity: 0; transform: scale(.95); } to { opacity: 1; transform: scale(1); } }
      @keyframes hcFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      @keyframes hcPulse { 0% { box-shadow: 0 0 0 0 rgba(139,92,255,.6); } 70% { box-shadow: 0 0 0 12px rgba(139,92,255,0); } 100% { box-shadow: 0 0 0 0 rgba(139,92,255,0); } }
    `}</style>
  );
}
