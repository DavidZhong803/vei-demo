"use client";

import { LayoutGrid, LineChart, Plus, Bell, User } from "lucide-react";
import type { Tab } from "./TopBar";
import { useT } from "./lang";

export default function BottomNav({
  active,
  onTab,
  onNew,
}: {
  active: Tab;
  onTab: (t: Tab) => void;
  onNew: () => void;
}) {
  const t = useT();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 px-5 pb-[env(safe-area-inset-bottom,0px)] lg:hidden">
      {/* compact dock — narrower bar makes the center + read larger */}
      <div className="relative mx-auto max-w-[19rem] overflow-visible rounded-t-2xl border border-b-0 border-black/[0.07] bg-[#f6f8f4]/95 shadow-[0_-6px_28px_-10px_rgba(16,40,28,0.14)] backdrop-blur-md">
        <button
          onClick={onNew}
          className="absolute left-1/2 top-0 z-40 flex h-14 w-14 -translate-x-1/2 -translate-y-[26%] items-center justify-center rounded-full bg-vea-emerald text-white shadow-lg shadow-vea-emerald/35 ring-[3px] ring-[#f6f8f4]"
          aria-label={t("New computation", "新建计算")}
        >
          <Plus className="h-6 w-6" strokeWidth={2.5} />
        </button>

        <div className="flex items-end justify-between px-2 pb-1 pt-2.5">
          <NavBtn
            label={t("Mine", "我的")}
            icon={<LineChart className="h-5 w-5" />}
            active={active === "mycomp"}
            onClick={() => onTab("mycomp")}
          />
          <NavBtn
            label={t("Market", "市场")}
            icon={<LayoutGrid className="h-5 w-5" />}
            active={active === "market"}
            onClick={() => onTab("market")}
          />
          <div className="w-14 shrink-0" aria-hidden />
          <NavBtn label={t("Alerts", "订阅")} icon={<Bell className="h-5 w-5" />} />
          <NavBtn label={t("Me", "账户")} icon={<User className="h-5 w-5" />} />
        </div>
      </div>
    </nav>
  );
}

function NavBtn({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-medium transition-colors ${
        active ? "text-vea-emerald" : "text-slate-400"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
