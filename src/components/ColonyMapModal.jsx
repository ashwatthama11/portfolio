import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { startColonyMap } from "../colonymap/renderer";
import { DATA, SOLD_IDS } from "../colonymap/layout";
import { MAP_CONFIG } from "../colonymap/config";

function injectColonyStyles() {
  if (document.getElementById("colony-map-styles")) return;
  const style = document.createElement("style");
  style.id = "colony-map-styles";
  style.textContent = `
    :root{--teal:#38BDF8;--green:#34D399;--panel:rgba(255,255,255,0.07);--panel-solid:#0F172A;--line:rgba(255,255,255,0.10);--fg:#E2E8F0;--muted:#94A3B8}
    .cm-app{position:relative;width:100%;height:100%;font-family:system-ui,-apple-system,sans-serif;color:var(--fg);font-size:15px;line-height:1.4;-webkit-font-smoothing:antialiased}
    .cm-app *{box-sizing:border-box}
    .cm-stage{position:relative;width:100%;height:100%;background:#0F172A;overflow:hidden}
    .cm-stage canvas{display:block;touch-action:none;position:absolute;left:0;top:0;z-index:1}
    .cm-basemap{position:absolute;left:0;top:0;transform-origin:0 0;z-index:0;pointer-events:none;display:none;filter:brightness(.62) saturate(.88);-webkit-mask-image:radial-gradient(closest-side,#000 60%,transparent 100%);mask-image:radial-gradient(closest-side,#000 60%,transparent 100%);will-change:transform}
    .cm-gattr{position:absolute;left:8px;bottom:1px;font-size:9px;color:rgba(255,255,255,.82);z-index:5;pointer-events:none;text-shadow:0 1px 2px #000}
    #cm-btnMap{font-size:13px;font-weight:700}
    .cm-app button{font-family:inherit;color:inherit;cursor:pointer}
    .cm-brand{z-index:2;position:absolute;left:14px;top:calc(12px + env(safe-area-inset-top,0px));display:inline-flex;align-items:center;gap:12px;pointer-events:none;max-width:calc(100% - 72px);background:var(--panel);border:1px solid var(--line);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);padding:6px 14px 6px 8px;border-radius:16px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
    .cm-brandLogoBox{width:42px;height:42px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;flex:none;overflow:hidden;padding:3px}
    .cm-brandMark{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 2px 6px rgba(0,0,0,.4))}
    .cm-brandName{font-size:clamp(16px,4vw,22px);font-weight:800;letter-spacing:.5px;color:#FF7A00;text-shadow:0 2px 10px rgba(0,0,0,.6);line-height:1.1;display:block}
    .cm-brandSub{display:block;font-size:10px;font-weight:700;letter-spacing:.14em;color:#FF7A00;opacity:.85;margin-top:2px}
    .cm-compass{z-index:2;position:absolute;left:14px;top:calc(76px + env(safe-area-inset-top,0px));width:72px;height:72px;border-radius:50%;border:2px solid rgba(255,255,255,.16);background:radial-gradient(circle at 50% 40%,rgba(58,60,62,.9),rgba(24,26,28,.9));box-shadow:0 6px 18px rgba(0,0,0,.45);padding:0;cursor:pointer}
    .cm-dial{position:absolute;inset:0;border-radius:50%}
    .cm-dial i{position:absolute;font-style:normal;font-size:11px;font-weight:800;color:#e8eaed}
    .cm-dial .n{top:4px;left:50%;transform:translateX(-50%);color:#ff6b6b}
    .cm-dial .s{bottom:4px;left:50%;transform:translateX(-50%)}
    .cm-dial .e{right:6px;top:50%;transform:translateY(-50%)}
    .cm-dial .w{left:5px;top:50%;transform:translateY(-50%)}
    .cm-needle{position:absolute;left:50%;top:22%;width:3px;height:56%;margin-left:-1.5px;border-radius:2px;background:linear-gradient(#ff4d4d 50%,#9aa0a6 50%)}
    .cm-legend{z-index:2;position:absolute;left:14px;top:calc(158px + env(safe-area-inset-top,0px));background:var(--panel);padding:9px 12px;border-radius:14px;font-size:12px;display:grid;gap:7px;pointer-events:none;backdrop-filter:blur(8px)}
    .cm-legend[hidden]{display:none}
    .cm-legend div{display:flex;align-items:center;gap:8px}
    .cm-swatch{width:12px;height:12px;border-radius:4px}
    .cm-swatch.avail{background:#E2E8F0}.cm-swatch.soldsw{background:#EF4444}.cm-swatch.sel{background:#F97316}
    .cm-infoCard{position:absolute;right:12px;top:calc(12px + env(safe-area-inset-top,0px));width:210px;padding:14px;border-radius:16px;background:rgba(15,23,42,0.95);backdrop-filter:blur(12px);box-shadow:0 16px 45px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,0.08);z-index:4}
    .cm-infoCard[hidden],.cm-searchBar[hidden],.cm-planPanel[hidden],.cm-infoPanel[hidden],.cm-toast[hidden],.cm-err[hidden]{display:none}
    .cm-close{position:absolute;right:8px;top:8px;border:0;background:transparent;color:#9db0c4;padding:4px;display:grid;place-items:center}
    .cm-eyebrow{font-size:9px;letter-spacing:.13em;color:#94A3B8;font-weight:700}
    .cm-plotTitle{font-size:24px;font-weight:800;margin:3px 0 10px}
    .cm-statusRow{margin-bottom:10px}
    .cm-pill{display:inline-block;padding:4px 11px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.03em}
    .cm-pill.avail{background:rgba(52,211,153,.18);color:#6ee7b7}.cm-pill.sold{background:rgba(239,68,68,.18);color:#fca5a5}
    .cm-soldBtn{width:100%;height:36px;border-radius:10px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.08);font-weight:600;font-size:12px}
    .cm-searchBar{position:absolute;left:50%;top:calc(12px + env(safe-area-inset-top,0px));transform:translateX(-50%);width:min(420px,calc(100% - 24px));height:52px;border-radius:26px;background:var(--panel-solid);box-shadow:0 12px 40px rgba(0,0,0,.5);display:flex;align-items:center;gap:10px;padding:0 10px 0 18px;z-index:6;border:1px solid var(--line)}
    .cm-searchBar input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:var(--fg);font-size:16px;font-family:inherit}
    .cm-searchBar .cm-close{position:static}
    .cm-dock{position:absolute;left:0;right:0;bottom:0;padding:10px 10px calc(10px + env(safe-area-inset-bottom,0px));display:grid;gap:8px;max-width:560px;z-index:3}
    .cm-row{display:flex;gap:8px;align-items:center}
    .cm-row.spread{justify-content:space-between}
    .cm-pillBtn,.cm-toggle,.cm-wa,.cm-circle{background:var(--panel);border:1px solid var(--line);backdrop-filter:blur(8px);box-shadow:0 6px 18px rgba(0,0,0,.35)}
    .cm-pillBtn{flex:1;min-width:0;height:52px;border-radius:26px;display:flex;align-items:center;justify-content:center;gap:9px;font-size:16px;font-weight:500}
    .cm-toggle{height:52px;border-radius:26px;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:0 10px 0 20px;font-size:17px;font-weight:500;min-width:150px}
    .cm-switch{width:50px;height:30px;border-radius:15px;background:#5b5e63;position:relative;flex:none;transition:background .15s}
    .cm-switch::after{content:"";position:absolute;left:3px;top:3px;width:24px;height:24px;border-radius:50%;background:#fff;transition:transform .15s}
    .cm-toggle[aria-checked="true"] .cm-switch{background:#F97316}
    .cm-toggle[aria-checked="true"] .cm-switch::after{transform:translateX(20px)}.cm-toggle[aria-checked="true"]{color:#F97316;border-color:rgba(249,115,22,0.35)}
    .cm-wa{flex:1;min-width:0;height:52px;border-radius:26px;display:flex;align-items:center;gap:10px;padding:0 14px;text-decoration:none;color:inherit}
    .cm-wa b{display:block;font-size:15px;font-weight:600;line-height:1.1}
    .cm-wa small{display:block;font-size:12.5px;color:var(--muted);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .cm-circle{width:52px;height:52px;border-radius:50%;display:grid;place-items:center;font-size:20px;font-weight:800;flex:none}
    .cm-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
    .cm-grid3 .cm-pillBtn{height:48px;font-size:15px}
    .cm-planPanel,.cm-infoPanel{position:absolute;left:50%;top:calc(70px + env(safe-area-inset-top,0px));transform:translateX(-50%);width:min(460px,calc(100% - 24px));max-height:calc(100% - 300px);background:var(--panel-solid);border:1px solid var(--line);border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,.55);overflow:hidden;display:flex;flex-direction:column;z-index:7}
    .cm-panelHead{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid var(--line)}
    .cm-panelHead b{font-size:13px}
    .cm-panelHead button{border:0;background:rgba(255,255,255,.08);width:30px;height:30px;border-radius:9px;display:grid;place-items:center}
    .cm-planPanel img{width:100%;flex:1;min-height:0;object-fit:contain;background:#f4f4f2}
    .cm-infoBody{padding:6px 16px 14px;overflow:auto}
    .cm-kv{display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-bottom:1px solid var(--line);font-size:13.5px}
    .cm-kv:last-of-type{border-bottom:0}
    .cm-kv span:first-child{color:var(--muted)}
    .cm-kv b{font-weight:700}
    .cm-toast{position:absolute;left:50%;bottom:calc(300px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);max-width:calc(100% - 40px);background:rgba(10,12,14,.94);border:1px solid var(--line);padding:10px 16px;border-radius:14px;font-size:13px;z-index:9;text-align:center}
    .cm-err{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);max-width:min(420px,calc(100% - 40px));padding:14px 16px;border-radius:14px;background:var(--panel-solid);box-shadow:0 12px 40px rgba(0,0,0,.4);font-size:13px;line-height:1.45;z-index:10}
    @media(max-width:700px){
      .cm-dock{padding:8px 8px calc(8px + env(safe-area-inset-bottom,0px));gap:7px}
      .cm-pillBtn,.cm-toggle,.cm-wa{height:48px}.cm-circle{width:48px;height:48px}.cm-grid3 .cm-pillBtn{height:44px;font-size:14px}
      .cm-toggle{min-width:136px;font-size:16px;padding-left:16px}
      .cm-infoCard{width:190px}
      .cm-toast{bottom:calc(270px + env(safe-area-inset-bottom,0px))}
      .cm-planPanel,.cm-infoPanel{max-height:calc(100% - 270px)}
    }
    @keyframes cmFadeIn{from{opacity:0;transform:scale(1.015)}to{opacity:1;transform:scale(1)}}
  `;
  document.head.appendChild(style);
}

