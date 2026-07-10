"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, CircuitBoard, Radio } from "lucide-react";
import { useLang, useT, type Lang } from "./lang";

type Copy = Record<Lang, string>;

type Company = {
  id: string;
  name: string;
  role: Copy;
  lines: Copy[];
};

type Category = {
  id: string;
  label: Copy;
  detail: Copy;
  companies: Company[];
};

const c = (en: string, zh: string): Copy => ({ en, zh });

const CATEGORIES: Category[] = [
  {
    id: "compute",
    label: c("Compute chips", "算力芯片"),
    detail: c(
      "GPU, ASIC, inference silicon, foundry capacity",
      "GPU、ASIC、推理芯片与先进制程产能"
    ),
    companies: [
      {
        id: "nvidia",
        name: "NVIDIA",
        role: c("GPU platform", "GPU 平台"),
        lines: [
          c(
            "Inference demand is shifting value from board shipment to platform control.",
            "推理需求正在把价值重心从板卡出货转向平台控制力。"
          ),
          c(
            "CUDA, networking, and model-serving services keep buyers inside NVIDIA economics.",
            "CUDA、网络与模型服务把客户持续留在 NVIDIA 的经济体系内。"
          ),
          c(
            "Best path: expand inference partnerships without weakening accelerator scarcity.",
            "最佳路径：扩大推理端合作，同时保持加速器稀缺性的定价能力。"
          ),
          c(
            "Watch: software attach rate, rack delivery cadence, and cloud self-chip pressure.",
            "观察点：软件绑定率、整柜交付节奏，以及云厂商自研芯片压力。"
          ),
        ],
      },
      {
        id: "amd",
        name: "AMD",
        role: c("Accelerators", "AI 加速器"),
        lines: [
          c(
            "Second-source demand is improving as clouds seek leverage and supply diversity.",
            "云厂商寻求议价权和供应多元化，第二供应源需求正在改善。"
          ),
          c(
            "The key is converting evaluation clusters into repeat inference workloads.",
            "关键在于把评估集群转化为可重复的推理工作负载。"
          ),
          c(
            "Best path: package hardware with migration support and stable software references.",
            "最佳路径：用迁移支持和稳定软件参考栈包装硬件能力。"
          ),
          c(
            "Watch: MI-series expansion from pilots into multi-quarter commitments.",
            "观察点：MI 系列能否从试点扩展为跨季度采购承诺。"
          ),
        ],
      },
      {
        id: "broadcom",
        name: "Broadcom",
        role: c("Custom ASIC", "定制 ASIC"),
        lines: [
          c(
            "Custom silicon rises where cloud buyers want workload-specific cost control.",
            "当云厂商追求特定工作负载成本控制时，定制芯片价值上升。"
          ),
          c(
            "Value compounds through long-cycle co-design rather than merchant GPU exposure.",
            "价值来自长期联合设计，而不是通用 GPU 市场敞口。"
          ),
          c(
            "Best path: pair ASIC programs with switch silicon and networking pull-through.",
            "最佳路径：把 ASIC 项目与交换芯片、网络需求联动。"
          ),
          c(
            "Watch: hyperscale ASIC wins and AI networking backlog.",
            "观察点：超大云客户 ASIC 项目中标与 AI 网络订单积压。"
          ),
        ],
      },
      {
        id: "marvell",
        name: "Marvell",
        role: c("Custom silicon", "定制芯片"),
        lines: [
          c(
            "AI infrastructure pulls compute, optical DSP, and connectivity into one cycle.",
            "AI 基础设施把计算、光 DSP 与连接芯片拉入同一采购周期。"
          ),
          c(
            "The strongest monetization route is recurring silicon revision with anchor customers.",
            "最强变现路径是与锚定客户形成持续迭代的芯片版本周期。"
          ),
          c(
            "Best path: lock custom designs across several data-center generations.",
            "最佳路径：让定制设计贯穿多个数据中心世代。"
          ),
          c(
            "Watch: custom AI revenue mix and optical attach signals.",
            "观察点：定制 AI 收入占比与光互连绑定信号。"
          ),
        ],
      },
      {
        id: "tsmc",
        name: "TSMC",
        role: c("Foundry path", "晶圆代工路径"),
        lines: [
          c(
            "Advanced-node and packaging scarcity anchors AI compute value in physical capacity.",
            "先进制程与先进封装稀缺性，把 AI 算力价值锚定在物理产能上。"
          ),
          c(
            "The bottleneck position converts technology leadership into pricing discipline.",
            "瓶颈位置把技术领先转化为更强的价格纪律。"
          ),
          c(
            "Best path: allocate scarce capacity toward durable AI demand and packaging intensity.",
            "最佳路径：把稀缺产能分配给持续性强、封装密度高的 AI 需求。"
          ),
          c(
            "Watch: CoWoS expansion, advanced-node utilization, and customer prepayments.",
            "观察点：CoWoS 扩产、先进制程利用率与客户预付款。"
          ),
        ],
      },
      {
        id: "arm",
        name: "Arm",
        role: c("IP layer", "IP 授权层"),
        lines: [
          c(
            "Power-efficient IP gains relevance as inference spreads from cloud to edge.",
            "推理从云端扩散到边缘后，低功耗 IP 的战略价值提升。"
          ),
          c(
            "Licensing value improves when server and edge designs reuse the architecture base.",
            "当服务器与边缘设计复用同一架构基础时，授权价值提升。"
          ),
          c(
            "Best path: convert design proliferation into richer royalty structures.",
            "最佳路径：把设计扩散转化为更高质量的授权与版税结构。"
          ),
          c(
            "Watch: AI edge design wins and Arm server CPU adoption.",
            "观察点：AI 边缘设计中标与 Arm 服务器 CPU 采用率。"
          ),
        ],
      },
    ],
  },
  {
    id: "memory",
    label: c("HBM memory", "高带宽内存"),
    detail: c(
      "Bandwidth, capacity, yield, and pre-sold demand",
      "带宽、产能、良率与预售需求"
    ),
    companies: [
      {
        id: "sk-hynix",
        name: "SK Hynix",
        role: c("HBM leader", "HBM 龙头"),
        lines: [
          c(
            "Pre-sold HBM demand turns memory capacity into strategic infrastructure.",
            "预售型 HBM 需求正在把内存产能变成战略基础设施。"
          ),
          c(
            "Partnership density with accelerator leaders converts directly into pricing power.",
            "与加速器龙头的合作密度会直接转化为定价能力。"
          ),
          c(
            "Best path: reserve scarce HBM for customers with durable AI cluster commitments.",
            "最佳路径：把稀缺 HBM 分配给具备长期 AI 集群承诺的客户。"
          ),
          c(
            "Watch: HBM4 qualification and multi-year supply agreements.",
            "观察点：HBM4 验证进度与多年期供货协议。"
          ),
        ],
      },
      {
        id: "samsung-memory",
        name: "Samsung Memory",
        role: c("Scale contender", "规模追赶者"),
        lines: [
          c(
            "Qualification progress can quickly reopen share capture in high-bandwidth memory.",
            "验证进度一旦改善，高带宽内存份额修复窗口会迅速打开。"
          ),
          c(
            "The monetization reset depends on matching performance stability with scale.",
            "变现重估取决于性能稳定性与制造规模能否同时兑现。"
          ),
          c(
            "Best path: close qualification gaps with top accelerator accounts.",
            "最佳路径：缩小与头部加速器客户之间的验证差距。"
          ),
          c(
            "Watch: HBM yield commentary and named customer approvals.",
            "观察点：HBM 良率表述与具名客户验证通过。"
          ),
        ],
      },
      {
        id: "micron",
        name: "Micron",
        role: c("US HBM supply", "美国 HBM 供给"),
        lines: [
          c(
            "Geographic supply diversity creates value beyond raw bit output.",
            "地缘供给多元化带来的价值已经超过单纯 bit 产出。"
          ),
          c(
            "AI customers pay for resilient supply when clusters become mission critical.",
            "当 AI 集群成为关键基础设施时，客户会为韧性供给付费。"
          ),
          c(
            "Best path: pair HBM ramp with buyers that need redundancy.",
            "最佳路径：把 HBM 爬坡绑定给需要供应冗余的大客户。"
          ),
          c(
            "Watch: HBM revenue ramp and customer concentration.",
            "观察点：HBM 收入爬坡与客户集中度。"
          ),
        ],
      },
      {
        id: "cxmt",
        name: "CXMT",
        role: c("Domestic memory", "国产内存"),
        lines: [
          c(
            "Local AI hardware demand lifts the strategic value of domestic memory capacity.",
            "本土 AI 硬件需求正在提升国产内存产能的战略价值。"
          ),
          c(
            "The vector is policy-supported but constrained by technology ramp speed.",
            "该方向有政策支撑，但受技术爬坡速度约束。"
          ),
          c(
            "Best path: move from commodity DRAM toward AI-adjacent memory modules.",
            "最佳路径：从通用 DRAM 向 AI 相关内存模组升级。"
          ),
          c(
            "Watch: advanced-node progress and local accelerator adoption.",
            "观察点：先进节点进展与本土加速器采用。"
          ),
        ],
      },
    ],
  },
  {
    id: "cloud",
    label: c("Cloud platforms", "云平台"),
    detail: c(
      "Hyperscale demand, rental economics, and AI workflow lock-in",
      "超大规模需求、算力租赁经济性与 AI 工作流锁定"
    ),
    companies: [
      {
        id: "azure",
        name: "Microsoft Azure",
        role: c("Enterprise AI cloud", "企业 AI 云"),
        lines: [
          c(
            "Enterprise distribution converts AI infrastructure into recurring workflow demand.",
            "企业分发能力把 AI 基础设施转化为持续性的工作流需求。"
          ),
          c(
            "Value capture strengthens when model access, data estate, and productivity tools bind.",
            "模型入口、数据资产与生产力工具绑定后，价值捕获能力增强。"
          ),
          c(
            "Best path: turn AI capex into software-channel consumption.",
            "最佳路径：把 AI 资本开支转化为软件渠道中的持续消耗。"
          ),
          c(
            "Watch: AI services growth and capacity-constrained backlog.",
            "观察点：AI 服务增长与受产能约束的订单积压。"
          ),
        ],
      },
      {
        id: "aws",
        name: "AWS",
        role: c("Cloud scale", "云规模"),
        lines: [
          c(
            "Broad demand lets AWS monetize both merchant GPUs and custom silicon.",
            "广泛需求让 AWS 可以同时变现通用 GPU 与自研芯片。"
          ),
          c(
            "Infrastructure choice lowers cost while keeping workloads inside AWS primitives.",
            "基础设施选择降低成本，同时把工作负载留在 AWS 原生组件内。"
          ),
          c(
            "Best path: blend Trainium, Inferentia, and GPU capacity by workload.",
            "最佳路径：按工作负载组合 Trainium、Inferentia 与 GPU 产能。"
          ),
          c(
            "Watch: custom silicon utilization and AI workload migration.",
            "观察点：自研芯片利用率与 AI 工作负载迁移。"
          ),
        ],
      },
      {
        id: "google-cloud",
        name: "Google Cloud",
        role: c("TPU ecosystem", "TPU 生态"),
        lines: [
          c(
            "Vertical integration across models, TPUs, and cloud compresses service costs.",
            "模型、TPU 与云的垂直整合可以压缩 AI 服务成本。"
          ),
          c(
            "The monetization test is external adoption, not internal efficiency alone.",
            "变现测试不只是内部效率，而是外部客户采用。"
          ),
          c(
            "Best path: use TPU economics and model access to win AI-native accounts.",
            "最佳路径：用 TPU 经济性和模型入口争取 AI 原生客户。"
          ),
          c(
            "Watch: TPU adoption and Gemini-linked cloud pull-through.",
            "观察点：TPU 外部采用与 Gemini 带来的云消费拉动。"
          ),
        ],
      },
      {
        id: "oracle",
        name: "Oracle Cloud",
        role: c("AI cluster provider", "AI 集群供应商"),
        lines: [
          c(
            "Focused AI cluster capacity improves relevance with model labs and data-heavy enterprises.",
            "聚焦 AI 集群产能提升了其在模型实验室和数据密集型企业中的相关性。"
          ),
          c(
            "GPU scarcity becomes more valuable when paired with database gravity.",
            "GPU 稀缺性与数据库数据引力结合后，价值更强。"
          ),
          c(
            "Best path: convert capacity wins into broader enterprise retention.",
            "最佳路径：把产能中标转化为更广泛的企业客户留存。"
          ),
          c(
            "Watch: AI infrastructure margin and remaining performance obligations.",
            "观察点：AI 基础设施利润率与剩余履约义务。"
          ),
        ],
      },
      {
        id: "coreweave",
        name: "CoreWeave",
        role: c("Specialized GPU cloud", "专业 GPU 云"),
        lines: [
          c(
            "Specialized capacity commands premium utilization when general clouds are constrained.",
            "当通用云受限时，专业 GPU 产能可以获得更高利用率溢价。"
          ),
          c(
            "The value path depends on becoming a platform, not only a capacity reseller.",
            "价值路径取决于能否成为平台，而不只是产能转售商。"
          ),
          c(
            "Best path: add managed inference, storage, and networking around GPU access.",
            "最佳路径：围绕 GPU 访问叠加托管推理、存储与网络服务。"
          ),
          c(
            "Watch: utilization, customer concentration, and financed capacity growth.",
            "观察点：利用率、客户集中度与融资驱动的产能扩张。"
          ),
        ],
      },
    ],
  },
  {
    id: "fabric",
    label: c("Data-center fabric", "数据中心互连"),
    detail: c(
      "Networking, optics, interconnect, and physical rack systems",
      "网络、光通信、连接器与机架物理系统"
    ),
    companies: [
      {
        id: "arista",
        name: "Arista",
        role: c("AI networking", "AI 网络"),
        lines: [
          c(
            "Cluster scale raises the value of low-latency switching and network software.",
            "集群规模扩大提升了低延迟交换与网络软件的价值。"
          ),
          c(
            "Fabric control monetizes as training and inference clusters become network-bound.",
            "训练与推理集群受网络约束时，互连控制力开始变现。"
          ),
          c(
            "Best path: attach operating software and support to dense switching deployments.",
            "最佳路径：在高密度交换部署中绑定操作系统与支持服务。"
          ),
          c(
            "Watch: AI Ethernet adoption and cloud customer concentration.",
            "观察点：AI Ethernet 采用率与云客户集中度。"
          ),
        ],
      },
      {
        id: "coherent",
        name: "Coherent",
        role: c("Optical links", "光互连"),
        lines: [
          c(
            "AI clusters increase optical intensity at rack and data-center boundaries.",
            "AI 集群提升了机架和数据中心边界的光互连密度。"
          ),
          c(
            "Optical assets monetize when bandwidth demand outpaces electrical efficiency.",
            "当带宽需求超过电互连效率时，光资产开始加速变现。"
          ),
          c(
            "Best path: secure module design wins with AI cluster builders.",
            "最佳路径：在 AI 集群建设者中拿下模块设计中标。"
          ),
          c("Watch: 800G and 1.6T adoption.", "观察点：800G 与 1.6T 采用节奏。"),
        ],
      },
      {
        id: "astera",
        name: "Astera Labs",
        role: c("Connectivity silicon", "连接芯片"),
        lines: [
          c(
            "Memory pooling and scale-up needs lift retimer and CXL relevance.",
            "内存池化与 scale-up 需求提升了 retimer 与 CXL 的相关性。"
          ),
          c(
            "Connectivity silicon becomes valuable when system stability depends on it.",
            "当系统稳定性依赖连接芯片时，其价值会被重新定价。"
          ),
          c(
            "Best path: attach to accelerator reference designs and server OEM platforms.",
            "最佳路径：绑定加速器参考设计与服务器 OEM 平台。"
          ),
          c(
            "Watch: CXL deployment timing and design-win breadth.",
            "观察点：CXL 部署时间点与设计中标广度。"
          ),
        ],
      },
      {
        id: "amphenol",
        name: "Amphenol",
        role: c("Interconnect hardware", "互连硬件"),
        lines: [
          c(
            "Dense AI racks pull value into cables, connectors, and thermal-aware links.",
            "高密度 AI 机架把价值拉向线缆、连接器与热管理相关连接。"
          ),
          c(
            "Physical interconnect monetizes through durable design-in positions.",
            "物理互连通过长期设计导入位置实现变现。"
          ),
          c(
            "Best path: lock high-speed connector platforms into accelerator rack architectures.",
            "最佳路径：把高速连接器平台锁定进加速器机架架构。"
          ),
          c(
            "Watch: AI rack exposure and high-speed order growth.",
            "观察点：AI 机架敞口与高速连接订单增长。"
          ),
        ],
      },
    ],
  },
  {
    id: "software",
    label: c("Software layer", "软件生态层"),
    detail: c(
      "Developer tooling, data cloud, governance, and inference workflows",
      "开发工具、数据云、治理与推理工作流"
    ),
    companies: [
      {
        id: "cuda",
        name: "NVIDIA CUDA",
        role: c("Developer lock-in", "开发者锁定"),
        lines: [
          c(
            "Developer gravity remains the hidden amplifier behind accelerator demand.",
            "开发者引力仍然是加速器需求背后的隐性放大器。"
          ),
          c(
            "Software turns hardware cycles into ecosystem participation and switching costs.",
            "软件把硬件周期转化为生态参与度与切换成本。"
          ),
          c(
            "Best path: extend CUDA economics into inference services and model deployment.",
            "最佳路径：把 CUDA 经济性延伸到推理服务与模型部署。"
          ),
          c(
            "Watch: enterprise AI software attach and model-serving adoption.",
            "观察点：企业 AI 软件绑定率与模型服务采用。"
          ),
        ],
      },
      {
        id: "databricks",
        name: "Databricks",
        role: c("Data intelligence", "数据智能"),
        lines: [
          c(
            "Enterprise AI needs governed data pipelines before model value compounds.",
            "企业 AI 在模型价值复利之前，需要可治理的数据管线。"
          ),
          c(
            "The asset monetizes by owning the operational data layer beneath AI applications.",
            "其资产通过掌握 AI 应用底层运营数据层来变现。"
          ),
          c(
            "Best path: bundle lakehouse, governance, and model tooling into AI workflows.",
            "最佳路径：把湖仓、治理与模型工具绑定进 AI 工作流。"
          ),
          c(
            "Watch: AI product attach rate and enterprise expansion.",
            "观察点：AI 产品绑定率与企业客户扩张。"
          ),
        ],
      },
      {
        id: "snowflake",
        name: "Snowflake",
        role: c("Data cloud", "数据云"),
        lines: [
          c(
            "Data sharing and governance become more valuable as enterprises operationalize AI.",
            "企业把 AI 投入运营后，数据共享与治理价值提升。"
          ),
          c(
            "AI features must increase consumption rather than sit as standalone tooling.",
            "AI 功能必须提升消费量，而不是停留为孤立工具。"
          ),
          c(
            "Best path: turn governed data estates into recurring AI workload consumption.",
            "最佳路径：把治理后的数据资产转化为持续 AI 工作负载消费。"
          ),
          c(
            "Watch: Cortex usage and AI app workload growth.",
            "观察点：Cortex 使用量与 AI 应用工作负载增长。"
          ),
        ],
      },
      {
        id: "palantir",
        name: "Palantir",
        role: c("Operational AI", "运营型 AI"),
        lines: [
          c(
            "AI value is moving from demo productivity into governed operating workflows.",
            "AI 价值正在从演示型效率转向可治理的运营工作流。"
          ),
          c(
            "Monetization is strongest when AI decisions remain auditable.",
            "当 AI 决策可审计时，变现强度最高。"
          ),
          c(
            "Best path: convert bootcamp demand into durable production deployments.",
            "最佳路径：把 bootcamp 需求转化为长期生产部署。"
          ),
          c(
            "Watch: commercial expansion and production conversion rate.",
            "观察点：商业客户扩张与生产部署转化率。"
          ),
        ],
      },
      {
        id: "servicenow",
        name: "ServiceNow",
        role: c("Workflow AI", "工作流 AI"),
        lines: [
          c(
            "AI agents monetize fastest when embedded inside existing enterprise workflows.",
            "AI agent 嵌入既有企业工作流时，变现速度最快。"
          ),
          c(
            "Value comes from higher platform seat density and measurable automation ROI.",
            "价值来自更高的平台席位密度与可衡量的自动化 ROI。"
          ),
          c(
            "Best path: attach agents to IT, HR, and customer operations.",
            "最佳路径：把 agent 绑定到 IT、人力与客户运营。"
          ),
          c("Watch: AI SKU adoption and renewal uplift.", "观察点：AI SKU 采用与续约提升。"),
        ],
      },
    ],
  },
];

