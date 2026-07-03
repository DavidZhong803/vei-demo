"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/15 bg-white/5 text-[11px] font-bold tracking-tight">
            V
          </span>
          <span className="text-sm font-semibold tracking-tight text-white/90">
            VEI
          </span>
          <span className="hidden text-xs text-white/35 sm:inline">
            Value Evolution Intelligence
          </span>
        </Link>

        <Link
          href="/demo"
          className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur transition-colors hover:border-white/30 hover:text-white"
        >
          Enter Demo
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.header>
  );
}
