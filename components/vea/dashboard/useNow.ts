"use client";

import { useEffect, useState } from "react";

/**
 * Ticking clock so the dashboard feels like a live 7×24 computation.
 * Starts as null so server and client render identically (no hydration
 * mismatch); the real time only appears after mount.
 */
export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

/** Format a Date as HH:MM:SS in 24h. */
export function hhmmss(d: Date | null): string {
  if (!d) return "--:--:--";
  return d.toLocaleTimeString("en-GB", { hour12: false });
}
