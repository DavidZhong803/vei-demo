"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import CodexDockPanel, { type ChatMode } from "./CodexDockPanel";
import MarketWorkbenchPanel from "./MarketWorkbenchPanel";
import { LangProvider, useLang, useT } from "./lang";

function LanguageSwitch() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center rounded-md border border-white/[0.10] bg-white/[0.04] p-0.5 text-[11px] font-medium">
      <button
        onClick={() => setLang("en")}
        className={`rounded px-2 py-1 transition-colors ${
          lang === "en" ? "bg-vea-neon text-[#06110d]" : "text-white/45"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("zh")}
        className={`rounded px-2 py-1 transition-colors ${
          lang === "zh" ? "bg-vea-neon text-[#06110d]" : "text-white/45"
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
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/[0.07] px-4 backdrop-blur-xl">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-vea-neon/30 bg-vea-neon/10 text-sm font-bold text-vea-neon">
            V
          </span>
          <span className="text-xl font-semibold tracking-tight text-white">
            VEA
          </span>
          <span className="hidden rounded bg-white/[0.08] px-1.5 py-0.5 text-xs text-white/42 md:inline">
            {t(
              "Technical Asset Monetization Computational Framework",
              "技术资产货币化计算框架"
            )}
          </span>
        </Link>

        <div className="flex-1" />

        <span className="hidden items-center gap-2 rounded-md border border-vea-amber/20 bg-vea-amber/[0.08] px-3 py-1.5 text-xs font-medium text-vea-amber-soft sm:inline-flex">
          <Sparkles className="h-3.5 w-3.5" />
          {t("Beta workspace", "测试工作区")}
        </span>

        <LanguageSwitch />

        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 rounded-md border border-vea-neon/25 bg-vea-neon/[0.08] px-3 py-1.5 text-xs font-medium text-vea-neon transition-colors hover:bg-vea-neon/[0.12]"
        >
          {t("Home", "首页")}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </header>

      <main
        className={`grid h-[calc(100dvh-3.5rem)] min-h-0 gap-3 overflow-y-auto p-3 sm:gap-4 sm:p-4 lg:overflow-hidden ${
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
          className="absolute bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-md border border-white/[0.12] bg-[#06110d]/92 px-3 py-2 text-sm font-medium text-white/72 shadow-2xl shadow-black/35 backdrop-blur-xl transition-colors hover:text-white lg:hidden"
        >
          <MessageSquare className="h-4 w-4 text-vea-neon" />
          {t("My Computation", "我的计算")}
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
          className="absolute bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-md border border-white/[0.12] bg-[#06110d]/92 px-3 py-2 text-sm font-medium text-white/72 shadow-2xl shadow-black/35 backdrop-blur-xl transition-colors hover:text-white"
        >
          <MessageSquare className="h-4 w-4 text-vea-neon" />
          {t("Open My Computation", "打开我的计算")}
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
