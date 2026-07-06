"use client";

import { useEffect, useRef } from "react";

/**
 * Living "engine reactor" canvas: a glowing core, concentric orbital rings of
 * dots rotating at different speeds, a drifting particle haze, and periodic
 * pulse ripples. The whole system parallax-shifts toward the mouse for a
 * delicate, alive feel. Purely ambient — pointer events pass through.
 */
export default function EngineCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: 0, y: 0 };
    const off = { x: 0, y: 0 };

    function resize() {
      if (!canvas || !ctx) return;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // Scale the reactor to the viewport so it feels centered on any screen.
    const scale = () => Math.min(w, h) / 850;

    const rings = [
      { r: 120, count: 3, speed: 0.00055, dir: 1, size: 2.3 },
      { r: 185, count: 5, speed: 0.0004, dir: -1, size: 2 },
      { r: 260, count: 8, speed: 0.0003, dir: 1, size: 1.8 },
      { r: 345, count: 12, speed: 0.00022, dir: -1, size: 1.6 },
      { r: 440, count: 18, speed: 0.00016, dir: 1, size: 1.3 },
    ];

    const parts = Array.from({ length: 80 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 90 + Math.random() * 420,
      s: 0.00004 + Math.random() * 0.00016,
      dir: Math.random() > 0.5 ? 1 : -1,
      size: Math.random() * 1.4 + 0.4,
      o: Math.random() * 0.35 + 0.08,
    }));

    let pulses: { r: number; o: number }[] = [];
    let lastPulse = 0;

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    }
    window.addEventListener("mousemove", onMove);

    function frame(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      off.x += (mouse.x * 26 - off.x) * 0.05;
      off.y += (mouse.y * 26 - off.y) * 0.05;
      const cx = w / 2 + off.x;
      const cy = h / 2 + off.y;
      const k = scale();

      // core glow
      const pulse = 0.62 + Math.sin(t * 0.002) * 0.16;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 160 * k);
      g.addColorStop(0, `rgba(0,255,194,${0.22 * pulse})`);
      g.addColorStop(0.45, `rgba(0,229,172,${0.07 * pulse})`);
      g.addColorStop(1, "rgba(0,255,194,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // core dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3.6 * k + 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,255,194,0.95)";
      ctx.fill();

      // pulse ripples
      if (!reduce && t - lastPulse > 2600) {
        pulses.push({ r: 8, o: 0.45 });
        lastPulse = t;
      }
      pulses.forEach((p) => {
        p.r += 1.1;
        p.o *= 0.992;
      });
      pulses = pulses.filter((p) => p.o > 0.02 && p.r < 520);
      pulses.forEach((p) => {
        ctx.beginPath();
        ctx.arc(cx, cy, p.r * k, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,255,194,${p.o})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // rings
      rings.forEach((ring) => {
        const rr = ring.r * k;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,255,194,0.055)";
        ctx.lineWidth = 1;
        ctx.stroke();

        const base = reduce ? 0 : t * ring.speed * ring.dir;
        for (let i = 0; i < ring.count; i++) {
          const ang = base + (i / ring.count) * Math.PI * 2;
          const x = cx + Math.cos(ang) * rr;
          const y = cy + Math.sin(ang) * rr;
          ctx.beginPath();
          ctx.arc(x, y, ring.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0,255,194,0.07)";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, y, ring.size, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0,255,194,0.85)";
          ctx.fill();
        }
      });

      // drifting haze
      parts.forEach((p) => {
        if (!reduce) p.a += p.s * p.dir;
        const x = cx + Math.cos(p.a) * p.r * k;
        const y = cy + Math.sin(p.a) * p.r * k;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,194,${p.o})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
