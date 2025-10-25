"use strict";

/*
  Cleaned up version of your original function.js:
  - Declares variables with let/const
  - Uses Math.PI
  - Uses a degree-aware atan2 wrapper around Math.atan2
  - Normalizes if/blocks
  - Avoids implicit global variables
  This preserves original logic as closely as possible while fixing runtime issues.
*/

// helpers
const PI = Math.PI;
const EPS = 1e-12;

function toRad(deg) { return deg * PI / 180; }
function toDeg(rad) { return rad * 180 / PI; }

// Convert decimal degrees (D.MS?) -> D + M/100 + S/10000 style as original dms
function dms(z) {
  let d = Math.floor(z);
  let m = Math.floor((z - d) * 60);
  let s = Math.floor(((((z - d) * 60) - m) * 60) * 10 + 0.5) / 10;

  if (s >= 60) { s -= 60; m += 1; }
  if (m >= 60) { m -= 60; d += 1; }

  const brg = d + (m / 100) + (s / 10000);
  return brg;
}

// dms to a code-like string "D^M'S\""
function dmscode(z) {
  let d = Math.floor(z);
  let m = Math.floor((z - d) * 60);
  let s = Math.floor(((((z - d) * 60) - m) * 60) * 10 + 0.5) / 10;

  if (s >= 60) { s -= 60; m += 1; }
  if (m >= 60) { m -= 60; d += 1; }

  const brg = d + "^" + m + "'" + s + "\"";
  return brg;
}

function fix3(z) { return Math.floor(z * 1000 + 0.5) / 1000; }
function fix4(z) { return Math.floor(z * 10000 + 0.5) / 10000; }
function fix5(z) { return Math.floor(z * 100000 + 0.5) / 100000; }

// The original deg function attempts some D/MM/SS conversion style.
// Preserve logic but avoid assignment in return.
function deg(z) {
  const d = Math.floor(z);
  const m = Math.floor((z - d) * 100);
  const part1 = d;
  const part2 = m / 60;
  const part3 = ((100 * z - Math.floor(100 * z)) * 100) / 3600;
  return part1 + part2 + part3;
}

function fsin(z) { return Math.sin(toRad(z)); }
function fcos(z) { return Math.cos(toRad(z)); }
function ftan(z) { return Math.tan(toRad(z)); }

// Euclidean distance between (n,e) and (n2,e2)
function jointdist(n, e, n2, e2) {
  const x = n2 - n;
  const y = e2 - e;
  const dist = Math.sqrt(x * x + y * y);
  return dist;
}

// Bearing between two points (returns degrees 0..360)
function joint(n, e, n2, e2) {
  // a tiny epsilon previously added; Math.atan2 handles zero better
  const x = n2 - n;
  const y = e2 - e;
  let brg = Math.atan2(y, x) * 180 / PI; // note: atan2(y,x)
  if (brg < 0) brg += 360;
  return brg;
}

function atan2deg(x, y) {
  // wrapper preserving the original call signature atan2(x,y) used across file
  // original behavior computed atan(y/x)*180/pi and adjusted for x<0; Math.atan2(y,x) is better
  let a = Math.atan2(y, x) * 180 / PI;
  if (a < 0) a += 360;
  return a;
}

// line chainage (CH) projection
function linech(bn, be, bh, tb, nx, ex) {
  const tb1 = deg(tb);
  const z = jointdist(bn, be, nx, ex);
  const brg = joint(bn, be, nx, ex);
  const aa = brg - tb1;
  const ch = fcos(aa) * z + fix3(bh);
  return ch;
}

// line offset (OS)
function lineos(bn, be, bh, tb, nx, ex) {
  const tb1 = deg(tb);
  const z = jointdist(bn, be, nx, ex);
  const brg = joint(bn, be, nx, ex);
  const aa = brg - tb1;
  const os = fsin(aa) * z;
  return os;
}

