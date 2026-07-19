# VEI — Value Evolution Intelligence

**Upload Your Value. AI Continuously Finds and Executes Your Best Value Path.**

> 上传你的价值主体，AI 持续寻找并执行你的最佳价值实现路径。

VEI is **not** an analysis tool and **not** a consulting system. It is a
**continuously working AI agent**. This repository is the **Demo V0.1**
prototype — an AI‑native experience designed so a first‑time user understands
VEI in under 3 minutes.

---

## The 3‑minute story

The whole demo is just **three stages**:

1. **Upload** — Drop any material that represents your value subject (deck,
   business plan, website, GitHub, patents, financials…). No forms.
2. **AI Working** — The agent reasons on its own. Streaming status lines show it
   understanding the team, tech assets, business model, market, competition and
   time window, while the **VEI reasoning engine** lights up node by node.
3. **AI Execution** — It outputs a concrete plan: current value subject, best
   value path, time window, business model, and recommended actions — then keeps
   running under **Continuous Optimization**, updating the moment a better path
   appears.

Three built‑in cases (all **mock data**): **Meta**, **Marvell**, **AI Startup**.

---

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) · React 18 · TypeScript
- [Tailwind CSS](https://tailwindcss.com/) — dark, minimal, Apple/OpenAI style
- [Framer Motion](https://www.framer.com/motion/) — stage transitions & the
  "agent thinking" animations
- [lucide-react](https://lucide.dev/) — icons
- Deploy target: [Vercel](https://vercel.com/)

No database. No backend. All data is mock data in [`lib/cases.ts`](lib/cases.ts).

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Build for production:

```bash
npm run build
npm start
```

For live SEC EDGAR disclosures, create `.env.local` and identify the automated
client with a real contact email:

```bash
SEC_USER_AGENT="VEA Market Intelligence your-email@example.com"
```

Set the same variable in the Vercel project environment before deployment.

---

## Project structure

```
app/
  layout.tsx          # root layout + metadata
  page.tsx            # stage machine: upload → working → execution
  globals.css         # dark theme + ambient utilities
components/vei/
  Backdrop.tsx        # animated ambient background
  UploadStage.tsx     # stage 1 — upload value subject + live cases
  WorkingStage.tsx    # stage 2 — streaming status + reasoning chain
  ReasoningChain.tsx  # VEI 7-node reasoning visual
  ExecutionStage.tsx  # stage 3 — value path + continuous optimization
lib/
  cases.ts            # all mock data (Meta / Marvell / AI Startup)
docs/
  PRODUCT.md          # one-page product description
  FLOW.md             # product flow diagram
```

---

## The VEI reasoning framework (backend, illustrative)

```
Time → Event → State → Position → Value → Evolution → Advantage
```

In V0.1 this is **visualized only** — the demo animates the chain rather than
running real inference. See [`docs/PRODUCT.md`](docs/PRODUCT.md).

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).

---

## Acceptance criteria

V0.1 does **not** grade backend complexity, AI reasoning quality, or databases.
It passes if a first‑time user understands, within 3 minutes, that VEI is a
**continuously working AI agent** that uploads a value subject, understands it,
continuously finds the best value path, and continuously executes optimization.

> All numbers, financials and recommendations in this demo are **mock data** for
> illustration only. Not investment advice.
