"use client";

import { motion } from "framer-motion";

/**
 * Dark "engine" backdrop: near-black canvas, faint grid, drifting neon-green
 * glow orbs, and a slowly rotating orbital ring — signalling a living engine
 * that never stops computing. Purely ambient; kept subtle.
 */
export default function EngineBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute inset-0 engine-glow" />
      <div className="absolute inset-0 grid-bg" />

      {/* rotating orbital rings, centered near the hero */}
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="h-[560px] w-[560px] rounded-full border border-vea-neon/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ boxShadow: "inset 0 0 120px rgba(0,255,194,0.05)" }}
        />
        <motion.div
          className="absolute inset-0 m-auto h-[360px] w-[360px] rounded-full border border-vea-neon/15"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-[130px]"
        style={{ background: "#00ffc2", opacity: 0.1 }}
        animate={{ y: [0, 26, 0], opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-140px] right-[-80px] h-[440px] w-[440px] rounded-full blur-[130px]"
        style={{ background: "#00e5ac", opacity: 0.08 }}
        animate={{ y: [0, -22, 0], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