// Curve tangent bearing
function curvetb(bn, be, tb, r, bh, rh, ro) {
  const tb1 = deg(tb);
  let bb = tb1 + 90;
  const cn = fcos(bb) * r + fix3(bn);
  const ce = fsin(bb) * r + fix3(be);
  if (r > 0) bb = bb + 180;
  if (bb > 360) bb = bb - 360;
  rh = rh - fix3(bh);
  const aa = rh * 180 / PI / r;
  bb = bb + aa;
  const nx = fcos(bb) * Math.abs(r) + cn;
  const ex = fsin(bb) * Math.abs(r) + ce;
  let tb2 = tb1 + aa;
  if (tb2 < 0) tb2 = tb2 + 360;
  if (tb2 > 360) tb2 = tb2 - 360;
  return tb2;
}

// Curve NX coordinate (N)
function curvenx(bn, be, tb, r, bh, rh, ro) {
  const tb1 = deg(tb);
  let bb = tb1 + 90;
  const cn = fcos(bb) * r + fix3(bn);
  const ce = fsin(bb) * r + fix3(be);
  if (r > 0) bb = bb + 180;
  if (bb > 360) bb = bb - 360;
  rh = rh - fix3(bh);
  const aa = rh * 180 / PI / r;
  bb = bb + aa;
  const nx = fcos(bb) * Math.abs(r) + cn;
  const ex = fsin(bb) * Math.abs(r) + ce;
  let tb2 = tb1 + aa;
  if (tb2 < 0) tb2 = tb2 + 360;
  if (tb2 > 360) tb2 = tb2 - 360;
  const aa2 = tb2 + 90;
  const n = fcos(aa2) * ro + nx;
  return n;
}

// Curve EX coordinate (E)
function curveex(bn, be, tb, r, bh, rh, ro) {
  const tb1 = deg(tb);
  let bb = tb1 + 90;
  const cn = fcos(bb) * r + fix3(bn);
  const ce = fsin(bb) * r + fix3(be);
  if (r > 0) bb = bb + 180;
  if (bb > 360) bb = bb - 360;
  rh = rh - fix3(bh);
  const aa = rh * 180 / PI / r;
  bb = bb + aa;
  const nx = fcos(bb) * Math.abs(r) + cn;
  const ex = fsin(bb) * Math.abs(r) + ce;
  let tb2 = tb1 + aa;
  if (tb2 < 0) tb2 = tb2 + 360;
  if (tb2 > 360) tb2 = tb2 - 360;
  const aa2 = tb2 + 90;
  const e = fsin(aa2) * ro + ex;
  return e;
}

// Curve CH (chainage)
function curvech(bn, be, tb, r, bh, nx, ex) {
  const tb1 = deg(tb);
  let bb = tb1 + 90;
  const cn = fcos(bb) * r + fix3(bn);
  const ce = fsin(bb) * r + fix3(be);
  if (r > 0) bb = bb + 180;
  if (bb > 360) bb = bb - 360;
  const z = jointdist(cn, ce, nx, ex);
  const c = joint(cn, ce, nx, ex);
  let a1;
  if (r > 0) a1 = c - bb;
  else a1 = bb - c;
  if (a1 < 0) a1 = a1 + 360;
  const l = a1 * PI * Math.abs(r) / 180;
  const ch = l + fix3(bh);
  let os;
  if (r < 0) os = z + r;
  else os = r - z;
  return ch;
}

// Curve OS (offset)
function curveos(bn, be, tb, r, bh, nx, ex) {
  const tb1 = deg(tb);
  let bb = tb1 + 90;
  const cn = fcos(bb) * r + fix3(bn);
  const ce = fsin(bb) * r + fix3(be);
  if (r > 0) bb = bb + 180;
  if (bb > 360) bb = bb - 360;
  const z = jointdist(cn, ce, nx, ex);
  const c = joint(cn, ce, nx, ex);
  let a1;
  if (r > 0) a1 = c - bb;
  else a1 = bb - c;
  if (a1 < 0) a1 = a1 + 360;
  const l = a1 * PI * Math.abs(r) / 180;
  // ch defined but not needed below; kept for parity
  const ch = l + fix3(bh);
  let os;
  if (r < 0) os = fix3(z) + fix3(r);
  else os = fix3(r) - fix3(z);
  return os;
}

