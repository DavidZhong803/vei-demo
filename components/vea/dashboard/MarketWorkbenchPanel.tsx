"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ExternalLink, RefreshCw, Search, X } from "lucide-react";
import {
  MARKET_UNIVERSE,
  type MarketCompanyId,
} from "@/lib/market-universe";
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

const COMPANY_LIBRARY: Category[] = [
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
        name: "Microsoft",
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
        name: "Amazon",
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
        name: "Alphabet",
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
        name: "Oracle",
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

const ADDITIONAL_COMPANIES: Company[] = [
  {
    id: "vertiv",
    name: "Vertiv",
    role: c("Power and cooling systems", "供电与冷却系统"),
    lines: [
      c(
        "AI rack density shifts data-center value toward engineered power and thermal capacity.",
        "AI 机柜密度上升，正在把数据中心价值推向工程化供电与散热能力。"
      ),
      c(
        "The defensible asset is the installed design position across power, liquid cooling, and service.",
        "可防御资产来自供电、液冷与服务体系中的长期设计导入位置。"
      ),
      c(
        "Best path: convert AI buildouts into standardized systems, recurring service, and partner-led deployment.",
        "最佳路径：把 AI 建设需求转化为标准化系统、持续服务与合作伙伴部署。"
      ),
      c(
        "Watch: liquid-cooling adoption, backlog conversion, and capacity expansion by region.",
        "观察点：液冷采用率、在手订单兑现以及区域产能扩张。"
      ),
    ],
  },
  {
    id: "eaton",
    name: "Eaton",
    role: c("Electrical infrastructure", "电力基础设施"),
    lines: [
      c(
        "Grid constraints and AI load growth increase the strategic value of power distribution assets.",
        "电网约束与 AI 负载增长正在提升配电资产的战略价值。"
      ),
      c(
        "Value is protected by qualification cycles, installed systems, and integration know-how.",
        "资质周期、既有装机与系统集成 know-how 共同保护其价值。"
      ),
      c(
        "Best path: package electrical equipment, controls, and lifecycle service around data-center expansion.",
        "最佳路径：围绕数据中心扩张组合电气设备、控制系统与全生命周期服务。"
      ),
      c(
        "Watch: data-center order growth, utility interconnection timing, and margin from higher-value systems.",
        "观察点：数据中心订单增速、并网节奏及高价值系统带来的利润率。"
      ),
    ],
  },
  {
    id: "intel",
    name: "Intel",
    role: c("CPU and foundry platform", "CPU 与代工平台"),
    lines: [
      c("AI infrastructure demand broadens the role of general-purpose compute and domestic manufacturing.", "AI 基础设施需求正在扩大通用计算与美国本土制造的战略作用。"),
      c("The control position combines x86 deployment, packaging capability, and foundry ambition.", "其控制位置由 x86 装机基础、先进封装能力与晶圆代工布局共同构成。"),
      c("Best path: connect CPU demand, accelerator systems, and external foundry customers.", "最佳路径：连接 CPU 需求、加速系统与外部晶圆代工客户。"),
      c("Watch: foundry milestones, data-center share, and accelerator adoption.", "观察点：代工里程碑、数据中心份额与加速器采用率。"),
    ],
  },
  {
    id: "qualcomm",
    name: "Qualcomm",
    role: c("Edge AI compute", "边缘 AI 算力"),
    lines: [
      c("Inference is moving from centralized clouds toward devices and distributed edge systems.", "推理负载正从集中式云端延伸到终端设备与分布式边缘系统。"),
      c("Low-power silicon, connectivity, and device relationships form the defensible position.", "低功耗芯片、连接能力与终端客户关系构成其防御位置。"),
      c("Best path: package on-device AI across PCs, vehicles, and industrial endpoints.", "最佳路径：在 PC、汽车与工业终端中打包端侧 AI 能力。"),
      c("Watch: AI PC design wins, edge inference software, and non-handset mix.", "观察点：AI PC 设计导入、边缘推理软件与非手机业务占比。"),
    ],
  },
  {
    id: "globalfoundries",
    name: "GlobalFoundries",
    role: c("Specialty foundry", "特色工艺代工"),
    lines: [
      c("AI systems still depend on power, radio, connectivity, and control chips beyond leading-edge compute.", "AI 系统除先进算力芯片外，仍依赖电源、射频、连接与控制芯片。"),
      c("Long qualification cycles and specialty process capacity protect the foundry position.", "长期认证周期与特色工艺产能保护其代工位置。"),
      c("Best path: secure multi-year capacity agreements around infrastructure components.", "最佳路径：围绕基础设施器件锁定多年产能协议。"),
      c("Watch: utilization, long-term agreements, and data-center exposure.", "观察点：产能利用率、长期协议与数据中心业务敞口。"),
    ],
  },
  {
    id: "applied",
    name: "Applied Materials",
    role: c("Process equipment", "半导体工艺设备"),
    lines: [
      c("Rising chip complexity increases equipment intensity across logic, memory, and packaging.", "芯片复杂度上升正在提高逻辑、存储与先进封装的设备投入强度。"),
      c("Process know-how and installed-base service create recurring control points.", "工艺 know-how 与装机服务形成持续性的控制点。"),
      c("Best path: monetize materials engineering across each AI chip transition.", "最佳路径：在每一轮 AI 芯片迭代中变现材料工程能力。"),
      c("Watch: leading-edge fab spending, advanced packaging, and service growth.", "观察点：先进制程资本开支、先进封装与服务业务增长。"),
    ],
  },
  {
    id: "lam",
    name: "Lam Research",
    role: c("Wafer fabrication equipment", "晶圆制造设备"),
    lines: [
      c("AI memory and advanced logic require more demanding deposition and etch steps.", "AI 存储与先进逻辑芯片需要更复杂的沉积与刻蚀步骤。"),
      c("Recipe depth and a large installed base reinforce process-level switching costs.", "工艺配方深度与庞大装机基础强化了制程层面的切换成本。"),
      c("Best path: attach equipment and service revenue to layer-count and packaging growth.", "最佳路径：让设备与服务收入跟随层数和封装复杂度增长。"),
      c("Watch: memory recovery, foundry spending, and customer support revenue.", "观察点：存储复苏、晶圆厂支出与客户支持收入。"),
    ],
  },
  {
    id: "kla",
    name: "KLA",
    role: c("Process control", "工艺控制与检测"),
    lines: [
      c("Smaller geometries and advanced packaging raise the economic cost of undetected defects.", "更小制程与先进封装提高了未检测缺陷的经济成本。"),
      c("Inspection data and process integration make control systems difficult to displace.", "检测数据与工艺集成使其控制系统难以被替代。"),
      c("Best path: expand inspection content per wafer and package.", "最佳路径：提高每片晶圆与每个封装环节的检测价值量。"),
      c("Watch: process-control intensity, advanced packaging, and service resilience.", "观察点：工艺控制强度、先进封装与服务收入韧性。"),
    ],
  },
  {
    id: "asml",
    name: "ASML",
    role: c("Lithography systems", "光刻系统"),
    lines: [
      c("Leading-edge AI silicon depends on a highly concentrated lithography toolchain.", "先进 AI 芯片依赖高度集中的光刻设备供应链。"),
      c("EUV systems, process knowledge, and ecosystem coordination define the control position.", "EUV 系统、工艺知识与生态协同定义了其控制位置。"),
      c("Best path: compound system value through productivity upgrades and service.", "最佳路径：通过生产率升级与服务持续提升系统价值。"),
      c("Watch: shipment timing, High-NA adoption, and export restrictions.", "观察点：交付节奏、High-NA 采用与出口限制。"),
    ],
  },
  {
    id: "dell",
    name: "Dell Technologies",
    role: c("AI server systems", "AI 服务器系统"),
    lines: [
      c("Enterprise AI adoption converts accelerator supply into deployable server and storage systems.", "企业 AI 采用正在把加速器供给转化为可部署的服务器与存储系统。"),
      c("Customer access, integration, financing, and support shape the systems position.", "客户触达、系统集成、融资与支持能力塑造其系统位置。"),
      c("Best path: bundle validated racks, storage, networking, and lifecycle service.", "最佳路径：组合经验证的整柜、存储、网络与全生命周期服务。"),
      c("Watch: AI server backlog, margins, and enterprise deployment cycles.", "观察点：AI 服务器订单、利润率与企业部署周期。"),
    ],
  },
  {
    id: "hpe",
    name: "Hewlett Packard Enterprise",
    role: c("AI systems and services", "AI 系统与服务"),
    lines: [
      c("Sovereign and enterprise AI demand favors integrated infrastructure with managed operations.", "主权与企业 AI 需求偏向带有托管运维的一体化基础设施。"),
      c("High-performance computing expertise and service relationships support differentiation.", "高性能计算经验与服务关系支撑其差异化位置。"),
      c("Best path: combine AI systems, private cloud, networking, and consumption pricing.", "最佳路径：组合 AI 系统、私有云、网络与按需计费。"),
      c("Watch: system orders, GreenLake attachment, and deployment conversion.", "观察点：系统订单、GreenLake 绑定率与部署转化。"),
    ],
  },
  {
    id: "supermicro",
    name: "Super Micro Computer",
    role: c("Rack-scale systems", "机架级系统"),
    lines: [
      c("Accelerator transitions reward server vendors that can qualify and ship full racks quickly.", "加速器换代有利于能够快速验证并交付整柜系统的服务器厂商。"),
      c("Building-block design and direct liquid-cooling integration support speed to market.", "模块化设计与液冷集成能力支撑其上市速度。"),
      c("Best path: turn rapid product cycles into repeat rack-scale deployments.", "最佳路径：把快速产品迭代转化为可重复的机架级部署。"),
      c("Watch: delivery execution, customer concentration, and working capital.", "观察点：交付执行、客户集中度与营运资金。"),
    ],
  },
  {
    id: "ciena",
    name: "Ciena",
    role: c("Optical networking", "光网络"),
    lines: [
      c("Distributed AI clusters increase bandwidth demand between data centers and regions.", "分布式 AI 集群正在提高数据中心与区域之间的带宽需求。"),
      c("Coherent optics and network software create an integrated transport position.", "相干光学与网络软件构成一体化传输位置。"),
      c("Best path: monetize capacity upgrades through systems, software, and automation.", "最佳路径：通过系统、软件与自动化变现网络扩容。"),
      c("Watch: cloud orders, carrier inventory, and high-speed optical adoption.", "观察点：云客户订单、运营商库存与高速光学采用。"),
    ],
  },
  {
    id: "lumentum",
    name: "Lumentum",
    role: c("Optical components", "光学器件"),
    lines: [
      c("AI data-center scale raises demand for higher-speed optical links and laser components.", "AI 数据中心规模扩张正在提升高速光连接与激光器件需求。"),
      c("Photonics expertise and customer qualification protect component positions.", "光子技术能力与客户认证保护其器件位置。"),
      c("Best path: capture design wins across successive optical speed transitions.", "最佳路径：在连续的光学速率升级中获取设计导入。"),
      c("Watch: cloud concentration, product mix, and manufacturing yields.", "观察点：云客户集中度、产品结构与制造良率。"),
    ],
  },
  {
    id: "ibm",
    name: "IBM",
    role: c("Hybrid cloud and AI", "混合云与 AI"),
    lines: [
      c("Regulated enterprises need AI deployment across private, public, and legacy environments.", "受监管企业需要在私有云、公有云与传统环境之间部署 AI。"),
      c("Software, consulting, and enterprise trust create the hybrid control position.", "软件、咨询能力与企业信任共同形成混合云控制位置。"),
      c("Best path: attach governed AI software and services to existing enterprise estates.", "最佳路径：把可治理 AI 软件与服务绑定到既有企业系统。"),
      c("Watch: software growth, consulting signings, and generative AI conversion.", "观察点：软件增长、咨询签约与生成式 AI 转化。"),
    ],
  },
  {
    id: "hubbell",
    name: "Hubbell",
    role: c("Grid connection equipment", "电网连接设备"),
    lines: [
      c("Data-center load growth increases demand for reliable grid connection and distribution hardware.", "数据中心负载增长正在提高可靠并网与配电硬件需求。"),
      c("Utility qualification, installed products, and channel access protect the position.", "公用事业认证、装机产品与渠道能力保护其位置。"),
      c("Best path: attach high-value components to grid modernization and new capacity.", "最佳路径：把高价值器件绑定到电网现代化与新增容量。"),
      c("Watch: utility capital spending, lead times, and data-center exposure.", "观察点：公用事业资本开支、交付周期与数据中心敞口。"),
    ],
  },
  {
    id: "nvent",
    name: "nVent Electric",
    role: c("Electrical and thermal systems", "电气与热管理系统"),
    lines: [
      c("Dense compute requires protected electrical paths and engineered thermal management.", "高密度计算需要受保护的电气路径与工程化热管理。"),
      c("Specification, enclosure design, and installation relationships support recurring demand.", "设计规范、机柜工程与安装关系支撑持续需求。"),
      c("Best path: package electrical protection and cooling around data-center standards.", "最佳路径：围绕数据中心标准组合电气保护与冷却方案。"),
      c("Watch: data-center sales, product mix, and capacity expansion.", "观察点：数据中心销售、产品结构与产能扩张。"),
    ],
  },
  {
    id: "datadog",
    name: "Datadog",
    role: c("Cloud observability", "云可观测性"),
    lines: [
      c("AI applications expand infrastructure complexity, telemetry volume, and operating risk.", "AI 应用正在扩大基础设施复杂度、遥测数据量与运营风险。"),
      c("Integrated telemetry and developer workflow placement create the control position.", "一体化遥测与开发者工作流位置构成其控制点。"),
      c("Best path: attach AI monitoring and security to expanding cloud workloads.", "最佳路径：把 AI 监控与安全能力绑定到增长中的云工作负载。"),
      c("Watch: customer expansion, product adoption, and cloud optimization cycles.", "观察点：客户扩张、产品采用与云成本优化周期。"),
    ],
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    role: c("Edge cloud platform", "边缘云平台"),
    lines: [
      c("AI inference and agent traffic create demand for globally distributed compute and security.", "AI 推理与 agent 流量正在创造全球分布式计算与安全需求。"),
      c("Network reach, developer services, and traffic visibility define the edge position.", "网络覆盖、开发者服务与流量可见性定义其边缘位置。"),
      c("Best path: convert network usage into compute, security, and developer revenue.", "最佳路径：把网络使用量转化为计算、安全与开发者收入。"),
      c("Watch: developer adoption, enterprise expansion, and inference economics.", "观察点：开发者采用、企业扩张与推理经济性。"),
    ],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    role: c("Operational data platform", "运营数据平台"),
    lines: [
      c("AI applications need operational data systems that support rapid product iteration.", "AI 应用需要能够支持快速产品迭代的运营数据系统。"),
      c("Developer adoption, data gravity, and managed service workflows create retention.", "开发者采用、数据重力与托管服务工作流形成留存。"),
      c("Best path: attach search and AI application services to core databases.", "最佳路径：把搜索与 AI 应用服务绑定到核心数据库。"),
      c("Watch: Atlas consumption, workload expansion, and AI application wins.", "观察点：Atlas 用量、工作负载扩张与 AI 应用客户。"),
    ],
  },
];

const COMPANY_BY_ID = new Map(
  [...COMPANY_LIBRARY.flatMap((category) => category.companies), ...ADDITIONAL_COMPANIES].map(
    (company) => [company.id, company]
  )
);

function marketCompany(id: MarketCompanyId) {
  const company = COMPANY_BY_ID.get(id);
  if (!company) throw new Error(`Missing market company: ${id}`);
  return company;
}

const CATEGORIES: Category[] = [
  {
    id: "compute",
    label: c("Compute silicon & architecture", "算力芯片与架构"),
    detail: c("GPU, accelerators, and processor IP", "GPU、加速器与处理器 IP"),
    companies: [
      marketCompany("nvidia"),
      marketCompany("amd"),
      marketCompany("arm"),
      marketCompany("intel"),
      marketCompany("qualcomm"),
    ],
  },
  {
    id: "semiconductor-supply",
    label: c("Semiconductor supply chain", "半导体供应链"),
    detail: c("Foundry, memory, equipment, and process control", "晶圆代工、存储、设备与工艺控制"),
    companies: [
      marketCompany("tsmc"),
      marketCompany("micron"),
      marketCompany("globalfoundries"),
      marketCompany("applied"),
      marketCompany("lam"),
      marketCompany("kla"),
      marketCompany("asml"),
    ],
  },
  {
    id: "servers",
    label: c("Servers & systems", "服务器与系统"),
    detail: c("Rack-scale integration and enterprise deployment", "机架级集成与企业部署"),
    companies: [
      marketCompany("dell"),
      marketCompany("hpe"),
      marketCompany("supermicro"),
    ],
  },
  {
    id: "network",
    label: c("Network & interconnect", "网络与互连"),
    detail: c("Switching, optics, custom silicon, and connectivity", "交换、光通信、定制芯片与连接"),
    companies: [
      marketCompany("broadcom"),
      marketCompany("marvell"),
      marketCompany("arista"),
      marketCompany("astera"),
      marketCompany("coherent"),
      marketCompany("amphenol"),
      marketCompany("ciena"),
      marketCompany("lumentum"),
    ],
  },
  {
    id: "cloud",
    label: c("Cloud & compute capacity", "云与算力服务"),
    detail: c("Hyperscale cloud and specialized GPU capacity", "超大规模云与专业 GPU 算力"),
    companies: [
      marketCompany("azure"),
      marketCompany("aws"),
      marketCompany("google-cloud"),
      marketCompany("oracle"),
      marketCompany("coreweave"),
      marketCompany("ibm"),
    ],
  },
  {
    id: "power",
    label: c("Power & cooling infrastructure", "电力与冷却基础设施"),
    detail: c("Electrical distribution, thermal systems, and service", "配电、热管理与基础设施服务"),
    companies: [
      marketCompany("vertiv"),
      marketCompany("eaton"),
      marketCompany("hubbell"),
      marketCompany("nvent"),
    ],
  },
  {
    id: "software",
    label: c("AI data & control software", "AI 数据与控制软件"),
    detail: c("Governed data, operational AI, and workflow control", "数据治理、运营型 AI 与工作流控制"),
    companies: [
      marketCompany("snowflake"),
      marketCompany("palantir"),
      marketCompany("servicenow"),
      marketCompany("datadog"),
      marketCompany("cloudflare"),
      marketCompany("mongodb"),
    ],
  },
];

const STEP_LABELS: Copy[] = [
  c("Market signal", "市场信号"),
  c("Control position", "控制位置"),
  c("Monetization path", "变现路径"),
  c("Validation watch", "验证观察"),
];

function CompanyCard({
  company,
  active,
  onSelect,
  contextLabel,
}: {
  company: Company;
  active: boolean;
  onSelect: () => void;
  contextLabel?: string;
}) {
  const { lang } = useLang();
  const marketMeta = MARKET_UNIVERSE[company.id as MarketCompanyId];

  return (
    <button
      onClick={onSelect}
      data-company-id={company.id}
      className={`group w-[68vw] max-w-[244px] shrink-0 snap-start rounded-lg border p-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-vea-steel/55 sm:min-h-[104px] sm:w-auto sm:max-w-none ${
        active
          ? "border-vea-steel/38 bg-vea-steel/[0.11] shadow-[inset_0_1px_rgba(220,232,251,0.07),0_10px_28px_rgba(0,0,0,0.16)]"
          : "metal-card hover:border-vea-steel/28 hover:bg-vea-steel/[0.07]"
      }`}
    >
      <span className="flex items-baseline justify-between gap-2">
        <span className="block truncate text-sm font-semibold text-white">
          {company.name}
        </span>
        <span className="shrink-0 text-[10px] font-medium text-white/46">
          {marketMeta.ticker}
        </span>
      </span>
      <span className={active ? "mt-1 block text-xs text-[#b9cdee]" : "mt-1 block text-xs text-white/62"}>
        {company.role[lang]}
      </span>
      {contextLabel && (
        <span className="mt-1 block truncate text-[10px] text-white/42">
          {contextLabel}
        </span>
      )}
      <span className="mt-3 hidden text-[11px] leading-4 text-white/64 transition-colors group-hover:text-white/78 sm:mt-4 sm:line-clamp-2 sm:block">
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

type FilingSignal = {
  form: string;
  filingDate: string;
  description: string;
  url: string;
};

type MarketSignalsResponse = {
  company: string;
  ticker: string;
  exchange: string | null;
  filings: FilingSignal[];
  source: string;
  status: "live" | "cached" | "unavailable";
  companyUrl: string;
  fetchedAt: string;
};

function PublicSignals({ company }: { company: Company }) {
  const { lang } = useLang();
  const t = useT();
  const marketMeta = MARKET_UNIVERSE[company.id as MarketCompanyId];
  const [signals, setSignals] = useState<MarketSignalsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const cacheKey = `vea-sec-signals:${marketMeta.ticker}`;
    setSignals(null);
    setLoading(true);
    setFailed(false);

    const readCachedSignals = () => {
      try {
        const cached = window.localStorage.getItem(cacheKey);
        if (!cached) return null;
        const data = JSON.parse(cached) as MarketSignalsResponse;
        return data.filings?.length ? { ...data, status: "cached" as const } : null;
      } catch {
        return null;
      }
    };

    const loadSignals = async () => {
      try {
        const response = await fetch(
          `/api/market-signals?ticker=${marketMeta.ticker}`,
          { signal: controller.signal, cache: "no-store" }
        );
        if (!response.ok) throw new Error("Market signals unavailable");
        const data = (await response.json()) as MarketSignalsResponse;
        if (data.filings.length) {
          setSignals(data);
          window.localStorage.setItem(cacheKey, JSON.stringify(data));
          setFailed(false);
        } else {
          const cached = readCachedSignals();
          setSignals(cached ?? data);
          setFailed(!cached);
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        const cached = readCachedSignals();
        setSignals(cached);
        setFailed(!cached);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    void loadSignals();
    const refreshTimer = window.setInterval(loadSignals, 5 * 60 * 1000);

    return () => {
      window.clearInterval(refreshTimer);
      controller.abort();
    };
  }, [marketMeta.ticker, retryToken]);

  if (loading) {
    return (
      <div className="border-l border-vea-steel/30 px-3 py-1 text-xs text-white/52">
        {t("Reading current SEC disclosures...", "正在读取最新 SEC 披露...")}
      </div>
    );
  }

  if (failed || !signals?.filings.length) {
    const companyUrl =
      signals?.companyUrl ??
      `https://www.sec.gov/edgar/search/#/q=${marketMeta.ticker}`;

    return (
      <section
        aria-live="polite"
        className="flex flex-wrap items-center justify-between gap-3 border-l border-white/14 px-3 py-2.5"
      >
        <div>
          <p className="text-xs font-medium text-white/68">
            {t("SEC connection delayed", "SEC 连接延迟")}
          </p>
          <p className="mt-0.5 text-[11px] text-white/42">
            {t("Retry or open the source directly.", "可重试或直接查看原始披露。")}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setRetryToken((value) => value + 1)}
            title={t("Retry SEC connection", "重试 SEC 连接")}
            className="grid h-8 w-8 place-items-center rounded-md border border-white/[0.09] text-white/58 transition-colors hover:border-vea-steel/28 hover:text-white"
          >
            <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="sr-only">{t("Retry", "重试")}</span>
          </button>
          <a
            href={companyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/[0.09] px-2.5 text-[11px] font-medium text-white/62 transition-colors hover:border-vea-steel/28 hover:text-white"
          >
            {t("Open EDGAR", "打开 EDGAR")}
            <ExternalLink aria-hidden="true" className="h-3 w-3" />
          </a>
        </div>
      </section>
    );
  }

  const fetchedTime = new Date(signals.fetchedAt).toLocaleTimeString(
    lang === "zh" ? "zh-CN" : "en-US",
    { hour: "2-digit", minute: "2-digit" }
  );
  const filingLabel = (form: string) => {
    if (form === "8-K") return t("Current report", "重大事项报告");
    if (form === "10-Q") return t("Quarterly report", "季度报告");
    if (form === "10-K") return t("Annual report", "年度报告");
    if (form === "6-K") return t("Foreign issuer report", "境外发行人报告");
    if (form === "20-F") return t("Foreign issuer annual report", "境外发行人年报");
    return t("Public filing", "公开披露");
  };

  return (
    <section className="metal-card rounded-lg p-3.5 sm:p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/[0.07] pb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b7c9e8]">
            {t("Latest public signals", "最新公开信号")}
          </p>
          <p className="mt-1 text-[11px] text-white/50">
            {marketMeta.exchange}: {marketMeta.ticker} · {signals.source}
            {signals.status === "cached" ? ` · ${t("last sync", "上次同步")}` : ""}
          </p>
        </div>
        <p className="text-[10px] text-white/42">
          {t("Checked", "更新于")} {fetchedTime}
        </p>
      </div>

      <div className="divide-y divide-white/[0.06]">
        {signals.filings.map((filing) => (
          <a
            key={`${filing.form}-${filing.filingDate}-${filing.url}`}
            href={filing.url}
            target="_blank"
            rel="noreferrer"
            className="grid grid-cols-[44px_82px_minmax(0,1fr)] gap-2 py-2.5 text-xs transition-colors hover:text-white sm:grid-cols-[52px_96px_minmax(0,1fr)]"
          >
            <span className="font-semibold text-[#b7c9e8]">{filing.form}</span>
            <span className="text-white/50">{filing.filingDate}</span>
            <span className="truncate text-white/68">
              {filing.description === filing.form
                ? filingLabel(filing.form)
                : filing.description}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function GeneratedAnalysis({ company }: { company: Company }) {
  const { lang } = useLang();
  const [activeLine, setActiveLine] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const typedText = company.lines[activeLine][lang];

  useEffect(() => {
    setActiveLine(0);
    setTypedLength(0);
  }, [company.id, lang]);

  useEffect(() => {
    if (typedLength < typedText.length) {
      const timer = setTimeout(() => {
        setTypedLength((value) => value + 1);
      }, 18);
      return () => clearTimeout(timer);
    }

    if (activeLine < company.lines.length - 1) {
      const timer = setTimeout(() => {
        setActiveLine((value) => value + 1);
        setTypedLength(0);
      }, 760);
      return () => clearTimeout(timer);
    }
  }, [activeLine, company.lines.length, typedLength, typedText.length]);

  return (
    <motion.div
      key={company.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="metal-card rounded-lg p-3 sm:hidden"
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="h-4 w-0.5 rounded-full bg-vea-steel/80 shadow-[0_0_10px_rgba(124,156,255,0.45)]" />
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b7c9e8]">
            {STEP_LABELS[activeLine][lang]}
          </h3>
        </div>
        <p className="min-h-[96px] text-[13px] leading-6 text-white/82">
          {typedText.slice(0, typedLength)}
          <span className="caret" />
        </p>
      </motion.section>

      <div className="hidden space-y-3 sm:block">
        {company.lines.map((line, index) => (
          <motion.section
            key={`${company.id}-${line.en}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.14, duration: 0.35 }}
            className="metal-card rounded-lg p-3.5"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="h-4 w-0.5 rounded-full bg-vea-steel/80 shadow-[0_0_10px_rgba(124,156,255,0.45)]" />
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b7c9e8]">
                {STEP_LABELS[index][lang]}
              </h3>
            </div>
            <p className="text-sm leading-6 text-white/80">{line[lang]}</p>
          </motion.section>
        ))}
      </div>

      <PublicSignals company={company} />
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
  const [searchQuery, setSearchQuery] = useState("");
  const companyStripRef = useRef<HTMLDivElement>(null);

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

  const normalizedSearch = searchQuery.trim().toLocaleLowerCase();
  const searchResults = useMemo(() => {
    if (!normalizedSearch) return [];

    return CATEGORIES.flatMap((category) =>
      category.companies.map((company) => ({ category, company }))
    ).filter(({ category, company }) => {
      const marketMeta = MARKET_UNIVERSE[company.id as MarketCompanyId];
      return [
        company.name,
        marketMeta.ticker,
        company.role.en,
        company.role.zh,
        category.label.en,
        category.label.zh,
      ].some((value) => value.toLocaleLowerCase().includes(normalizedSearch));
    });
  }, [normalizedSearch]);

  const visibleCompanies = normalizedSearch
    ? searchResults
    : selectedCategory.companies.map((company) => ({
        category: selectedCategory,
        company,
      }));

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const syncExpanded = () => setExpanded(true);
    syncExpanded();
    query.addEventListener("change", syncExpanded);
    return () => query.removeEventListener("change", syncExpanded);
  }, []);

  useEffect(() => {
    if (!selectedCompanyId || searchQuery) return;
    const selectedCard = companyStripRef.current?.querySelector<HTMLElement>(
      `[data-company-id="${selectedCompanyId}"]`
    );
    selectedCard?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [searchQuery, selectedCategoryId, selectedCompanyId]);

  const selectCategory = (id: string) => {
    setSelectedCategoryId(id);
    setSelectedCompanyId(null);
    setSearchQuery("");
  };

  const selectCompany = (category: Category, company: Company) => {
    setSelectedCategoryId(category.id);
    setSelectedCompanyId(company.id);
    setSearchQuery("");
  };

  return (
    <section className="workbench-inset space-y-3 lg:grid lg:min-h-0 lg:grid-cols-[238px_minmax(0,1fr)] lg:gap-0 lg:space-y-0 lg:overflow-hidden lg:rounded-lg">
      <aside className="metal-panel shrink-0 overflow-hidden rounded-lg lg:min-h-0 lg:rounded-none lg:border-0 lg:border-r lg:border-vea-steel/15 lg:bg-transparent lg:shadow-none">
        <div className="border-b border-vea-steel/14 bg-vea-steel/[0.035] p-3 sm:p-4">
          <div className="inline-flex items-center border-l-2 border-vea-steel/75 bg-vea-steel/[0.07] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#b9cdee]">
            {t("Computation Market", "计算市场")}
          </div>
          <h2 className="mt-2 text-lg font-semibold text-white sm:mt-3 sm:text-xl">
            {t("US-listed AI Infrastructure", "美国上市 AI 基础设施")}
          </h2>
          <p className="mt-1 hidden text-xs leading-5 text-white/62 sm:block">
            {t(
              "Pick a category, then choose a company to generate analysis.",
              "选择分类后，点击公司生成分析。"
            )}
          </p>
        </div>

        <div className="p-2">
          <div className="relative mb-2">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/46"
            />
            <label htmlFor="market-company-search" className="sr-only">
              {t("Search company or ticker", "搜索公司或代码")}
            </label>
            <input
              id="market-company-search"
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSelectedCompanyId(null);
              }}
              placeholder={t("Company or ticker", "公司或代码")}
              className="h-10 w-full appearance-none rounded-md border border-white/[0.09] bg-black/20 pl-8 pr-8 text-[13px] text-white outline-none placeholder:text-white/42 transition-colors focus:border-vea-steel/38 focus:bg-black/30 focus:ring-1 focus:ring-vea-steel/20 lg:h-9 lg:text-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label={t("Clear search", "清除搜索")}
                title={t("Clear search", "清除搜索")}
                className="absolute right-1.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded text-white/46 transition-colors hover:bg-white/[0.07] hover:text-white"
              >
                <X aria-hidden="true" className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setExpanded((value) => !value)}
            className="hidden w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm font-semibold text-[#c4d3ea] transition-colors hover:bg-vea-steel/[0.08] lg:flex"
          >
            <span className="inline-flex items-center gap-2">
              {t("Categories", "分类")}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-white/62 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {expanded && (
            <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1 lg:mt-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
              {CATEGORIES.map((category) => {
                const active = category.id === selectedCategory.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => selectCategory(category.id)}
                    className={`min-h-[54px] w-[132px] shrink-0 rounded-md px-2.5 py-2 text-left transition-colors sm:min-h-[58px] sm:w-[166px] lg:w-full lg:px-2 lg:py-2.5 ${
                      active
                        ? "bg-vea-steel/[0.12] text-white ring-1 ring-vea-steel/28 shadow-[inset_2px_0_rgba(124,156,255,0.8)]"
                        : "text-white/64 hover:bg-vea-steel/[0.07] hover:text-white"
                    }`}
                  >
                    <span className="line-clamp-2 block text-[11px] font-medium leading-4 sm:text-sm">
                      {category.label[lang]}
                    </span>
                    <span
                      className={`mt-0.5 block truncate text-[11px] ${
                        active ? "text-[#b6c9e8]" : "text-white/62"
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

      <article className="metal-panel overflow-visible rounded-lg lg:min-h-0 lg:overflow-y-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none">
        <div className="space-y-3 p-3 sm:space-y-4 sm:p-5">
          {normalizedSearch && (
            <p className="text-[11px] text-white/52">
              {searchResults.length} {t("matching companies", "家匹配公司")}
            </p>
          )}
          <div
            ref={companyStripRef}
            className="scrollbar-none flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 xl:grid-cols-3"
          >
            {visibleCompanies.map(({ category, company }) => (
              <CompanyCard
                key={company.id}
                company={company}
                active={company.id === selectedCompany?.id}
                onSelect={() => selectCompany(category, company)}
                contextLabel={
                  normalizedSearch ? category.label[lang] : undefined
                }
              />
            ))}
          </div>

          {normalizedSearch && searchResults.length === 0 ? (
            <div className="border-l border-white/14 px-3 py-2 text-sm text-white/48">
              {t(
                "No US-listed infrastructure companies match this search.",
                "没有匹配的美国上市基础设施公司。"
              )}
            </div>
          ) : selectedCompany ? (
            <GeneratedAnalysis company={selectedCompany} />
          ) : (
            <EmptyAnalysisState count={visibleCompanies.length} />
          )}
        </div>
      </article>
    </section>
  );
}
