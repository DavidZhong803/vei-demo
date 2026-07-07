"use client";

import { useState } from "react";
import {
  ChevronDown,
  CircuitBoard,
  Cloud,
  Cpu,
  Layers,
  MemoryStick,
  Network,
  Radio,
} from "lucide-react";
import { useLang, useT, type Lang } from "./lang";

type Category = {
  id: string;
  label: Record<Lang, string>;
  detail: Record<Lang, string>;
  icon: React.ComponentType<{ className?: string }>;
};

const CATEGORIES: Category[] = [
  {
    id: "logic",
    icon: Cpu,
    label: { en: "Compute chips", zh: "算力芯片" },
    detail: {
      en: "NVIDIA, ASICs, inference systems",
      zh: "英伟达、自研芯片、推理端系统",
    },
  },
  {
    id: "memory",
    icon: MemoryStick,
    label: { en: "HBM memory", zh: "高带宽内存" },
    detail: {
      en: "SK Hynix, Samsung, Micron",
      zh: "海力士、三星、美光",
    },
  },
  {
    id: "cloud",
    icon: Cloud,
    label: { en: "Cloud platforms", zh: "云厂商" },
    detail: {
      en: "Google, Amazon, Microsoft",
      zh: "谷歌、亚马逊、微软",
    },
  },
  {
    id: "fabric",
    icon: Network,
    label: { en: "Data-center fabric", zh: "数据中心互连" },
    detail: {
      en: "Networking, optical, packaging",
      zh: "网络、光互连、先进封装",
    },
  },
  {
    id: "software",
    icon: Layers,
    label: { en: "Software layer", zh: "软件生态层" },
    detail: {
      en: "CUDA, services, inference stack",
      zh: "CUDA、服务化、推理栈",
    },
  },
];

const REPORT = {
  en: {
    eyebrow: "V-CORE dynamic inference",
    title: "Core Dynamics Projection",
    subtitle: "Power-flow analysis for AI infrastructure monetization.",
    sections: [
      {
        title: "1. Logic compute flow: NVIDIA",
        tag: "Rising marginal resistance",
        body: [
          "NVIDIA's partnership density is anchored in the architecture choices of cloud vendors. As leading clouds increase the share of self-developed AI chips, NVIDIA's physical interface inside the data center faces pressure.",
          "Engine projection: NVIDIA's technical assets are shifting from selling hardware toward selling foundry-like services. The goal is to extend commercial partnership density into inference markets and offset declining marginal hardware returns.",
          "Conclusion: the monetization vector is stable. The next acceleration point must come from inference-side partnership expansion.",
        ],
      },
      {
        title: "2. Data flow: SK Hynix",
        tag: "Physical bottleneck premium",
        body: [
          "SK Hynix has lifted partnership density into the physical layer through co-design with NVIDIA and cloud leaders. Its capacity is no longer only product supply; it has become physical infrastructure for compute systems.",
          "Engine projection: every HBM shipment is supported by long-term pre-sold demand. Partnership density converts directly into pricing power.",
          "Conclusion: the monetization vector points to nonlinear growth. Its asset monetization cycle is entering a compressed acceleration window.",
        ],
      },
      {
        title: "3. Optimal monetization path",
        tag: "Path correction",
        body: [
          "For NVIDIA, the best path is not simple price increases. It is softening the CUDA protocol enough to raise partnership density with downstream model builders and turn hardware value into long-term ecosystem participation.",
          "For SK Hynix, the best path is strategic allocation of capacity share. Part of core capacity can be tied to cloud customers with strong cash flow, upgrading device assets into service-linked assets.",
        ],
      },
      {
        title: "4. Evidence chain to monitor",
        tag: "Tonight's validation",
        body: [
          "Capex validation: track NVIDIA's next-quarter software-service investment ratio. If it rises, the path is confirmed.",
          "Commercial-density validation: monitor whether SK Hynix signs three-year-plus joint development agreements with top cloud vendors. This would validate monetization-cycle compression.",
          "The engine remains in 24-hour full-dimensional projection. A complete daily dynamics report can be generated when new capital expenditure or capacity-expansion signals appear.",
        ],
      },
    ],
  },
  zh: {
    eyebrow: "V-CORE 核心动力学推演",
    title: "核心动力学推演",
    subtitle: "人工智能基础设施资产货币化的动力流分析。",
    sections: [
      {
        title: "1. 逻辑计算流：英伟达",
        tag: "边际阻力增大",
        body: [
          "英伟达的合伙密度主要体现在云厂商的底层架构选择中。随着谷歌、亚马逊、微软等顶级云厂商自研人工智能芯片比例上升，其在数据中心的物理接口开始受到挑战。",
          "引擎推演：英伟达的技术资产正在从卖硬件向卖代工式服务转化，目标是通过商业合伙密度的延伸进入推理端市场，对抗硬件边际收益递减。",
          "结论：货币化动力矢量偏向平稳，需要寻找推理端的新合伙爆发点。",
        ],
      },
      {
        title: "2. 数据流：海力士",
        tag: "物理瓶颈溢价",
        body: [
          "海力士通过与英伟达及云巨头的协同研发，将合伙密度提升到物理底层。其产能不只是产品，而是算力系统的物理基础设施。",
          "引擎推演：每一片高带宽内存的出货，都是基于长协锁定的预售资产。合伙密度直接转化为定价主动权。",
          "结论：货币化动力矢量偏向非线性增长，资产货币化周期正处于极速压缩区间。",
        ],
      },
      {
        title: "3. 关键路径优化",
        tag: "最佳货币化对策",
        body: [
          "对于英伟达：最优路径不在于单纯提价，而在于通过 CUDA 开放协议的软化，提升与下游中小模型的合伙密度，将硬件价值转化为生态分成型长期资产。",
          "对于海力士：最优路径在于产能份额的战略性分配。将部分核心产能绑定给具备最强商业现金流的云厂商，获取其算力租金收益，将器件资产升级为服务资产。",
        ],
      },
      {
        title: "4. 验证与证据链条",
        tag: "今晚验证方向",
        body: [
          "资本开支验证：追踪英伟达下个季度资本开支中软件服务层投入比例。若比例上升，则路径验证成功。",
          "商务密度验证：监控海力士近期与顶级云厂商是否签署三年期及以上联合开发协议，这是资产货币化周期压缩的实证依据。",
          "引擎保持全天候全维度推演状态。如捕捉到产能扩充公告或协议签署，系统会立即进行向量迭代并修正货币化路径。",
        ],
      },
    ],
  },
};

