# VEI — Product Flow

## User-facing flow (3 stages)

```mermaid
flowchart LR
    A([Upload<br/>value subject]) --> B([AI Working<br/>autonomous reasoning])
    B --> C([AI Execution<br/>best value path + actions])
    C --> D{{Continuous<br/>Optimization}}
    D -. new best path found .-> C
```

## Stage detail

```mermaid
flowchart TD
    subgraph S1[1 · Upload]
      U1[Deck / Plan / Website / GitHub / Patents / Financials]
    end
    subgraph S2[2 · AI Working - mock, animated]
      W1[Understand value subject]
      W2[Understand team & capability]
      W3[Understand technology assets]
      W4[Understand business model]
      W5[Understand industry & competition]
      W6[Read the current time window]
      W7[Search best value path]
      W8[Generate execution plan]
      W1 --> W2 --> W3 --> W4 --> W5 --> W6 --> W7 --> W8
    end
    subgraph S3[3 · AI Execution]
      E1[Value Subject]
      E2[Best Value Path]
      E3[Time Window]
      E4[Business Model]
      E5[Recommended Actions]
      E6[[Continuous Optimization loop]]
    end
    S1 --> S2 --> S3
```

## Backend reasoning engine (illustrative)

```mermaid
flowchart LR
    T[Time] --> Ev[Event] --> St[State] --> P[Position] --> V[Value] --> Evo[Evolution] --> Adv[Advantage]
```

> V0.1 visualizes this chain as animation only — no real inference is performed.
> All demo data is mock data.
