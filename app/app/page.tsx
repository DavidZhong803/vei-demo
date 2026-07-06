"use client";

import { Suspense, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import InputStage from "@/components/vea/InputStage";
import ComputingStage from "@/components/vea/ComputingStage";
import ResultPackage from "@/components/vea/ResultPackage";
import { getCase, genericPackage, type VEAResultPackage } from "@/lib/vea";

type Stage = "input" | "computing" | "result";

function AppExperience() {
  const params = useSearchParams();
  const [stage, setStage] = useState<Stage>("input");
  const [subject, setSubject] = useState("");
  const [pkg, setPkg] = useState<VEAResultPackage | null>(null);

  // Deep-link: /app?case=meta computes straight to the result package.
  useEffect(() => {
    const requested = params.get("case");
    if (requested) {
      const found = getCase(requested);
      if (found) {
        setSubject(found.subject);
        setPkg(found);
        setStage("computing");
      }
    }
  }, [params]);

  function compute(subj: string, caseId?: string) {
    setSubject(subj);
    setPkg(caseId ? getCase(caseId) ?? genericPackage(subj) : genericPackage(subj));
    setStage("computing");
  }

  function restart() {
    setStage("input");
    setSubject("");
    setPkg(null);
  }

  return (
    <main className="relative min-h-screen bg-paper text-slate-900">
      {/* soft light ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-white via-paper to-paper-soft" />

      <AnimatePresence mode="wait">
        {stage === "input" && <InputStage key="input" onCompute={compute} />}
        {stage === "computing" && (
          <ComputingStage
            key="computing"
            subject={subject}
            onDone={() => setStage("result")}
          />
        )}
        {stage === "result" && pkg && (
          <ResultPackage key="result" data={pkg} onRestart={restart} />
        )}
      </AnimatePresence>
    </main>
  );
}

export default function AppPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <AppExperience />
    </Suspense>
  );
}
