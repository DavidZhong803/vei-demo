"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import ResultPackage from "@/components/vea/ResultPackage";
import type { VEAResultPackage } from "@/lib/vea";

export default function FullReportModal({
  pkg,
  onClose,
  onNew,
}: {
  pkg: VEAResultPackage;
  onClose: () => void;
  onNew: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-paper"
    >
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-white via-paper to-paper-soft" />
      <button
        onClick={onClose}
        className="fixed right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-3.5 py-1.5 text-xs text-slate-500 backdrop-blur transition-colors hover:border-black/20 hover:text-slate-900"
      >
        <X className="h-3.5 w-3.5" />
        关闭 Close
      </button>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <ResultPackage
          data={pkg}
          onRestart={() => {
            onClose();
            onNew();
          }}
        />
      </motion.div>
    </motion.div>
  );
}
