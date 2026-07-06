import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-white/35 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md border border-vea-neon/30 bg-vea-neon/10 text-[10px] font-bold text-vea-neon">
            V
          </span>
          <span>VEA · Technical Monetization Computational Framework</span>
        </div>
        <p className="text-center">
          Demo prototype · All data is mock data for illustration only · Not
          investment advice.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/cases" className="transition-colors hover:text-white/70">
            Cases
          </Link>
          <Link href="/app" className="transition-colors hover:text-white/70">
            Try the Beta
          </Link>
        </div>
      </div>
    </footer>
  );
}