// Spiral NX (N)
function spiralnx(bh, bn, be, tb, r, spl, ch, os) {
  bh = fix3(bh);
  bn = fix5(bn);
  be = fix5(be);
  tb = fix5(tb);
  r = fix3(r);
  spl = fix3(spl);
  ch = fix3(ch);
  os = fix3(os);

  const tb1 = deg(tb);
  const l1_init = fix3(ch) - fix3(bh);
  const rl = spl * r;

  // Compute x,y polynomials (series expansion)
  const l1 = l1_init;
  const x = (Math.pow(l1, 3)) / (6 * rl) - (Math.pow(l1, 7)) / (336 * Math.pow(rl, 3))
    + (Math.pow(l1, 11)) / (42240 * Math.pow(rl, 5)) - (Math.pow(l1, 15)) / (9676800 * Math.pow(rl, 7));
  const y = l1 - (Math.pow(l1, 5)) / (40 * Math.pow(rl, 2)) + (Math.pow(l1, 9)) / (3456 * Math.pow(rl, 4))
    - (Math.pow(l1, 13)) / (599040 * Math.pow(rl, 6)) + (Math.pow(l1, 17)) / (175472640 * Math.pow(rl, 8));

  const nx = fix5(bn) + (y * fcos(tb1)) - (x * fsin(tb1));
  const ex = fix5(be) + (y * fsin(tb1)) + (x * fcos(tb1));
  const tb2 = (Math.pow(l1, 2)) / (2 * r * spl) * 180 / PI + tb1;

  const n = fix4(fcos(tb2 + 90) * os + fix5(nx));
  return n;
}

// Spiral EX (E)
function spiralex(bh, bn, be, tb, r, spl, ch, os) {
  bh = fix3(bh);
  bn = fix5(bn);
  be = fix5(be);
  tb = fix5(tb);
  r = fix3(r);
  spl = fix3(spl);
  ch = fix3(ch);
  os = fix3(os);

  const tb1 = deg(tb);
  const l1_init = fix3(ch) - fix3(bh);
  const rl = spl * r;

  const l1 = l1_init;
  const x = (Math.pow(l1, 3)) / (6 * rl) - (Math.pow(l1, 7)) / (336 * Math.pow(rl, 3))
    + (Math.pow(l1, 11)) / (42240 * Math.pow(rl, 5)) - (Math.pow(l1, 15)) / (9676800 * Math.pow(rl, 7));
  const y = l1 - (Math.pow(l1, 5)) / (40 * Math.pow(rl, 2)) + (Math.pow(l1, 9)) / (3456 * Math.pow(rl, 4))
    - (Math.pow(l1, 13)) / (599040 * Math.pow(rl, 6)) + (Math.pow(l1, 17)) / (175472640 * Math.pow(rl, 8));

  const nx = fix5(bn) + (y * fcos(tb1)) - (x * fsin(tb1));
  const ex = fix5(be) + (y * fsin(tb1)) + (x * fcos(tb1));
  const tb2 = (Math.pow(l1, 2)) / (2 * r * spl) * 180 / PI + tb1;

  const e = fix4(fsin(tb2 + 90) * os + fix5(ex));
  return e;
}

// Spiral bearing (tangent bearing)
function spiralbrg(bh, bn, be, tb, r, spl, ch, os) {
  bh = fix3(bh);
  bn = fix5(bn);
  be = fix5(be);
  tb = fix5(tb);
  r = fix3(r);
  spl = fix3(spl);
  ch = fix3(ch);
  os = fix3(os);

  const tb1 = deg(tb);
  const l1 = fix3(ch) - fix3(bh);
  const tb2 = (Math.pow(l1, 2)) / (2 * r * spl) * 180 / PI + tb1;
  return tb2;
}