const STEP_LABELS: Copy[] = [
  c("Market signal", "市场信号"),
  c("VEA projection", "VEA 推演"),
  c("Monetization path", "变现路径"),
  c("Validation watch", "验证观察"),
];

function CompanyCard({
  company,
  active,
  onSelect,
}: {
  company: Company;
  active: boolean;
  onSelect: () => void;
}) {
  const { lang } = useLang();

  return (
    <button
      onClick={onSelect}
      className={`group min-h-[92px] rounded-lg border p-3 text-left transition-all sm:min-h-[104px] ${
        active
          ? "border-vea-neon/35 bg-vea-neon/[0.11] shadow-lg shadow-vea-neon/5"
          : "border-white/[0.075] bg-white/[0.035] hover:border-white/[0.14] hover:bg-white/[0.06]"
      }`}
    >
      <span className="block text-sm font-semibold text-white">
        {company.name}
      </span>
      <span className={active ? "mt-1 block text-xs text-vea-neon/80" : "mt-1 block text-xs text-white/42"}>
        {company.role[lang]}
      </span>
      <span className="mt-3 hidden text-[11px] leading-4 text-white/34 transition-colors group-hover:text-white/46 sm:mt-4 sm:line-clamp-2 sm:block">
        {company.lines[0][lang]}
      </span>
    </button>
  );
}

