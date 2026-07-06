/**
 * VEA — Technical Monetization Computational Framework
 * Mock data for the AI Result Interface.
 *
 * All figures are illustrative mock data to demonstrate the product flow.
 * They do NOT reflect real analysis or financials, and are not investment advice.
 *
 * The frontend only delivers RESULTS. No reasoning, rules, nodes, algorithms,
 * or data sources are exposed here — those belong to the backend.
 */

export type Outlook = "Acceleration" | "Stable" | "Deceleration";

export type TimeHorizon = {
  span: "7D" | "30D" | "90D" | "180D";
  label: string; // e.g. "7 Days"
  focus: string; // what to watch in this window
  emphasis?: boolean; // the currently recommended window
};

export type KeyEvent = {
  date: string; // "05-20" style
  title: string;
  probability: number; // 0-100
  status: "Done" | "In Progress" | "Upcoming";
};

export type PositionStep = {
  label: string;
  state: "past" | "current" | "future";
};

export type ValidationItem = {
  channel: "Commercial" | "Monetization" | "Capital Market";
  verdict: string;
  strength: "Strong" | "Moderate" | "Emerging";
};

export type ResultCard = { title: string; detail: string };

export type VEAResultPackage = {
  id: string;
  subject: string; // value subject name
  kind: string; // short descriptor
  computedAt: string; // mock timestamp
  accentEmerald: string; // light-mode accent
  accentNeon: string; // dark-mode accent

  // Card 1
  executiveSummary: string;
  // Card 2
  currentPosition: { statement: string; rank: string; percentile: string };
  // Card 3
  timeWindows: TimeHorizon[];
  // Card 4
  bestStrategy: { headline: string; detail: string };
  // Card 5
  keyEvents: KeyEvent[];
  // Card 6
  outlook: { trend: Outlook; detail: string; momentum: number };
  // Card 7
  validation: ValidationItem[];
  // Card 8
  positionEvolution: { steps: PositionStep[]; detail: string };
  // Card 9
  recommendedActions: ResultCard[];
};

