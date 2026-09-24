/* Canvas 2D renderer for the colony master plan (map-app style).
 * startColonyMap(DATA, { soldIds }) -> cleanup()
 * Expects the markup in components/ColonyMap.jsx to be mounted (uses its element ids).
 */

import { PLOT_DIMENSIONS } from "./plotDimensions.js";

export function startColonyMap(DATA, opts) {
  opts = opts || {};
  const offs = [];
  let stopped = false, raf = 0, canvasEl = null;
  const on = (target, ev, fn, o) => { target.addEventListener(ev, fn, o); offs.push(() => target.removeEventListener(ev, fn, o)); };
  const errBox = document.getElementById("err");
  function fail(m) { if (errBox) { errBox.hidden = false; errBox.textContent = m; } }
  on(window, "error", (e) => fail("Script error: " + (e.message || e)));
  try { start(); } catch (e) { fail("Could not start the 3D view: " + (e && e.message ? e.message : e)); }
  return function cleanup() {
    stopped = true; cancelAnimationFrame(raf);
    offs.forEach((f) => { try { f(); } catch (_) { } });
    if (canvasEl && canvasEl.parentNode) canvasEl.parentNode.removeChild(canvasEl);
  };

  function start() {
    // ---------- helpers ----------
    const SC = 0.034, CX = 766, CZ = 473;
    const P = (px, py) => [(px - CX) * SC, (py - CZ) * SC];
    const rnd = (function (a) { return function () { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; })(20260919);
    const rr = (a, b) => a + (b - a) * rnd();
    function inPoly(x, z, poly) {
      let inside = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const xi = poly[i][0], zi = poly[i][1], xj = poly[j][0], zj = poly[j][1];
        if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
      }
      return inside;
    }
    function centroid(poly) { let x = 0, z = 0; poly.forEach((p) => { x += p[0]; z += p[1]; }); return [x / poly.length, z / poly.length]; }
    function scaleAbout(poly, k) { const c = centroid(poly); return poly.map((p) => [c[0] + (p[0] - c[0]) * k, c[1] + (p[1] - c[1]) * k]); }
    function distSeg(px, pz, a, b) {
      const dx = b[0] - a[0], dz = b[1] - a[1], l2 = dx * dx + dz * dz;
      let t = l2 ? ((px - a[0]) * dx + (pz - a[1]) * dz) / l2 : 0; t = Math.max(0, Math.min(1, t));
      return Math.hypot(px - (a[0] + t * dx), pz - (a[1] + t * dz));
    }
    function ell(cx, cz, rx, rz, n, jit) {
      const out = [], ph = rnd() * 6;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2, j = jit ? 1 + jit * Math.sin(a * 3 + ph) * 0.6 + jit * Math.cos(a * 5 + ph * 2) * 0.4 : 1;
        out.push([cx + Math.cos(a) * rx * j, cz + Math.sin(a) * rz * j]);
      }
      return out;
    }
    function catmull(pts, per) {
      const out = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
        for (let k = 0; k < per; k++) {
          const t = k / per, t2 = t * t, t3 = t2 * t;
          out.push([0, 1].map((c) => 0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3)));
        }
      }
      out.push(pts[pts.length - 1]);
      return out;
    }

    // ---------- canvas / camera ----------
    const stage = document.getElementById("stage");
    const canvas = document.createElement("canvas"); canvasEl = canvas;
    stage.insertBefore(canvas, stage.firstChild);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not supported in this browser.");
    let W = 0, H = 0, dpr = 1, F = 1, dirty = true, fitted = false;
    const FOV = 42, NEAR = 0.3;
    const FONT = 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
    function resize() {
      const w = stage.clientWidth, h = stage.clientHeight;
      if (!w || !h) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = w; H = h;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      F = H / 2 / Math.tan((FOV * Math.PI) / 360);
      dirty = true;
    }
    const theme = { bg: "#0c0e0c", shadow: "rgba(0,0,0,0.4)", glow: 0.14 };
    let theta = 0.35, phi = 0.95, radius = 52;
    const tgt = { x: 0, z: 0 };
    const cam = { x: 0, y: 0, z: 0 }, Rt = { x: 1, z: 0 }, Up = { x: 0, y: 1, z: 0 }, Fw = { x: 0, y: 0, z: -1 };
    const MIN_PHI = 0.02, MAX_PHI = Math.PI / 2.1, MIN_R = 7, MAX_R = 110;
    function updateCam() {
      phi = Math.max(MIN_PHI, Math.min(MAX_PHI, phi)); radius = Math.max(MIN_R, Math.min(MAX_R, radius));
      cam.x = tgt.x + radius * Math.sin(phi) * Math.sin(theta); cam.y = radius * Math.cos(phi); cam.z = tgt.z + radius * Math.sin(phi) * Math.cos(theta);
      let fx = tgt.x - cam.x, fy = -cam.y, fz = tgt.z - cam.z; const fl = Math.hypot(fx, fy, fz); fx /= fl; fy /= fl; fz /= fl;
      Fw.x = fx; Fw.y = fy; Fw.z = fz;
      let rx = -fz, rz = fx; const rl = Math.hypot(rx, rz); rx /= rl; rz /= rl; Rt.x = rx; Rt.z = rz;
      Up.x = -rz * fy; Up.y = rz * fx - rx * fz; Up.z = rx * fy;
      dirty = true;
    }
    updateCam();
    function toCam(x, y, z) { const dx = x - cam.x, dy = y - cam.y, dz = z - cam.z; return [dx * Rt.x + dz * Rt.z, dx * Up.x + dy * Up.y + dz * Up.z, dx * Fw.x + dy * Fw.y + dz * Fw.z]; }
    function clipNear(poly) {
      const out = [];
      for (let i = 0; i < poly.length; i++) {
        const a = poly[i], b = poly[(i + 1) % poly.length], ain = a[2] >= NEAR, bin = b[2] >= NEAR;
        if (ain) out.push(a);
        if (ain !== bin) { const t = (NEAR - a[2]) / (b[2] - a[2]); out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, NEAR]); }
      }
      return out;
    }
    const scr = (p) => [W / 2 + (p[0] / p[2]) * F, H / 2 - (p[1] / p[2]) * F];
    const colorCache = {};
    function shade(hex, k) {
      const key = hex + k.toFixed(2); if (colorCache[key]) return colorCache[key];
      const n = parseInt(hex.slice(1), 16);
      const c = (v) => Math.min(255, Math.round(v * k));
      return (colorCache[key] = "rgb(" + c((n >> 16) & 255) + "," + c((n >> 8) & 255) + "," + c(n & 255) + ")");
    }
    const L = { x: 0.39, y: 0.78, z: 0.488 };
    const tok = (c) => (c && c[0] === "@" ? theme[c.slice(1)] : c);

    function fillPoly(pts, fill, stroke, lw) {
      let c = pts.map((p) => toCam(p[0], p[1], p[2]));
      let need = false; for (let i = 0; i < c.length; i++) if (c[i][2] < NEAR) { need = true; break; }
      if (need) c = clipNear(c);
      if (c.length < 3) return null;
      const s = c.map(scr);
      let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
      for (let i = 0; i < s.length; i++) { const p = s[i]; if (p[0] < minx) minx = p[0]; if (p[0] > maxx) maxx = p[0]; if (p[1] < miny) miny = p[1]; if (p[1] > maxy) maxy = p[1]; }
      if (maxx < -20 || minx > W + 20 || maxy < -20 || miny > H + 20) return s;
      ctx.beginPath(); ctx.moveTo(s[0][0], s[0][1]);
      for (let i = 1; i < s.length; i++) ctx.lineTo(s[i][0], s[i][1]);
      ctx.closePath();
      ctx.fillStyle = fill; ctx.fill();
      if (stroke !== false) { ctx.strokeStyle = stroke || fill; ctx.lineWidth = lw || 1; ctx.stroke(); }
      return s;
    }
    const to3 = (poly, y) => poly.map((p) => [p[0], y, p[1]]);
    function segPath(a, b) {
      let p = toCam(a[0], a[1], a[2]), q = toCam(b[0], b[1], b[2]);
      if (p[2] < NEAR && q[2] < NEAR) return;
      if (p[2] < NEAR) { const t = (NEAR - p[2]) / (q[2] - p[2]); p = [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, NEAR]; }
      else if (q[2] < NEAR) { const t = (NEAR - q[2]) / (p[2] - q[2]); q = [q[0] + (p[0] - q[0]) * t, q[1] + (p[1] - q[1]) * t, NEAR]; }
      const s1 = scr(p), s2 = scr(q); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(s2[0], s2[1]);
    }
    function flatText(text, x, y, z, ex, ez, sizeW, weight, color) {
      const o = toCam(x, y, z), a = toCam(x + ex[0], y, z + ex[1]), b = toCam(x + ez[0], y, z + ez[1]);
      if (o[2] < NEAR || a[2] < NEAR || b[2] < NEAR) return;
      if ((sizeW * F) / o[2] < 4.5) return;
      const so = scr(o), sa = scr(a), sb = scr(b), u = 0.01;
      ctx.setTransform(dpr * (sa[0] - so[0]) * u, dpr * (sa[1] - so[1]) * u, dpr * (sb[0] - so[0]) * u, dpr * (sb[1] - so[1]) * u, dpr * so[0], dpr * so[1]);
      ctx.font = weight + " " + sizeW / u + "px " + FONT; ctx.fillStyle = color; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(text, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // generic prism (convex polygon extruded) -> returns screen polys of the faces drawn
    function drawPrism(pts, y0, y1, hex, edgeCol, capHex) {
      const c = centroid(pts), out = [];
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i], b = pts[(i + 1) % pts.length];
        const mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2;
        let nx = mx - c[0], nz = mz - c[1]; const nl = Math.hypot(nx, nz) || 1; nx /= nl; nz /= nl;
        // use true edge normal, oriented outward
        let ex = b[0] - a[0], ez = b[1] - a[1]; const el = Math.hypot(ex, ez) || 1; let tx = ez / el, tz = -ex / el;
        if (tx * nx + tz * nz < 0) { tx = -tx; tz = -tz; }
        if (tx * (cam.x - mx) + tz * (cam.z - mz) <= 0) continue;
        const k = 0.6 + 0.4 * Math.max(0, tx * L.x + tz * L.z);
        const s = fillPoly([[a[0], y0, a[1]], [b[0], y0, b[1]], [b[0], y1, b[1]], [a[0], y1, a[1]]], shade(hex, k), edgeCol, 0.6);
        if (s) out.push(s);
      }
      const top = fillPoly(to3(pts, y1), shade(capHex || hex, 0.6 + 0.4 * L.y), edgeCol, 0.6);
      if (top) out.push(top);
      return out;
    }
    // frustum around a centre with rotation (walls + hip roofs)
    function rectCorners(cx, cz, w, d, rot) {
      const c = Math.cos(rot || 0), s = Math.sin(rot || 0);
      return [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]].map((q) => [cx + q[0] * c + q[1] * s, cz - q[0] * s + q[1] * c]);
    }
    function drawFrustum(f) {
      const B = rectCorners(f.cx, f.cz, f.w, f.d, f.rot), T = rectCorners(f.cx, f.cz, f.w2 == null ? f.w : f.w2, f.d2 == null ? f.d : f.d2, f.rot);
      for (let i = 0; i < 4; i++) {
        const j = (i + 1) % 4;
        const b0 = [B[i][0], f.y0, B[i][1]], b1 = [B[j][0], f.y0, B[j][1]], t0 = [T[i][0], f.y1, T[i][1]], t1 = [T[j][0], f.y1, T[j][1]];
        const u = [t0[0] - b0[0], t0[1] - b0[1], t0[2] - b0[2]], v = [b1[0] - b0[0], b1[1] - b0[1], b1[2] - b0[2]];
        let nx = u[1] * v[2] - u[2] * v[1], ny = u[2] * v[0] - u[0] * v[2], nz = u[0] * v[1] - u[1] * v[0];
        const nl = Math.hypot(nx, ny, nz) || 1; nx /= nl; ny /= nl; nz /= nl;
        if (nx * (cam.x - b0[0]) + ny * (cam.y - b0[1]) + nz * (cam.z - b0[2]) <= 0) continue;
        const k = 0.55 + 0.45 * Math.max(0, nx * L.x + ny * L.y + nz * L.z);
        fillPoly([b0, b1, t1, t0], shade(f.color, k), "rgba(0,0,0,0.12)", 0.5);
      }
      if ((f.w2 == null || f.w2 > 0.001) && cam.y > f.y1) fillPoly(to3(T, f.y1), shade(f.cap || f.color, 0.6 + 0.4 * L.y), "rgba(0,0,0,0.12)", 0.5);
    }
    function frustumShadow(f) {
      const h = f.y1, ox = -(L.x / L.y) * h, oz = -(L.z / L.y) * h;
      const B = rectCorners(f.cx, f.cz, f.w, f.d, f.rot);
      fillPoly(B.map((p) => [p[0] + ox, 0.075, p[1] + oz]), theme.shadow, false);
    }

    // ---------- config ----------
    const PROJECT = "Colony Master Plan";
    const WHATSAPP = ""; // digits only with country code, e.g. "919876543210" (empty = WhatsApp lets the user pick a contact)

    // ---------- site + terrain ----------
    const SITE = DATA.site.map((p) => P(p[0], p[1]));
    const siteC = centroid(SITE);
    const TER = [];
    const tones = ["#181a18", "#1f221f", "#262825", "#1a231a", "#1e281c", "#2c2e2b", "#141614"];
    const siteBig = scaleAbout(SITE, 1.04);
    for (let i = 0; i < 360; i++) {
      const x = siteC[0] + rr(-1, 1) * 40, z = siteC[1] + rr(-1, 1) * 25; if (inPoly(x, z, siteBig)) continue;
      TER.push({ pts: to3(rectCorners(x, z, rr(0.8, 3.4), rr(0.8, 3.2), rnd() * 3.14), -0.04), fill: tones[Math.floor(rnd() * tones.length)] });
    }
    for (let i = 0; i < 46; i++) {
      const x = siteC[0] + rr(-1, 1) * 40, z = siteC[1] + rr(-1, 1) * 25; if (inPoly(x, z, siteBig)) continue;
      TER.push({ pts: to3(ell(x, z, rr(2, 5), rr(1.5, 4), 12, 0.3), -0.035), fill: "rgba(30,46,26,0.55)", stroke: false });
    }
    const G = [];
    G.push({ pts: to3(SITE, 0.02), fill: "#3a3b3f", stroke: "#4d4e54", lw: 1.5 });

    // ---------- plots ----------
    const ZB = [46, 67, 90, 111, 135, 159, 183, 210, 234, 258, 999];
    const ZP = ["#7aa2f7", "#f7768e", "#9ece6a", "#e0af68", "#bb9af7", "#7dcfff", "#ff9e64", "#73daca", "#c0caf5", "#e5c07b", "#56b6c2"];
    const zoneOf = (id) => { let z = 0; while (id > ZB[z]) z++; return z; };
    const plots = DATA.plots.map((d) => {
      const raw = []; for (let i = 0; i < d[1].length; i += 2) raw.push(P(d[1][i], d[1][i + 1]));
      const pts = scaleAbout(raw, 0.94), c = centroid(pts);
      const e = [pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]], e2 = [pts[2][0] - pts[1][0], pts[2][1] - pts[1][1]];
      const l1 = Math.hypot(e[0], e[1]), l2 = Math.hypot(e2[0], e2[1]);
      let ex = l1 >= l2 ? e : e2; const el = Math.hypot(ex[0], ex[1]); ex = [ex[0] / el, ex[1] / el];
      if (Math.abs(ex[0]) >= Math.abs(ex[1])) { if (ex[0] < 0) ex = [-ex[0], -ex[1]]; } else if (ex[1] > 0) ex = [-ex[0], -ex[1]];
      return { id: d[0], zone: zoneOf(d[0]), pts: pts, cx: c[0], cz: c[1], ex: ex, ez: [-ex[1], ex[0]], size: Math.min(0.25, Math.min(l1, l2) * 0.34), y: 0, polys: [] };
    });
    const byId = new Map(plots.map((p) => [p.id, p]));

    // ---------- sales status (demo data until the real list is supplied) ----------
    const KEY = "colony-sold-v1";
    let sold = new Set();
    try { const raw = localStorage.getItem(KEY); if (raw) sold = new Set(JSON.parse(raw)); else throw 0; }
    catch (_) { sold = new Set(Array.isArray(opts.soldIds) ? opts.soldIds : plots.filter((p) => ((Math.imul(p.id, 2654435761) >>> 0) % 100) < 38).map((p) => p.id)); }
    function saveSold() { try { localStorage.setItem(KEY, JSON.stringify(Array.from(sold))); } catch (_) { } }

    // ---------- open space + amenities ----------
    const items = [], zoneLabels = [];
    const parkPoly = DATA.park.map((p) => P(p[0], p[1])), parkC = centroid(parkPoly);
    G.push({ pts: to3(parkPoly, 0.05), fill: "#54682f", stroke: "#465a28" });
    G.push({ pts: to3(scaleAbout(parkPoly, 0.9), 0.052), fill: "rgba(120,150,70,0.22)", stroke: false });
    zoneLabels.push(["OPEN SPACE", parkC, 0.55, "rgba(196,214,150,0.85)"]);
    function addBox(cx, cz, w, d, y0, h, color, rot, roof) {
      const parts = [{ cx: cx, cz: cz, w: w, d: d, y0: y0, y1: y0 + h, color: color, rot: rot || 0 }];
      if (roof) parts.push({ cx: cx, cz: cz, w: w + roof.over, d: d + roof.over, w2: w * roof.top, d2: d * roof.topd, y0: y0 + h, y1: y0 + h + roof.h, color: roof.color, rot: rot || 0, cap: roof.color });
      items.push({ x: cx, y: y0 + h / 2, z: cz, kind: "bld", parts: parts });
    }
    const amenByC = DATA.amen.map((poly) => ({ w: poly.map((p) => P(p[0], p[1])), c: centroid(poly) }));
    const findAm = (x, y) => amenByC.reduce((b, a) => (Math.hypot(a.c[0] - x, a.c[1] - y) < Math.hypot(b.c[0] - x, b.c[1] - y) ? a : b));
    const paveAmenity = (a) => { G.push({ pts: to3(a.w, 0.05), fill: "#4a4b51", stroke: "#5c5d64" }); G.push({ pts: to3(scaleAbout(a.w, 0.9), 0.053), fill: "#54555c", stroke: false }); };
    const AL = "rgba(190,196,204,0.8)", roofG = (h) => ({ over: 0.2, top: 0.4, topd: 0.28, h: h, color: "#c7c8cc" });
    const a1 = findAm(697, 223); paveAmenity(a1); let q = P(697, 200); addBox(q[0], q[1], 1.6, 1.15, 0.05, 0.5, "#dcdde0", 0, roofG(0.26)); zoneLabels.push(["AMENITY SPACE", P(697, 262), 0.2, AL]);
    const a2 = findAm(692, 466); paveAmenity(a2);
    const cq = P(692, 466), cw = 1.55, cl = 2.9;
    G.push({ pts: to3(rectCorners(cq[0], cq[1], cw + 0.35, cl + 0.35, 0), 0.056), fill: "#2c5f96" });
    G.push({ pts: to3(rectCorners(cq[0], cq[1], cw, cl, 0), 0.06), fill: "#3a7bc0" });
    [[0, 0, cw, 0.04], [0, cl / 2, cw, 0.04], [0, -cl / 2, cw, 0.04], [0, 0, 0.04, cl], [cw / 2, 0, 0.04, cl], [-cw / 2, 0, 0.04, cl]].forEach((l) => G.push({ pts: to3(rectCorners(cq[0] + l[0], cq[1] + l[1], l[2], l[3], 0), 0.064), fill: "#f4f7fa", stroke: false }));
    q = P(692, 396); addBox(q[0], q[1], 1.0, 0.62, 0.05, 0.34, "#d6d7da", 0, roofG(0.2));
    zoneLabels.push(["BASKETBALL COURT", P(692, 545), 0.18, AL]);
    const a3 = findAm(1245, 722); paveAmenity(a3);
    [[1185, 735, 2.3], [1310, 735, 2.1]].forEach((l) => G.push({ pts: to3(rectCorners(P(l[0], l[1])[0], P(l[0], l[1])[1], l[2], 2.5, 0), 0.056), fill: "#54682f", stroke: false }));
    q = P(1246, 686); addBox(q[0], q[1], 3.3, 1.7, 0.05, 0.62, "#e2e3e6", 0, roofG(0.34));
    q = P(1246, 712); addBox(q[0], q[1], 1.1, 0.55, 0.05, 0.42, "#d3d4d8", 0, roofG(0.2));
    zoneLabels.push(["AMENITY SPACE", P(1246, 780), 0.22, AL]);
    const a4 = findAm(105, 515); paveAmenity(a4); zoneLabels.push(["AMENITY", P(105, 515), 0.16, AL]);
    [[172, 121, 216, 176], [1400, 138, 1450, 180]].forEach((s) => { const c0 = P(s[0], s[1]), c1 = P(s[2], s[3]); G.push({ pts: to3([[c0[0], c0[1]], [c1[0], c0[1]], [c1[0], c1[1]], [c0[0], c1[1]]], 0.05), fill: "#4a4b51", stroke: "#5c5d64" }); });

    // ---------- road markings + names ----------
    const dashW = [], roadLabels = [];
    DATA.lines.forEach((l) => {
      const pts = l.pts ? l.pts : l[1], w = l.w != null ? l.w : l[0];
      const wp = pts.map((q2) => P(q2[0], q2[1]));
      const DASH = 0.55, GAP = 0.45; let on = true, remain = DASH, total = 0;
      for (let i = 0; i < wp.length - 1; i++) {
        const a = wp[i], b = wp[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz); if (!len) continue; total += len; const ux = dx / len, uz = dz / len; let t = 0;
        while (t < len - 1e-6) { const step = Math.min(remain, len - t); if (on) dashW.push([[a[0] + ux * t, 0.045, a[1] + uz * t], [a[0] + ux * (t + step), 0.045, a[1] + uz * (t + step)]]); t += step; remain -= step; if (remain <= 1e-6) { on = !on; remain = on ? DASH : GAP; } }
      }
      if (total < 3.4) return;
      let acc = 0; const half = total / 2;
      for (let i = 0; i < wp.length - 1; i++) {
        const a = wp[i], b = wp[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz); if (!len) continue;
        if (acc + len >= half) {
          const t = (half - acc) / len; let ex = [dx / len, dz / len];
          if (Math.abs(ex[0]) >= Math.abs(ex[1])) { if (ex[0] < 0) ex = [-ex[0], -ex[1]]; } else if (ex[1] > 0) ex = [-ex[0], -ex[1]];
          const txt = w >= 13 ? "12 MT. WIDE ROAD" : w >= 9 ? "9 MT. WIDE ROAD" : "6 MT. WIDE ROAD";
          if (!roadLabels.some((r) => r.text === txt && Math.hypot(r.x - (a[0] + dx * t), r.z - (a[1] + dz * t)) < 7)) roadLabels.push({ text: txt, x: a[0] + dx * t, z: a[1] + dz * t, ex: ex, ez: [-ex[1], ex[0]] });
          break;
        }
        acc += len;
      }
    });

    // ---------- street lamps ----------
    const LH = 0.85, lamps = [];
    DATA.lamps.concat([[672, 216], [722, 216], [670, 432], [716, 500], [1190, 702], [1302, 702], [1246, 764], [72, 508], [140, 518], [186, 150], [1425, 165]]).forEach((q2) => { const w = P(q2[0], q2[1]); lamps.push({ x: w[0], z: w[1] }); items.push({ x: w[0], y: LH / 2, z: w[1], kind: "lamp" }); });

    // ---------- draw ----------
    let drawOrder = [], selectedId = null, hoveredId = null, statusMode = false, zoneMode = false;
    function lighten(hex, k) { const n = parseInt(hex.slice(1), 16), c = (v) => Math.min(255, Math.round(v * k)).toString(16).padStart(2, "0"); return "#" + c((n >> 16) & 255) + c((n >> 8) & 255) + c(n & 255); }
    function plotTone(e) {
      if (e.id === selectedId) return "#1e90ff";
      if (statusMode) return sold.has(e.id) ? "#ffcf33" : "#5cc46c";
      if (zoneMode) return ZP[e.zone % ZP.length];
      return "#b3a98b";
    }
    function plotInk(e) {
      if (e.id === selectedId) return "#ffffff";
      if (statusMode) return sold.has(e.id) ? "#5a4300" : "#0c3d17";
      if (zoneMode) return "#101820";
      return "#3b3626";
    }
    function drawPlot(e) {
      const sel = e.id === selectedId, hov = e.id === hoveredId && !sel;
      const base = hov ? lighten(plotTone(e), 1.14) : plotTone(e);
      const y0 = 0.03, y1 = 0.1 + e.y;
      e.polys.length = 0;
      const faces = drawPrism(e.pts, y0, y1, base, "rgba(0,0,0,0.35)");
      faces.forEach((f) => e.polys.push(f));
      if (faces.length) { const tp = faces[faces.length - 1]; let sx = 0, sy = 0; tp.forEach((p) => { sx += p[0]; sy += p[1]; }); e.sc = [sx / tp.length, sy / tp.length]; }
      const top = shade(base, 0.98);
      fillPoly(to3(scaleAbout(e.pts, 0.95), y1 + 0.004), top, top, Math.max(0.6, Math.min(2, (0.03 * F) / radius)));
      if (!sel) {
        const oe = ori(e.ex);
        flatText(String(e.id), e.cx, y1 + 0.02, e.cz, oe, [-oe[1], oe[0]], e.size, 600, plotInk(e));
      }
    }
    // keep text upright for the current viewing angle
    function ori(ex) {
      let s = ex[0] * Rt.x + ex[1] * Rt.z;
      if (Math.abs(s) < 0.25) { const hf = Math.hypot(Fw.x, Fw.z) || 1; s = (ex[0] * Fw.x + ex[1] * Fw.z) / hf; }
      return s < 0 ? [-ex[0], -ex[1]] : ex;
    }

    // Draw detailed dimensions, tick marks, and area metrics when a plot is selected (matches reference Image 2)
    function drawSelectedPlotOverlay(e) {
      const dimInfo = PLOT_DIMENSIONS[e.id] || null;
      const y1 = 0.1 + e.y + 0.012;

      // 1. Use ori(e.ex) for strictly un-mirrored forward orientation (same as unselected plot numbers)
      const oe = ori(e.ex);
      const ez = [-oe[1], oe[0]];

      // Check whether ez points up or down on screen to order lines top-to-bottom
      const c0 = toCam(0, 0, 0);
      const cEz = toCam(ez[0], 0, ez[1]);
      const s0 = scr(c0);
      const sEz = scr(cEz);
      // In canvas screen coords, y goes down. If sEz[1] < s0[1], ez points UP on screen.
      const upSign = sEz[1] < s0[1] ? 1 : -1;
      const upV = [upSign * ez[0], upSign * ez[1]];

      // Compute bounding span of the plot along oe and ez
      let minOe = 1e9, maxOe = -1e9, minEz = 1e9, maxEz = -1e9;
      for (let i = 0; i < e.pts.length; i++) {
        const px = e.pts[i][0] - e.cx, pz = e.pts[i][1] - e.cz;
        const dotOe = px * oe[0] + pz * oe[1];
        const dotEz = px * ez[0] + pz * ez[1];
        if (dotOe < minOe) minOe = dotOe;
        if (dotOe > maxOe) maxOe = dotOe;
        if (dotEz < minEz) minEz = dotEz;
        if (dotEz > maxEz) maxEz = dotEz;
      }
      const spanOe = maxOe - minOe;
      const spanEz = maxEz - minEz;

      // Font sizing: compact, elegant, perfectly matching Image 2
      const szNum = Math.max(0.06, Math.min(0.18, spanEz * 0.20, spanOe * 0.24));
      const szM2 = Math.max(0.035, Math.min(0.09, spanEz * 0.10, spanOe * 0.15));
      const szFt = Math.max(0.045, Math.min(0.12, spanEz * 0.13, spanOe * 0.18));

      // Vertical positions along upDir (Top: Plot number, Middle: m², Bottom: ft²):
      const yNum = spanEz * 0.16;
      const yM2 = -spanEz * 0.05;
      const yFt = -spanEz * 0.20;

      if (dimInfo) {
        // Line 1: Plot Number (Bold white)
        flatText(String(e.id), e.cx + upV[0] * yNum, y1 + 0.005, e.cz + upV[1] * yNum, oe, ez, szNum, 800, "#ffffff");
        // Line 2: Area in m² (e.g. 92.81 m²)
        flatText(dimInfo.areaM2.toFixed(2) + " m²", e.cx + upV[0] * yM2, y1 + 0.005, e.cz + upV[1] * yM2, oe, ez, szM2, 500, "rgba(255,255,255,0.88)");
        // Line 3: Area in ft² (e.g. 999 ft²)
        flatText(dimInfo.areaSqFt.toLocaleString() + " ft²", e.cx + upV[0] * yFt, y1 + 0.005, e.cz + upV[1] * yFt, oe, ez, szFt, 700, "#ffffff");
      } else {
        flatText(String(e.id), e.cx, y1 + 0.005, e.cz, oe, ez, szNum, 800, "#ffffff");
      }

      // 2. Surrounding dimension lines with tick marks and edge labels
      const pts = e.pts;
      const n = pts.length;
      const minSpan = Math.min(spanOe, spanEz);
      const offDist = Math.max(0.03, Math.min(0.065, minSpan * 0.09));
      const tickLen = Math.max(0.04, Math.min(0.08, minSpan * 0.11));
      const szDim = Math.max(0.04, Math.min(0.08, minSpan * 0.11));

      for (let i = 0; i < n; i++) {
        const p0 = pts[i];
        const p1 = pts[(i + 1) % n];
        const dx = p1[0] - p0[0], dz = p1[1] - p0[1];
        const len = Math.hypot(dx, dz);
        if (len < 0.001) continue;

        const ux = dx / len, uz = dz / len;
        const mx = (p0[0] + p1[0]) / 2, mz = (p0[1] + p1[1]) / 2;

        // Outward normal from centroid
        let nx = -uz, nz = ux;
        if (nx * (mx - e.cx) + nz * (mz - e.cz) < 0) {
          nx = -nx; nz = -nz;
        }

        // Offset dimension line points
        const aOff = [p0[0] + nx * offDist, y1 + 0.004, p0[1] + nz * offDist];
        const bOff = [p1[0] + nx * offDist, y1 + 0.004, p1[1] + nz * offDist];

        // End extension ticks (perpendicular to edge)
        const tA0 = [aOff[0] - nx * (tickLen * 0.5), y1 + 0.004, aOff[2] - nz * (tickLen * 0.5)];
        const tA1 = [aOff[0] + nx * (tickLen * 0.5), y1 + 0.004, aOff[2] + nz * (tickLen * 0.5)];
        const tB0 = [bOff[0] - nx * (tickLen * 0.5), y1 + 0.004, bOff[2] - nz * (tickLen * 0.5)];
        const tB1 = [bOff[0] + nx * (tickLen * 0.5), y1 + 0.004, bOff[2] + nz * (tickLen * 0.5)];

        // Draw extension ticks (crisp solid white)
        ctx.setLineDash([]);
        ctx.strokeStyle = "rgba(255,255,255,0.95)";
        ctx.lineWidth = 1.2;
        ctx.lineCap = "butt";
        ctx.beginPath();
        segPath(tA0, tA1);
        segPath(tB0, tB1);
        ctx.stroke();

        // Edge dimension value
        const edgeVal = (dimInfo && dimInfo.edges && dimInfo.edges[i] != null) ? dimInfo.edges[i] : (len * 13.5);
        const dimStr = edgeVal.toFixed(2) + " m";

        // Break dimension line around the text (CAD style as in Image 2)
        const gapHalf = Math.max(szDim * 1.5, Math.min(len * 0.22, 0.16));
        const midX = (aOff[0] + bOff[0]) / 2;
        const midZ = (aOff[2] + bOff[2]) / 2;
        const gapA = [midX - ux * gapHalf, y1 + 0.004, midZ - uz * gapHalf];
        const gapB = [midX + ux * gapHalf, y1 + 0.004, midZ + uz * gapHalf];

        // Draw dashed lines before and after gap
        ctx.setLineDash([4, 3]);
        ctx.strokeStyle = "rgba(255,255,255,0.85)";
        ctx.lineWidth = 1.2;
        ctx.lineCap = "butt";
        ctx.beginPath();
        if (len > gapHalf * 2.2) {
          segPath(aOff, gapA);
          segPath(gapB, bOff);
        } else {
          segPath(aOff, bOff);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Dimension text centered in the gap (guaranteed un-mirrored orientation)
        const edgeOri = ori([ux, uz]);
        const edgeEz = [-edgeOri[1], edgeOri[0]];
        flatText(dimStr, midX, y1 + 0.006, midZ, edgeOri, edgeEz, szDim, 600, "#ffffff");
      }
    }

    const MAPA = { "#3a3b3f": "rgba(44,45,49,0.84)", "#54682f": "rgba(84,104,47,0.6)", "#4a4b51": "rgba(66,66,72,0.86)", "#54555c": "rgba(78,78,86,0.7)" };
    function render() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.lineJoin = "round"; ctx.setLineDash([]);
      if (mapOn) ctx.clearRect(0, 0, W, H); else { ctx.fillStyle = theme.bg; ctx.fillRect(0, 0, W, H); }
      if (!mapOn) for (let i = 0; i < TER.length; i++) { const t = TER[i]; fillPoly(t.pts, t.fill, t.stroke === false ? false : t.fill, 0.5); }
      for (let i = 0; i < G.length; i++) { const g = G[i]; const f = mapOn ? MAPA[g.fill] || g.fill : g.fill; fillPoly(g.pts, f, g.stroke === false ? false : g.stroke || f, g.lw || 1); }
      ctx.lineCap = "butt"; ctx.strokeStyle = "rgba(255,255,255,0.55)"; ctx.lineWidth = Math.max(1, (0.06 * F) / radius); ctx.beginPath();
      for (let i = 0; i < dashW.length; i++) segPath(dashW[i][0], dashW[i][1]);
      ctx.stroke();
      roadLabels.forEach((r) => { const oe = ori(r.ex); flatText(r.text, r.x, 0.06, r.z, oe, [-oe[1], oe[0]], 0.3, 600, "rgba(214,218,224,0.78)"); });
      zoneLabels.forEach((z) => { const oe = ori([1, 0]); flatText(z[0], z[1][0], 0.1, z[1][1], oe, [-oe[1], oe[0]], z[2], 700, z[3]); });
      ctx.fillStyle = theme.shadow;
      items.forEach((it) => { if (it.kind === "bld") frustumShadow(it.parts[0]); });
      ctx.fillStyle = "rgba(255,214,120," + theme.glow + ")";
      lamps.forEach((l) => { const c = toCam(l.x, 0.05, l.z); if (c[2] < NEAR) return; const s = scr(c), k = F / c[2], rx = 0.95 * k, ry = rx * Math.max(0.15, -Fw.y); if (s[0] < -rx || s[0] > W + rx || s[1] < -ry || s[1] > H + ry) return; ctx.beginPath(); ctx.ellipse(s[0], s[1], rx, ry, 0, 0, 6.2832); ctx.fill(); });
      const list = [];
      plots.forEach((e) => { const dx = e.cx - cam.x, dy = e.y - cam.y, dz = e.cz - cam.z; list.push({ e: e, d: dx * dx + dy * dy + dz * dz }); });
      items.forEach((it) => { const dx = it.x - cam.x, dy = it.y - cam.y, dz = it.z - cam.z; list.push({ t: it, d: dx * dx + dy * dy + dz * dz }); });
      list.sort((a, b) => b.d - a.d);
      drawOrder = [];
      list.forEach((o) => {
        if (o.e) { drawPlot(o.e); drawOrder.push(o.e); return; }
        const it = o.t;
        if (it.kind === "bld") it.parts.forEach(drawFrustum);
        else if (it.kind === "lamp") {
          const a = toCam(it.x, 0.03, it.z), b = toCam(it.x, LH, it.z); if (a[2] < NEAR || b[2] < NEAR) return;
          const sa = scr(a), sb = scr(b), k = F / b[2]; if (sb[0] < -40 || sb[0] > W + 40 || sb[1] < -40 || sb[1] > H + 40) return;
          ctx.lineCap = "round"; ctx.strokeStyle = "#8b9099"; ctx.lineWidth = Math.max(1, 0.045 * k);
          const hx = sb[0] + 0.14 * k, hy = sb[1] + 0.015 * k;
          ctx.beginPath(); ctx.moveTo(sa[0], sa[1]); ctx.lineTo(sb[0], sb[1]); ctx.lineTo(hx, hy); ctx.stroke();
          ctx.fillStyle = "rgba(255,214,120,0.26)"; ctx.beginPath(); ctx.arc(hx, hy, 0.3 * k, 0, 6.2832); ctx.fill();
          ctx.fillStyle = "rgba(255,232,165,0.5)"; ctx.beginPath(); ctx.arc(hx, hy, 0.15 * k, 0, 6.2832); ctx.fill();
          ctx.fillStyle = "#fff8d6"; ctx.beginPath(); ctx.arc(hx, hy, Math.max(1.2, 0.075 * k), 0, 6.2832); ctx.fill();
        }
      });
      // Selected plot dimension overlay (rendered on top so never occluded)
      if (selectedId != null) {
        const selPlot = byId.get(selectedId);
        if (selPlot) drawSelectedPlotOverlay(selPlot);
      }
      // compass + 2D/3D label follow the camera
      const hf = Math.hypot(Fw.x, Fw.z) || 1, rot = Math.atan2(-Rt.z, -Fw.z / hf);
      dialEl.style.transform = "rotate(" + ((rot * 180) / Math.PI).toFixed(1) + "deg)";
      btn2d.textContent = phi < 0.15 ? "3D" : "2D";
      syncBasemap();
    }
    // ---------- UI ----------
    const $ = (id) => document.getElementById(id);
    const dialEl = $("dial"), btn2d = $("btn2d");
    const info = $("info"), plotTitle = $("plotTitle"), pill = $("statusPill"), soldBtn = $("toggleSold"), qEl = $("q");
    let toastTimer = 0;
    function toast(msg) { const t = $("toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 2600); }
    const fitView = (two) => { const port = W / H < 1.1; return two ? { th: port ? -1.5 : 0, ph: 0.02, r: port ? 72 : 42, tx: 0, tz: 0 } : { th: port ? -1.5 : 0.32, ph: port ? 0.9 : 0.98, r: port ? 78 : 43, tx: 0, tz: 0 }; };
    function refreshStatus() {
      if (selectedId == null) return;
      const s = sold.has(selectedId);
      pill.textContent = s ? "Sold" : "Available"; pill.className = "pill " + (s ? "sold" : "avail");
      soldBtn.textContent = s ? "Mark as available" : "Mark as sold";
    }
    function updateWa() {
      $("waText").textContent = selectedId != null ? "Inquire plot " + selectedId : "Inquire project";
      $("waLink").href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("Hi, I'm interested in " + (selectedId != null ? "plot " + selectedId + " of " : "") + PROJECT);
    }
    function focusPlot(e) { anim = { tx: e.cx, tz: e.cz, r: radius > 3 }; }
    function setSelected(id) {
      selectedId = id; info.hidden = id == null;
      if (id != null) {
        plotTitle.textContent = "Plot " + id;
        refreshStatus();
        const dimsEl = $("plotDims");
        if (dimsEl) {
          const d = PLOT_DIMENSIONS[id];
          if (d) {
            const dimStr = d.edges.slice(0, 2).map((v) => v.toFixed(2) + " m").join(" × ");
            dimsEl.innerHTML = `
              <div style="display:flex;justify-content:space-between;margin-bottom:3px">
                <span style="color:rgba(255,255,255,0.6)">Area:</span>
                <b style="color:#ffffff">${d.areaM2.toFixed(2)} m² (${d.areaSqFt.toLocaleString()} ft²)</b>
              </div>
              <div style="display:flex;justify-content:space-between">
                <span style="color:rgba(255,255,255,0.6)">Dimensions:</span>
                <b style="color:#ffffff">${dimStr}</b>
              </div>
            `;
          } else {
            dimsEl.innerHTML = "";
          }
        }
        const pe = byId.get(id);
        if (pe) focusPlot(pe);
      }
      updateWa(); dirty = true;
    }
    function showPanel(which) { $("planPanel").hidden = which !== "plan"; $("infoPanel").hidden = which !== "info"; }
    function fillInfo() {
      const rows = [["Total plots", plots.length], ["Available", plots.length - sold.size], ["Sold", sold.size], ["Total area (drawing)", "131,300"], ["Road", "26,997 · 20.5%"], ["Amenity space", "13,133 · 10.0%"], ["Open space", "13,138 · 10.0%"], ["6.0 M road", "2,419 · 1.8%"], ["Plot area", "75,613 · 57.6%"], ["Plots along amenity / open space", "59"]];
      $("infoBody").innerHTML = rows.map((r) => '<div class="kv"><span>' + r[0] + "</span><b>" + r[1] + "</b></div>").join("") + '<div class="note">Figures are from the supplied layout drawing. Geometry is a concept reconstruction; connect survey / CAD coordinates for exact boundaries.</div>';
    }
    let anim = null;
    on($("closeInfo"), "click", () => setSelected(null));
    on(soldBtn, "click", () => { if (selectedId == null) return; if (sold.has(selectedId)) sold.delete(selectedId); else sold.add(selectedId); saveSold(); refreshStatus(); dirty = true; });
    function setToggle(btn, on) { btn.setAttribute("aria-checked", on ? "true" : "false"); }
    on($("tgStatus"), "click", () => { statusMode = !statusMode; setToggle($("tgStatus"), statusMode); $("legend").hidden = !statusMode; dirty = true; });
    on($("tgZones"), "click", () => { zoneMode = !zoneMode; setToggle($("tgZones"), zoneMode); dirty = true; });
    on(btn2d, "click", () => { anim = fitView(phi >= 0.15); });
    on($("btnHome"), "click", () => { anim = fitView(false); });
    on($("btnLocate"), "click", () => { const pe = selectedId != null ? byId.get(selectedId) : null; if (pe) focusPlot(pe); else anim = fitView(false); });
    on($("compass"), "click", () => { anim = { th: 0 }; });
    on($("btnSearch"), "click", () => { $("searchBar").hidden = false; qEl.focus(); });
    on($("closeSearch"), "click", () => { $("searchBar").hidden = true; });
    on(qEl, "keydown", (e) => {
      if (e.key !== "Enter") return;
      const v = qEl.value.trim(); if (!v) return;
      const hit = plots.find((p) => String(p.id) === v) || plots.find((p) => String(p.id).includes(v));
      if (hit) { setSelected(hit.id); $("searchBar").hidden = true; qEl.blur(); } else toast("No plot numbered " + v);
    });
    on($("btnBrochure"), "click", () => showPanel($("planPanel").hidden ? "plan" : null));
    on($("closePlan"), "click", () => showPanel(null));
    on($("btnInfo"), "click", () => { fillInfo(); showPanel($("infoPanel").hidden ? "info" : null); });
    on($("closeInfoPanel"), "click", () => showPanel(null));
    on($("btnGallery"), "click", () => toast("Gallery: project photos can be added here."));
    on($("btnGps"), "click", () => toast("GPS needs the site's real-world coordinates to show your position on the plan."));
    on($("btnShare"), "click", () => {
      const url = location.href;
      if (navigator.share) navigator.share({ title: PROJECT, url: url }).catch(() => { });
      else if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => toast("Link copied"), () => toast("Copy the link from the address bar"));
      else toast("Copy the link from the address bar");
    });
    updateWa();

    // ---------- Google Maps basemap (aligned to the 3D camera with a CSS homography) ----------
    const MC = opts.map || {};
    const mapEl = document.getElementById("basemap"), attrEl = document.getElementById("gattr"), btnMap = $("btnMap");
    const MAP_TYPES = ["satellite", "hybrid", "roadmap", "off"], MAP_LABELS = { satellite: "SAT", hybrid: "HYB", roadmap: "MAP", off: "OFF" };
    const MAP_SIZE = 2560, C0 = MAP_SIZE / 2, MU = MC.metersPerUnit || 13.5, PHI_S = ((MC.headingDeg || 0) * Math.PI) / 180;
    let mapType = MC.provider === "none" ? "off" : MC.defaultType || "satellite", bm = null, bmZoom = 0, mapOn = false, bmBusy = false;
    const mppOf = (z) => (156543.03392 * Math.cos((MC.lat * Math.PI) / 180)) / Math.pow(2, z);
    const wantZoom = () => (radius > 30 ? MC.zoomFar || 18 : MC.zoomNear || 19);
    if (mapEl) { mapEl.style.width = MAP_SIZE + "px"; mapEl.style.height = MAP_SIZE + "px"; }
    function syncBasemap() {
      if (!mapOn || !bm || !mapEl) return;
      const z = wantZoom(); if (z !== bmZoom) { bmZoom = z; bm.setZoom(z); }
      const k = mppOf(bmZoom) / MU, cs = Math.cos(PHI_S), sn = Math.sin(PHI_S), y0 = -0.02;
      // world = A * [u, v, 1]  (map pixel -> plan units)
      const ax = [k * cs, k * sn, -k * (cs + sn) * C0], az = [-k * sn, k * cs, k * (sn - cs) * C0];
      // ground plane -> screen (homogeneous), rows: sx*w, sy*w, w
      const cz = [Fw.x, Fw.z, Fw.y * (y0 - cam.y) - Fw.x * cam.x - Fw.z * cam.z];
      const cxr = [Rt.x, Rt.z, -Rt.x * cam.x - Rt.z * cam.z];
      const cyr = [Up.x, Up.z, Up.y * (y0 - cam.y) - Up.x * cam.x - Up.z * cam.z];
      const Hw = [
        [(W / 2) * cz[0] + F * cxr[0], (W / 2) * cz[1] + F * cxr[1], (W / 2) * cz[2] + F * cxr[2]],
        [(H / 2) * cz[0] - F * cyr[0], (H / 2) * cz[1] - F * cyr[1], (H / 2) * cz[2] - F * cyr[2]],
        cz,
      ];
      const M = [[ax[0], ax[1], ax[2]], [az[0], az[1], az[2]], [0, 0, 1]];
      const Hm = [0, 1, 2].map((r) => [0, 1, 2].map((c) => Hw[r][0] * M[0][c] + Hw[r][1] * M[1][c] + Hw[r][2] * M[2][c]));
      const wc = Hm[2][0] * C0 + Hm[2][1] * C0 + Hm[2][2];
      if (!(wc > 1e-9)) { mapEl.style.visibility = "hidden"; return; }
      mapEl.style.visibility = "visible";
      const n = (v) => (v / wc).toPrecision(12);
      mapEl.style.transform = "matrix3d(" + [n(Hm[0][0]), n(Hm[1][0]), 0, n(Hm[2][0]), n(Hm[0][1]), n(Hm[1][1]), 0, n(Hm[2][1]), 0, 0, 1, 0, n(Hm[0][2]), n(Hm[1][2]), 0, n(Hm[2][2])].join(",") + ")";
    }
    function applyMapType(t) {
      mapType = t; btnMap.textContent = MAP_LABELS[t];
      if (t === "off") { mapOn = false; if (mapEl) mapEl.style.display = "none"; if (attrEl) attrEl.hidden = true; dirty = true; return; }
      if (MC.provider === "google" && !MC.apiKey && !MC.mapsApi) { toast("Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local to use Google Maps."); mapType = "off"; btnMap.textContent = "OFF"; return; }
      mapEl.style.display = "block";
      if (bm) { bm.setType(t); if (attrEl) { attrEl.textContent = bm.attribution(t); attrEl.hidden = false; } mapOn = true; dirty = true; return; }
      if (bmBusy) return; bmBusy = true;
      toast("Map background is disabled."); mapOn = false; mapType = "off"; btnMap.textContent = "OFF"; bmBusy = false; dirty = true;
    }
    on(window, "colony-gmaps-auth-failure", () => toast("Google Maps rejected the API key (check key, billing and allowed referrers)."));
    on(btnMap, "click", () => applyMapType(MAP_TYPES[(MAP_TYPES.indexOf(mapType) + 1) % MAP_TYPES.length]));
    offs.push(() => { if (bm) bm.destroy(); });
    btnMap.textContent = MAP_LABELS[mapType];
    if (mapType !== "off") applyMapType(mapType);

    function inPoly2(px, py, poly) {
      let inside = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1]; if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside; }
      return inside;
    }
    function pick(ev) {
      const r = canvas.getBoundingClientRect(), px = ev.clientX - r.left, py = ev.clientY - r.top;
      for (let i = drawOrder.length - 1; i >= 0; i--) { const e = drawOrder[i]; for (let j = 0; j < e.polys.length; j++) if (inPoly2(px, py, e.polys[j])) return e.id; }
      // forgiving fallback: nearest plot centre close to the finger
      const tol = ev.pointerType === "touch" ? 20 : 8; let best = null, bd = tol;
      for (let i = 0; i < drawOrder.length; i++) { const e = drawOrder[i]; if (!e.sc) continue; const d = Math.hypot(e.sc[0] - px, e.sc[1] - py); if (d < bd) { bd = d; best = e.id; } }
      return best;
    }
    const pointers = new Map(); let pinchDist = 0, pinchMid = null, down = null;
    function panBy(dx, dy) {
      const k = (2 * radius * Math.tan((FOV * Math.PI) / 360)) / H, fx = -Math.sin(theta), fz = -Math.cos(theta);
      tgt.x = Math.max(-30, Math.min(30, tgt.x - Rt.x * dx * k + fx * dy * k)); tgt.z = Math.max(-20, Math.min(20, tgt.z - Rt.z * dx * k + fz * dy * k));
    }
    on(canvas, "pointerdown", (e) => {
      down = { x: e.clientX, y: e.clientY }; anim = null; pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      try { canvas.setPointerCapture(e.pointerId); } catch (_) { }
      if (pointers.size === 2) { const v = Array.from(pointers.values()); pinchDist = Math.hypot(v[0].x - v[1].x, v[0].y - v[1].y); pinchMid = { x: (v[0].x + v[1].x) / 2, y: (v[0].y + v[1].y) / 2 }; down = null; }
    });
    on(canvas, "pointermove", (e) => {
      const p = pointers.get(e.pointerId);
      if (p) {
        if (pointers.size === 1) { theta -= ((e.clientX - p.x) / H) * Math.PI * 1.6; phi -= ((e.clientY - p.y) / H) * Math.PI * 1.6; p.x = e.clientX; p.y = e.clientY; updateCam(); }
        else if (pointers.size === 2) {
          p.x = e.clientX; p.y = e.clientY; const v = Array.from(pointers.values()); const d = Math.hypot(v[0].x - v[1].x, v[0].y - v[1].y), mid = { x: (v[0].x + v[1].x) / 2, y: (v[0].y + v[1].y) / 2 };
          if (pinchDist > 0 && d > 0) radius *= pinchDist / d; if (pinchMid) panBy(mid.x - pinchMid.x, mid.y - pinchMid.y); pinchDist = d; pinchMid = mid; updateCam();
        }
        return;
      }
      if (e.pointerType === "touch") return;
      const id = pick(e); if (id !== hoveredId) { hoveredId = id; canvas.style.cursor = id != null ? "pointer" : ""; dirty = true; }
    });
    function endPointer(e, click) {
      pointers.delete(e.pointerId); pinchDist = 0; pinchMid = null;
      if (click && down) { if (Math.hypot(e.clientX - down.x, e.clientY - down.y) <= (e.pointerType === "touch" ? 14 : 6)) { const id = pick(e); setSelected(id === selectedId ? null : id); } }
      down = null;
    }
    on(canvas, "pointerup", (e) => endPointer(e, true));
    on(canvas, "pointercancel", (e) => endPointer(e, false));
    on(canvas, "pointerleave", () => { if (hoveredId != null) { hoveredId = null; canvas.style.cursor = ""; dirty = true; } });
    on(canvas, "wheel", (e) => { e.preventDefault(); anim = null; radius *= Math.exp(e.deltaY * 0.001); updateCam(); }, { passive: false });

    const ro = new ResizeObserver(resize); ro.observe(stage); offs.push(() => ro.disconnect()); on(window, "resize", resize); resize();
    (function () { const f = fitView(false); theta = f.th; phi = f.ph; radius = f.r; updateCam(); })();
    let last = performance.now();
    function frame(now) {
      if (stopped) return;
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05); last = now; const k = Math.min(dt * 8, 1);
      if (anim) {
        const k2 = Math.min(dt * 5, 1); let done = true;
        if (anim.tx != null) { tgt.x += (anim.tx - tgt.x) * k2; tgt.z += (anim.tz - tgt.z) * k2; if (Math.abs(anim.tx - tgt.x) > 0.02 || Math.abs(anim.tz - tgt.z) > 0.02) done = false; }
        if (anim.r != null) { radius += (anim.r - radius) * k2; if (Math.abs(anim.r - radius) > 0.15) done = false; }
        if (anim.th != null) { let d = anim.th - theta; d = Math.atan2(Math.sin(d), Math.cos(d)); theta += d * k2; if (Math.abs(d) > 0.01) done = false; }
        if (anim.ph != null) { phi += (anim.ph - phi) * k2; if (Math.abs(anim.ph - phi) > 0.01) done = false; }
        updateCam(); if (done) anim = null;
      }
      for (let i = 0; i < plots.length; i++) {
        const e = plots[i], target = e.id === selectedId ? 0.14 : e.id === hoveredId ? 0.05 : 0.0;
        if (Math.abs(e.y - target) > 0.002) { e.y += (target - e.y) * k; dirty = true; } else if (e.y !== target) { e.y = target; dirty = true; }
      }
      if (dirty && W) { dirty = false; render(); }
    }
    raf = requestAnimationFrame(frame);
  }
}

