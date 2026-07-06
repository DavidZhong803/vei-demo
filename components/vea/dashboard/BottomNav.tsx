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
    <nav className="fixed inset-x-0 bottom-0 z-30 overflow-visible border-t border-black/[0.07] bg-[#f6f8f4]/95 backdrop-blur-md pb-[env(safe-area-inset-bottom,0px)] lg:hidden">
      {/* center FAB — semi-circle wedged into the bar top */}
      <button
        onClick={onNew}
        className="absolute left-1/2 top-0 z-40 flex h-[3.25rem] w-[3.25rem] -translate-x-1/2 -translate-y-[26%] items-center justify-center rounded-full bg-vea-emerald text-white shadow-md shadow-vea-emerald/30 ring-[3px] ring-[#f6f8f4]"
        aria-label={t("New computation", "新建计算")}
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </button>

      <div className="mx-auto flex max-w-md items-end justify-around px-1 pb-0.5 pt-2">
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
        {/* spacer — reserves room for the FAB without shifting side tabs */}
        <div className="w-[3.25rem] shrink-0" aria-hidden />
        <NavBtn label={t("Alerts", "订阅")} icon={<Bell className="h-5 w-5" />} />
        <NavBtn label={t("Me", "账户")} icon={<User className="h-5 w-5" />} />
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