export const CASES: VEAResultPackage[] = [
  // ─────────────────────────────────────────── META
  {
    id: "meta",
    subject: "Meta",
    kind: "Social + AI Infrastructure",
    computedAt: "09:42:18 UTC+8",
    accentEmerald: "#059669",
    accentNeon: "#00ffc2",
    executiveSummary:
      "Meta's fastest monetization path is turning its open Llama ecosystem into the default AI layer across its 3.9B-user attention network — the 90-day window is decisive.",
    currentPosition: {
      statement:
        "Distribution + capital leader in consumer AI, trailing on perceived model frontier.",
      rank: "Top 3",
      percentile: "Top 4% of value chain",
    },
    timeWindows: [
      { span: "7D", label: "7 Days", focus: "Llama adoption signals & dev traction." },
      { span: "30D", label: "30 Days", focus: "Agent monetization pilots in messaging." },
      {
        span: "90D",
        label: "90 Days",
        focus: "Lock open-standard positioning before consolidation.",
        emphasis: true,
      },
      { span: "180D", label: "180 Days", focus: "Outcome-based AI ad re-pricing." },
    ],
    bestStrategy: {
      headline: "Make Llama the default open standard, monetize agents in-app",
      detail:
        "Ship reference agents and tooling so builders default to Llama, then insert transactional agents into WhatsApp & Instagram DMs to convert attention into commerce.",
    },
    keyEvents: [
      { date: "05-20", title: "Open-weight release traction", probability: 88, status: "Done" },
      { date: "06-18", title: "In-app agent commerce pilot", probability: 76, status: "In Progress" },
      { date: "07-30", title: "Outcome-based ad pricing test", probability: 64, status: "Upcoming" },
    ],
    outlook: {
      trend: "Acceleration",
      detail: "Ecosystem gravity compounding as open models close the frontier gap.",
      momentum: 84,
    },
    validation: [
      { channel: "Commercial", verdict: "Ad engine reuse validates agent unit economics.", strength: "Strong" },
      { channel: "Monetization", verdict: "Messaging commerce take-rate emerging positive.", strength: "Moderate" },
      { channel: "Capital Market", verdict: "Reframing capex as inference utility supported.", strength: "Moderate" },
    ],
    positionEvolution: {
      steps: [
        { label: "Attention platform", state: "past" },
        { label: "Open-model distributor", state: "current" },
        { label: "AI-agent commerce layer", state: "future" },
        { label: "Default inference utility", state: "future" },
      ],
      detail: "Trajectory: from feed ranking toward agent-mediated commerce and inference supply.",
    },
    recommendedActions: [
      { title: "Ship reference agents", detail: "Capture the developer surface so Llama becomes the default." },
      { title: "Monetize DMs", detail: "Turn WhatsApp & Instagram messaging into transactional commerce." },
      { title: "Re-price ads on outcomes", detail: "Move from impressions to AI-optimized outcome pricing." },
      { title: "Frame capex as a moat", detail: "Position infra spend as an inference utility rivals must rent." },
    ],
  },

  // ─────────────────────────────────────────── NVIDIA
  {
    id: "nvidia",
    subject: "NVIDIA",
    kind: "AI Compute Platform",
    computedAt: "09:41:23 UTC+8",
    accentEmerald: "#059669",
    accentNeon: "#00ffc2",
    executiveSummary:
      "NVIDIA's monetization is shifting from selling chips to renting an AI factory — the 30-day window favors deepening the CUDA-to-cloud full-stack lock-in.",
    currentPosition: {
      statement: "Dominant compute + software moat; concentration and custom-silicon are the risks.",
      rank: "No. 1",
      percentile: "Top 1% of value chain",
    },
    timeWindows: [
      { span: "7D", label: "7 Days", focus: "Supply allocation & backlog signals." },
      {
        span: "30D",
        label: "30 Days",
        focus: "Full-stack (CUDA + networking + cloud) bundling.",
        emphasis: true,
      },
      { span: "90D", label: "90 Days", focus: "Enterprise AI-factory recurring revenue." },
      { span: "180D", label: "180 Days", focus: "Defend against custom accelerators." },
    ],
    bestStrategy: {
      headline: "Sell the AI factory, not the chip",
      detail:
        "Bundle GPUs with CUDA, networking, and cloud into a rentable full-stack AI factory to convert one-time hardware sales into recurring platform revenue and deepen switching costs.",
    },
    keyEvents: [
      { date: "05-28", title: "Next-gen platform ramp", probability: 90, status: "Done" },
      { date: "06-22", title: "Enterprise AI-factory offering", probability: 78, status: "In Progress" },
      { date: "08-05", title: "Sovereign & enterprise cloud deals", probability: 68, status: "Upcoming" },
    ],
    outlook: {
      trend: "Acceleration",
      detail: "Demand outpaces supply; software moat widens the platform premium.",
      momentum: 91,
    },
    validation: [
      { channel: "Commercial", verdict: "Backlog and design-ins confirm durable demand.", strength: "Strong" },
      { channel: "Monetization", verdict: "Software + networking attach lifting margin mix.", strength: "Strong" },
      { channel: "Capital Market", verdict: "Platform narrative sustaining valuation premium.", strength: "Moderate" },
    ],
    positionEvolution: {
      steps: [
        { label: "GPU vendor", state: "past" },
        { label: "Full-stack platform", state: "current" },
        { label: "Rentable AI factory", state: "future" },
        { label: "AI compute utility", state: "future" },
      ],
      detail: "Trajectory: from component supplier toward the metered utility layer of AI compute.",
    },
    recommendedActions: [
      { title: "Bundle the full stack", detail: "Sell CUDA + networking + cloud together to raise switching costs." },
      { title: "Launch AI-factory rental", detail: "Convert hardware sales into recurring platform revenue." },
      { title: "Lock enterprise roadmaps", detail: "Multi-generation commitments to blunt custom-silicon threats." },
      { title: "Expand sovereign cloud", detail: "Capture national and enterprise AI build-outs early." },
    ],
  },

  // ─────────────────────────────────────────── CORNING
  {
    id: "corning",
    subject: "Corning",
    kind: "Advanced Materials",
    computedAt: "09:40:45 UTC+8",
    accentEmerald: "#059669",
    accentNeon: "#00ffc2",
    executiveSummary:
      "Corning's overlooked monetization path is the AI data-center optical build-out — the 180-day window rewards repositioning glass IP as critical AI infrastructure.",
    currentPosition: {
      statement: "Deep materials IP under-credited versus the AI infrastructure it enables.",
      rank: "Top 10",
      percentile: "Top 15% of value chain",
    },
    timeWindows: [
      { span: "7D", label: "7 Days", focus: "Optical connectivity order flow." },
      { span: "30D", label: "30 Days", focus: "Hyperscaler fiber design-ins." },
      { span: "90D", label: "90 Days", focus: "Capacity commitments for AI fabric." },
      {
        span: "180D",
        label: "180 Days",
        focus: "Re-rate glass IP as AI infrastructure.",
        emphasis: true,
      },
    ],
    bestStrategy: {
      headline: "Reposition optical & glass IP as core AI infrastructure",
      detail:
        "Tie the optical connectivity and specialty glass portfolio directly to the AI data-center build-out, converting a materials narrative into an AI-infrastructure multiple.",
    },
    keyEvents: [
      { date: "05-15", title: "Optical connectivity demand surge", probability: 82, status: "Done" },
      { date: "06-30", title: "Hyperscaler fiber capacity deal", probability: 70, status: "In Progress" },
      { date: "08-20", title: "AI-infra segment re-rating", probability: 60, status: "Upcoming" },
    ],
    outlook: {
      trend: "Acceleration",
      detail: "AI fabric demand pulling optical volumes ahead of prior cycles.",
      momentum: 73,
    },
    validation: [
      { channel: "Commercial", verdict: "Optical order book confirms AI-driven pull.", strength: "Moderate" },
      { channel: "Monetization", verdict: "Mix shift toward higher-value optical products.", strength: "Moderate" },
      { channel: "Capital Market", verdict: "AI-infrastructure re-rating still emerging.", strength: "Emerging" },
    ],
    positionEvolution: {
      steps: [
        { label: "Materials supplier", state: "past" },
        { label: "Optical component leader", state: "current" },
        { label: "AI-fabric infrastructure", state: "future" },
        { label: "Strategic AI-infra partner", state: "future" },
      ],
      detail: "Trajectory: from specialty materials toward recognized AI-infrastructure supplier.",
    },
    recommendedActions: [
      { title: "Bundle optical for AI", detail: "Package connectivity specifically for AI data-center fabric." },
      { title: "Lock capacity deals", detail: "Secure multi-year hyperscaler fiber commitments." },
      { title: "Re-segment the story", detail: "Report an AI-infrastructure segment to earn the re-rating." },
      { title: "Deepen design-ins", detail: "Embed glass IP early into next-gen optical roadmaps." },
    ],
  },
];

