// Updated: return both nx and ex as an object and avoid creating globals

// deg conversion: converts d.ff (deg + decimal minutes??) to degrees (original logic preserved)
function deg(z) {
  return z = (Math.floor(z)) + (Math.floor((z - (Math.floor(z))) * 100)) / 60 + ((100 * z - (Math.floor(100 * z))) * 100) / 3600;
}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

// fix4, fix5, fix3
function fix4(z) { return z = (Math.floor(z * 10000 + 0.5)) / 10000; }
function fix5(z) { return z = (Math.floor(z * 100000 + 0.5)) / 100000; }
function fix3(z) { return z = (Math.floor(z * 1000 + 0.5)) / 1000; }
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

// dmscode
function dmscode(z) {
  var d = (Math.floor(z));
  var m = (Math.floor((z - (Math.floor(z))) * 60));
  var s = (Math.floor(((((z - (Math.floor(z))) * 60) - (Math.floor((z - (Math.floor(z))) * 60))) * 60) * 10 + 0.5)) / 10;

  if (s >= 60) { s = s - 60; m = m + 1; }
  if (m >= 60) { m = m - 60; d = d + 1; }

  var brg = d + "^" + m + "'" + s + "\"";
  return brg;
}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

// jointdist: distance between two points
function jointdist(n, e, n2, e2) {
  var x = n2 - n;
  var y = e2 - e;
  var dist = (Math.sqrt((Math.pow(x, 2)) + (Math.pow(y, 2))));
  return dist;
}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

// joint: bearing from (n,e) to (n2,e2)
function joint(n, e, n2, e2) {
  var x = n2 - n + 1 / 100000000000;
  var y = e2 - e;
  var brg = (Math.atan(y / x)) * 180 / 3.14159265358979;
  if (x < 0) { brg = brg + 180; }
  if (brg < 0) { brg = brg + 360; }
  return brg;
}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

// Sinsection
function sinsection(yn, ye, brg, va, sd, zn, ze, bsb) {
  // declare locals to avoid globals
  var pi = 3.14159265358979;
  // apply fixes exactly as original
  yn = fix4(yn);
  ye = fix4(ye);
  brg = fix5(brg);
  va = fix5(va);
  sd = fix3(sd);
  zn = fix4(zn);
  ze = fix4(ze);

  brg = deg(brg);
  va = deg(va);
  var hd = Math.abs(fsin(va)) * sd;
  bsb = deg(bsb);

  var dy = joint(yn, ye, zn, ze);
  var dx = jointdist(yn, ye, zn, ze);

  var aa = brg - bsb;
  if (aa < 0) { aa = aa + 360; }

  // protect against domain error in asin
  var denom = dx / fsin(aa);
  var ratio = denom !== 0 ? hd / denom : NaN;
  if (Math.abs(ratio) > 1) {
    // asin would be NaN; keep original behaviour but return NaN so caller can handle
    var ab = NaN;
  } else {
    var ab = (Math.asin(ratio)) * 180 / pi;
  }

  var ac = 180 - ab - aa;
  var ad = dy - ac;

  var nx = fix4(fcos(ad) * hd + fix4(yn));
  var ex = fix4(fsin(ad) * hd + fix4(ye));

  // Return both values as an object (caller expects result.nx and result.ex)
  return { nx: nx, ex: ex };
}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

// Sinsection COLL
function sinsectioncoll(yl, va, sd, ph) {
  yl = fix4(yl);
  va = fix5(va);
  sd = fix3(sd);
  ph = fix4(ph);
  va = deg(va);
  var vd = (fcos(va)) * sd * (-1);
  var coll = fix3(vd) + fix3(ph) + fix3(yl);
  return coll;
}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

// Sin functions
function fsin(z) { return z = (Math.sin(z * 3.14159265358979 / 180)); }
function fcos(z) { return z = (Math.cos(z * 3.14159265358979 / 180)); }
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>

// Resection (left unchanged except locals)
function Resection(n1, e1, brg1, n2, e2, brg2, n3, e3, brg3) {
  var pi = 3.14159265358979;
  var M7 = joint(n1, e1, n2, e2);
  var M8 = joint(n2, e2, n3, e3);
  var M9 = joint(n3, e3, n1, e1);
  var N7 = M9 + 180 - M7;
  var N8 = M7 + 180 - M8;
  var N9 = M8 + 180 - M9;
  var O7 = 1 / (Math.tan(N7 * pi / 180));
  var O8 = 1 / (Math.tan(N8 * pi / 180));
  var O9 = 1 / (Math.tan(N9 * pi / 180));
  var P7 = deg(brg1);
  var P8 = deg(brg2);
  var P9 = deg(brg3);
  var Q7 = P8 - P7;
  var Q8 = P9 - P8;
  var Q9 = P7 - P9;
  var R7 = 1 / (Math.tan(Q7 * pi / 180));
  var R8 = 1 / (Math.tan(Q8 * pi / 180));
  var R9 = 1 / (Math.tan(Q9 * pi / 180));
  var S7 = 1 / (O7 - R8);
  var S8 = 1 / (O8 - R9);
  var S9 = 1 / (O9 - R7);

  var nx = ((n1 * S7) + (n2 * S8) + (n3 * S9)) / (S7 + S8 + S9);
  var ex = ((e1 * S7) + (e2 * S8) + (e3 * S9)) / (S7 + S8 + S9);

  return nx;
}
//<<<<<<<<<<< Function END  >>>>>>>>>>>>>>>>>>>>>>>>