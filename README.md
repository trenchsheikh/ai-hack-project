# AI Lab — learning and mini-hackathon platform

Responsive AI learning product built to help new learners explore AI via real-world lessons, practice mini-hackathons and personal projects.

## Product

- Landing (/): original NexaCore template layout and motion preserved, with our business copy
- Dashboard (/app): Studio Admin-inspired sidebar, progress based on actual learner activity
- Lessons (/app/learn): six practical lessons with completion tracking
- Mini-hackathons (/app/hackathons): four self-paced briefs linked to project creation
- Projects (/app/projects): create, edit, update stage, search and delete project ideas
- Progress (/app/progress): learning-path breakdown

## Framework

React 19 + Vite + Tailwind utilities + Lucide, with a standalone app-specific CSS layer.
We adapted the MIT-licensed Next/Shadcn template's visual patterns to the existing React app. Migrating the whole product to Next.js would add complexity without unlocking anything required for this frontend.

This is a browser-local prototype. Progress and projects continue to use the previous localStorage keys: ailab_lessons_v1, ailab_challenges_v1, ailab_projects_v1. There are no synced accounts, shared data or real-time bookings in this version.

## Run

npm install
npm run dev
npm run build

## Attribution

See ATTRIBUTION-NEXACORE.md and ATTRIBUTION-STUDIO-ADMIN.md for both original MIT-licensed designs.


## Reusable gradient cards

- Card source: `src/components/ui/gradient-card.tsx`
- App-specific demo: `src/components/ui/gradient-card-demo.tsx`
- Applied to lessons, mini-hackathons and the dashboard's discovery section.
- Animations: Framer Motion (respects reduced-motion preferences).
- Variants: `purple` (lavender), `gray` (slate/indigo), `green` (emerald/lime), `orange` (peach/coral).
- Photos: Unsplash-hosted public images. Cards remain readable without an image.
- Navigation uses the existing client-side router, preserving browser back/forward.

### shadcn/ui and TypeScript configuration

This Vite project already used Tailwind v3 and the alias `@` → `src`.
The component uses `src/components/ui`, not a root-level `/components/ui` folder,
because `@/components/ui` is resolved relative to `src` in this project.
`components.json`, `tsconfig.json` and the standard `cn` helper in
`src/lib/utils.ts` have been added for reusable, typed shadcn-style components.

Install with `npm install`, then run `npm run typecheck` and `npm run build`.
To generate **additional** shadcn/ui primitives later, run `npx shadcn@latest init`
(after reviewing its proposed changes to the existing Tailwind configuration),
then `npx shadcn@latest add button`. Do not scaffold a new Vite app over this repo.
