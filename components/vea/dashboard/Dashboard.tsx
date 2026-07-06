"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import TopBar, { type Tab } from "./TopBar";
import IndustrySidebar from "./IndustrySidebar";
import MarketPanel from "./MarketPanel";
import MyComputation from "./MyComputation";
import BottomNav from "./BottomNav";
import FullReportModal from "./FullReportModal";
import { LangProvider } from "./lang";
import InputStage from "@/components/vea/InputStage";
import ComputingStage from "@/components/vea/ComputingStage";
import { getCase, genericPackage, type VEAResultPackage } from "@/lib/vea";

type Overlay = "none" | "input" | "computing";

export default function Dashboard() {
  const params = useSearchParams();

  const [tab, setTab] = useState<Tab>("mycomp");
  const [industryId, setIndustryId] = useState("ai-semi");
  const [pkg, setPkg] = useState<VEAResultPackage>(
    () => getCase("nvidia") ?? genericPackage("NVIDIA")
  );
  const [overlay, setOverlay] = useState<Overlay>("none");
  const [pending, setPending] = useState<{ subject: string; caseId?: string }>({
    subject: "",
  });
  const [showFull, setShowFull] = useState(false);

  // Deep-link: /app?case=meta selects that computed package.
  useEffect(() => {
    const requested = params.get("case");
    if (requested) {
      const found = getCase(requested);
      if (found) {
        setPkg(found);
        setTab("mycomp");
      }
    }
  }, [params]);

  function startNew() {
    setShowFull(false);
    setOverlay("input");
  }

  function compute(subject: string, caseId?: string) {
    setPending({ subject, caseId });
    setOverlay("computing");
  }

  function finishCompute() {
    const next = pending.caseId
      ? getCase(pending.caseId) ?? genericPackage(pending.subject)
      : genericPackage(pending.subject);
    setPkg(next);
    setOverlay("none");
    setTab("mycomp");
  }

  function selectCase(id: string) {
    const found = getCase(id);
    if (found) setPkg(found);
  }

  return (
    <LangProvider>
    <div className="relative min-h-[100dvh] text-slate-900">
      {/* textured product canvas (replaces flat white) */}
      <div className="pointer-events-none fixed inset-0 -z-10 product-canvas" />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-light" />
      <div className="pointer-events-none fixed inset-0 -z-10 grain opacity-[0.04]" />
      <TopBar active={tab} onTab={setTab} onNew={startNew} />

      <div className="flex">
        {/* dark industry navigator (desktop) */}
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-64 shrink-0 lg:block">
          <IndustrySidebar selectedId={industryId} onSelect={setIndustryId} />
        </aside>

        {/* main */}
        <main className="min-w-0 flex-1 px-3 pb-[calc(3.75rem+env(safe-area-inset-bottom,0px))] pt-3 sm:p-5 lg:pb-5">
          <div className="grid gap-3 sm:gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.15fr)]">
            <div
              className={`${tab === "market" ? "block" : "hidden"} lg:block xl:h-[calc(100dvh-6.5rem)]`}
            >
              <MarketPanel selectedId={industryId} onSelect={setIndustryId} />
            </div>
            <div
              className={`${tab === "mycomp" ? "block" : "hidden"} lg:block xl:h-[calc(100dvh-6.5rem)]`}
            >
              <MyComputation
                pkg={pkg}
                onSelectCase={selectCase}
                onOpenFull={() => setShowFull(true)}
                onNew={startNew}
              />
            </div>
          </div>
        </main>
      </div>

      <BottomNav active={tab} onTab={setTab} onNew={startNew} />

      {/* new-computation overlay */}
      <AnimatePresence>
        {overlay !== "none" && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="pointer-events-none fixed inset-0 -z-10 product-canvas" />
            <div className="pointer-events-none fixed inset-0 -z-10 grain opacity-[0.04]" />
            <AnimatePresence mode="wait">
              {overlay === "input" && (
                <InputStage
                  key="input"
                  onCompute={compute}
                  onBack={() => setOverlay("none")}
                />
              )}
              {overlay === "computing" && (
                <ComputingStage
                  key="computing"
                  subject={pending.subject}
                  onDone={finishCompute}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* full report */}
      <AnimatePresence>
        {showFull && (
          <FullReportModal
            pkg={pkg}
            onClose={() => setShowFull(false)}
            onNew={startNew}
          />
        )}
      </AnimatePresence>
    </div>
    </LangProvider>
  );
}
