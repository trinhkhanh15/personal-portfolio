# Local delivery verification

Updated 2026-10-05, Asia/Ho_Chi_Minh. The portfolio runs locally at http://127.0.0.1:4173/. It has not been deployed to a public host.

## Identity and motion redesign

The hero introduces Eric / Nguyễn Khánh Trình in one short paragraph. The repeated introduction scene and its miniature desk have been removed. On desktop the original right-hand desk stays in place while the left intro clears; reverse scrolling restores the intro. The journey proceeds directly through D-Friend → pilot → research → idea → notebook. Project objects on the desk still start directly at their subjects.

The repeated full-width horizontal slides have been replaced by small camera shifts, scale, and fades. The outgoing text clears before incoming text appears. Illustrations follow the subject: workspace objects reveal, a D-Friend folder opens, extra scope moves aside, three research conditions separate, and an unbuilt question is placed on the desk. Native scrolling drives Motion values through a damped spring; no wheel interception or per-frame React state drives the animations. Each scene retains 180vh of travel, with its final 24% reserved for a transition.

## Checks

- `npm run build`: TypeScript and Vite passed on the final source.
- `npm run verify`: passed against the production preview after the single-intro, retained-desk, semantic-motion, and reduced-motion contrast changes. Evidence: `artifacts/browser-verification.json`.
- The full suite covers the five-scene scroll route, reverse scrolling, keyboard branches, preserving travelled history, returning without duplicates, next/previous navigation, and desk shortcuts.
- All seven detailed popup hashes work. Opening a popup freezes ongoing illustration motion; closing restores the exact scroll position, route, scene, and originating button focus.
- English remains the default on fresh visits, including a Vietnamese browser locale. Manual language and appearance choices persist; language switching in the reader retains the selected entry.
- All five scenes retain reading space and visible action buttons at 320, 390, 600, 768, 900, 1024, and 1440 pixels, with no horizontal document overflow. Mobile checks use 844px height; other responsive checks use 800px height.
- Axe WCAG 2 / 2.1 AA passes for the hero and D-Friend scene in both appearances, the Vietnamese research reader, and the branched static reduced-motion route. Automated checks do not amount to a complete accessibility certification.
- Reduced motion presents complete static pages and illustration end states. The low-contrast labels on discarded sheets disappear as the sheets fade; complete explanations remain in the scene text.
- Exact email and D-Friend link destinations were checked; no runtime errors were recorded.

`node scripts/verify-motion.cjs` checks that outgoing and incoming text do not strongly overlap at two transition positions, then verifies active-motion popup freeze, unchanged scroll on resume, reverse wheel input, and branching at 1440px and 390px. Evidence: `artifacts/motion-verification.json`.

`node scripts/verify-desk.cjs` passed after the retained-desk change: gradual parallax, composed hover/keyboard lift, bilingual external product links, reader Axe checks, seven desk viewport widths, and static reduced-motion desk behavior. Evidence: `artifacts/desk-verification.json`.

## Visual evidence

Desktop screenshots for all five default scenes, mobile Vietnamese scenes in dark/light, and a camera transition were inspected. `npm run capture` refreshes the ignored `artifacts/` images. The current in-app browser was refreshed to the new production build and opened at the hero.

`node scripts/profile-scroll.cjs` records a controlled 180px wheel input through a D-Friend transition in `artifacts/motion-contextual.json`, sampling vertical travel, scale, opacity, and frame intervals. It is a local diagnostic, not a guarantee across devices or scroll gestures.

## Previous measurements

The earlier horizontal-slide implementation scored 96 performance and 100 accessibility/best-practices/SEO in local Lighthouse mobile simulation, with LCP 2.3s, CLS 0, and total blocking time 20ms. These scores were measured before the identity/motion redesign and have not been remeasured for the current version. Evidence remains in `artifacts/lighthouse.json`.

The prior horizontal-motion traces (`motion-before.json`, `motion-after.json`) concern the superseded slide behavior and must not be used as measurements of the current transitions.
