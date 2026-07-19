import { NextResponse } from "next/server";
import {
  getMarketCompanyByTicker,
  isAllowedTicker,
} from "@/lib/market-universe";

export const runtime = "nodejs";

const SEC_HEADERS = {
  Accept: "application/json",
  "Accept-Encoding": "gzip, deflate",
  "User-Agent":
    process.env.SEC_USER_AGENT ??
    "VEA Market Intelligence demo admin@vei-demo.vercel.app",
};

const RELEVANT_FORMS = new Set(["8-K", "10-Q", "10-K", "6-K", "20-F"]);
const REQUEST_TIMEOUT_MS = 8_000;

type SecSubmissions = {
  name: string;
  tickers?: string[];
  exchanges?: string[];
  filings?: {
    recent?: {
      accessionNumber?: string[];
      filingDate?: string[];
      form?: string[];
      primaryDocument?: string[];
      primaryDocDescription?: string[];
    };
  };
};

async function fetchSecJson<T>(url: string, revalidate: number): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        headers: SEC_HEADERS,
        signal: controller.signal,
        next: { revalidate },
      });

      if (response.ok) return (await response.json()) as T;

      lastError = new Error(`SEC request failed with status ${response.status}`);
      if (![403, 429, 500, 502, 503, 504].includes(response.status)) break;
    } catch (error) {
      lastError =
        error instanceof Error ? error : new Error("Unknown SEC request error");
    } finally {
      clearTimeout(timeout);
    }

    await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
  }

  throw lastError ?? new Error("SEC request failed");
}

export async function GET(request: Request) {
  const ticker = new URL(request.url).searchParams.get("ticker")?.toUpperCase();

  if (!ticker || !isAllowedTicker(ticker)) {
    return NextResponse.json(
      { error: "Ticker is not part of the VEA public market universe." },
      { status: 400 }
    );
  }

  const marketCompany = getMarketCompanyByTicker(ticker);
  if (!marketCompany) {
    return NextResponse.json({ error: "Company metadata is unavailable." }, { status: 404 });
  }

  const cik = String(marketCompany.cik).padStart(10, "0");
  const companyUrl = `https://www.sec.gov/edgar/browse/?CIK=${marketCompany.cik}&owner=exclude`;

  try {
    const submissions = await fetchSecJson<SecSubmissions>(
      `https://data.sec.gov/submissions/CIK${cik}.json`,
      300
    );
    const recent = submissions.filings?.recent;
    const forms = recent?.form ?? [];

    const filings = forms
      .map((form, index) => ({
        form,
        filingDate: recent?.filingDate?.[index] ?? "",
        accessionNumber: recent?.accessionNumber?.[index] ?? "",
        primaryDocument: recent?.primaryDocument?.[index] ?? "",
        description: recent?.primaryDocDescription?.[index] ?? "",
      }))
      .filter(
        (filing) =>
          RELEVANT_FORMS.has(filing.form) &&
          filing.accessionNumber &&
          filing.primaryDocument
      )
      .slice(0, 4)
      .map((filing) => ({
        form: filing.form,
        filingDate: filing.filingDate,
        description: filing.description || `${filing.form} filing`,
        url: `https://www.sec.gov/Archives/edgar/data/${marketCompany.cik}/${filing.accessionNumber.replace(/-/g, "")}/${filing.primaryDocument}`,
      }));

    return NextResponse.json(
      {
        company: submissions.name || marketCompany.name,
        ticker,
        exchange: marketCompany.exchange,
        filings,
        source: "SEC EDGAR",
        status: "live",
        companyUrl,
        fetchedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        company: marketCompany.name,
        ticker,
        exchange: marketCompany.exchange,
        filings: [],
        source: "SEC EDGAR",
        status: "unavailable",
        companyUrl,
        fetchedAt: new Date().toISOString(),
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
