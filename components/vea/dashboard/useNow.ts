"use client";

import { useEffect, useState } from "react";

/** Ticking clock so the dashboard feels like a live 7×24 computation. */
export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

/** Format a Date as HH:MM:SS in 24h. */
export function hhmmss(d: Date): string {
  return d.toLocaleTimeString("en-GB", { hour12: false });
}
