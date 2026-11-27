"use client";

import { useEffect, useRef } from "react";

export type HalftoneVariant =
  | "hero"
  | "circuit"
  | "grid"
  | "wave"
  | "orbit"
  | "footer"
  | "fade-dark";

interface HalftoneCanvasProps {
  variant: HalftoneVariant;
  className?: string;
  dotColor?: string;
}

function hash2(ix: number, iy: number): number {
  const n = Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

function noise2(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm(x: number, y: number): number {
  return (
    noise2(x, y) * 0.55 +
    noise2(x * 2.05, y * 2.05) * 0.3 +
    noise2(x * 4.1, y * 4.1) * 0.15
  );
}

interface SampledImage {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

const BUCKET_ALPHAS = [0.22, 0.38, 0.56, 0.76, 0.94] as const;
const TWO_PI = Math.PI * 2;

export function HalftoneCanvas({
  variant,
  className = "",
  dotColor,
}: HalftoneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let aborted = false;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let spacing = 8;
    let maxRadius = 3.15;
    let isPortraitHero = false;
    let dpr = 1;
    let rafId = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const startTime = performance.now();

    let heroImage: SampledImage | null = null;
    let staticNoise = new Float32Array(0);
    let heroLuma = new Float32Array(0);
    let bucketCoords: Float32Array[] = BUCKET_ALPHAS.map(
      () => new Float32Array(0)
    );
    const bucketCounts = new Int32Array(BUCKET_ALPHAS.length);

    const computeHeroGrid = () => {
      if (!heroImage || cols === 0 || rows === 0) return;
      const total = cols * rows;
      if (heroLuma.length !== total) heroLuma = new Float32Array(total);

      const canvasAspect = width / Math.max(1, height);
      const imgAspect = heroImage.width / Math.max(1, heroImage.height);
      const isPortrait = canvasAspect < 1.02;

      for (let r = 0; r < rows; r++) {
        const ny = r / Math.max(1, rows - 1);
        for (let c = 0; c < cols; c++) {
          const nx = c / Math.max(1, cols - 1);
          const idx = r * cols + c;

          let u = nx;
          let v = ny;

          if (canvasAspect > imgAspect) {
            const scale = imgAspect / canvasAspect;
            v = 0.5 + (ny - 0.5) * scale;
          } else {
            // Show BOTH full wrists, palms, and pointing hands horizontally on mobile & tablet
            const uSpan = isPortrait ? 0.94 : Math.max(0.76, canvasAspect / imgAspect);
            const dvPerNy =
              uSpan * (imgAspect / Math.max(0.25, canvasAspect)) * (isPortrait ? 0.56 : 1);
            const vCenterOffset = isPortrait ? 0.36 : 0.5;
            u = 0.5 + (nx - 0.5) * uSpan;
            v = 0.5 + (ny - vCenterOffset) * dvPerNy;
          }

          if (v < 0 || v > 1 || u < 0 || u > 1) {
            heroLuma[idx] = 0;
            continue;
          }

          const clampedU = Math.max(0, Math.min(0.999, u));
          const clampedV = Math.max(0, Math.min(0.999, v));
          const ix = Math.floor(clampedU * heroImage.width);
          const iy = Math.floor(clampedV * heroImage.height);
          const p = (iy * heroImage.width + ix) * 4;
          const lum =
            (0.299 * (heroImage.data[p] ?? 0) +
              0.587 * (heroImage.data[p + 1] ?? 0) +
              0.114 * (heroImage.data[p + 2] ?? 0)) /
            255;

          // Recover deeper chiaroscuro shadows on the right hand (u > 0.5)
          // so its forearm, palm, thumb, and fingers match the left hand's visual weight
          const rightBlend = Math.max(0, Math.min(1, (clampedU - 0.46) / 0.1));
          const gamma = 0.66 - rightBlend * 0.24; // 0.66 left -> 0.42 right
          const sideGain = 1.24 + rightBlend * 0.26;
          // Threshold tiny background noise (<0.025) before boosting right shadows
          const cleanLum = lum < 0.025 ? 0 : lum;
          heroLuma[idx] = Math.pow(cleanLum, gamma) * sideGain;
        }
      }
    };

    const rebuildGridBuffers = () => {
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      spacing =
        variant === "hero"
          ? isMobile
            ? 5.6
            : isTablet
              ? 6.5
              : 7
          : variant === "fade-dark"
            ? isMobile
              ? 7.5
              : 8
            : isMobile
              ? 7
              : 7.5;
      maxRadius =
        variant === "hero"
          ? isMobile
            ? 2.35
            : isTablet
              ? 2.75
              : 3.15
          : variant === "fade-dark"
            ? 3.0
            : 2.85;

      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;
      isPortraitHero = variant === "hero" && width / Math.max(1, height) < 1.02;

      const total = cols * rows;
      staticNoise = new Float32Array(total);
      bucketCoords = BUCKET_ALPHAS.map(() => new Float32Array(total * 3));

      for (let r = 0; r < rows; r++) {
        const ny = r / Math.max(1, rows - 1);
        for (let c = 0; c < cols; c++) {
          const nx = c / Math.max(1, cols - 1);
          const idx = r * cols + c;

          if (variant === "hero") {
            staticNoise[idx] = fbm(nx * 4.2, ny * 3.0);
          } else if (variant === "fade-dark") {
            staticNoise[idx] = fbm(nx * 5.2, ny * 3.4);
          } else if (variant === "footer") {
            staticNoise[idx] = fbm(nx * 14, ny * 2.2);
          } else {
            staticNoise[idx] = fbm(nx * 5.5, ny * 5.5);
          }
        }
      }

      if (variant === "hero" && heroImage) {
        computeHeroGrid();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextW = Math.max(1, Math.floor(rect.width));
      const nextH = Math.max(1, Math.floor(rect.height));
      if (nextW === width && nextH === height) return;
      width = nextW;
      height = nextH;
      const maxDpr = width < 768 ? 1.5 : 2;
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildGridBuffers();
    };

    resize();

    if (variant === "hero") {
      const img = new Image();
      img.src = "/hero-hands.jpg";
      img.onload = () => {
        if (aborted) return;
        const sampleW = 360;
        const sampleH = Math.max(
          1,
          Math.round((img.naturalHeight / Math.max(1, img.naturalWidth)) * sampleW)
        );
        const off = document.createElement("canvas");
        off.width = sampleW;
        off.height = sampleH;
        const offCtx = off.getContext("2d");
        if (!offCtx) return;
        offCtx.drawImage(img, 0, 0, sampleW, sampleH);
        const imgData = offCtx.getImageData(0, 0, sampleW, sampleH);
        heroImage = {
          data: imgData.data,
          width: sampleW,
          height: sampleH,
        };
        computeHeroGrid();
      };
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(canvas);

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointerRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    if (variant === "hero") {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerdown", handlePointerMove, { passive: true });
      window.addEventListener("pointerup", handlePointerLeave, { passive: true });
      window.addEventListener("pointerleave", handlePointerLeave);
    }

    const defaultColor =
      variant === "hero" ? "#c6d7f2" : dotColor || "#ffffff";

    const draw = (now: number) => {
      if (isVisible && isPageVisible && cols > 0 && rows > 0) {
        const t = prefersReducedMotion ? 0 : (now - startTime) * 0.001;
        ctx.clearRect(0, 0, width, height);

        bucketCounts.fill(0);

        const px = pointerRef.current.x;
        const py = pointerRef.current.y;
        const pointerActive = pointerRef.current.active;
        const scrollFactor =
          variant === "hero"
            ? Math.min(1, window.scrollY / Math.max(1, height * 0.7))
            : 0;
        const scrollFade = 1 - scrollFactor * 0.45;
        const hasHeroLuma = heroLuma.length === cols * rows;

        // Smooth animated reach, vertical float, and inward fingertip pulse across desktop & mobile
        const reachCols = prefersReducedMotion ? 0 : Math.sin(t * 1.4) * 2.1;
        const floatRows = prefersReducedMotion ? 0 : Math.cos(t * 1.05) * 1.15;
        const halfCols = cols * 0.5;

        for (let r = 0; r < rows; r++) {
          const ny = r / Math.max(1, rows - 1);
          const y = r * spacing;
          const rowOffset = r * cols;

          const sr = Math.max(0, Math.min(rows - 1.001, r - floatRows));
          const r0 = Math.floor(sr);
          const r1 = Math.min(rows - 1, r0 + 1);
          const fy = sr - r0;
          const r0Off = r0 * cols;
          const r1Off = r1 * cols;

          for (let c = 0; c < cols; c++) {
            const nx = c / Math.max(1, cols - 1);
            const x = c * spacing;
            const idx = rowOffset + c;
            const n = staticNoise[idx] ?? 0.5;

            let intensity = 0;

            if (variant === "hero") {
              let handDetail = 0;
              if (hasHeroLuma) {
                // Left hand reaches right (+reachCols), right hand reaches left (-reachCols)
                const sideDir = c < halfCols ? 1 : -1;
                const sc = Math.max(
                  0,
                  Math.min(cols - 1.001, c - sideDir * reachCols)
                );
                const c0 = Math.floor(sc);
                const c1 = Math.min(cols - 1, c0 + 1);
                const fx = sc - c0;

                const l00 = heroLuma[r0Off + c0];
                const l10 = heroLuma[r0Off + c1];
                const l01 = heroLuma[r1Off + c0];
                const l11 = heroLuma[r1Off + c1];
                const top = l00 + (l10 - l00) * fx;
                const bot = l01 + (l11 - l01) * fx;
                handDetail = top + (bot - top) * fy;
              }

              const skyBand = isPortraitHero
                ? Math.max(0.18, Math.pow(Math.abs(ny - 0.48) * 1.95, 1.1))
                : Math.max(0.28, Math.abs(ny - 0.48) * 1.65);
              const ambientMist = n * (isPortraitHero ? 0.96 : 0.72) * skyBand;
              // Energy pulse flowing from both wrists inward toward the reaching fingertips
              const inwardWave =
                0.78 +
                0.24 * Math.sin(Math.abs(nx - 0.5) * 8.5 + t * 2.2 - ny * 1.2);

              const centerDist = isPortraitHero
                ? Math.hypot((nx - 0.5) * 1.6, (ny - 0.41) * 1.8)
                : Math.hypot((nx - 0.5) * 1.55, (ny - 0.48) * 1.85);
              const centerMask = Math.min(1, (isPortraitHero ? 0.38 : 0.46) + centerDist * 1.15);

              // Keep hands bold and luminous on mobile while keeping text legible
              const handBoost = isPortraitHero ? 1.42 : 1.12;
              intensity =
                Math.max(handDetail * handBoost, ambientMist) *
                inwardWave *
                centerMask *
                scrollFade;

              if (pointerActive) {
                const dp = Math.hypot(nx - px, ny - py);
                if (dp < 0.27) {
                  intensity += 0.24 - dp * 0.9;
                }
              }
            } else if (variant === "fade-dark") {
              const gradient = Math.pow(Math.max(0, 1 - ny * 1.06), 1.35);
              intensity = gradient * (0.45 + n * 0.95) - ny * 0.15;
            } else if (variant === "footer") {
              const rise = Math.pow(Math.max(0, ny - 0.22), 1.25);
              const streaks = Math.pow(
                Math.sin(nx * 46 + n * 5 + t * 0.25) * 0.5 + 0.5,
                2.2
              );
              intensity = rise * (0.35 + n * 0.85) * (0.45 + streaks * 0.75);
            } else {
              const rightWeight = Math.max(0, (nx - 0.32) / 0.68);
              if (rightWeight <= 0) continue;

              if (variant === "circuit") {
                const band = Math.exp(-Math.pow((ny - 0.32) * 2.1, 2));
                const band2 = Math.exp(-Math.pow((ny - 0.74) * 2.8, 2));
                intensity =
                  Math.pow(rightWeight, 1.15) *
                  (n * 0.9 + band * 0.45 + band2 * 0.35);
              } else if (variant === "grid") {
                const steps =
                  (Math.sin(nx * 18 + t * 0.3) * 0.5 + 0.5) *
                  (Math.cos(ny * 14 - t * 0.2) * 0.5 + 0.5);
                intensity = Math.pow(rightWeight, 1.1) * (n * 0.75 + steps * 0.55);
              } else if (variant === "wave") {
                const wave = Math.sin(nx * 7 + t * 0.6) * 0.14 + 0.48;
                const crest = Math.exp(-Math.pow((ny - wave) * 3.2, 2));
                intensity = Math.pow(rightWeight, 1.1) * (n * 0.7 + crest * 0.6);
              } else {
                const d = Math.hypot(nx - 0.82, ny - 0.48);
                const rings = Math.sin(d * 26 - t * 0.9) * 0.5 + 0.5;
                intensity = Math.pow(rightWeight, 1.05) * (n * 0.65 + rings * 0.5);
              }
            }

            if (intensity <= 0.08) continue;
            const clamped = intensity > 1 ? 1 : intensity;
            const radius = clamped * maxRadius;
            const b = Math.min(
              BUCKET_ALPHAS.length - 1,
              Math.floor(clamped * BUCKET_ALPHAS.length)
            );
            const ptr = bucketCounts[b] * 3;
            const arr = bucketCoords[b];
            arr[ptr] = x;
            arr[ptr + 1] = y;
            arr[ptr + 2] = radius;
            bucketCounts[b]++;
          }
        }

        // Render all circles in <= 5 batched GPU fill() calls
        ctx.fillStyle = defaultColor;
        for (let b = 0; b < BUCKET_ALPHAS.length; b++) {
          const count = bucketCounts[b];
          if (count === 0) continue;
          ctx.globalAlpha = BUCKET_ALPHAS[b];
          ctx.beginPath();
          const arr = bucketCoords[b];
          for (let i = 0; i < count; i++) {
            const p = i * 3;
            const cx = arr[p];
            const cy = arr[p + 1];
            const cr = arr[p + 2];
            ctx.moveTo(cx + cr, cy);
            ctx.arc(cx, cy, cr, 0, TWO_PI);
          }
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      if (!prefersReducedMotion && variant !== "fade-dark") {
        rafId = requestAnimationFrame(draw);
      }
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      aborted = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (variant === "hero") {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerdown", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerLeave);
        window.removeEventListener("pointerleave", handlePointerLeave);
      }
    };
  }, [variant, dotColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}
