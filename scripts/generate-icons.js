import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// SVG source for standard icon
const svgStandard = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e2238" />
      <stop offset="50%" stop-color="#141726" />
      <stop offset="100%" stop-color="#0d0e17" />
    </linearGradient>
    <linearGradient id="penGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f6dff" />
      <stop offset="50%" stop-color="#2f4bd8" />
      <stop offset="100%" stop-color="#1d2fa0" />
    </linearGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f2fe" />
      <stop offset="50%" stop-color="#4facfe" />
      <stop offset="100%" stop-color="#ff007f" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Squircle -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />
  <rect width="504" height="504" x="4" y="4" rx="108" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="4" />

  <!-- Dynamic Swirling Color Arc (Digital Art & Brush Streak) -->
  <path d="M 120 380 C 100 240, 220 120, 360 130 C 420 134, 440 180, 410 230 C 370 290, 280 320, 210 340" 
        fill="none" stroke="url(#glowGrad)" stroke-width="26" stroke-linecap="round" opacity="0.9" filter="url(#glow)" />

  <!-- Pen / Stylus Body -->
  <g transform="translate(140, 100) rotate(32 160 160)">
    <!-- Stylus Body -->
    <path d="M 140 30 L 180 30 L 175 220 L 145 220 Z" fill="#2d334d" stroke="#4a5578" stroke-width="3" />
    <!-- Stylus Grip -->
    <rect x="142" y="160" width="36" height="50" rx="4" fill="#1b1e2e" />
    <!-- Stylus Nib Base -->
    <path d="M 145 220 L 175 220 L 163 270 L 157 270 Z" fill="url(#penGrad)" />
    <!-- Stylus Nib Tip -->
    <path d="M 157 270 L 163 270 L 160 286 Z" fill="#00f2fe" filter="url(#glow)" />
    <!-- Stylus Accent Ring -->
    <rect x="141" y="90" width="38" height="6" fill="#00f2fe" />
    <rect x="141" y="102" width="38" height="6" fill="#ff007f" />
  </g>

  <!-- OMEONE "O" Monogram & 4.0 Badge -->
  <circle cx="160" cy="350" r="44" fill="none" stroke="#2f4bd8" stroke-width="14" />
  <circle cx="160" cy="350" r="16" fill="#00f2fe" opacity="0.8" />

  <!-- Text / Badge -->
  <g transform="translate(250, 380)">
    <rect width="160" height="42" rx="10" fill="#2f4bd8" />
    <text x="80" y="27" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="20" text-anchor="middle" letter-spacing="2">OMEONE</text>
  </g>
</svg>
`;

// Maskable SVG with safe zone padding (for Android adaptive icons)
const svgMaskable = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGradM" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e2238" />
      <stop offset="50%" stop-color="#141726" />
      <stop offset="100%" stop-color="#0d0e17" />
    </linearGradient>
    <linearGradient id="penGradM" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f6dff" />
      <stop offset="50%" stop-color="#2f4bd8" />
      <stop offset="100%" stop-color="#1d2fa0" />
    </linearGradient>
    <linearGradient id="glowGradM" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f2fe" />
      <stop offset="50%" stop-color="#4facfe" />
      <stop offset="100%" stop-color="#ff007f" />
    </linearGradient>
  </defs>

  <!-- Solid Full Background (No rounded corners for maskable) -->
  <rect width="512" height="512" fill="url(#bgGradM)" />

  <!-- Safe Area Scaled Content (80% scale centered) -->
  <g transform="translate(51.2, 51.2) scale(0.8)">
    <!-- Dynamic Swirling Color Arc -->
    <path d="M 120 380 C 100 240, 220 120, 360 130 C 420 134, 440 180, 410 230 C 370 290, 280 320, 210 340" 
          fill="none" stroke="url(#glowGradM)" stroke-width="26" stroke-linecap="round" opacity="0.9" />

    <!-- Pen / Stylus Body -->
    <g transform="translate(140, 100) rotate(32 160 160)">
      <path d="M 140 30 L 180 30 L 175 220 L 145 220 Z" fill="#2d334d" stroke="#4a5578" stroke-width="3" />
      <rect x="142" y="160" width="36" height="50" rx="4" fill="#1b1e2e" />
      <path d="M 145 220 L 175 220 L 163 270 L 157 270 Z" fill="url(#penGradM)" />
      <path d="M 157 270 L 163 270 L 160 286 Z" fill="#00f2fe" />
      <rect x="141" y="90" width="38" height="6" fill="#00f2fe" />
      <rect x="141" y="102" width="38" height="6" fill="#ff007f" />
    </g>

    <!-- OMEONE "O" Monogram -->
    <circle cx="160" cy="350" r="44" fill="none" stroke="#2f4bd8" stroke-width="14" />
    <circle cx="160" cy="350" r="16" fill="#00f2fe" opacity="0.8" />

    <g transform="translate(250, 380)">
      <rect width="160" height="42" rx="10" fill="#2f4bd8" />
      <text x="80" y="27" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="20" text-anchor="middle" letter-spacing="2">OMEONE</text>
    </g>
  </g>
</svg>
`;

async function generate() {
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgStandard.trim());

  await sharp(Buffer.from(svgStandard))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));

  await sharp(Buffer.from(svgStandard))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));

  await sharp(Buffer.from(svgStandard))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  await sharp(Buffer.from(svgStandard))
    .resize(64, 64)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  await sharp(Buffer.from(svgMaskable))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));

  console.log('PWA icons generated successfully!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