function EmptyAnalysisState({ count }: { count: number }) {
  return (
    <div className="min-h-5 sm:min-h-[190px]" aria-hidden="true" data-company-count={count} />
  );
}

function GeneratedAnalysis({ company }: { company: Company }) {
  const { lang } = useLang();

  return (
    <motion.div
      key={company.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {company.lines.map((line, index) => (
        <motion.section
          key={`${company.id}-${line.en}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.14, duration: 0.35 }}
          className="rounded-lg border border-white/[0.07] bg-white/[0.035] p-3 sm:p-3.5"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-vea-neon shadow-[0_0_14px_rgba(45,212,160,0.65)]" />
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/38 sm:text-xs sm:tracking-[0.16em]">
              {STEP_LABELS[index][lang]}
            </h3>
          </div>
          <p className="text-[13px] leading-6 text-white/68 sm:text-sm">
            {line[lang]}
          </p>
        </motion.section>
      ))}
    </motion.div>
  );
}

export default function MarketWorkbenchPanel() {
  const { lang } = useLang();
  const t = useT();
  const [expanded, setExpanded] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState("compute");
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null
  );

  const selectedCategory = useMemo(
    () =>
      CATEGORIES.find((category) => category.id === selectedCategoryId) ??
      CATEGORIES[0],
    [selectedCategoryId]
  );

  const selectedCompany = useMemo(
    () =>
      selectedCategory.companies.find(
        (company) => company.id === selectedCompanyId
      ) ?? null,
    [selectedCategory, selectedCompanyId]
  );

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const syncExpanded = () => setExpanded(true);
    syncExpanded();
    query.addEventListener("change", syncExpanded);
    return () => query.removeEventListener("change", syncExpanded);
  }, []);

  const selectCategory = (id: string) => {
    setSelectedCategoryId(id);
    setSelectedCompanyId(null);
  };

  return (
    <section className="space-y-3 lg:grid lg:min-h-0 lg:grid-cols-[238px_minmax(0,1fr)] lg:gap-0 lg:space-y-0 lg:overflow-hidden lg:rounded-xl lg:border lg:border-white/[0.09] lg:bg-[#07140f]/78 lg:shadow-2xl lg:shadow-black/25 lg:backdrop-blur-xl">
      <aside className="shrink-0 overflow-hidden rounded-xl border border-white/[0.09] bg-[#07140f]/78 shadow-2xl shadow-black/20 backdrop-blur-xl lg:min-h-0 lg:rounded-none lg:border-0 lg:border-r lg:border-white/[0.08] lg:bg-transparent lg:shadow-none lg:backdrop-blur-none">
        <div className="border-b border-white/[0.08] p-3 sm:p-4">
          <div className="inline-flex items-center gap-2 rounded-md border border-vea-amber/20 bg-vea-amber/[0.08] px-2.5 py-1 text-[11px] font-medium text-vea-amber-soft">
            <Radio className="h-3.5 w-3.5" />
            {t("Computation Market", "计算市场")}
          </div>
          <h2 className="mt-2 text-lg font-semibold text-white sm:mt-3 sm:text-xl">
            {t("AI Infrastructure", "AI 基础设施")}
          </h2>
          <p className="mt-1 hidden text-xs leading-5 text-white/40 sm:block">
            {t(
              "Pick a category, then choose a company to generate analysis.",
              "选择分类后，点击公司生成分析。"
            )}
          </p>
        </div>

        <div className="p-2">
          <button
            onClick={() => setExpanded((value) => !value)}
            className="hidden w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm font-medium text-white/76 transition-colors hover:bg-white/[0.06] lg:flex"
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
            <div className="flex gap-2 overflow-x-auto pb-1 lg:mt-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
              {CATEGORIES.map((category) => {
                const active = category.id === selectedCategory.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => selectCategory(category.id)}
                    className={`w-[132px] shrink-0 rounded-md px-2.5 py-2 text-left transition-colors sm:w-[150px] lg:w-full lg:px-2 lg:py-2.5 ${
                      active
                        ? "bg-vea-neon/12 text-vea-neon ring-1 ring-vea-neon/20"
                        : "text-white/54 hover:bg-white/[0.05] hover:text-white/82"
                    }`}
                  >
                    <span className="block truncate text-xs font-medium sm:text-sm">
                      {category.label[lang]}
                    </span>
                    <span
                      className={`mt-0.5 block truncate text-[11px] ${
                        active ? "text-vea-neon/52" : "text-white/32"
                      }`}
                    >
                      {category.companies.length} {t("companies", "家公司")}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </aside>

      <article className="overflow-visible rounded-xl border border-white/[0.09] bg-[#07140f]/78 shadow-2xl shadow-black/20 backdrop-blur-xl lg:min-h-0 lg:overflow-y-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none lg:backdrop-blur-none">
        <div className="space-y-3 p-3 sm:space-y-4 sm:p-5">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {selectedCategory.companies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                active={company.id === selectedCompany?.id}
                onSelect={() => setSelectedCompanyId(company.id)}
              />
            ))}
          </div>

          {selectedCompany ? (
            <GeneratedAnalysis company={selectedCompany} />
          ) : (
            <EmptyAnalysisState count={selectedCategory.companies.length} />
          )}
        </div>
      </article>
    </section>
  );
}
