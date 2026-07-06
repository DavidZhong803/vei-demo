"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A live-feeling numeric counter. Counts up to `value` on mount, then keeps
 * drifting upward by small random increments to feel like a running engine.
 */
export default function Counter({
  value,
  live = false,
  format = true,
}: {
  value: number;
  live?: boolean; // keep ticking upward after reaching value
  format?: boolean; // thousands separators
}) {
  const [display, setDisplay] = useState(0);
  const current = useRef(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      current.current = value * eased;
      setDisplay(current.current);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  useEffect(() => {
    if (!live) return;
    const iv = setInterval(() => {
      current.current += Math.floor(Math.random() * 7) + 1;
      setDisplay(current.current);
    }, 1600);
    return () => clearInterval(iv);
  }, [live]);

  const n = Math.floor(display);
  return <>{format ? n.toLocaleString("en-US") : n}</>;
}
