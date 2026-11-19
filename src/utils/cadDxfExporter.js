// src/utils/cadDxfExporter.js
// Pure client-side SVG-to-AutoCAD DXF (R2000) & Vector PostScript (EPS) Fabrication Exporter.
// Supports qr-code-styling (<clipPath>, rotate transforms, elliptical arcs A/a) AND bwip-js 1D/2D (stroked & filled paths).
// Produces CAM-ready DXF polylines (ENGRAVE + CUT_BORDER layers) for AutoCAD, LightBurn, Glowforge, Fusion 360 & CNC.

function parseViewBox(svgEl) {
  const vb = svgEl.getAttribute('viewBox');
  if (vb) {
    const parts = vb.trim().split(/[\s,]+/).map(Number);
    if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
      return { minX: parts[0], minY: parts[1], w: parts[2], h: parts[3] };
    }
  }
  const w = parseFloat(svgEl.getAttribute('width')) || 300;
  const h = parseFloat(svgEl.getAttribute('height')) || 300;
  return { minX: 0, minY: 0, w, h };
}

// 2D Affine Matrix [a, b, c, d, e, f] => x' = a*x + c*y + e, y' = b*x + d*y + f
function mulMat(m1, m2) {
  return [
    m1[0] * m2[0] + m1[2] * m2[1],
    m1[1] * m2[0] + m1[3] * m2[1],
    m1[0] * m2[2] + m1[2] * m2[3],
    m1[1] * m2[2] + m1[3] * m2[3],
    m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
    m1[1] * m2[4] + m1[3] * m2[5] + m1[5]
  ];
}

function applyMat([a, b, c, d, e, f], [x, y]) {
  return [a * x + c * y + e, b * x + d * y + f];
}

function parseTransformAttr(str) {
  let mat = [1, 0, 0, 1, 0, 0];
  if (!str) return mat;
  const regex = /(translate|rotate|scale|matrix)\s*\(([^)]+)\)/gi;
  let match;
  while ((match = regex.exec(str)) !== null) {
    const fn = match[1].toLowerCase();
    const args = match[2].trim().split(/[\s,]+/).map(Number).filter(n => !Number.isNaN(n));
    let cur = [1, 0, 0, 1, 0, 0];
    if (fn === 'translate' && args.length >= 1) {
      cur = [1, 0, 0, 1, args[0], args[1] || 0];
    } else if (fn === 'scale' && args.length >= 1) {
      const sx = args[0];
      const sy = args.length >= 2 ? args[1] : sx;
      cur = [sx, 0, 0, sy, 0, 0];
    } else if (fn === 'rotate' && args.length >= 1) {
      const rad = (args[0] * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      if (args.length >= 3) {
        const cx = args[1], cy = args[2];
        cur = [cos, sin, -sin, cos, cx - cx * cos + cy * sin, cy - cx * sin - cy * cos];
      } else {
        cur = [cos, sin, -sin, cos, 0, 0];
      }
    } else if (fn === 'matrix' && args.length >= 6) {
      cur = args.slice(0, 6);
    }
    mat = mulMat(mat, cur);
  }
  return mat;
}

function getCumulativeMatrix(el, stopAt) {
  const chain = [];
  let cur = el;
  while (cur && cur !== stopAt && cur.nodeType === 1) {
    chain.unshift(cur);
    cur = cur.parentElement;
  }
  let mat = [1, 0, 0, 1, 0, 0];
  for (const node of chain) {
    const tr = node.getAttribute('transform');
    if (tr) mat = mulMat(mat, parseTransformAttr(tr));
  }
  return mat;
}

/**
 * Converts an SVG elliptical arc (x0,y0 -> rx,ry,phi,largeArc,sweep -> x,y)
 * into polyline points using the standard W3C SVG F.6.5/6.6 parameterization.
 */
