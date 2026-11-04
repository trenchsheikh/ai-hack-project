# Fhilo — Where Potential Grows

Fhilo is an opportunity-led AI learning and building platform. It helps people explore industries, learn practical skills, create work in Fhilo Studio and build a portfolio. Organisations can prepare industry challenge briefs and support opportunities when the required infrastructure and approvals are in place.

Mission: Unlock Potential. Create Opportunity.

## App routes
- Public homepage: /
- For organisations: /organisations
- Learner home: /app
- Opportunities: /app/explore and /app/opportunities/:id
- Studio: /app/studio and /app/studio/:projectId
- Projects: /app/projects
- Learning: /app/learn
- Profile and portfolio: /app/profile
- Rewards: /app/rewards
- Organisation preview: /organisations/dashboard and /organisations/new

## What works
- Responsive learner and organisation journeys with Fhilo branding.
- Searchable, beginner-friendly practice challenges — none claim sponsor funding.
- Guided or independent entry into Studio.
- Editable concept builder with portfolio-style preview.
- Chat-first Studio Build with Plan / Build / Review prompts, optional image references, and a split-screen preview/code editor.
- HTML/CSS/JavaScript editing with sandboxed local preview; its CSP blocks external network access.
- CSV investigation and basic statistics; preview capped at 100 rows.
- Browser autosave, snapshots, version restore and JSON export.
- Self-paced learning and practice-completion statuses.
- Editable local profile, personalised opportunities, project portfolio.
- Organisation challenge draft editor; no actual publication.
- Sofia guided prompts. Live generative AI is disabled by default.
- The /api/build endpoint can generate self-contained HTML via Vercel AI Gateway when explicitly enabled; it is disabled by default and does not fabricate code when unavailable. Build chat history remains in local browser project storage.
- Automatic one-way import of old AI Lab browser projects and lesson progress.

## Explicit limitations before a real cohort launches
There is no shared identity or database connected: the Supabase integration is not active and there is no accessible Fhilo Supabase project or Vercel environment configuration. Project work, profiles and drafts are stored ONLY in the current browser. They are not real cross-device accounts, team workspaces or persistent server submissions.

There is no live judging, confirmed prize pool, wallet custody, stablecoin transfer or funded sponsor partnership in this preview. Rewards show zero and wallet setup is disabled.

Sofia uses local guided prompts unless the live service is enabled. Studio Build provides the chat-first interface, manual code editing and an immediate sandboxed preview; AI code generation will report unavailable until the backend is deliberately enabled. The server-only /api/sofia endpoint requires a gateway credential and an explicit switch; keep it disabled until user authentication, abuse prevention, rate limits, spend ceilings and privacy controls are implemented.

## Run locally
1. npm install
2. npm run typecheck
3. npm run build
4. npm run dev

The project remains Vite + React with shadcn-compatible paths. A Next.js migration isn't required.

## Production activation plan
1. Provision and connect a dedicated backend; configure browser-safe Supabase URL and publishable key only (never service-role credentials). Add authentication and organisation role enforcement.
2. Persist profiles, projects, versions, submissions and challenge membership securely with row-level security and private storage. Migrate browser-only data with user consent.
3. Develop the detailed analytics plan next: scoped event schemas, consent, minimum necessary data, retention limits, cohorts, validated learning measures and aggregated sponsor reporting.
4. Configure authenticated Sofia, request limits, server-side secrets, monitoring and model-cost controls.
5. Add sponsor verification, prize-funding controls, audited award records, legal rules and permitted payout providers before enabling stablecoin transfers.
6. Test accessibility, privacy, safeguarding, backup and live cohort workflows before a real pilot.

## Main source files
- src/FhiloApp.jsx — routes and state
- src/FhiloAppParts.jsx — learner experience
- src/FhiloStudio.jsx — editor, preview, versioning, Sofia UI
- src/FhiloOrg.jsx — organisation experience
- src/FhiloLanding.jsx — public landing page
- src/fhilo-data.js — starter content
- src/fhilo.css — visual system
- src/FhiloBrand.jsx and public/favicon.svg — brand
- api/sofia.js — disabled-by-default model API hook
- api/build.js — disabled-by-default AI code generation endpoint
- src/components/ui/ai-prompt-box.tsx — Studio Build prompt composer

The previous NexaCore and Studio Admin template attribution files remain in the repository.