export default function ColonyMapModal({ onClose }) {
  const stageRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    injectColonyStyles();
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      if (stageRef.current) {
        cleanupRef.current = startColonyMap(DATA, { soldIds: SOLD_IDS, map: MAP_CONFIG });
      }
    }, 60);
    return () => {
      clearTimeout(timer);
      if (cleanupRef.current) cleanupRef.current();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#0F172A", display: "flex", flexDirection: "column", animation: "cmFadeIn 0.25s ease" }}>
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close 3D layout"
        style={{ position: "absolute", top: 14, right: 14, zIndex: 10001, width: 44, height: 44, borderRadius: "50%", background: "rgba(18,20,22,0.92)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", display: "grid", placeItems: "center", cursor: "pointer", color: "#e8eaed", boxShadow: "0 4px 16px rgba(0,0,0,0.5)", transition: "background 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,122,0,0.9)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(18,20,22,0.92)"}
      >
        <X size={20} />
      </button>

      <div className="cm-app" style={{ flex: 1, overflow: "hidden" }}>
        <main className="cm-stage" id="stage" ref={stageRef}>
          <div className="cm-basemap" id="basemap" />
          <div className="cm-brand">
            <div className="cm-brandLogoBox">
              <img
                src="/image/big-logo-white.png"
                alt="AVA Logo"
                className="cm-brandMark"
                onError={(e) => {
                  e.currentTarget.src = "/images/big-logo-white.png";
                }}
              />
            </div>
            <div>
              <span className="cm-brandName">AVA SMART LAYOUT</span>
              <span className="cm-brandSub">INTERACTIVE 3D LAYOUT</span>
            </div>
          </div>
          <button className="cm-compass" id="compass" type="button" aria-label="Reset to north">
            <div className="cm-dial" id="dial">
              <i className="n">N</i><i className="e">E</i><i className="s">S</i><i className="w">W</i>
              <span className="cm-needle"></span>
            </div>
          </button>
          <div className="cm-legend" id="legend" hidden>
            <div><span className="cm-swatch avail"></span>Available</div>
            <div><span className="cm-swatch soldsw"></span>Sold</div>
            <div><span className="cm-swatch sel"></span>Selected</div>
          </div>
          <div className="cm-infoCard" id="info" hidden>
            <button className="cm-close" id="closeInfo" type="button" aria-label="Clear selection">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
            <div className="cm-eyebrow">SELECTED PLOT</div>
            <div className="cm-plotTitle" id="plotTitle">Plot 1</div>
            <div className="cm-statusRow"><span id="statusPill" className="cm-pill avail">Available</span></div>
            <div className="cm-plotDims" id="plotDims" style={{ marginTop: "10px", marginBottom: "6px", fontSize: "12px", lineHeight: "1.5", color: "rgba(255,255,255,0.8)", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "8px" }}></div>
            <button id="toggleSold" className="cm-soldBtn" type="button">Mark as sold</button>
          </div>
          <div className="cm-searchBar" id="searchBar" hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <input id="q" inputMode="numeric" autoComplete="off" placeholder="Search plot number" aria-label="Search plot number" />
            <button className="cm-close" id="closeSearch" type="button" aria-label="Close search">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>
          <div className="cm-err" id="err" hidden></div>
          <div className="cm-toast" id="toast" hidden></div>
          <div className="cm-gattr" id="gattr" hidden />
          <div className="cm-planPanel" id="planPanel" hidden>
            <div className="cm-panelHead">
              <b>Brochure � original layout drawing</b>
              <button id="closePlan" type="button" aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
            <img src="/layout-plan.jpg" alt="Original colony master plan drawing" />
          </div>
          <div className="cm-infoPanel" id="infoPanel" hidden>
            <div className="cm-panelHead">
              <b>Project info</b>
              <button id="closeInfoPanel" type="button" aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
            <div className="cm-infoBody" id="infoBody"></div>
          </div>
          <div className="cm-dock">
            <div className="cm-row spread">
              <button className="cm-toggle" id="tgZones" type="button" role="switch" aria-checked="false">Zones<span className="cm-switch"></span></button>
              <div className="cm-row">
                <button className="cm-circle" id="btnMap" type="button" aria-label="Map type" style={{ display: "none" }}>OFF</button>
                <button className="cm-circle" id="btn2d" type="button" aria-label="Toggle 2D / 3D view">2D</button>
                <button className="cm-circle" id="btnHome" type="button" aria-label="Reset view">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                </button>
              </div>
            </div>
            <div className="cm-row">
              <button className="cm-toggle" id="tgStatus" type="button" role="switch" aria-checked="false">Status<span className="cm-switch"></span></button>
              <a className="cm-wa" id="waLink" href="#" target="_blank" rel="noopener">
                <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21l1.65-4.9A9 9 0 1 1 8 19.4z" fill="none" stroke="#25d366" strokeWidth="2" strokeLinejoin="round" /><path d="M9 8.5c.3 2.4 3 5.6 6 6.5l1.4-1.2-1.6-1.3-1 .6c-1-.4-2.1-1.5-2.5-2.5l.7-.9L10.7 8z" fill="#25d366" /></svg>
                <span style={{ minWidth: 0 }}><b>WhatsApp</b><small id="waText">Inquire project</small></span>
              </a>
              <button className="cm-circle" id="btnShare" type="button" aria-label="Share">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 14 5-5-5-5" /><path d="M4 20v-7a4 4 0 0 1 4-4h12" /></svg>
              </button>
            </div>
            <div className="cm-grid3">
              <button className="cm-pillBtn" id="btnGallery" type="button">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>Gallery
              </button>
              <button className="cm-pillBtn" id="btnSearch" type="button">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>Search
              </button>
              <button className="cm-pillBtn" id="btnGps" type="button">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="7" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></svg>GPS
              </button>
            </div>
            <div className="cm-grid3">
              <button className="cm-pillBtn" id="btnBrochure" type="button">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /></svg>Brochure
              </button>
              <button className="cm-pillBtn" id="btnInfo" type="button">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>Info
              </button>
              <button className="cm-pillBtn" id="btnLocate" type="button">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>Locate
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