function arcToPoints(x0, y0, rxIn, ryIn, phiDeg, largeArcFlag, sweepFlag, x, y, steps = 8) {
  if (x0 === x && y0 === y) return [];
  let rx = Math.abs(rxIn);
  let ry = Math.abs(ryIn);
  if (rx === 0 || ry === 0) return [[x, y]];

  const phi = (phiDeg * Math.PI) / 180;
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);

  const dx2 = (x0 - x) / 2;
  const dy2 = (y0 - y) / 2;
  const x1p = cosPhi * dx2 + sinPhi * dy2;
  const y1p = -sinPhi * dx2 + cosPhi * dy2;

  const rxSq = rx * rx;
  const rySq = ry * ry;
  const x1pSq = x1p * x1p;
  const y1pSq = y1p * y1p;

  const lambda = x1pSq / rxSq + y1pSq / rySq;
  if (lambda > 1) {
    const sqrtLambda = Math.sqrt(lambda);
    rx *= sqrtLambda;
    ry *= sqrtLambda;
  }

  const rx2 = rx * rx;
  const ry2 = ry * ry;
  const num = Math.max(0, rx2 * ry2 - rx2 * y1pSq - ry2 * x1pSq);
  const den = rx2 * y1pSq + ry2 * x1pSq;
  const coef = (largeArcFlag === sweepFlag ? -1 : 1) * (den === 0 ? 0 : Math.sqrt(num / den));

  const cxp = coef * ((rx * y1p) / ry);
  const cyp = coef * (-(ry * x1p) / rx);

  const cx = cosPhi * cxp - sinPhi * cyp + (x0 + x) / 2;
  const cy = sinPhi * cxp + cosPhi * cyp + (y0 + y) / 2;

  const vecAngle = (ux, uy, vx, vy) => {
    const dot = ux * vx + uy * vy;
    const len = Math.hypot(ux, uy) * Math.hypot(vx, vy);
    const ratio = len === 0 ? 1 : Math.max(-1, Math.min(1, dot / len));
    const sign = ux * vy - uy * vx < 0 ? -1 : 1;
    return sign * Math.acos(ratio);
  };

  const theta1 = vecAngle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
  let dTheta = vecAngle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry);

  if (!sweepFlag && dTheta > 0) dTheta -= 2 * Math.PI;
  if (sweepFlag && dTheta < 0) dTheta += 2 * Math.PI;

  const pts = [];
  for (let s = 1; s <= steps; s++) {
    const t = theta1 + (dTheta * s) / steps;
    const xr = rx * Math.cos(t);
    const yr = ry * Math.sin(t);
    pts.push([
      cosPhi * xr - sinPhi * yr + cx,
      sinPhi * xr + cosPhi * yr + cy
    ]);
  }
  return pts;
}

/**
 * Parses SVG <path d="..."> commands (M, L, H, V, C, Q, A, Z and lowercase relative variants)
 * into polygon loops for CAD LWPOLYLINE & EPS export.
 */
