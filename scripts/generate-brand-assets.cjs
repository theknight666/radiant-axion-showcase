const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

// CRC32 table & helper
function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      table[i] = c;
    }
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  const crc = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crc >>> 0, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function createPNG(width, height, rgbaBuffer) {
  const stride = width * 4;
  const filtered = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    filtered[y * (stride + 1)] = 0; // Filter: None
    rgbaBuffer.copy(filtered, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const compressed = zlib.deflateSync(filtered, { level: 9 });

  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bit depth
  ihdr[9] = 6; // Color type 6 (RGBA)
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  const ihdrChunk = makeChunk("IHDR", ihdr);
  const idatChunk = makeChunk("IDAT", compressed);
  const iendChunk = makeChunk("IEND", Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

function createICO(pngBuffers) {
  // pngBuffers: array of { width, height, buffer }
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4);

  let offset = 6 + count * 16;
  const dirEntries = [];
  const imageBuffers = [];

  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // Size of image
    entry.writeUInt32LE(offset, 12); // Offset

    dirEntries.push(entry);
    imageBuffers.push(item.buffer);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
}

// Squircle distance function: (|x|^p + |y|^p)^(1/p) <= r
function isInsideSquircle(x, y, cx, cy, rx, ry, p = 3.5) {
  const dx = Math.abs(x - cx) / rx;
  const dy = Math.abs(y - cy) / ry;
  return Math.pow(dx, p) + Math.pow(dy, p);
}

// Point in polygon for triangle/trapezoid
function pointInTriangle(px, py, ax, ay, bx, by, cx, cy) {
  const v0x = cx - ax,
    v0y = cy - ay;
  const v1x = bx - ax,
    v1y = by - ay;
  const v2x = px - ax,
    v2y = py - ay;
  const dot00 = v0x * v0x + v0y * v0y;
  const dot01 = v0x * v1x + v0y * v1y;
  const dot02 = v0x * v2x + v0y * v2y;
  const dot11 = v1x * v1x + v1y * v1y;
  const dot12 = v1x * v2x + v1y * v2y;
  const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
  const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
  const v = (dot00 * dot12 - dot01 * dot02) * invDenom;
  return u >= 0 && v >= 0 && u + v <= 1;
}

function renderAxionisIcon(size) {
  const buf = Buffer.alloc(size * size * 4, 0);
  const center = size / 2;
  const radius = size * 0.46;
  const superness = 3.2;

  // Render with 4x supersampling for ultra smooth antialiasing
  const ss = 4;
  const ssSize = size * ss;
  const ssCenter = ssSize / 2;
  const ssRadius = radius * ss;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let rSum = 0,
        gSum = 0,
        bSum = 0,
        aSum = 0;

      for (let sy = 0; sy < ss; sy++) {
        for (let sx = 0; sx < ss; sx++) {
          const px = x * ss + sx + 0.5;
          const py = y * ss + sy + 0.5;

          const sqDist = isInsideSquircle(
            px,
            py,
            ssCenter,
            ssCenter,
            ssRadius,
            ssRadius,
            superness,
          );

          if (sqDist <= 1.0) {
            // Inside squircle
            const normY = (py - (ssCenter - ssRadius)) / (ssRadius * 2);
            // Gradient from #0E1015 (14, 16, 21) to #1A1D26 (26, 29, 38)
            let bgR = Math.round(14 + (26 - 14) * normY);
            let bgG = Math.round(16 + (29 - 16) * normY);
            let bgB = Math.round(21 + (38 - 21) * normY);
            let bgA = 255;

            // Rim specular highlight (border)
            if (sqDist > 0.88) {
              const borderFactor = (sqDist - 0.88) / 0.12;
              bgR = Math.round(bgR * (1 - borderFactor) + 255 * borderFactor * 0.25);
              bgG = Math.round(bgG * (1 - borderFactor) + 255 * borderFactor * 0.25);
              bgB = Math.round(bgB * (1 - borderFactor) + 255 * borderFactor * 0.28);
            }

            // Draw Geometric "A" Glyph
            // Normalized coordinates inside icon (0 to 1)
            const nx = px / ssSize;
            const ny = py / ssSize;

            // Apex Accent Dot: circle at (0.50, 0.20), radius 0.05
            const dotDist = Math.hypot(nx - 0.5, ny - 0.2);
            const isApexDot = dotDist <= 0.052;

            // Apex accent bar / crossbar: y in [0.55, 0.62], x in [0.41, 0.59]
            const isCrossbar = ny >= 0.55 && ny <= 0.61 && nx >= 0.4 && nx <= 0.6;

            // Outer "A" triangle: Apex at (0.50, 0.24), bottom-left (0.24, 0.78), bottom-right (0.76, 0.78)
            const inOuterA = pointInTriangle(nx, ny, 0.5, 0.24, 0.24, 0.78, 0.76, 0.78);
            // Inner cutout triangle: Apex at (0.50, 0.38), bottom-left (0.37, 0.64), bottom-right (0.63, 0.64)
            const inInnerCutout = pointInTriangle(nx, ny, 0.5, 0.38, 0.37, 0.64, 0.63, 0.64);

            // Left leg & Right leg cutouts at bottom
            const inLegCutout = ny > 0.64 && nx > 0.43 && nx < 0.57;

            if (isApexDot || isCrossbar) {
              // Vibrant Orange: #FF7A38 (255, 122, 56) to #F26522 (242, 101, 34)
              bgR = 255;
              bgG = Math.round(122 - 20 * normY);
              bgB = Math.round(56 - 20 * normY);
            } else if (inOuterA && !inInnerCutout && !inLegCutout) {
              // White Glyph
              bgR = 255;
              bgG = 255;
              bgB = 255;
            }

            rSum += bgR;
            gSum += bgG;
            bSum += bgB;
            aSum += bgA;
          }
        }
      }

      const count = ss * ss;
      const finalA = Math.round(aSum / count);
      if (finalA > 0) {
        const idx = (y * size + x) * 4;
        buf[idx] = Math.round(rSum / count);
        buf[idx + 1] = Math.round(gSum / count);
        buf[idx + 2] = Math.round(bSum / count);
        buf[idx + 3] = finalA;
      }
    }
  }

  return buf;
}

