"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import CodexDockPanel, { type ChatMode } from "./CodexDockPanel";
import MarketWorkbenchPanel from "./MarketWorkbenchPanel";
import { LangProvider, useLang, useT } from "./lang";

function LanguageSwitch() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center rounded-md border border-vea-steel/20 bg-[#0d1b27]/80 p-0.5 text-[11px] font-medium shadow-[inset_0_1px_rgba(255,255,255,0.04)]">
      <button
        onClick={() => setLang("en")}
        className={`rounded px-2 py-1 transition-colors ${
          lang === "en" ? "bg-vea-steel/16 text-[#dce8fb]" : "text-white/58"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("zh")}
        className={`rounded px-2 py-1 transition-colors ${
          lang === "zh" ? "bg-vea-steel/16 text-[#dce8fb]" : "text-white/58"
        }`}
      >
        中文
      </button>
    </div>
  );
}

function WorkbenchContent() {
  const [chatMode, setChatMode] = useState<ChatMode>("dock");
  const t = useT();

  const chatDocked = chatMode === "dock";
  const chatFloating = chatMode === "float";
  const chatMinimized = chatMode === "minimized";

  return (
    <div className="app-workbench-bg relative h-[100dvh] overflow-hidden text-white">
      <div className="material-texture pointer-events-none absolute inset-0 opacity-90" />
      <header className="relative z-10 flex h-14 shrink-0 items-center gap-3 border-b border-vea-steel/15 bg-[#07111a]/78 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-vea-steel/28 bg-vea-steel/[0.09] text-sm font-bold text-[#bfd2f2] shadow-[inset_0_1px_rgba(255,255,255,0.06)]">
            V
          </span>
          <span className="text-xl font-semibold tracking-tight text-white">
            VEA
          </span>
        </Link>

        <div className="flex-1" />

        <LanguageSwitch />

        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 rounded-md border border-vea-steel/18 bg-vea-steel/[0.055] px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-vea-steel/35 hover:text-[#dce8fb]"
        >
          {t("Home", "首页")}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </header>

      <main
        className={`relative z-10 h-[calc(100dvh-3.5rem)] min-h-0 overflow-y-auto p-3 sm:p-4 lg:grid lg:gap-4 lg:overflow-hidden ${
          chatDocked
            ? "lg:grid-cols-[minmax(0,1fr)_390px] xl:grid-cols-[minmax(0,1fr)_430px]"
            : "lg:grid-cols-1"
        }`}
      >
        <MarketWorkbenchPanel />
        {chatDocked && (
          <div className="hidden min-h-0 lg:block">
            <CodexDockPanel
              mode="dock"
              onMinimize={() => setChatMode("minimized")}
              onPopOut={() => setChatMode("float")}
              onDock={() => setChatMode("dock")}
            />
          </div>
        )}
      </main>

      {chatDocked && (
        <button
          onClick={() => setChatMode("float")}
          className="absolute bottom-4 right-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-md border border-vea-steel/22 bg-[#071019]/94 p-0 text-sm font-medium text-white/76 shadow-[0_14px_34px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-colors hover:text-white sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-2 lg:hidden"
        >
          <MessageSquare className="h-4 w-4 text-vea-steel" />
          <span className="sr-only sm:not-sr-only">{t("My Computation", "我的计算")}</span>
        </button>
      )}

      {chatFloating && (
        <div className="absolute bottom-4 right-4 top-20 z-40 w-[min(430px,calc(100vw-2rem))]">
          <CodexDockPanel
            mode="float"
            onMinimize={() => setChatMode("minimized")}
            onPopOut={() => setChatMode("float")}
            onDock={() => setChatMode("dock")}
          />
        </div>
      )}

      {chatMinimized && (
        <button
          onClick={() => setChatMode("dock")}
          className="absolute bottom-4 right-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-md border border-vea-steel/22 bg-[#071019]/94 p-0 text-sm font-medium text-white/76 shadow-[0_14px_34px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-colors hover:text-white sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-2"
        >
          <MessageSquare className="h-4 w-4 text-vea-steel" />
          <span className="sr-only sm:not-sr-only">{t("Open My Computation", "打开我的计算")}</span>
        </button>
      )}
    </div>
  );
}

export default function BetaWorkbench() {
  return (
    <LangProvider>
      <WorkbenchContent />
    </LangProvider>
  );
}
