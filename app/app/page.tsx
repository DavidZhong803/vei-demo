import { Suspense } from "react";
import BetaWorkbench from "@/components/vea/dashboard/BetaWorkbench";

export default function AppPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <BetaWorkbench />
    </Suspense>
  );
}
