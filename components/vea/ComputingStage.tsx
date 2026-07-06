"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useT } from "@/components/vea/dashboard/lang";

/**
 * The computing screen. Per spec: one line only — "VEA is computing…" — on a
 * calm light background. No reasoning, nodes, rules, or internals are shown.
 */
export default function ComputingStage({
  subject,
  onDone,
  duration = 2600,
}: {
  subject: string;
  onDone: () => void;
  duration?: number;
}) {
  const t = useT();
  useEffect(() => {
    const timer = setTimeout(onDone, duration);
    return () => clearTimeout(timer);
  }, [onDone, duration]);

  return (
    <motion.div
      key="computing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      {/* calm orbital shimmer */}
      <div className="relative mb-10 h-28 w-28">
        <motion.div
          className="absolute inset-0 rounded-full border border-vea-emerald/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border border-vea-emerald/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-vea-emerald"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {t("VEA is computing", "VEA 正在计算")}
        <motion.span
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          …
        </motion.span>
      </h1>
      <p className="mt-4 max-w-md text-sm text-slate-500">
        {t("Computing the optimal monetization path for ", "正在计算最优货币化路径：")}
        <span className="font-medium text-slate-700">{subject}</span>
        {t(".", "")}
      </p>
    </motion.div>
  );
}
