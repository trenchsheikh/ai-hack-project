# AI Learning Lab

A brand-first, responsive AI learning and mini-hackathon experience. Temporary descriptive project name until the company name is chosen.

## Stack
- React 19 + Vite
- Google Material Web (`@material/web`)
- Google Material Symbols Rounded
- Browser-local progress and projects (prototype, no authentication or shared database yet)

## Develop
`npm install && npm run dev`

## Build
`npm run build`

## Routes
- `/` – landing page
- `/app` – dashboard
- `/app/learn` – lessons
- `/app/hackathons` – challenges
- `/app/build` – project idea form
- `/app/projects` – local project library

The 6 interactive lessons and 4 self-paced practice briefs are starter content, not claims of scheduled live events. Browser data is saved with localStorage. The Vercel SPA rewrite supports deep links.