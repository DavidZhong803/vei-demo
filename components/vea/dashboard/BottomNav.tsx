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
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/[0.06] bg-white/90 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-1.5">
        <NavBtn
          label={t("Computation", "我的计算")}
          icon={<LineChart className="h-5 w-5" />}
          active={active === "mycomp"}
          onClick={() => onTab("mycomp")}
        />
        <NavBtn
          label={t("Market", "计算市场")}
          icon={<LayoutGrid className="h-5 w-5" />}
          active={active === "market"}
          onClick={() => onTab("market")}
        />
        <button
          onClick={onNew}
          className="flex flex-col items-center gap-0.5"
          aria-label={t("New computation", "新建计算")}
        >
          <span className="-mt-4 flex h-11 w-11 items-center justify-center rounded-full bg-vea-emerald text-white shadow-lg shadow-vea-emerald/30">
            <Plus className="h-5 w-5" />
          </span>
        </button>
        <NavBtn label={t("Alerts", "订阅")} icon={<Bell className="h-5 w-5" />} />
        <NavBtn label={t("Me", "我的")} icon={<User className="h-5 w-5" />} />
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
      className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors ${
        active ? "text-vea-emerald" : "text-slate-400"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
