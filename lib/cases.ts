/**
 * VEI Demo — Mock Data
 *
 * All data here is illustrative mock data used to demonstrate the VEI product
 * flow. It does NOT reflect real analysis, real financials, or investment advice.
 *
 * Each case drives the three-stage experience:
 *   1. Upload      — the value subject and the materials "uploaded"
 *   2. AI Working  — streaming understanding + the VEI reasoning chain
 *   3. Execution   — the recommended best value path + continuous optimization
 */

export type UploadedDoc = {
  name: string;
  kind: "deck" | "web" | "code" | "doc" | "patent" | "finance" | "team";
};

/** A node in the VEI backend reasoning framework. */
export type ReasoningNode = {
  key: string;
  label: string; // e.g. "Time"
  insight: string; // one-line mock inference for this node
};

export type WorkingStep = {
  label: string; // status line shown while "thinking"
  detail: string; // short conclusion revealed once done
};

export type ExecutionAction = {
  title: string;
  detail: string;
};

export type ContinuousSignal = {
  channel: "Market" | "Technology" | "Business Model" | "Competition" | "Capital";
  message: string;
};

export type VEICase = {
  id: string;
  name: string;
  kind: string; // short descriptor, e.g. "Public Company · Social + AI"
  tagline: string;
  accent: string; // hex used for per-case accent
  docs: UploadedDoc[];
  working: WorkingStep[];
  reasoning: ReasoningNode[];
  execution: {
    valueSubject: string;
    bestPath: string;
    timeWindow: string;
    businessModel: string;
    confidence: number; // 0-100
    actions: ExecutionAction[];
    metrics: { label: string; value: string; sub: string }[];
  };
  continuous: ContinuousSignal[];
};

/** The 7-stage VEI reasoning framework, shared labels. */
export const VEI_CHAIN = [
  "Time",
  "Event",
  "State",
  "Position",
  "Value",
  "Evolution",
  "Advantage",
] as const;

