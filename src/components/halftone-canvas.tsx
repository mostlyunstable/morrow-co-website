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

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let isVisible = true;
    const startTime = performance.now();

    let heroImage: SampledImage | null = null;

    if (variant === "hero") {
      const img = new Image();
      img.src = "/hero-hands.jpg";
      img.onload = () => {
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
      };
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(canvas);

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
      window.addEventListener("pointerleave", handlePointerLeave);
    }

    const defaultColor =
      variant === "hero" ? "#c6d7f2" : dotColor || "#ffffff";

    const sampleCoverLuma = (nx: number, ny: number, driftX: number, driftY: number) => {
      if (!heroImage) return 0;
      const canvasAspect = width / Math.max(1, height);
      const imgAspect = heroImage.width / Math.max(1, heroImage.height);

      let u = nx;
      let v = ny;
      if (canvasAspect > imgAspect) {
        const scale = imgAspect / canvasAspect;
        v = 0.5 + (ny - 0.5) * scale;
      } else {
        const scale = canvasAspect / imgAspect;
        u = 0.5 + (nx - 0.5) * scale;
      }

      // Gentle breathing drift on left vs right side (hands subtly reaching)
      const side = nx < 0.5 ? 1 : -1;
      u = Math.max(0, Math.min(0.999, u + driftX * side));
      v = Math.max(0, Math.min(0.999, v + driftY));

      const ix = Math.floor(u * heroImage.width);
      const iy = Math.floor(v * heroImage.height);
      const idx = (iy * heroImage.width + ix) * 4;
      const r = heroImage.data[idx] ?? 0;
      const g = heroImage.data[idx + 1] ?? 0;
      const b = heroImage.data[idx + 2] ?? 0;
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    };

    const draw = (now: number) => {
      if (isVisible) {
        const t = prefersReducedMotion ? 0 : (now - startTime) * 0.001;
        ctx.clearRect(0, 0, width, height);

        const spacing = variant === "hero" ? 7 : variant === "fade-dark" ? 8 : 7.5;
        const cols = Math.ceil(width / spacing) + 1;
        const rows = Math.ceil(height / spacing) + 1;
        const maxRadius =
          variant === "hero" ? 3.15 : variant === "fade-dark" ? 3.4 : 3.0;

        const px = pointerRef.current.x;
        const py = pointerRef.current.y;

        const scrollFactor =
          variant === "hero" ? Math.min(1, window.scrollY / Math.max(1, height * 0.7)) : 0;

        // Subtle animated reach & mist sweep
        const reachDrift = prefersReducedMotion
          ? 0
          : Math.sin(t * 0.85) * 0.008 - scrollFactor * 0.03;
        const floatDrift = prefersReducedMotion ? 0 : Math.cos(t * 0.65) * 0.005;

        ctx.fillStyle = defaultColor;

        for (let r = 0; r < rows; r++) {
          const ny = r / Math.max(1, rows - 1);
          const y = r * spacing;

          for (let c = 0; c < cols; c++) {
            const nx = c / Math.max(1, cols - 1);
            const x = c * spacing;

            let intensity = 0;

            if (variant === "hero") {
              const luma = sampleCoverLuma(nx, ny, reachDrift, floatDrift);
              const cloud = fbm(nx * 4.2 + t * 0.12, ny * 3.0 - t * 0.06);

              // Preserve high anatomical detail on every finger while rendering luminous cloud dots
              const handDetail = Math.pow(luma, 0.68) * 1.25;
              const skyBand = Math.max(0.28, Math.abs(ny - 0.48) * 1.65);
              const ambientMist = cloud * 0.72 * skyBand;

              // Subtle shimmer wave traveling across clouds & fingers
              const wave =
                0.9 + 0.1 * Math.sin(nx * 5.5 - t * 0.95 + ny * 2);

              // Gentle center softening behind headline without hiding fingertips
              const centerDist = Math.hypot((nx - 0.5) * 1.55, (ny - 0.48) * 1.85);
              const centerMask = Math.min(1, 0.44 + centerDist * 1.05);

              intensity =
                Math.max(handDetail, ambientMist) *
                wave *
                centerMask *
                (1 - scrollFactor * 0.45);

              if (pointerRef.current.active) {
                const dp = Math.hypot(nx - px, ny - py);
                intensity += Math.max(0, 0.24 - dp * 0.9);
              }
            } else if (variant === "fade-dark") {
              const n = fbm(nx * 5.2, ny * 3.4);
              const gradient = Math.pow(Math.max(0, 1 - ny * 1.06), 1.35);
              intensity = gradient * (0.45 + n * 0.95) - ny * 0.15;
            } else if (variant === "footer") {
              const colNoise = fbm(nx * 14, ny * 2.2 + t * 0.18);
              const rise = Math.pow(Math.max(0, ny - 0.22), 1.25);
              const streaks = Math.pow(
                Math.sin(nx * 46 + colNoise * 5) * 0.5 + 0.5,
                2.2
              );
              intensity = rise * (0.35 + colNoise * 0.85) * (0.45 + streaks * 0.75);
            } else {
              const rightWeight = Math.max(0, (nx - 0.32) / 0.68);
              const n = fbm(nx * 5.5 + t * 0.15, ny * 5.5 - t * 0.1);

              if (variant === "circuit") {
                const band = Math.exp(-Math.pow((ny - 0.32) * 2.1, 2));
                const band2 = Math.exp(-Math.pow((ny - 0.74) * 2.8, 2));
                intensity =
                  Math.pow(rightWeight, 1.15) *
                  (n * 0.9 + band * 0.45 + band2 * 0.35);
              } else if (variant === "grid") {
                const steps =
                  (Math.sin(nx * 18) * 0.5 + 0.5) *
                  (Math.cos(ny * 14) * 0.5 + 0.5);
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

            const clamped = Math.max(0, Math.min(1, intensity));
            if (clamped <= 0.08) continue;

            const radius = clamped * maxRadius;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.globalAlpha =
              variant === "hero"
                ? Math.min(0.96, 0.22 + clamped * 0.78)
                : Math.min(0.95, clamped * 0.92);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }

      if (!prefersReducedMotion && variant !== "fade-dark") {
        rafId = requestAnimationFrame(draw);
      }
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (variant === "hero") {
        window.removeEventListener("pointermove", handlePointerMove);
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
