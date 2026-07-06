"use client";

import Link from "next/link";
import { Search, Bell, Plus } from "lucide-react";
import { hhmmss, useNow } from "./useNow";
import { useLang, useT } from "./lang";

export type Tab = "market" | "mycomp";

export default function TopBar({
  active,
  onTab,
  onNew,
}: {
  active: Tab;
  onTab: (t: Tab) => void;
  onNew: () => void;
}) {
  const now = useNow();
  const { lang, setLang } = useLang();
  const t = useT();

  return (
    <header className="sticky top-0 z-30 border-b border-black/[0.07] bg-[#f6f8f4]/85 backdrop-blur-md">
      <div className="flex h-14 items-center gap-4 px-4 sm:px-5">
        {/* brand */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-vea-emerald text-sm font-bold text-white">
            V
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            VEA
          </span>
          <span className="hidden text-xs text-slate-400 md:inline">
            {t("Accelerating technical monetization", "加速技术资产货币化")}
          </span>
        </Link>

        {/* desktop tabs */}
        <nav className="ml-2 hidden items-center gap-1 lg:flex">
          {(
            [
              { id: "market", label: t("Market", "计算市场") },
              { id: "mycomp", label: t("My Computation", "我的计算") },
            ] as { id: Tab; label: string }[]
          ).map((tItem) => (
            <button
              key={tItem.id}
              onClick={() => onTab(tItem.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                active === tItem.id
                  ? "bg-vea-emerald/10 text-vea-emerald"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tItem.label}
            </button>
          ))}
        </nav>

        <div className="flex-1" />

        {/* live status */}
        <span className="hidden items-center gap-1.5 rounded-full border border-vea-emerald/20 bg-vea-emerald/[0.06] px-3 py-1.5 text-[11px] font-medium text-vea-emerald sm:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vea-emerald opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-vea-emerald" />
          </span>
          {t("7×24 Continuous", "7×24 持续计算中")}
          <span className="font-mono text-vea-emerald/60">{hhmmss(now)}</span>
        </span>

        {/* search (decorative) */}
        <div className="hidden items-center gap-2 rounded-full border border-black/10 bg-black/[0.02] px-3 py-1.5 text-xs text-slate-400 xl:flex">
          <Search className="h-3.5 w-3.5" />
          {t("Search companies / sectors / events", "搜索企业 / 产业 / 事件")}
        </div>

        {/* language toggle */}
        <div className="flex items-center rounded-full border border-black/10 bg-black/[0.02] p-0.5 text-[11px] font-medium">
          <button
            onClick={() => setLang("en")}
            className={`rounded-full px-2 py-1 transition-colors ${
              lang === "en"
                ? "bg-vea-emerald text-white"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("zh")}
            className={`rounded-full px-2 py-1 transition-colors ${
              lang === "zh"
                ? "bg-vea-emerald text-white"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            中文
          </button>
        </div>

        {/* new computation */}
        <button
          onClick={onNew}
          className="inline-flex items-center gap-1.5 rounded-full bg-vea-emerald px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-vea-emerald-soft"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t("New", "新建计算")}</span>
        </button>

        <button className="hidden h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-black/[0.04] hover:text-slate-600 sm:flex">
          <Bell className="h-4 w-4" />
        </button>
        <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-vea-emerald to-emerald-700" />
      </div>
    </header>
  );
}
