"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Github,
  Globe,
  Sparkles,
  Upload as UploadIcon,
} from "lucide-react";
import { CASES } from "@/lib/cases";

const SUGGESTED = [
  { icon: FileText, label: "Pitch Deck" },
  { icon: Globe, label: "Website" },
  { icon: Github, label: "GitHub" },
  { icon: FileText, label: "Patents" },
];

export default function UploadStage({
  onLaunch,
}: {
  onLaunch: (caseId: string) => void;
}) {
  const [files, setFiles] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    setFiles((prev) => [...prev, ...Array.from(list).map((f) => f.name)]);
  }

  return (
    <motion.div
      key="upload"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 py-24 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70"
      >
        <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-vei-accent" />
        VEI · Value Evolution Intelligence
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
      >
        <span className="gradient-text">Upload Your Value.</span>
        <br />
        AI Finds &amp; Executes Your Best Path.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-white/50"
      >
        上传你的价值主体，AI 持续寻找并执行你的最佳价值实现路径。
        <br />
        Not an analysis tool. Not a consultant. A continuously working AI agent.
      </motion.p>

      {/* Dropzone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="mt-12 w-full"
      >
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-8 py-12 transition-all ${
            dragging
              ? "border-vei-accent/70 bg-vei-accent/5"
              : "border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
          <div className="mb-4 rounded-full border border-white/10 bg-white/5 p-4">
            <UploadIcon className="h-6 w-6 text-white/70" />
          </div>
          <p className="text-base font-medium text-white/80">
            Drop your value subject here
          </p>
          <p className="mt-1 text-sm text-white/40">
            Deck · Business plan · Website · GitHub · Patents · Financials — anything
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {SUGGESTED.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/50"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {files.map((f, i) => (
                  <span
                    key={`${f}-${i}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                  >
                    <FileText className="h-3.5 w-3.5 text-vei-accent" />
                    {f}
                  </span>
                ))}
              </div>
              <button
                onClick={() => onLaunch("ai-startup")}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-95"
              >
                <Sparkles className="h-4 w-4" />
                Let AI start working
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Live cases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16 w-full"
      >
        <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/30">
          Or explore a live case
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {CASES.map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => onLaunch(c.id)}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-colors hover:border-white/25"
            >
              <div
                className="absolute inset-x-0 top-0 h-px opacity-60"
                style={{
                  background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)`,
                }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="text-lg font-semibold"
                  style={{ color: c.accent }}
                >
                  {c.name}
                </span>
                <ArrowRight className="h-4 w-4 -translate-x-1 text-white/30 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/45">
                {c.tagline}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