function pathDataToPolygons(d, curveSteps = 6) {
  const polygons = [];
  if (!d) return polygons;

  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:[eE][-+]?\d+)?/g);
  if (!tokens) return polygons;

  let i = 0;
  let cx = 0;
  let cy = 0;
  let startX = 0;
  let startY = 0;
  let currentPoly = [];
  let cmd = '';

  const flushPoly = (close = false) => {
    if (currentPoly.length >= 2) {
      polygons.push({ points: currentPoly, closed: close });
    }
    currentPoly = [];
  };

  while (i < tokens.length) {
    if (/^[a-zA-Z]$/.test(tokens[i])) {
      cmd = tokens[i++];
      if (cmd === 'Z' || cmd === 'z') {
        flushPoly(true);
        cx = startX;
        cy = startY;
      }
      continue;
    }

    const num = () => parseFloat(tokens[i++]);
    switch (cmd) {
      case 'M': {
        flushPoly(false);
        cx = num();
        cy = num();
        startX = cx;
        startY = cy;
        currentPoly.push([cx, cy]);
        cmd = 'L';
        break;
      }
      case 'm': {
        flushPoly(false);
        cx += num();
        cy += num();
        startX = cx;
        startY = cy;
        currentPoly.push([cx, cy]);
        cmd = 'l';
        break;
      }
      case 'L': {
        cx = num();
        cy = num();
        currentPoly.push([cx, cy]);
        break;
      }
      case 'l': {
        cx += num();
        cy += num();
        currentPoly.push([cx, cy]);
        break;
      }
      case 'H': {
        cx = num();
        currentPoly.push([cx, cy]);
        break;
      }
      case 'h': {
        cx += num();
        currentPoly.push([cx, cy]);
        break;
      }
      case 'V': {
        cy = num();
        currentPoly.push([cx, cy]);
        break;
      }
      case 'v': {
        cy += num();
        currentPoly.push([cx, cy]);
        break;
      }
      case 'C': {
        const x1 = num(), y1 = num(), x2 = num(), y2 = num(), x3 = num(), y3 = num();
        const x0 = cx, y0 = cy;
        for (let s = 1; s <= curveSteps; s++) {
          const t = s / curveSteps;
          const u = 1 - t;
          const px = u*u*u*x0 + 3*u*u*t*x1 + 3*u*t*t*x2 + t*t*t*x3;
          const py = u*u*u*y0 + 3*u*u*t*y1 + 3*u*t*t*y2 + t*t*t*y3;
          currentPoly.push([px, py]);
        }
        cx = x3; cy = y3;
        break;
      }
      case 'c': {
        const x1 = cx + num(), y1 = cy + num(), x2 = cx + num(), y2 = cy + num(), x3 = cx + num(), y3 = cy + num();
        const x0 = cx, y0 = cy;
        for (let s = 1; s <= curveSteps; s++) {
          const t = s / curveSteps;
          const u = 1 - t;
          const px = u*u*u*x0 + 3*u*u*t*x1 + 3*u*t*t*x2 + t*t*t*x3;
          const py = u*u*u*y0 + 3*u*u*t*y1 + 3*u*t*t*y2 + t*t*t*y3;
          currentPoly.push([px, py]);
        }
        cx = x3; cy = y3;
        break;
      }
      case 'Q': {
        const x1 = num(), y1 = num(), x2 = num(), y2 = num();
        const x0 = cx, y0 = cy;
        for (let s = 1; s <= curveSteps; s++) {
          const t = s / curveSteps;
          const u = 1 - t;
          const px = u*u*x0 + 2*u*t*x1 + t*t*x2;
          const py = u*u*y0 + 2*u*t*y1 + t*t*y2;
          currentPoly.push([px, py]);
        }
        cx = x2; cy = y2;
        break;
      }
      case 'q': {
        const x1 = cx + num(), y1 = cy + num(), x2 = cx + num(), y2 = cy + num();
        const x0 = cx, y0 = cy;
        for (let s = 1; s <= curveSteps; s++) {
          const t = s / curveSteps;
          const u = 1 - t;
          const px = u*u*x0 + 2*u*t*x1 + t*t*x2;
          const py = u*u*y0 + 2*u*t*y1 + t*t*y2;
          currentPoly.push([px, py]);
        }
        cx = x2; cy = y2;
        break;
      }
      case 'A': {
        const rx = num(), ry = num(), rot = num(), laf = num(), sf = num(), x = num(), y = num();
        const pts = arcToPoints(cx, cy, rx, ry, rot, Boolean(laf), Boolean(sf), x, y, curveSteps);
        currentPoly.push(...pts);
        cx = x; cy = y;
        break;
      }
      case 'a': {
        const rx = num(), ry = num(), rot = num(), laf = num(), sf = num(), x = cx + num(), y = cy + num();
        const pts = arcToPoints(cx, cy, rx, ry, rot, Boolean(laf), Boolean(sf), x, y, curveSteps);
        currentPoly.push(...pts);
        cx = x; cy = y;
        break;
      }
      default:
        i++;
        break;
    }
  }
  flushPoly(false);
  return polygons;
}

