"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  TrendingUp,
  Target,
  Zap,
  CalendarClock,
  ShieldCheck,
  Plus,
} from "lucide-react";
import { CASES, JOURNEY, type VEAResultPackage } from "@/lib/vea";
import { useLang, useT } from "./lang";

function Stepper({ current }: { current: number }) {
  const { lang } = useLang();
  return (
    <div className="flex items-center">
      {JOURNEY.map((stage, i) => {
        const state = i < current ? "past" : i === current ? "current" : "future";
        return (
          <div key={stage.labelEn} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                  state === "current"
                    ? "bg-vea-emerald text-white ring-4 ring-vea-emerald/15"
                    : state === "past"
                      ? "bg-vea-emerald/15 text-vea-emerald"
                      : "bg-black/[0.05] text-slate-400"
                }`}
              >
                {state === "past" ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={`whitespace-nowrap text-[10px] font-medium ${
                  state === "current" ? "text-slate-800" : "text-slate-400"
                }`}
              >
                {lang === "zh" ? stage.labelZh : stage.labelEn}
              </span>
            </div>
            {i < JOURNEY.length - 1 && (
              <span
                className={`mx-1 -mt-4 h-px flex-1 ${
                  i < current ? "bg-vea-emerald/40" : "bg-black/[0.08]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StatTile({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-black/[0.06] bg-black/[0.015] p-3.5">
      <div className="mb-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
        <span className="text-vea-emerald">{icon}</span>
        {label}
      </div>
      {children}
    </div>
  );
}

export default function MyComputation({
  pkg,
  onSelectCase,
  onOpenFull,
  onNew,
}: {
  pkg: VEAResultPackage;
  onSelectCase: (id: string) => void;
  onOpenFull: () => void;
  onNew: () => void;
}) {
  const { lang } = useLang();
  const t = useT();
  const d = pkg.dashboard;
  const nextEvent = pkg.keyEvents.find((e) => e.status !== "Done") ?? pkg.keyEvents[0];

  return (
    <section className="paper-card flex h-full flex-col rounded-2xl">
      {/* header */}
      <div className="flex items-start justify-between gap-3 border-b border-black/[0.06] p-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            {t("My Computation", "我的计算")}
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            {t(
              "Your dedicated technical-asset result",
              "您的专属技术资产计算结果"
            )}
          </p>
        </div>
        <div className="relative shrink-0">
          <select
            value={CASES.some((c) => c.id === pkg.id) ? pkg.id : ""}
            onChange={(e) => onSelectCase(e.target.value)}
            className="appearance-none rounded-lg border border-black/10 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-vea-emerald/30"
          >
            {!CASES.some((c) => c.id === pkg.id) && (
              <option value="">{pkg.subject}</option>
            )}
            {CASES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.subject}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        {/* position + status */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
              <Target className="h-3 w-3 text-vea-emerald" />
              {t("Current Position", "当前位置")}
            </p>
            <div className="flex items-baseline gap-1.5">
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-semibold tracking-tight text-slate-900"
              >
                {d.positionScore}
              </motion.span>
              <span className="text-lg text-slate-400">/100</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {t("Industry rank", "行业位置")}{" "}
              <span className="font-medium text-slate-700">
                {lang === "zh" ? d.industryStandingZh : d.industryStandingEn}
              </span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-vea-emerald/10 px-3 py-1.5 text-sm font-semibold text-vea-emerald">
            <TrendingUp className="h-4 w-4" />
            {lang === "zh" ? d.statusZh : d.statusEn}
          </span>
        </div>

        {/* best path stepper */}
        <div className="rounded-xl border border-black/[0.06] bg-black/[0.015] p-4">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-wider text-slate-400">
            {t("Best Path", "最优路径")}
          </p>
          <Stepper current={d.journeyCurrent} />
        </div>

        {/* stat tiles */}
        <div className="grid grid-cols-2 gap-3">
          <StatTile
            icon={<Zap className="h-3 w-3" />}
            label={t("Probability", "实现概率")}
          >
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-slate-900">
                {d.realizationProbability}
              </span>
              <span className="text-sm text-slate-400">%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
              <motion.div
                className="h-full rounded-full bg-vea-emerald"
                initial={{ width: 0 }}
                animate={{ width: `${d.realizationProbability}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500">
              {lang === "zh" ? d.probabilityZh : d.probabilityEn}
            </p>
          </StatTile>

          <StatTile
            icon={<Target className="h-3 w-3" />}
            label={t("Next Action", "下一步动作")}
          >
            <p className="text-sm font-medium leading-snug text-slate-800">
              {lang === "zh" ? d.nextActionZh : d.nextActionEn}
            </p>
            <p className="mt-1.5 text-[11px] font-medium text-vea-emerald">
              {t("ETA", "预计")} {lang === "zh" ? d.etaZh : d.etaEn}
            </p>
          </StatTile>

          <StatTile
            icon={<CalendarClock className="h-3 w-3" />}
            label={t("Key Event", "关键事件")}
          >
            <p className="text-sm font-medium leading-snug text-slate-800">
              {nextEvent.title}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="font-mono text-[11px] text-slate-400">
                {nextEvent.date}
              </span>
              <span className="text-[11px] text-slate-400">
                {nextEvent.probability}% {t("prob.", "概率")}
              </span>
            </div>
          </StatTile>

          <StatTile
            icon={<ShieldCheck className="h-3 w-3" />}
            label={t("Validation", "验证状态")}
          >
            <div className="space-y-1.5">
              {pkg.validation.map((v) => (
                <div key={v.channel} className="flex items-center gap-1.5">
                  <CheckCircle2
                    className={`h-3.5 w-3.5 ${
                      v.strength === "Strong"
                        ? "text-vea-emerald"
                        : v.strength === "Moderate"
                          ? "text-amber-500"
                          : "text-slate-300"
                    }`}
                  />
                  <span className="text-xs text-slate-600">
                    {v.channel === "Commercial"
                      ? t("Commercial", "商业")
                      : v.channel === "Monetization"
                        ? t("Monetization", "货币化")
                        : t("Capital Market", "资本市场")}
                  </span>
                </div>
              ))}
            </div>
          </StatTile>
        </div>

        {/* key event timeline */}
        <div>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-slate-400">
            {t("Event Timeline", "关键事件时间链")}
          </p>
          <div className="flex items-center gap-1">
            {pkg.keyEvents.map((e, i) => (
              <div key={e.title} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      e.status === "Done"
                        ? "bg-vea-emerald"
                        : e.status === "In Progress"
                          ? "bg-amber-500 ring-4 ring-amber-500/15"
                          : "bg-slate-300"
                    }`}
                  />
                  <span className="font-mono text-[9px] text-slate-400">{e.date}</span>
                </div>
                {i < pkg.keyEvents.length - 1 && (
                  <span className="mx-1 -mt-3 h-px flex-1 bg-black/[0.08]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* footer actions */}
      <div className="flex items-center gap-2 border-t border-black/[0.06] p-4">
        <button
          onClick={onOpenFull}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-vea-emerald py-2.5 text-sm font-semibold text-white transition-colors hover:bg-vea-emerald-soft"
        >
          {t("View Full Report", "查看完整报告")}
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={onNew}
          className="flex items-center justify-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-vea-emerald/40 hover:text-vea-emerald"
        >
          <Plus className="h-4 w-4" />
          {t("New", "新建")}
        </button>
      </div>
    </section>
  );
}
