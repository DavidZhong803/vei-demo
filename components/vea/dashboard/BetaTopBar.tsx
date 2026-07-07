"use client";

import Link from "next/link";
import { LayoutGrid, PanelRightOpen, Plus } from "lucide-react";
import { hhmmss, useNow } from "./useNow";
import { useLang, useT } from "./lang";
import type { Tab } from "./TopBar";

export default function BetaTopBar({
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
    <header className="sticky top-0 z-30 border-b border-black/[0.06] bg-[#f6f8f4]/88 backdrop-blur-xl">
      <div className="flex h-12 items-center gap-2 px-3 sm:hidden">
        <Link href="/" className="flex shrink-0 items-center gap-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-vea-emerald text-[11px] font-bold text-white">
            V
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            VEA
          </span>
        </Link>

        <span className="inline-flex items-center gap-1 rounded-full border border-vea-amber/25 bg-vea-amber/[0.08] px-2 py-0.5 text-[10px] font-medium text-vea-amber">
          <span className="h-1 w-1 animate-pulse rounded-full bg-vea-amber-soft" />
          7×24
        </span>

        <div className="flex-1" />

        <button
          onClick={() => onTab(active === "mycomp" ? "market" : "mycomp")}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors ${
            active === "mycomp"
              ? "bg-vea-emerald text-white"
              : "border border-black/10 bg-white/70 text-slate-600"
          }`}
        >
          <PanelRightOpen className="h-3.5 w-3.5" />
          {t("My Computation", "我的计算")}
        </button>

        <div className="flex items-center rounded-full border border-black/10 bg-black/[0.02] p-0.5 text-[10px] font-medium">
          <button
            onClick={() => setLang("en")}
            className={`rounded-full px-1.5 py-0.5 transition-colors ${
              lang === "en" ? "bg-vea-emerald text-white" : "text-slate-500"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("zh")}
            className={`rounded-full px-1.5 py-0.5 transition-colors ${
              lang === "zh" ? "bg-vea-emerald text-white" : "text-slate-500"
            }`}
          >
            中文
          </button>
        </div>
      </div>

      <div className="hidden h-14 items-center gap-3 px-5 sm:flex">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-vea-emerald text-sm font-bold text-white">
            V
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            VEA
          </span>
          <span className="hidden text-xs text-slate-400 md:inline">
            {t(
              "Technical asset monetization engine",
              "技术资产货币化引擎"
            )}
          </span>
        </Link>

        <button
          onClick={() => onTab("market")}
          className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-vea-emerald/10 px-3 py-1.5 text-xs font-semibold text-vea-emerald"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          {t("Market Computation", "计算市场")}
        </button>

        <div className="flex-1" />

        <span className="hidden items-center gap-1.5 rounded-full border border-vea-emerald/20 bg-vea-emerald/[0.06] px-3 py-1.5 text-[11px] font-medium text-vea-emerald lg:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vea-emerald opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-vea-emerald" />
          </span>
          {t("7×24 partner engine", "7×24 运营技术伙伴引擎")}
          <span className="font-mono text-vea-emerald/60">{hhmmss(now)}</span>
        </span>

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

        <button
          onClick={onNew}
          className="inline-flex items-center gap-1.5 rounded-full bg-vea-emerald px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-vea-emerald-soft"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{t("New", "新建计算")}</span>
        </button>

        <button
          onClick={() => onTab(active === "mycomp" ? "market" : "mycomp")}
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
            active === "mycomp"
              ? "bg-[#06110d] text-white"
              : "border border-black/10 bg-white/70 text-slate-600 hover:border-vea-emerald/35 hover:text-vea-emerald"
          }`}
        >
          <PanelRightOpen className="h-3.5 w-3.5" />
          {t("My Computation", "我的计算")}
        </button>
      </div>
    </header>
  );
}