/**
 * Expands an open stroked path (e.g. BWIPP 1D barcode bar) into closed 4-vertex rectangles.
 */
function expandStrokedPath(points, strokeWidth) {
  const rects = [];
  const hw = strokeWidth / 2;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const len = Math.hypot(x1 - x0, y1 - y0);
    if (len <= 0) continue;
    const nx = (-(y1 - y0) / len) * hw;
    const ny = ((x1 - x0) / len) * hw;
    rects.push([
      [x0 + nx, y0 + ny],
      [x1 + nx, y1 + ny],
      [x1 - nx, y1 - ny],
      [x0 - nx, y0 - ny]
    ]);
  }
  return rects;
}

function isWhiteOrEmptyFill(fillStr) {
  if (!fillStr) return false;
  const f = fillStr.toLowerCase().replace(/\s+/g, '');
  return f === 'none' || f === 'transparent' || f === '#ffffff' || f === '#fff' || f === 'white' || f === 'rgb(255,255,255)';
}

/**
 * Extracts drawable CAD entities from an SVG string.
 */
function extractVectorPrimitives(svgString, targetWidthMm = 100) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgEl = doc.querySelector('svg');
  if (!svgEl) throw new Error('Invalid SVG element');

  const { minX, minY, w, h } = parseViewBox(svgEl);
  const scale = targetWidthMm / w;
  const targetHeightMm = h * scale;

  const toMm = (x, y) => [
    Number(((x - minX) * scale).toFixed(4)),
    Number((targetHeightMm - (y - minY) * scale).toFixed(4))
  ];

  const polylines = [];
  const circles = [];

  // Identify background clipPaths (qr-code-styling) so we ignore them cleanly
  const shouldIgnoreElement = (el) => {
    const cp = el.closest('clipPath');
    if (cp) {
      const id = (cp.getAttribute('id') || '').toLowerCase();
      if (id.includes('background')) return true;
    }
    return Boolean(el.closest('mask'));
  };

  // Rectangles
  svgEl.querySelectorAll('rect').forEach((rect) => {
    if (shouldIgnoreElement(rect)) return;
    const fill = rect.getAttribute('fill');
    if (isWhiteOrEmptyFill(fill)) return;
    // Skip giant clipped/gradient overlay rects from qr-code-styling
    if (rect.hasAttribute('clip-path')) return;

    const rw = parseFloat(rect.getAttribute('width') || '0');
    const rh = parseFloat(rect.getAttribute('height') || '0');
    const rx = parseFloat(rect.getAttribute('x') || '0');
    const ry = parseFloat(rect.getAttribute('y') || '0');
    if (rw >= w * 0.92 && rh >= h * 0.92) return;
    if (rw <= 0 || rh <= 0) return;

    const mat = getCumulativeMatrix(rect, svgEl);
    const corners = [
      [rx, ry],
      [rx + rw, ry],
      [rx + rw, ry + rh],
      [rx, ry + rh]
    ].map(pt => {
      const [tx, ty] = applyMat(mat, pt);
      return toMm(tx, ty);
    });

    polylines.push({
      layer: 'ENGRAVE',
      closed: true,
      points: corners
    });
  });

  // Circles
  svgEl.querySelectorAll('circle').forEach((c) => {
    if (shouldIgnoreElement(c)) return;
    const cx = parseFloat(c.getAttribute('cx') || '0');
    const cy = parseFloat(c.getAttribute('cy') || '0');
    const r = parseFloat(c.getAttribute('r') || '0');
    if (r <= 0) return;
    const mat = getCumulativeMatrix(c, svgEl);
    const [tx, ty] = applyMat(mat, [cx, cy]);
    const [mx, my] = toMm(tx, ty);
    circles.push({
      layer: 'ENGRAVE',
      cx: mx,
      cy: my,
      r: Number((r * scale).toFixed(4))
    });
  });

  // Polygons & Polylines
  svgEl.querySelectorAll('polygon, polyline').forEach((el) => {
    if (shouldIgnoreElement(el)) return;
    const ptsAttr = el.getAttribute('points') || '';
    const coords = ptsAttr.trim().split(/[\s,]+/).map(Number);
    const mat = getCumulativeMatrix(el, svgEl);
    const pts = [];
    for (let j = 0; j + 1 < coords.length; j += 2) {
      const [tx, ty] = applyMat(mat, [coords[j], coords[j + 1]]);
      pts.push(toMm(tx, ty));
    }
    if (pts.length >= 2) {
      polylines.push({
        layer: 'ENGRAVE',
        closed: el.tagName.toLowerCase() === 'polygon',
        points: pts
      });
    }
  });

  // Paths (supports M/L/H/V/C/Q/A/Z, stroke-width bar expansion, & transforms)
  svgEl.querySelectorAll('path').forEach((p) => {
    if (shouldIgnoreElement(p)) return;
    const fill = p.getAttribute('fill');
    const stroke = p.getAttribute('stroke');
    const strokeWidth = parseFloat(p.getAttribute('stroke-width') || '0');
    if (isWhiteOrEmptyFill(fill) && (!stroke || strokeWidth <= 0)) return;

    const d = p.getAttribute('d') || '';
    const mat = getCumulativeMatrix(p, svgEl);
    const parsedPolys = pathDataToPolygons(d);

    parsedPolys.forEach((poly) => {
      if (poly.points.length === 4) {
        const xs = poly.points.map(pt => pt[0]);
        const ys = poly.points.map(pt => pt[1]);
        const pw = Math.max(...xs) - Math.min(...xs);
        const ph = Math.max(...ys) - Math.min(...ys);
        if (pw >= w * 0.92 && ph >= h * 0.92) return;
      }

      // If open stroked bar (e.g. 1D barcode from BWIPP), expand into closed filled rectangle(s)
      if (!poly.closed && stroke && strokeWidth > 0) {
        const barRects = expandStrokedPath(poly.points, strokeWidth);
        for (const rectPts of barRects) {
          polylines.push({
            layer: 'ENGRAVE',
            closed: true,
            points: rectPts.map(pt => {
              const [tx, ty] = applyMat(mat, pt);
              return toMm(tx, ty);
            })
          });
        }
        return;
      }

      polylines.push({
        layer: 'ENGRAVE',
        closed: poly.closed,
        points: poly.points.map(pt => {
          const [tx, ty] = applyMat(mat, pt);
          return toMm(tx, ty);
        })
      });
    });
  });

  // Cut border frame (5mm outward margin for laser/acrylic tag cutting)
  const padMm = 5;
  polylines.push({
    layer: 'CUT_BORDER',
    closed: true,
    points: [
      [-padMm, -padMm],
      [Number((targetWidthMm + padMm).toFixed(4)), -padMm],
      [Number((targetWidthMm + padMm).toFixed(4)), Number((targetHeightMm + padMm).toFixed(4))],
      [-padMm, Number((targetHeightMm + padMm).toFixed(4))]
    ]
  });

  return { polylines, circles, targetWidthMm, targetHeightMm };
}

