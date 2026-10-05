# Eric Nguyen: Open Desk

A bilingual personal portfolio for Eric Nguyen / Nguyễn Khánh Trình. A calm, tactile desk leads into a branching scroll journey through projects, research, unfinished ideas, and personal notes.

The hero introduces Eric once. Scroll clears the introduction while retaining the original desk on the right, then enters the work. Folders open, scope moves aside, and research paths separate as each scene unfolds. Follow the default route or choose a connected thought to redirect it. Full stories open in reading popups; closing them resumes the same position. Reduced motion presents static vertical pages.

## Run locally

Requires Node.js 22.12+ and npm.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173.

```sh
npm run build
npm run preview -- --port 4173
```

The production output is `dist/`. It can be served by a static host. No account, server-side secret, or backend is required. This initial delivery is local and has not been deployed.

## Content and design

- `docs/design-brief.md`: purpose, selected concept, content truth boundaries, design choices, and acceptance criteria.
- `src/content.ts`: complete English and Vietnamese copy, public contact destinations, and related-note links.
- `src/scenes.ts`: concise scene copy, graph connections, and route rules.
- `src/Journey.tsx`: scroll scenes, branch selection, keyboard movement, and reduced-motion flow.
- `src/journey.css`: scene composition and responsive layouts.
- `src/SceneArt.tsx` and `src/scene-art.css`: bilingual illustrations and scene-specific scroll motion.
- `src/tokens.css`: appearance tokens.
- `src/styles.css`: tactile objects and responsive composition.
- `src/App.tsx`: desk entry points, native reading dialogs, language/appearance settings, and hash navigation.

Examples of shareable entries: `/#open/dfriend`, `/#open/research`, `/#open/idea`, and `/#open/pilot`.

All fonts are served locally. The desk objects are native interface illustrations, not screenshots or claims about Eric's physical room. The financial-agent paper is marked work in progress, and agent-improve-agent is marked an unbuilt idea.

## Verify

With the local server running and Google Chrome installed:

```sh
npm run typecheck
npm run verify
npm run capture
```

The browser checks cover actual scroll transforms, default/branch routes, reverse scrolling, popup resume, keyboard focus, related entries, direct links, bilingual preferences, light/dark appearance, reduced motion, contacts, and seven viewport widths. The accessibility check uses Axe WCAG 2 / 2.1 AA rules. Screenshots and machine-readable reports are written to the ignored `artifacts/` folder.

`PORTFOLIO_BASE_URL` optionally points the verification script at a production preview. Lighthouse is installed as a development tool and can be run against that preview.

For motion diagnostics, run `node scripts/profile-scroll.cjs` against the production preview. `node scripts/verify-motion.cjs` checks pause/resume during an active transition, reverse wheel input, and branching on desktop/mobile. Visual transforms follow a damped spring; document scrolling remains native.

`node scripts/verify-desk.cjs` checks desk parallax, combined hover/keyboard motion, bilingual D-Friend website links, accessibility, and responsive layouts. The D-Friend scene and reader link to `https://www.dfriend.online/`.

Implementation references: [Vite](https://vite.dev/guide/), [Motion useScroll](https://motion.dev/docs/react-use-scroll), [Motion reduced motion](https://motion.dev/docs/react-use-reduced-motion), and [native dialog semantics](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog).