// Spiral CH (approximate by iteration)
function spiralch(bh, bn, be, tb, r, spl, n, e) {
  bh = fix3(bh);
  bn = fix5(bn);
  be = fix5(be);
  tb = fix5(tb);
  r = fix3(r);
  spl = fix3(spl);
  n = fix4(n);
  e = fix4(e);

  const tb1 = deg(tb);
  let l1 = 0.0001;
  let i = 1;
  let c = 0;
  let a3 = 1;

  while (i <= 100) {
    const rl = spl * r;
    const x = (Math.pow(l1, 3)) / (6 * rl) - (Math.pow(l1, 7)) / (336 * Math.pow(rl, 3))
      + (Math.pow(l1, 11)) / (42240 * Math.pow(rl, 5)) - (Math.pow(l1, 15)) / (9676800 * Math.pow(rl, 7));
    const y = l1 - (Math.pow(l1, 5)) / (40 * Math.pow(rl, 2)) + (Math.pow(l1, 9)) / (3456 * Math.pow(rl, 4))
      - (Math.pow(l1, 13)) / (599040 * Math.pow(rl, 6)) + (Math.pow(l1, 17)) / (175472640 * Math.pow(rl, 8));

    const nx = bn + (y * fcos(tb1)) - (x * fsin(tb1));
    const ex = be + (y * fsin(tb1)) + (x * fcos(tb1));
    const tb2 = (Math.pow(l1, 2)) / (2 * r * spl) * 180 / PI + tb1;

    i += 1;
    const dx = fix5(n - nx);
    const dy = fix5(e - ex);
    if (dx === 0 && dy === 0) {
      // exact match, stop
      break;
    } else {
      const z = Math.sqrt((dx * dx) + (dy * dy));
      c = atan2deg(dx, dy);
      l1 = fcos(c - tb2) * z + l1;
      a3 = Math.abs(fcos(c - tb2));
    }

    if (a3 < 0.0005) break;
  }

  const a4 = fsin(c - ((Math.pow(l1, 2)) / (2 * r * spl) * 180 / PI + tb1));
  const ch = fix3(bh + (spl / Math.abs(spl)) * Math.abs(l1));
  return ch;
}

// Spiral OS
function spiralos(bh, bn, be, tb, r, spl, n, e) {
  bh = fix3(bh);
  bn = fix5(bn);
  be = fix5(be);
  tb = fix5(tb);
  r = fix3(r);
  spl = fix3(spl);
  n = fix4(n);
  e = fix4(e);

  const tb1 = deg(tb);
  let l1 = 0.0001;
  let i = 1;
  let c = 0;
  let a3 = 1;
  let dx = 0, dy = 0, z = 0;

  while (i <= 100) {
    const rl = spl * r;
    const x = (Math.pow(l1, 3)) / (6 * rl) - (Math.pow(l1, 7)) / (336 * Math.pow(rl, 3))
      + (Math.pow(l1, 11)) / (42240 * Math.pow(rl, 5)) - (Math.pow(l1, 15)) / (9676800 * Math.pow(rl, 7));
    const y = l1 - (Math.pow(l1, 5)) / (40 * Math.pow(rl, 2)) + (Math.pow(l1, 9)) / (3456 * Math.pow(rl, 4))
      - (Math.pow(l1, 13)) / (599040 * Math.pow(rl, 6)) + (Math.pow(l1, 17)) / (175472640 * Math.pow(rl, 8));

    const nx = bn + (y * fcos(tb1)) - (x * fsin(tb1));
    const ex = be + (y * fsin(tb1)) + (x * fcos(tb1));
    const tb2 = (Math.pow(l1, 2)) / (2 * r * spl) * 180 / PI + tb1;

    i += 1;
    dx = fix5(n - nx);
    dy = fix5(e - ex);

    if (dx === 0 && dy === 0) {
      z = 0;
      break;
    } else {
      z = Math.sqrt((dx * dx) + (dy * dy));
      c = atan2deg(dx, dy);
      l1 = fcos(c - tb2) * z + l1;
      a3 = Math.abs(fcos(c - tb2));
    }

    if (a3 < 0.0005) break;
  }

  const a4 = fsin(c - ((Math.pow(l1, 2)) / (2 * r * spl) * 180 / PI + tb1));
  let os = fix3(a4 / Math.abs(a4) * z || 0);
  if (spl < 0) os = -Math.abs(os);
  if (dx === 0 && dy === 0) os = 0;
  return os;
}