/**
 * Generates an AutoCAD R2000-compatible ASCII DXF string from an SVG string.
 */
export function svgToDxfString(svgString, targetWidthMm = 100) {
  const { polylines, circles } = extractVectorPrimitives(svgString, targetWidthMm);

  const lines = [
    '0', 'SECTION',
    '2', 'HEADER',
    '9', '$INSUNITS', '70', '4', // 4 = Millimeters
    '9', '$MEASUREMENT', '70', '1', // 1 = Metric
    '0', 'ENDSEC',
    '0', 'SECTION',
    '2', 'TABLES',
    '0', 'TABLE', '2', 'LAYER', '70', '2',
    '0', 'LAYER', '2', 'ENGRAVE', '70', '0', '62', '5', '6', 'CONTINUOUS', // Blue layer for Laser Engrave
    '0', 'LAYER', '2', 'CUT_BORDER', '70', '0', '62', '1', '6', 'CONTINUOUS', // Red layer for Cut
    '0', 'ENDTAB',
    '0', 'ENDSEC',
    '0', 'SECTION',
    '2', 'ENTITIES'
  ];

  // Emit LWPOLYLINE entities
  for (const poly of polylines) {
    if (!poly.points.length) continue;
    lines.push(
      '0', 'LWPOLYLINE',
      '8', poly.layer,
      '90', String(poly.points.length),
      '70', poly.closed ? '1' : '0'
    );
    for (const [x, y] of poly.points) {
      lines.push('10', String(x), '20', String(y));
    }
  }

  // Emit CIRCLE entities
  for (const c of circles) {
    lines.push(
      '0', 'CIRCLE',
      '8', c.layer,
      '10', String(c.cx),
      '20', String(c.cy),
      '30', '0',
      '40', String(c.r)
    );
  }

  lines.push('0', 'ENDSEC', '0', 'EOF');
  return lines.join('\n');
}

