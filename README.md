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
- Studio opens directly into a chat-first Build workspace (no three-card mode selection screen). Existing Build conversations resume automatically; New chat starts a fresh local project. A valid deep-linked project ID missing from this browser opens a new local workspace at the same URL with a clear no-sync notice; it does not restore unavailable remote data.
- Editable concept builder with portfolio-style preview.
- Chat-first Studio Build with Plan / Build / Review prompts, optional image references and a centered welcome experience that becomes a split-screen chat/preview when work starts.
- Assistant reply actions: retry the last request, mark helpful/not helpful, copy or share a response. Feedback is saved only with the local project.
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
- src/FhiloApp.jsx — routes, state and a Studio error boundary
- src/StudioErrorBoundary.jsx — safe frontend fallback if Studio rendering fails
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
- src/components/ui/ai-actions.tsx — live chat message rendering and reply actions
- src/components/ui/actions.tsx, conversation.tsx, message.tsx — reusable UI primitives

The previous NexaCore and Studio Admin template attribution files remain in the repository.

The supplied ai-actions design was adapted to the existing Vite + React + TypeScript + Tailwind/shadcn-compatible project. It deliberately uses Fhilo avatars and native image handling instead of installing Next.js or showing static example messages.

## Studio frontend reliability
- Studio owns its own `Button` component, avoiding a runtime `ReferenceError` from an undefined component that previously blanked project routes.
- Visiting `/app/studio/:id` needs no live backend: existing locally saved projects load as before, and a valid unsaved UUID displays a new local Studio workspace without claiming to recover data from other browsers.
- The frontend error boundary shows a recovery view rather than a white screen if future Studio rendering errors occur.

## Compact Studio layout (no backend required)
- Studio Build has no page-level header. It uses the full available viewport; New chat is a compact action inside the chat panel, and Version history and Export are inside the Versions tab.
- Desktop Build fills the remaining viewport below the compact mode toolbar; conversation and code scroll within their own panes, so opening Studio does not require scrolling to reach the composer.
- Smaller screens keep the chat first and allow scrolling to the preview without hiding the composer.
- Create and Investigate mode workflows remain available; their longer forms can scroll normally.

- On mobile, a small floating navigation control retains sidebar access when the Studio Build header is absent.


## Public landing and waitlist (November 2026)
- Restored the November 3 cinematic Nexacore-based landing layout (moving background, blue wash, rounded floating white navigation, scrollytelling sections) in Fhilo branding, rather than replacing it with a new visual framework.
- Updated the messaging to address new learners without experience or connections and organisations hoping to widen access. Primary calls to action go to the waitlist.
- Elegant typography: DM Sans for interface/body, Instrument Serif for expressive headline accents.
- The first visit to `/` in a browser routes to `/waitlist`. After that visit, `/` displays the full restored landing. `/waitlist` remains reachable directly; visitors can choose to explore the public site.
- The waitlist design reuses the historic cinematic video background and dark blue overlay, with a gradient fallback if the video cannot load or reduced motion is preferred.
- `POST /api/waitlist` validates the email and explicit consent and stores one JSON record per normalized email in a **private Vercel Blob** store. A SHA-256 digest is used for file paths; no public read endpoint exists. Records contain email, selected interest, consent, source and update timestamp. Repeated submissions update the same record.
- The Blob store is connected to the Vercel project; `BLOB_READ_WRITE_TOKEN` stays exclusively on the server. The form reports storage failures rather than pretending to collect addresses.
- Basic best-effort serverless throttling and a honeypot are provided, but consider Vercel WAF/Turnstile before higher-volume promotion. A formal privacy/retention policy and an operational email-management workflow should be finalised before large-scale marketing.

## Public landing visual palette (revised)
- Restored the exact earlier November 4 cinematic landing structure: original floating navbar, hero video, purpose cards, comparison section, journey section, full-screen background treatments, call to action, and footer.
- Only recoloured the public landing to Fhilo logo blue `#0A43ED` and warm cream `#FAF7F0`, with monochrome treatment of existing media and restrained blue/cream overlays.
- Removed the small all-caps eyebrow above the main hero headline while retaining the headline, supporting text, and calls to action.
- Waitlist page, email-capture endpoint, studio, and organisation screens are not affected.
