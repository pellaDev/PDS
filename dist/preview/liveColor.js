import { useEffect, useState } from "react";
function readRaw(name) {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  } catch {
    return "";
  }
}
function useLiveVar(name) {
  const [value, setValue] = useState(null);
  useEffect(() => {
    if (!name) return;
    var prop = "--" + name;
    var el = document.documentElement;
    function update() {
      var raw = readRaw(prop);
      setValue(raw.length ? raw : null);
    }
    update();
    var observer = new MutationObserver(update);
    if (el) observer.observe(el, { attributes: true, attributeFilter: ["style"] });
    return function() {
      observer.disconnect();
    };
  }, [name]);
  return value;
}
function hslTripleToHex(triple) {
  var parts = triple.split(/\s+/);
  if (parts.length < 3) return null;
  var h = parseFloat(parts[0]);
  var s = parseFloat(parts[1]) / 100;
  var l = parseFloat(parts[2]) / 100;
  if (isNaN(h) || isNaN(s) || isNaN(l)) return null;
  var c = (1 - Math.abs(2 * l - 1)) * s;
  var hp = (h % 360 + 360) % 360 / 60;
  var x = c * (1 - Math.abs(hp % 2 - 1));
  var r = 0, g = 0, b = 0;
  if (hp < 1) {
    r = c;
    g = x;
  } else if (hp < 2) {
    r = x;
    g = c;
  } else if (hp < 3) {
    g = c;
    b = x;
  } else if (hp < 4) {
    g = x;
    b = c;
  } else if (hp < 5) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }
  var m = l - c / 2;
  return "#" + [r, g, b].map(function(v) {
    return Math.round((v + m) * 255).toString(16).padStart(2, "0");
  }).join("").toUpperCase();
}
function hexToRgb(hex) {
  var h = (hex || "").trim().replace(/^#/, "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (h.length !== 6) return null;
  var n = parseInt(h, 16);
  if (isNaN(n)) return null;
  return { r: n >> 16 & 255, g: n >> 8 & 255, b: n & 255 };
}
function relLuminance(hex) {
  var c = hexToRgb(hex);
  if (!c) return 0;
  var a = [c.r / 255, c.g / 255, c.b / 255].map(function(v) {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function contrastRatio(a, b) {
  var la = relLuminance(a), lb = relLuminance(b);
  var hi = Math.max(la, lb), lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}
function inkOn(bg) {
  var L = relLuminance(bg);
  var cBlack = (L + 0.05) / 0.05;
  var cWhite = 1.05 / (L + 0.05);
  return cBlack >= cWhite ? "#1B1B1B" : "#FFFFFF";
}
export {
  contrastRatio,
  hexToRgb,
  hslTripleToHex,
  inkOn,
  relLuminance,
  useLiveVar
};
