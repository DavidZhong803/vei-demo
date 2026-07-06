/**
 * VEA — Computation Market (mock live data).
 *
 * Represents the 7×24 value-chain computation VEA runs across industries.
 * All figures are illustrative mock data — not real analysis or advice.
 * The frontend only shows RESULTS (positions, events), never the process.
 */

export type ValueNode = {
  id: string;
  nameZh: string;
  nameEn: string;
  positionChange: number; // + rising / - falling / 0 flat (rank slots)
  nextEventZh: string;
  nextEventEn: string;
  hot?: boolean; // strongest mover — gets a subtle highlight
};

export type Industry = {
  id: string;
  nameZh: string;
  nameEn: string;
  companies: number;
  trend: "up" | "down" | "flat";
  nodes: ValueNode[];
};

export const INDUSTRIES: Industry[] = [
  {
    id: "ai-semi",
    nameZh: "AI 半导体产业",
    nameEn: "AI Semiconductor",
    companies: 24,
    trend: "up",
    nodes: [
      {
        id: "gpu",
        nameZh: "GPU 图形处理器",
        nameEn: "Graphics Processing Unit",
        positionChange: 2,
        nextEventZh: "NVIDIA 发布下一代 Blackwell Ultra",
        nextEventEn: "NVIDIA next-gen Blackwell Ultra launch",
        hot: true,
      },
      {
        id: "hbm",
        nameZh: "HBM 高带宽内存",
        nameEn: "High Bandwidth Memory",
        positionChange: 1,
        nextEventZh: "HBM4 样品量产进展",
        nextEventEn: "HBM4 sample mass-production progress",
      },
      {
        id: "optical",
        nameZh: "光互连",
        nameEn: "Optical Interconnect",
        positionChange: 1,
        nextEventZh: "CPO 商业化加速",
        nextEventEn: "CPO commercialization accelerating",
      },
      {
        id: "glass",
        nameZh: "玻璃基板",
        nameEn: "Glass Substrate",
        positionChange: 3,
        nextEventZh: "大客户扩产计划确认",
        nextEventEn: "Key-customer expansion plan confirmed",
        hot: true,
      },
      {
        id: "packaging",
        nameZh: "先进封装",
        nameEn: "Advanced Packaging",
        positionChange: 1,
        nextEventZh: "CoWoS 产能扩充",
        nextEventEn: "CoWoS capacity expansion",
      },
    ],
  },
  {
    id: "energy",
    nameZh: "新能源与储能",
    nameEn: "Energy & Storage",
    companies: 18,
    trend: "up",
    nodes: [
      {
        id: "solid-state",
        nameZh: "固态电池",
        nameEn: "Solid-State Battery",
        positionChange: 2,
        nextEventZh: "车企中试线通线",
        nextEventEn: "OEM pilot line online",
        hot: true,
      },
      {
        id: "sodium",
        nameZh: "钠离子电池",
        nameEn: "Sodium-ion Battery",
        positionChange: 1,
        nextEventZh: "储能项目招标放量",
        nextEventEn: "Grid-storage tenders scaling",
      },
      {
        id: "ess",
        nameZh: "储能系统",
        nameEn: "Energy Storage System",
        positionChange: 1,
        nextEventZh: "大型独立储能并网",
        nextEventEn: "Utility-scale ESS grid connection",
      },
      {
        id: "electrolyzer",
        nameZh: "电解槽",
        nameEn: "Electrolyzer",
        positionChange: 0,
        nextEventZh: "绿氢补贴政策落地",
        nextEventEn: "Green-hydrogen subsidy finalized",
      },
    ],
  },
  {
    id: "biotech",
    nameZh: "生物科技与医疗",
    nameEn: "Biotech & Healthcare",
    companies: 16,
    trend: "up",
    nodes: [
      {
        id: "gene",
        nameZh: "基因编辑",
        nameEn: "Gene Editing",
        positionChange: 2,
        nextEventZh: "体内疗法关键读出",
        nextEventEn: "In-vivo therapy key readout",
        hot: true,
      },
      {
        id: "mrna",
        nameZh: "mRNA 平台",
        nameEn: "mRNA Platform",
        positionChange: 1,
        nextEventZh: "肿瘤疫苗二期数据",
        nextEventEn: "Oncology vaccine Phase-II data",
      },
      {
        id: "regen",
        nameZh: "再生医学",
        nameEn: "Regenerative Medicine",
        positionChange: 1,
        nextEventZh: "细胞疗法商保准入",
        nextEventEn: "Cell-therapy reimbursement access",
      },
      {
        id: "ai-drug",
        nameZh: "AI 制药",
        nameEn: "AI Drug Discovery",
        positionChange: 2,
        nextEventZh: "AI 设计分子进入临床",
        nextEventEn: "AI-designed molecule enters clinic",
      },
    ],
  },
  {
    id: "robotics",
    nameZh: "机器人与自动化",
    nameEn: "Robotics & Automation",
    companies: 14,
    trend: "up",
    nodes: [
      {
        id: "humanoid",
        nameZh: "人形机器人",
        nameEn: "Humanoid Robot",
        positionChange: 3,
        nextEventZh: "工厂量产订单落地",
        nextEventEn: "Factory volume orders landing",
        hot: true,
      },
      {
        id: "dexterous",
        nameZh: "灵巧手",
        nameEn: "Dexterous Hand",
        positionChange: 1,
        nextEventZh: "触觉传感方案定点",
        nextEventEn: "Tactile-sensor design win",
      },
      {
        id: "embodied",
        nameZh: "具身智能",
        nameEn: "Embodied AI",
        positionChange: 2,
        nextEventZh: "通用操作模型发布",
        nextEventEn: "General manipulation model release",
      },
      {
        id: "motion",
        nameZh: "运动控制",
        nameEn: "Motion Control",
        positionChange: 0,
        nextEventZh: "国产伺服替代加速",
        nextEventEn: "Domestic servo substitution",
      },
    ],
  },
  {
    id: "ai-infra",
    nameZh: "AI 基础设施",
    nameEn: "AI Infrastructure",
    companies: 20,
    trend: "up",
    nodes: [
      {
        id: "datacenter",
        nameZh: "智算中心",
        nameEn: "AI Data Center",
        positionChange: 2,
        nextEventZh: "超大规模集群招标",
        nextEventEn: "Hyperscale cluster tenders",
        hot: true,
      },
      {
        id: "liquid",
        nameZh: "液冷散热",
        nameEn: "Liquid Cooling",
        positionChange: 2,
        nextEventZh: "冷板方案标准化",
        nextEventEn: "Cold-plate spec standardization",
      },
      {
        id: "inference",
        nameZh: "推理芯片",
        nameEn: "Inference Chip",
        positionChange: 1,
        nextEventZh: "定制加速器流片",
        nextEventEn: "Custom accelerator tape-out",
      },
      {
        id: "power",
        nameZh: "电力供应",
        nameEn: "Power Supply",
        positionChange: 1,
        nextEventZh: "数据中心电力保供",
        nextEventEn: "Data-center power procurement",
      },
    ],
  },
  {
    id: "materials",
    nameZh: "先进材料",
    nameEn: "Advanced Materials",
    companies: 20,
    trend: "up",
    nodes: [
      {
        id: "sic",
        nameZh: "碳化硅",
        nameEn: "Silicon Carbide",
        positionChange: 1,
        nextEventZh: "8 英寸衬底良率提升",
        nextEventEn: "8-inch substrate yield gains",
      },
      {
        id: "photoresist",
        nameZh: "光刻胶",
        nameEn: "Photoresist",
        positionChange: 2,
        nextEventZh: "高端胶国产验证通过",
        nextEventEn: "High-end resist qualification passed",
        hot: true,
      },
      {
        id: "quartz",
        nameZh: "高纯石英",
        nameEn: "High-purity Quartz",
        positionChange: 1,
        nextEventZh: "半导体级供给紧张",
        nextEventEn: "Semiconductor-grade supply tight",
      },
      {
        id: "gas",
        nameZh: "特种气体",
        nameEn: "Specialty Gas",
        positionChange: 0,
        nextEventZh: "先进制程用量提升",
        nextEventEn: "Advanced-node usage rising",
      },
    ],
  },
  {
    id: "fintech",
    nameZh: "金融科技",
    nameEn: "FinTech",
    companies: 15,
    trend: "up",
    nodes: [
      {
        id: "stablecoin",
        nameZh: "稳定币",
        nameEn: "Stablecoin",
        positionChange: 3,
        nextEventZh: "合规牌照框架落地",
        nextEventEn: "Licensing framework finalized",
        hot: true,
      },
      {
        id: "rwa",
        nameZh: "RWA 代币化",
        nameEn: "RWA Tokenization",
        positionChange: 2,
        nextEventZh: "机构级发行上线",
        nextEventEn: "Institutional issuance live",
      },
      {
        id: "ai-risk",
        nameZh: "AI 风控",
        nameEn: "AI Risk Control",
        positionChange: 1,
        nextEventZh: "实时反欺诈模型升级",
        nextEventEn: "Real-time fraud model upgrade",
      },
      {
        id: "cross-border",
        nameZh: "跨境支付",
        nameEn: "Cross-border Payments",
        positionChange: 1,
        nextEventZh: "结算网络扩容",
        nextEventEn: "Settlement network expansion",
      },
    ],
  },
  {
    id: "aerospace",
    nameZh: "航空航天",
    nameEn: "Aerospace",
    companies: 10,
    trend: "up",
    nodes: [
      {
        id: "reusable",
        nameZh: "可回收火箭",
        nameEn: "Reusable Rocket",
        positionChange: 2,
        nextEventZh: "一子级回收复用验证",
        nextEventEn: "Booster recovery & reuse test",
        hot: true,
      },
      {
        id: "sat-internet",
        nameZh: "卫星互联网",
        nameEn: "Satellite Internet",
        positionChange: 2,
        nextEventZh: "低轨星座密集组网",
        nextEventEn: "LEO constellation deployment",
      },
      {
        id: "propulsion",
        nameZh: "电推进",
        nameEn: "Electric Propulsion",
        positionChange: 1,
        nextEventZh: "霍尔推力器量产",
        nextEventEn: "Hall thruster mass production",
      },
      {
        id: "space-mat",
        nameZh: "空天材料",
        nameEn: "Aerospace Materials",
        positionChange: 0,
        nextEventZh: "耐高温复材定型",
        nextEventEn: "High-temp composite finalized",
      },
    ],
  },
];

export function getIndustry(id: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.id === id);
}