export const CASES: VEICase[] = [
  // ─────────────────────────────────────────────────────────── META
  {
    id: "meta",
    name: "Meta",
    kind: "Public Company · Social + AI Infrastructure",
    tagline: "Global social graph evolving into an AI-native platform.",
    accent: "#4b8bff",
    docs: [
      { name: "Meta_10K_Annual_Report.pdf", kind: "finance" },
      { name: "Llama_Model_Card.md", kind: "doc" },
      { name: "Family_of_Apps_Overview.pdf", kind: "deck" },
      { name: "reality-labs.meta.com", kind: "web" },
      { name: "AI_Infra_Capex_Plan.xlsx", kind: "finance" },
    ],
    working: [
      {
        label: "Understanding the value subject",
        detail:
          "3.98B daily actives across a Family of Apps — the largest human attention network on earth.",
      },
      {
        label: "Understanding team & capability",
        detail:
          "World-class AI research (FAIR), full-stack infra, and one of the deepest ad-ML org charts in the world.",
      },
      {
        label: "Understanding technology assets",
        detail:
          "Llama open-weight models + custom MTIA silicon + a global inference footprint.",
      },
      {
        label: "Understanding the business model",
        detail:
          "≈98% of revenue is advertising — a cash engine that can fund an AI platform shift.",
      },
      {
        label: "Understanding the industry environment",
        detail:
          "Attention is saturating; the next margin unlock is AI-native monetization, not more feed.",
      },
      {
        label: "Understanding the competitive environment",
        detail:
          "Closed frontier labs are pulling ahead on models; Meta's edge is distribution + open ecosystem.",
      },
      {
        label: "Reading the current time window",
        detail:
          "12–18 month window to make Llama the default open standard before the ecosystem consolidates.",
      },
      {
        label: "Searching for the best value path",
        detail:
          "Converging on: AI-native advertising + agents distributed across the Family of Apps.",
      },
    ],
    reasoning: [
      {
        key: "time",
        label: "Time",
        insight:
          "Enterprise + consumer AI adoption is at the steep part of the S-curve.",
      },
      {
        key: "event",
        label: "Event",
        insight:
          "Open-weight models are becoming good enough to commoditize closed APIs.",
      },
      {
        key: "state",
        label: "State",
        insight:
          "Meta holds distribution + capital + research, but not the perceived model lead.",
      },
      {
        key: "position",
        label: "Position",
        insight:
          "Uniquely positioned to bundle AI into 3.9B daily attention slots.",
      },
      {
        key: "value",
        label: "Value",
        insight:
          "Highest value = AI agents that increase ad relevance and creator output.",
      },
      {
        key: "evolution",
        label: "Evolution",
        insight:
          "Evolve from feed-ranking to agent-mediated commerce & messaging.",
      },
      {
        key: "advantage",
        label: "Advantage",
        insight:
          "Open ecosystem + distribution creates a moat closed labs cannot copy.",
      },
    ],
    execution: {
      valueSubject: "Global Social + AI Infrastructure Platform",
      bestPath: "AI-Native Advertising + Open Llama Ecosystem",
      timeWindow: "12–18 Months",
      businessModel: "AI-Enhanced Advertising & Agent Platform",
      confidence: 87,
      actions: [
        {
          title: "Make Llama the default open standard",
          detail:
            "Ship reference agents & tooling so builders default to Llama, capturing the developer surface.",
        },
        {
          title: "Monetize AI agents across the Family of Apps",
          detail:
            "Insert transactional agents into WhatsApp & Instagram DMs — messaging becomes commerce.",
        },
        {
          title: "Re-price advertising around AI outcomes",
          detail:
            "Move from impressions toward AI-optimized outcome-based ad pricing.",
        },
        {
          title: "Convert capex into a moat, not a cost",
          detail:
            "Frame infra spend as an AI-inference utility that competitors must rent from you.",
        },
      ],
      metrics: [
        { label: "Value Path Fit", value: "87%", sub: "vs. current strategy" },
        { label: "Time-to-Advantage", value: "~14 mo", sub: "estimated" },
        { label: "Revenue Leverage", value: "High", sub: "ad engine reuse" },
      ],
    },
    continuous: [
      {
        channel: "Technology",
        message:
          "New open-weight competitor released — Llama differentiation window tightening.",
      },
      {
        channel: "Market",
        message:
          "Enterprise agent spend forecast revised upward — accelerate agent monetization.",
      },
      {
        channel: "Capital",
        message:
          "Infra capex sentiment softening among investors — reframe as inference utility.",
      },
      {
        channel: "Competition",
        message:
          "Closed lab launched consumer app — defend distribution advantage in messaging.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── MARVELL
  {
    id: "marvell",
    name: "Marvell",
    kind: "Public Company · Data-Center Custom Silicon",
    tagline: "The custom silicon & interconnect layer beneath the AI buildout.",
    accent: "#5eead4",
    docs: [
      { name: "Marvell_Investor_Deck.pdf", kind: "deck" },
      { name: "Custom_XPU_Architecture.pdf", kind: "doc" },
      { name: "Optical_DSP_Patents.zip", kind: "patent" },
      { name: "Hyperscaler_Design_Wins.xlsx", kind: "finance" },
      { name: "marvell.com/ai", kind: "web" },
    ],
    working: [
      {
        label: "Understanding the value subject",
        detail:
          "A custom-silicon + interconnect company sitting directly under every AI data center.",
      },
      {
        label: "Understanding team & capability",
        detail:
          "Deep custom-ASIC design teams and one of the strongest optical DSP IP portfolios.",
      },
      {
        label: "Understanding technology assets",
        detail:
          "Custom XPU accelerators, 800G/1.6T optical DSPs, and electro-optics for scale-out fabrics.",
      },
      {
        label: "Understanding the business model",
        detail:
          "Design-win driven silicon + IP — revenue compounds as hyperscalers standardize on you.",
      },
      {
        label: "Understanding the industry environment",
        detail:
          "AI training clusters are bottlenecked on interconnect bandwidth, not just compute.",
      },
      {
        label: "Understanding the competitive environment",
        detail:
          "Merchant GPUs dominate compute; the open lane is custom accelerators + the optical fabric.",
      },
      {
        label: "Reading the current time window",
        detail:
          "~24 month window while hyperscalers commit to multi-year custom silicon roadmaps.",
      },
      {
        label: "Searching for the best value path",
        detail:
          "Converging on: custom XPUs + optical interconnect as the hyperscaler default.",
      },
    ],
    reasoning: [
      {
        key: "time",
        label: "Time",
        insight: "AI capex supercycle is early; interconnect demand lags compute demand.",
      },
      {
        key: "event",
        label: "Event",
        insight: "Hyperscalers want to reduce dependence on a single GPU vendor.",
      },
      {
        key: "state",
        label: "State",
        insight: "Marvell owns critical optical IP but is under-credited vs. GPU makers.",
      },
      {
        key: "position",
        label: "Position",
        insight: "Positioned at the interconnect chokepoint of every large cluster.",
      },
      {
        key: "value",
        label: "Value",
        insight: "Highest value = custom XPU design wins locked to optical fabric.",
      },
      {
        key: "evolution",
        label: "Evolution",
        insight: "Evolve from component vendor to the hyperscalers' silicon co-designer.",
      },
      {
        key: "advantage",
        label: "Advantage",
        insight: "Optical IP + custom-ASIC trust create multi-year switching costs.",
      },
    ],
    execution: {
      valueSubject: "Data-Center Custom Silicon & Interconnect",
      bestPath: "Custom AI Accelerators (XPU) + Optical Interconnect",
      timeWindow: "24 Months",
      businessModel: "Custom Silicon + IP Licensing to Hyperscalers",
      confidence: 82,
      actions: [
        {
          title: "Lock multi-year XPU design wins",
          detail:
            "Convert current design wins into multi-generation roadmaps to raise switching costs.",
        },
        {
          title: "Bundle compute silicon with optical fabric",
          detail:
            "Sell the accelerator and the interconnect together — own the whole scale-out lane.",
        },
        {
          title: "Position as the anti-single-vendor hedge",
          detail:
            "Message directly to hyperscalers seeking to diversify away from merchant GPUs.",
        },
        {
          title: "Monetize optical DSP IP broadly",
          detail:
            "License the optical DSP portfolio to expand beyond your own silicon shipments.",
        },
      ],
      metrics: [
        { label: "Value Path Fit", value: "82%", sub: "vs. current strategy" },
        { label: "Time-to-Advantage", value: "~24 mo", sub: "estimated" },
        { label: "Moat Durability", value: "High", sub: "optical IP + design-in" },
      ],
    },
    continuous: [
      {
        channel: "Market",
        message:
          "Hyperscaler capex guidance raised — pull forward XPU capacity commitments.",
      },
      {
        channel: "Technology",
        message:
          "1.6T optical ramp accelerating — prioritize next-gen DSP tape-out.",
      },
      {
        channel: "Competition",
        message:
          "Rival announced custom accelerator — reinforce optical-fabric bundling advantage.",
      },
      {
        channel: "Capital",
        message:
          "AI infra multiples expanding — optimal window to communicate design-win backlog.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── AI STARTUP
  {
    id: "ai-startup",
    name: "AI Startup",
    kind: "模拟案例 · Early-Stage AI Company",
    tagline: "一家早期 AI 创业公司，寻找最佳价值实现路径。",
    accent: "#a78bfa",
    docs: [
      { name: "创始团队介绍.pdf", kind: "team" },
      { name: "商业计划书_v3.pptx", kind: "deck" },
      { name: "product-demo.ourstartup.ai", kind: "web" },
      { name: "github.com/ourstartup/agent-core", kind: "code" },
      { name: "技术白皮书.pdf", kind: "doc" },
    ],
    working: [
      {
        label: "正在理解价值主体",
        detail:
          "一支具备 Agent 编排能力的早期团队，产品尚未锁定单一高价值场景。",
      },
      {
        label: "正在理解团队能力",
        detail: "3 位技术创始人 + 强工程执行力，缺少企业级销售与 GTM 经验。",
      },
      {
        label: "正在分析技术资产",
        detail: "自研 Agent 编排框架 + 工具调用可靠性优化，是可迁移的核心资产。",
      },
      {
        label: "正在分析商业模式",
        detail: "当前 PLG 免费工具变现弱；企业侧对可控 Agent 的付费意愿显著更高。",
      },
      {
        label: "正在分析市场",
        detail: "企业正从「试用 AI」转向「部署 Agent」，预算正在从 IT 创新金转正。",
      },
      {
        label: "正在分析竞争环境",
        detail: "通用 Agent 平台拥挤；垂直、可审计、能落地的企业 Agent 仍是空档。",
      },
      {
        label: "正在读取当前时间窗口",
        detail: "约 90 天窗口：在下一轮融资周期前用企业 PoC 建立可信收入信号。",
      },
      {
        label: "正在寻找最佳价值路径",
        detail: "收敛结论：聚焦 Enterprise AI Agent，以 SaaS 形态切入。",
      },
    ],
    reasoning: [
      {
        key: "time",
        label: "Time",
        insight: "企业 AI 预算正从实验转向部署，窗口正在打开。",
      },
      {
        key: "event",
        label: "Event",
        insight: "客户开始要求「可控、可审计」的 Agent，而非通用聊天。",
      },
      {
        key: "state",
        label: "State",
        insight: "团队工程强、GTM 弱，产品定位过宽。",
      },
      {
        key: "position",
        label: "Position",
        insight: "在「垂直可落地的企业 Agent」这一空档中有先发机会。",
      },
      {
        key: "value",
        label: "Value",
        insight: "最高价值 = 把自研编排框架封装为企业 SaaS。",
      },
      {
        key: "evolution",
        label: "Evolution",
        insight: "从通用工具演化为特定行业的企业 Agent 平台。",
      },
      {
        key: "advantage",
        label: "Advantage",
        insight: "工具调用可靠性 + 行业 know-how 形成早期壁垒。",
      },
    ],
    execution: {
      valueSubject: "AI 创业公司",
      bestPath: "Enterprise AI Agent",
      timeWindow: "90 Days",
      businessModel: "Enterprise AI SaaS",
      confidence: 76,
      actions: [
        {
          title: "优化商业计划书",
          detail: "把叙事从「通用 Agent 工具」改写为「某垂直行业的企业 Agent」。",
        },
        {
          title: "调整价值定位",
          detail: "主打「可控、可审计、可落地」，直击企业采购的核心顾虑。",
        },
        {
          title: "调整目标客户",
          detail: "从个人开发者转向有明确 ROI 的中大型企业部门负责人。",
        },
        {
          title: "准备融资材料",
          detail: "用 90 天内的企业 PoC 作为可信收入信号，支撑下一轮估值。",
        },
        {
          title: "推荐合作伙伴",
          detail: "对接行业系统集成商与云厂商，借其渠道快速触达企业客户。",
        },
        {
          title: "推荐下一阶段产品方向",
          detail: "沉淀行业模板 + 审计与权限层，构建难以复制的企业护城河。",
        },
      ],
      metrics: [
        { label: "价值路径契合度", value: "76%", sub: "对比当前策略" },
        { label: "到达优势时间", value: "~90 天", sub: "预估" },
        { label: "执行难度", value: "中", sub: "需补强 GTM" },
      ],
    },
    continuous: [
      {
        channel: "Market",
        message: "监测到目标行业出现新的合规要求 —— 可作为切入卖点。",
      },
      {
        channel: "Competition",
        message: "一个通用 Agent 平台开始下探企业市场 —— 建议加快垂直卡位。",
      },
      {
        channel: "Capital",
        message: "早期 AI 企业估值回暖 —— 建议在窗口内启动融资沟通。",
      },
      {
        channel: "Technology",
        message: "新一代模型降低推理成本 —— 可提升毛利并重定价 SaaS 套餐。",
      },
    ],
  },
];

export function getCase(id: string): VEICase | undefined {
  return CASES.find((c) => c.id === id);
}
