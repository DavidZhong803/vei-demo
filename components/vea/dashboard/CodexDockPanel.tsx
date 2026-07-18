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

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
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
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const selectedTool =
    tools.find((tool) => tool.id === selectedToolId) ?? tools[0];

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/compute-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: lang,
          tool: selectedTool.label,
          messages: nextMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Request failed");
      }

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: String(data.reply ?? ""),
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : t("The computation assistant is unavailable.", "计算助手暂时不可用。"),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <aside className="metal-panel flex h-full min-h-0 flex-col overflow-hidden rounded-lg backdrop-blur-xl">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-vea-steel/14 bg-vea-steel/[0.035] px-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-vea-steel/25 bg-vea-steel/[0.09] text-[#bfd2f2]">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">VEA</p>
            <p className="truncate text-[10px] font-medium uppercase tracking-[0.12em] text-[#9fb7dc]">
              {t("My Computation", "我的计算")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {mode === "float" ? (
            <button
              onClick={onDock}
              className="flex h-7 w-7 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-vea-steel/[0.09] hover:text-white"
              aria-label={t("Dock chat", "停靠对话")}
            >
              <PanelRightOpen className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={onPopOut}
              className="flex h-7 w-7 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-vea-steel/[0.09] hover:text-white"
              aria-label={t("Pop out chat", "弹出对话")}
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            onClick={onMinimize}
            className="flex h-7 w-7 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-vea-steel/[0.09] hover:text-white"
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

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4">
        {messages.length === 0 ? (
          <div className="metal-card rounded-lg p-3">
            <p className="text-sm font-medium text-white/88">
              {t("Computation assistant", "计算助手")}
            </p>
            <p className="mt-2 text-xs leading-5 text-white/62">
              {selectedTool.prompt}
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-lg border px-3 py-2.5 text-sm leading-6 ${
                message.role === "user"
                  ? "ml-6 border-vea-steel/32 bg-vea-steel/[0.11] text-white/92"
                  : "metal-card mr-6 text-white/82"
              }`}
            >
              {message.content}
            </div>
          ))
        )}
        {sending && (
          <div className="metal-card mr-6 rounded-lg px-3 py-2.5 text-sm text-white/62">
            {t("Computing...", "计算中...")}
          </div>
        )}
      </div>

      <footer className="shrink-0 border-t border-vea-steel/14 bg-[#08131c]/55 p-3">
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
                      ? "bg-vea-steel/14 text-[#c6d6ff] ring-1 ring-vea-steel/28"
                      : "bg-vea-steel/[0.055] text-white/68 hover:bg-vea-steel/[0.10] hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tool.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="rounded-lg border border-vea-steel/20 bg-[#050c12]/72 p-2 shadow-[inset_0_1px_rgba(217,230,250,0.045)]">
          <textarea
            rows={3}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
              }
            }}
            placeholder={t(
              "Enter a company, patent, project, or signal...",
              "输入公司、专利、项目或信号..."
            )}
            className="min-h-20 w-full resize-none bg-transparent px-2 py-1 text-sm leading-6 text-white outline-none placeholder:text-white/46"
          />
          <div className="flex items-center justify-between">
            <button
              onClick={() => setOpen((value) => !value)}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-white/68 transition-colors hover:bg-vea-steel/[0.09] hover:text-white"
            >
              <Plus className="h-3.5 w-3.5" />
              {t("Tools", "功能")}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || sending}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-vea-steel text-[#071019] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <SendHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </footer>
    </aside>
  );
}