export default function MarketWorkbenchPanel() {
  const { lang } = useLang();
  const t = useT();
  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState("logic");
  const report = REPORT[lang];

  return (
    <section className="grid min-h-0 overflow-hidden rounded-xl border border-white/[0.09] bg-[#07140f]/78 shadow-2xl shadow-black/25 backdrop-blur-xl lg:grid-cols-[250px_minmax(0,1fr)]">
      <aside className="min-h-0 border-b border-white/[0.08] lg:border-b-0 lg:border-r">
        <div className="border-b border-white/[0.08] p-4">
          <div className="inline-flex items-center gap-2 rounded-md border border-vea-amber/20 bg-vea-amber/[0.08] px-2.5 py-1 text-[11px] font-medium text-vea-amber-soft">
            <Radio className="h-3.5 w-3.5" />
            {t("Market Computation", "市场计算")}
          </div>
          <h2 className="mt-3 text-xl font-semibold text-white">
            {t("AI Infrastructure", "人工智能基础设施")}
          </h2>
          <p className="mt-1 text-xs leading-5 text-white/40">
            {t(
              "Expandable market map for compute, memory, cloud, and software layers.",
              "覆盖算力、内存、云厂商与软件层的可展开市场图谱。"
            )}
          </p>
        </div>

        <div className="p-2">
          <button
            onClick={() => setExpanded((value) => !value)}
            className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm font-medium text-white/76 transition-colors hover:bg-white/[0.06]"
          >
            <span className="inline-flex items-center gap-2">
              <CircuitBoard className="h-4 w-4 text-vea-neon" />
              {t("Categories", "分类")}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-white/38 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {expanded && (
            <div className="mt-1 space-y-1">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                const active = category.id === selected;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelected(category.id)}
                    className={`flex w-full items-start gap-2 rounded-md px-2 py-2 text-left transition-colors ${
                      active
                        ? "bg-vea-neon/12 text-vea-neon ring-1 ring-vea-neon/20"
                        : "text-white/54 hover:bg-white/[0.05] hover:text-white/82"
                    }`}
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">
                        {category.label[lang]}
                      </span>
                      <span className="block truncate text-[11px] text-white/34">
                        {category.detail[lang]}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </aside>

      <article className="min-h-0 overflow-y-auto p-4 sm:p-5">
        <div className="mb-5 flex flex-col gap-3 border-b border-white/[0.08] pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-vea-amber-soft/80">
              {report.eyebrow}
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {report.title}
            </h1>
            <p className="mt-1 text-sm text-white/48">{report.subtitle}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              [t("Stable", "平稳"), t("NVDA", "英伟达")],
              [t("Nonlinear", "非线性"), t("HBM", "高带宽内存")],
              [t("48h", "48 小时"), t("Window", "窗口")],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-md border border-white/[0.08] bg-white/[0.035] px-3 py-2"
              >
                <p className="text-sm font-semibold text-vea-neon">{value}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/32">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {report.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-lg border border-white/[0.07] bg-black/18 p-4"
            >
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-base font-semibold text-white/90">
                  {section.title}
                </h2>
                <span className="w-fit rounded-md border border-vea-amber/20 bg-vea-amber/[0.08] px-2 py-1 text-[11px] font-medium text-vea-amber-soft">
                  {section.tag}
                </span>
              </div>
              <div className="space-y-2">
                {section.body.map((line) => (
                  <p key={line} className="text-sm leading-7 text-white/58">
                    {line}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </section>
  );
}
