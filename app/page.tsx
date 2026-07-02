"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Backdrop from "@/components/vei/Backdrop";
import UploadStage from "@/components/vei/UploadStage";
import WorkingStage from "@/components/vei/WorkingStage";
import ExecutionStage from "@/components/vei/ExecutionStage";
import { getCase } from "@/lib/cases";

type Stage = "upload" | "working" | "execution";

export default function Home() {
  const [stage, setStage] = useState<Stage>("upload");
  const [caseId, setCaseId] = useState<string | null>(null);
  const activeCase = caseId ? getCase(caseId) : undefined;

  function launch(id: string) {
    setCaseId(id);
    setStage("working");
  }

  function restart() {
    setStage("upload");
    setCaseId(null);
  }

  return (
    <main className="relative min-h-screen">
      <Backdrop accent={activeCase?.accent ?? "#7c9cff"} />

      <AnimatePresence mode="wait">
        {stage === "upload" && <UploadStage key="upload" onLaunch={launch} />}

        {stage === "working" && activeCase && (
          <WorkingStage
            key="working"
            data={activeCase}
            onComplete={() => setStage("execution")}
          />
        )}

        {stage === "execution" && activeCase && (
          <ExecutionStage key="execution" data={activeCase} onRestart={restart} />
        )}
      </AnimatePresence>
    </main>
  );
}
