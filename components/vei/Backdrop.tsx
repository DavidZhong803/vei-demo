"use client";

import { motion } from "framer-motion";

/**
 * Ambient AI-native backdrop: a fixed dark canvas with a faint grid,
 * two slowly drifting glow orbs, and a top radial gradient. Kept subtle
 * so foreground content (Apple/OpenAI style) stays the focus.
 */
export default function Backdrop({ accent = "#7c9cff" }: { accent?: string }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute inset-0 ambient-glow" />
      <div className="absolute inset-0 grid-bg" />

      <motion.div
        className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: accent, opacity: 0.14 }}
        animate={{ y: [0, 30, 0], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-120px] right-[-60px] h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ background: "#a78bfa", opacity: 0.1 }}
        animate={{ y: [0, -24, 0], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