export function getCase(id: string): VEAResultPackage | undefined {
  return CASES.find((c) => c.id === id);
}

/**
 * Generic package generated for free-text / uploaded inputs, so the demo always
 * delivers a plausible Result Package regardless of what the user computes.
 */
export function genericPackage(subject: string): VEAResultPackage {
  const name = subject.trim() || "Your Value Subject";
  return {
    id: "generic",
    subject: name,
    kind: "Technical Asset",
    computedAt: "just now",
    accentEmerald: "#059669",
    accentNeon: "#00ffc2",
    executiveSummary: `${name}'s strongest near-term monetization path is to concentrate its technical assets on the single highest-probability value window and validate fast.`,
    currentPosition: {
      statement: "Differentiated technical asset with an under-exploited monetization surface.",
      rank: "Emerging",
      percentile: "Top 25% of value chain",
    },
    timeWindows: [
      { span: "7D", label: "7 Days", focus: "Confirm the sharpest demand signal." },
      { span: "30D", label: "30 Days", focus: "Run a focused monetization pilot.", emphasis: true },
      { span: "90D", label: "90 Days", focus: "Convert the pilot into recurring revenue." },
      { span: "180D", label: "180 Days", focus: "Compound into a defensible position." },
    ],
    bestStrategy: {
      headline: "Concentrate on one high-probability value window",
      detail:
        "Focus scarce resources on the single monetization path with the highest computed probability, then validate commercially before broadening.",
    },
    keyEvents: [
      { date: "T+7", title: "Demand signal confirmed", probability: 74, status: "In Progress" },
      { date: "T+30", title: "Monetization pilot live", probability: 66, status: "Upcoming" },
      { date: "T+90", title: "Recurring revenue proof", probability: 58, status: "Upcoming" },
    ],
    outlook: {
      trend: "Stable",
      detail: "Momentum builds once the first value window is validated.",
      momentum: 61,
    },
    validation: [
      { channel: "Commercial", verdict: "Early demand supports the primary path.", strength: "Moderate" },
      { channel: "Monetization", verdict: "Pricing model to be validated in pilot.", strength: "Emerging" },
      { channel: "Capital Market", verdict: "Re-rating follows proof of recurring revenue.", strength: "Emerging" },
    ],
    positionEvolution: {
      steps: [
        { label: "Technical asset", state: "current" },
        { label: "Validated product", state: "future" },
        { label: "Recurring platform", state: "future" },
        { label: "Value-chain position", state: "future" },
      ],
      detail: "Trajectory: from raw technical asset toward a defensible value-chain position.",
    },
    recommendedActions: [
      { title: "Pick one window", detail: "Commit to the highest-probability monetization path first." },
      { title: "Validate commercially", detail: "Prove willingness-to-pay before scaling." },
      { title: "Instrument signals", detail: "Track the events that move your position." },
      { title: "Compound advantage", detail: "Reinvest early wins into a defensible moat." },
    ],
  };
}