// Spiral check bearing
function spiralcheckbrg(bh, bn, be, tb, r, spl, n, e) {
  bh = fix3(bh);
  bn = fix5(bn);
  be = fix5(be);
  tb = fix5(tb);
  r = fix3(r);
  spl = fix3(spl);
  n = fix4(n);
  e = fix4(e);

  const tb1 = deg(tb);
  let l1 = 0.0001;
  let i = 1;
  let c = 0;
  let a3 = 1;

  while (i <= 100) {
    const rl = spl * r;
    const x = (Math.pow(l1, 3)) / (6 * rl) - (Math.pow(l1, 7)) / (336 * Math.pow(rl, 3))
      + (Math.pow(l1, 11)) / (42240 * Math.pow(rl, 5)) - (Math.pow(l1, 15)) / (9676800 * Math.pow(rl, 7));
    const y = l1 - (Math.pow(l1, 5)) / (40 * Math.pow(rl, 2)) + (Math.pow(l1, 9)) / (3456 * Math.pow(rl, 4))
      - (Math.pow(l1, 13)) / (599040 * Math.pow(rl, 6)) + (Math.pow(l1, 17)) / (175472640 * Math.pow(rl, 8));

    const nx = bn + (y * fcos(tb1)) - (x * fsin(tb1));
    const ex = be + (y * fsin(tb1)) + (x * fcos(tb1));
    const tb2 = (Math.pow(l1, 2)) / (2 * r * spl) * 180 / PI + tb1;

    i += 1;
    const dx = fix5(n - nx);
    const dy = fix5(e - ex);
    if (dx === 0 && dy === 0) {
      break;
    } else {
      const z = Math.sqrt((dx * dx) + (dy * dy));
      c = atan2deg(dx, dy);
      l1 = fcos(c - tb2) * z + l1;
      a3 = Math.abs(fcos(c - tb2));
    }

    if (a3 < 0.0005) break;
  }

  const tb2 = (Math.pow(l1, 2)) / (2 * r * spl) * 180 / PI + tb1;
  return tb2;
}

// Line NX
function linenx(bn, be, bh, tb, rh, ro) {
  const tb1 = deg(tb);
  rh = rh - fix3(bh);
  const d = Math.sqrt(rh * rh + ro * ro);
  let c = Math.atan(ro / (rh + EPS)) * 180 / PI;
  if (rh < 0) c = c + 180;
  if (c < 0) c = c + 360;
  const bb = c + tb1;
  const nx = fcos(bb) * d + fix3(bn);
  return nx;
}

// Line EX
function lineex(bn, be, bh, tb, rh, ro) {
  const tb1 = deg(tb);
  rh = fix3(rh) - fix3(bh);
  const d = Math.sqrt(rh * rh + ro * ro);
  let c = Math.atan(ro / (rh + EPS)) * 180 / PI;
  if (rh < 0) c = c + 180;
  if (c < 0) c = c + 360;
  const bb = c + tb1;
  const ex = fsin(bb) * d + fix3(be);
  return ex;
}

// Tan function exported earlier ftan

// Export functions if used as module (optional)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    dms, dmscode, fix3, fix4, fix5, deg,
    fsin, fcos, ftan, jointdist, joint, linech, lineos,
    curvetb, curvenx, curveex, curvech, curveos,
    spiralnx, spiralex, spiralbrg, spiralch, spiralos, spiralcheckbrg,
    linenx, lineex, atan2deg
  };
}