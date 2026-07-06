import { Suspense } from "react";
import Dashboard from "@/components/vea/dashboard/Dashboard";

export default function AppPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <Dashboard />
    </Suspense>
  );
}
