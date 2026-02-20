\# Project Context



This project uses:



\- Vite 6

\- React 19

\- TypeScript 5

\- Sanity v4

\- framer-motion 11

\- Deployed on Vercel using `vite build`



The goal is to evolve the UI safely without breaking production.



---



\## Core Safety Rules



\- Always ensure changes are compatible with existing dependencies.

\- Never introduce new libraries unless explicitly requested.

\- Never modify configuration files (vite.config.ts, tsconfig.json) unless explicitly requested.

\- Never refactor unrelated files.

\- Ensure `vite build` will succeed.



---



\## UI / Styling Changes



If the user requests visual changes (animations, transitions, styling):



\- You may modify styles, animation logic, or framer-motion usage.

\- Do NOT change structural layout unless explicitly requested.

\- Do NOT alter component hierarchy unless necessary.

\- Preserve existing spacing, grid systems, and layout behavior.

\- Avoid breaking responsive behavior.



If unsure whether a change affects layout, ask first.



---



\## React Rules



\- Use valid ES module imports.

\- Never generate invalid import syntax.

\- Respect React 19 conventions.

\- Do not add unnecessary imports.



---



\## TypeScript Rules



\- Ensure strict compatibility.

\- Respect existing path aliases.

\- Do not change module resolution.



---



\## Sanity Rules



The folder `/sanity/` contains:



\- `client.ts` → required for production build. Do not modify unless explicitly requested.

\- `proposal.schema.ts` → auxiliary schema file used manually for Studio deployment.



You may modify `proposal.schema.ts` only when the user explicitly requests schema changes.

Never delete it.

Never modify it as part of unrelated refactors.



---



\## Precision Mode



If the user says:

"Do not break layout"

or

"Do not break build"



Operate in strict safe mode:

\- Minimal changes

\- No refactors

\- No structural changes



---



\## Experimental Mode



If the user says:

"EXPERIMENTAL MODE"



You may:

\- Propose architectural improvements

\- Create new files

\- Suggest structural changes


## Two-Step Reasoning Rule

Before writing or modifying code:

1. First explain the reasoning.
2. Then show the exact changes.
3. Clearly separate explanation from code.

Never directly modify code without explaining the impact first.

Before suggesting code, mentally simulate:
- TypeScript validation
- Vite production build
If there is any risk of failure, explain it first.