/**
 * Converts a CSS hex color (#RRGGBB) to PostScript RGB [0..1] components.
 */
function hexToPsRgb(hex = '#000000') {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return '0 0 0';
  const r = (parseInt(clean.slice(0, 2), 16) / 255).toFixed(4);
  const g = (parseInt(clean.slice(2, 4), 16) / 255).toFixed(4);
  const b = (parseInt(clean.slice(4, 6), 16) / 255).toFixed(4);
  return `${r} ${g} ${b}`;
}

/**
 * Generates an Adobe Illustrator / CorelDRAW compatible Encapsulated PostScript (.EPS) string.
 */
export function svgToEpsString(svgString, fgHex = '#000000', bgHex = '#ffffff') {
  const { polylines, circles, targetHeightMm } = extractVectorPrimitives(svgString, 100);
  const ptScale = 2.83465; // 1mm = 2.83465pt
  const wPt = Math.round(100 * ptScale);
  const hPt = Math.round(targetHeightMm * ptScale);

  const out = [
    '%!PS-Adobe-3.0 EPSF-3.0',
    `%%BoundingBox: 0 0 ${wPt} ${hPt}`,
    '%%Creator: CreateMy-QR Vector Engine',
    '%%LanguageLevel: 2',
    '%%EndComments',
    `${hexToPsRgb(bgHex)} setrgbcolor`,
    `0 0 ${wPt} ${hPt} rectfill`,
    `${hexToPsRgb(fgHex)} setrgbcolor`,
  ];

  for (const poly of polylines) {
    if (poly.layer === 'CUT_BORDER' || poly.points.length < 3) continue;
    out.push('newpath');
    poly.points.forEach(([x, y], idx) => {
      const px = (x * ptScale).toFixed(3);
      const py = (y * ptScale).toFixed(3);
      out.push(`${px} ${py} ${idx === 0 ? 'moveto' : 'lineto'}`);
    });
    out.push('closepath fill');
  }

  for (const c of circles) {
    const px = (c.cx * ptScale).toFixed(3);
    const py = (c.cy * ptScale).toFixed(3);
    const pr = (c.r * ptScale).toFixed(3);
    out.push(`newpath ${px} ${py} ${pr} 0 360 arc closepath fill`);
  }

  out.push('%%EOF');
  return out.join('\n');
}

export function triggerTextFileDownload(content, filename, mimeType = 'application/octet-stream') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
