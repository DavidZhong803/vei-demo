"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  Braces,
  ChevronDown,
  FileText,
  Maximize2,
  Minimize2,
  PanelRightClose,
  PanelRightOpen,
  Plus,
  SendHorizontal,
  Sparkles,
  Target,
} from "lucide-react";
import { useLang, useT, type Lang } from "./lang";

export type ChatMode = "dock" | "float" | "minimized";

type ToolItem = {
  id: string;
  label: string;
  prompt: string;
  icon: React.ComponentType<{ className?: string }>;
};

const TOOL_COPY: Record<Lang, ToolItem[]> = {
  en: [
    {
      id: "market",
      label: "Computation market",
      icon: BarChart3,
      prompt: "Read market events, node shifts, and monetization windows.",
    },
    {
      id: "structure",
      label: "Structure parsing",
      icon: Braces,
      prompt: "Parse technical assets, business structure, and ecosystem position.",
    },
    {
      id: "path",
      label: "Value path",
      icon: Target,
      prompt: "Compute the route from technical capability to monetizable outcomes.",
    },
    {
      id: "report",
      label: "Report",
      icon: FileText,
      prompt: "Package the analysis into an executive result brief.",
    },
  ],
  zh: [
    {
      id: "market",
      label: "计算市场",
      icon: BarChart3,
      prompt: "读取市场事件、节点变化与货币化窗口。",
    },
    {
      id: "structure",
      label: "结构解析",
      icon: Braces,
      prompt: "解析技术资产、商业结构与生态位置。",
    },
    {
      id: "path",
      label: "价值路径",
      icon: Target,
      prompt: "计算从技术能力到可货币化结果的路径。",
    },
    {
      id: "report",
      label: "报告生成",
      icon: FileText,
      prompt: "整理为面向决策的结果简报。",
    },
  ],
};

export default function CodexDockPanel({
  mode,
  onMinimize,
  onPopOut,
  onDock,
}: {
  mode: ChatMode;
  onMinimize: () => void;
  onPopOut: () => void;
  onDock: () => void;
}) {
  const { lang } = useLang();
  const t = useT();
  const tools = useMemo(() => TOOL_COPY[lang], [lang]);
  const [selectedToolId, setSelectedToolId] = useState("market");
  const [open, setOpen] = useState(false);
  const selectedTool =
    tools.find((tool) => tool.id === selectedToolId) ?? tools[0];
  const SelectedIcon = selectedTool.icon;

  return (
    <aside className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-white/[0.09] bg-[#06110d]/88 shadow-2xl shadow-black/35 backdrop-blur-xl">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.08] px-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-vea-amber/25 bg-vea-amber/[0.10] text-vea-amber-soft">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">VEA</p>
            <p className="truncate text-[10px] text-white/38">
              {t("My Computation", "我的计算")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {mode === "float" ? (
            <button
              onClick={onDock}
              className="flex h-7 w-7 items-center justify-center rounded-md text-white/42 transition-colors hover:bg-white/[0.07] hover:text-white"
              aria-label={t("Dock chat", "停靠对话")}
            >
              <PanelRightOpen className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={onPopOut}
              className="flex h-7 w-7 items-center justify-center rounded-md text-white/42 transition-colors hover:bg-white/[0.07] hover:text-white"
              aria-label={t("Pop out chat", "弹出对话")}
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            onClick={onMinimize}
            className="flex h-7 w-7 items-center justify-center rounded-md text-white/42 transition-colors hover:bg-white/[0.07] hover:text-white"
            aria-label={t("Minimize chat", "最小化对话")}
          >
            {mode === "float" ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <PanelRightClose className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        <div className="flex w-full items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
          <span className="flex min-w-0 items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-vea-neon/[0.12] text-vea-neon">
              <SelectedIcon className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-white/82">
                {selectedTool.label}
              </span>
              <span className="block truncate text-xs text-white/38">
                {selectedTool.prompt}
              </span>
            </span>
          </span>
        </div>

        <div className="space-y-2">
          {[
            t(
              "Ready. Choose a tool or send a signal to begin.",
              "已就绪。选择功能或输入信号开始计算。"
            ),
            t(
              "I can turn market events into structure, path, and evidence briefs.",
              "我可以把市场事件转化为结构、路径与证据简报。"
            ),
          ].map((line) => (
            <div
              key={line}
              className="max-w-[92%] rounded-lg border border-white/[0.06] bg-black/22 px-3 py-2 text-sm leading-6 text-white/58"
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      <footer className="shrink-0 border-t border-white/[0.08] p-3">
        {open && (
          <div className="mb-2 grid grid-cols-2 gap-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const active = tool.id === selectedTool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    setSelectedToolId(tool.id);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                    active
                      ? "bg-vea-neon/15 text-vea-neon ring-1 ring-vea-neon/25"
                      : "bg-white/[0.045] text-white/58 hover:bg-white/[0.075] hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tool.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="rounded-xl border border-white/[0.10] bg-black/28 p-2">
          <textarea
            rows={3}
            placeholder={t(
              "Enter a company, patent, project, or signal...",
              "输入公司、专利、项目或信号..."
            )}
            className="min-h-20 w-full resize-none bg-transparent px-2 py-1 text-sm leading-6 text-white outline-none placeholder:text-white/28"
          />
          <div className="flex items-center justify-between">
            <button
              onClick={() => setOpen((value) => !value)}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-white/52 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" />
              {t("Tools", "功能")}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-vea-neon text-[#06110d] transition-transform hover:scale-[1.03]">
              <SendHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </footer>
    </aside>
  );
}
