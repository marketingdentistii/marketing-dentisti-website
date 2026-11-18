<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Linee guida contenuto (valgono su tutto il progetto)

Testo destinato a pazienti o clienti (kit, email, WhatsApp, sito, social, ads):

- **Non deve risultare scritto con l'AI.** Niente frasi sentenziose, brillanti o presuntuose; niente costrutti "non è X, è Y"; niente trio ritmiche "no X, no Y, no Z"; niente metafore inventate per effetto. Scrivere piano e concreto, come una persona che parla a un collega dello studio.
- Mai inventare numeri, statistiche o casi studio. Ciò che non è definito va tra `[PARENTESI]` come placeholder da compilare.
- Registro: "Lei" anche su WhatsApp e SMS; tono asciutto, senza enfasi marketing.

## Costi modelli (per l'agente)

- I subagent di review visiva/PDF usano modelli **economici con visione** (es. `openrouter/google/gemini-3.8-flash`). **Chiedere il permesso prima** di usare modelli premium (Claude Sonnet/Opus, GPT-5.x pro) per task ripetitivi o di review.
