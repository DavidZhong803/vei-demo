export const MARKET_UNIVERSE = {
  nvidia: { name: "NVIDIA", ticker: "NVDA", exchange: "Nasdaq", cik: 1045810 },
  amd: { name: "AMD", ticker: "AMD", exchange: "Nasdaq", cik: 2488 },
  arm: { name: "Arm", ticker: "ARM", exchange: "Nasdaq", cik: 1973239 },
  intel: { name: "Intel", ticker: "INTC", exchange: "Nasdaq", cik: 50863 },
  qualcomm: { name: "Qualcomm", ticker: "QCOM", exchange: "Nasdaq", cik: 804328 },
  tsmc: { name: "TSMC", ticker: "TSM", exchange: "NYSE", cik: 1046179 },
  micron: { name: "Micron", ticker: "MU", exchange: "Nasdaq", cik: 723125 },
  globalfoundries: { name: "GlobalFoundries", ticker: "GFS", exchange: "Nasdaq", cik: 1709048 },
  applied: { name: "Applied Materials", ticker: "AMAT", exchange: "Nasdaq", cik: 6951 },
  lam: { name: "Lam Research", ticker: "LRCX", exchange: "Nasdaq", cik: 707549 },
  kla: { name: "KLA", ticker: "KLAC", exchange: "Nasdaq", cik: 319201 },
  asml: { name: "ASML", ticker: "ASML", exchange: "Nasdaq", cik: 937966 },
  dell: { name: "Dell Technologies", ticker: "DELL", exchange: "NYSE", cik: 1571996 },
  hpe: { name: "Hewlett Packard Enterprise", ticker: "HPE", exchange: "NYSE", cik: 1645590 },
  supermicro: { name: "Super Micro Computer", ticker: "SMCI", exchange: "Nasdaq", cik: 1375365 },
  broadcom: { name: "Broadcom", ticker: "AVGO", exchange: "Nasdaq", cik: 1730168 },
  marvell: { name: "Marvell", ticker: "MRVL", exchange: "Nasdaq", cik: 1835632 },
  arista: { name: "Arista Networks", ticker: "ANET", exchange: "NYSE", cik: 1596532 },
  coherent: { name: "Coherent", ticker: "COHR", exchange: "NYSE", cik: 820318 },
  astera: { name: "Astera Labs", ticker: "ALAB", exchange: "Nasdaq", cik: 1736297 },
  amphenol: { name: "Amphenol", ticker: "APH", exchange: "NYSE", cik: 820313 },
  ciena: { name: "Ciena", ticker: "CIEN", exchange: "NYSE", cik: 936395 },
  lumentum: { name: "Lumentum", ticker: "LITE", exchange: "Nasdaq", cik: 1633978 },
  azure: { name: "Microsoft", ticker: "MSFT", exchange: "Nasdaq", cik: 789019 },
  aws: { name: "Amazon", ticker: "AMZN", exchange: "Nasdaq", cik: 1018724 },
  "google-cloud": { name: "Alphabet", ticker: "GOOGL", exchange: "Nasdaq", cik: 1652044 },
  oracle: { name: "Oracle", ticker: "ORCL", exchange: "NYSE", cik: 1341439 },
  coreweave: { name: "CoreWeave", ticker: "CRWV", exchange: "Nasdaq", cik: 1769628 },
  ibm: { name: "IBM", ticker: "IBM", exchange: "NYSE", cik: 51143 },
  vertiv: { name: "Vertiv", ticker: "VRT", exchange: "NYSE", cik: 1674101 },
  eaton: { name: "Eaton", ticker: "ETN", exchange: "NYSE", cik: 1551182 },
  hubbell: { name: "Hubbell", ticker: "HUBB", exchange: "NYSE", cik: 48898 },
  nvent: { name: "nVent Electric", ticker: "NVT", exchange: "NYSE", cik: 1720635 },
  snowflake: { name: "Snowflake", ticker: "SNOW", exchange: "NYSE", cik: 1640147 },
  palantir: { name: "Palantir", ticker: "PLTR", exchange: "Nasdaq", cik: 1321655 },
  servicenow: { name: "ServiceNow", ticker: "NOW", exchange: "NYSE", cik: 1373715 },
  datadog: { name: "Datadog", ticker: "DDOG", exchange: "Nasdaq", cik: 1561550 },
  cloudflare: { name: "Cloudflare", ticker: "NET", exchange: "NYSE", cik: 1477333 },
  mongodb: { name: "MongoDB", ticker: "MDB", exchange: "Nasdaq", cik: 1441816 },
} as const;

export type MarketCompanyId = keyof typeof MARKET_UNIVERSE;

export function isAllowedTicker(ticker: string) {
  const normalized = ticker.toUpperCase();
  return Object.values(MARKET_UNIVERSE).some(
    (company) => company.ticker === normalized
  );
}

export function getMarketCompanyByTicker(ticker: string) {
  const normalized = ticker.toUpperCase();
  return Object.values(MARKET_UNIVERSE).find(
    (company) => company.ticker === normalized
  );
}
