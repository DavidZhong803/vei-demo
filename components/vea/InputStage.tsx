"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Paperclip, Sparkles } from "lucide-react";
import { CASES } from "@/lib/vea";

export default function InputStage({
  onCompute,
  onBack,
}: {
  onCompute: (subject: string, caseId?: string) => void;
  onBack?: () => void;
}) {
  const [value, setValue] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const canCompute = value.trim().length > 0 || !!file;

  function submit() {
    if (!canCompute) return;
    onCompute(value.trim() || file || "Your Value Subject");
  }

  return (
    <motion.div
      key="input"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-24 text-center"
    >
      {onBack ? (
        <button
          onClick={onBack}
          className="group absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-black/[0.03] px-3.5 py-1.5 text-xs text-slate-500 transition-colors hover:border-black/20 hover:text-slate-800"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          返回 Back
        </button>
      ) : (
        <Link
          href="/"
          className="group absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-black/[0.03] px-3.5 py-1.5 text-xs text-slate-500 transition-colors hover:border-black/20 hover:text-slate-800"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Home
        </Link>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-vea-emerald/20 bg-vea-emerald/[0.06] px-4 py-1.5 text-xs font-medium text-vea-emerald"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-vea-emerald" />
        VEA · AI Result Interface
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
      >
        What would you like VEA to compute?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="mt-4 max-w-lg text-balance text-base leading-relaxed text-slate-500"
      >
        输入一个价值主体 — a company, technology, patent, project, or document.
        VEA computes and delivers the result.
      </motion.p>

      {/* input card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="mt-10 w-full"
      >
        <div className="paper-card rounded-2xl p-2">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
            }}
            placeholder="e.g. Meta, a memory-controller patent, a business plan…"
            rows={3}
            className="w-full resize-none rounded-xl bg-transparent px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <div className="flex items-center justify-between gap-3 px-2 pb-1">
            <button
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-slate-500 transition-colors hover:bg-black/[0.04] hover:text-slate-700"
            >
              <Paperclip className="h-3.5 w-3.5" />
              {file ? "1 file attached" : "Attach PDF / Word"}
            </button>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={(e) =>
                setFile(e.target.files?.[0]?.name ?? null)
              }
            />
            <button
              onClick={submit}
              disabled={!canCompute}
              className="inline-flex items-center gap-2 rounded-full bg-vea-emerald px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-vea-emerald-soft disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Sparkles className="h-4 w-4" />
              Compute
            </button>
          </div>
        </div>

        {file && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-xs text-slate-600">
            <FileText className="h-3.5 w-3.5 text-vea-emerald" />
            {file}
          </div>
        )}
      </motion.div>

      {/* case chips */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 w-full"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">
          Or open a computed case
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => onCompute(c.subject, c.id)}
              className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-vea-emerald/40 hover:text-vea-emerald"
            >
              {c.subject}
              <span className="text-xs text-slate-400 group-hover:text-vea-emerald/70">
                {c.kind}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