function renderOgCard() {
  const width = 1200;
  const height = 630;
  const buf = Buffer.alloc(width * height * 4);

  // Background deep dark radial + linear gradient
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const dx = (x - width * 0.5) / width;
      const dy = (y - height * 0.4) / height;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Subtle glow at top center
      const glow = Math.max(0, 1 - dist * 1.6);
      const r = Math.min(255, Math.round(10 + glow * 35));
      const g = Math.min(255, Math.round(12 + glow * 20));
      const b = Math.min(255, Math.round(18 + glow * 30));

      buf[idx] = r;
      buf[idx + 1] = g;
      buf[idx + 2] = b;
      buf[idx + 3] = 255;
    }
  }

  // Draw 200x200 Icon in the center
  const iconSize = 200;
  const iconBuf = renderAxionisIcon(iconSize);
  const startX = Math.round((width - iconSize) / 2);
  const startY = Math.round((height - iconSize) / 2 - 40);

  for (let iy = 0; iy < iconSize; iy++) {
    for (let ix = 0; ix < iconSize; ix++) {
      const srcIdx = (iy * iconSize + ix) * 4;
      const alpha = iconBuf[srcIdx + 3] / 255;
      if (alpha > 0) {
        const destIdx = ((startY + iy) * width + (startX + ix)) * 4;
        buf[destIdx] = Math.round(iconBuf[srcIdx] * alpha + buf[destIdx] * (1 - alpha));
        buf[destIdx + 1] = Math.round(iconBuf[srcIdx + 1] * alpha + buf[destIdx + 1] * (1 - alpha));
        buf[destIdx + 2] = Math.round(iconBuf[srcIdx + 2] * alpha + buf[destIdx + 2] * (1 - alpha));
      }
    }
  }

  return createPNG(width, height, buf);
}

// Generate all assets
console.log("Rendering Axionis 16x16 icon...");
const buf16 = renderAxionisIcon(16);
const png16 = createPNG(16, 16, buf16);

console.log("Rendering Axionis 32x32 icon...");
const buf32 = renderAxionisIcon(32);
const png32 = createPNG(32, 32, buf32);

console.log("Rendering Axionis 48x48 icon...");
const buf48 = renderAxionisIcon(48);
const png48 = createPNG(48, 48, buf48);

console.log("Rendering Axionis 180x180 Apple Touch icon...");
const buf180 = renderAxionisIcon(180);
const png180 = createPNG(180, 180, buf180);

console.log("Generating multi-resolution favicon.ico (16, 32, 48)...");
const icoBuf = createICO([
  { width: 16, height: 16, buffer: png16 },
  { width: 32, height: 32, buffer: png32 },
  { width: 48, height: 48, buffer: png48 },
]);

console.log("Generating 1200x630 OG social preview card...");
const ogPng = renderOgCard();

const publicDir = path.resolve(__dirname, "../public");

fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuf);
fs.writeFileSync(path.join(publicDir, "favicon-16x16.png"), png16);
fs.writeFileSync(path.join(publicDir, "favicon-32x32.png"), png32);
fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), png180);
fs.writeFileSync(path.join(publicDir, "apple-touch-icon-precomposed.png"), png180);
fs.writeFileSync(path.join(publicDir, "og-image.png"), ogPng);

console.log("All brand assets generated successfully in public/ !");
