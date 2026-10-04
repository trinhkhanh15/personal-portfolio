# Local delivery verification

The branching Open Desk website is implemented and running locally. It has not been deployed publicly. Updated 2026-10-05, Asia/Ho_Chi_Minh.

- Development: http://127.0.0.1:5173/
- Production preview: http://127.0.0.1:4173/
- Build: `npm run build` (TypeScript plus Vite), passed.
- Browser checks: `npm run verify` passed against development and the branching production preview; production evidence is recorded in `artifacts/browser-verification.json`. Subsequent focused motion/desk checks are recorded below.

## Verified behavior

- Scroll alone follows D-Friend → pilot → research → idea → notebook. Measured transforms confirm vertical text movement during reading and right-to-left paper movement during transitions. Reverse scrolling returns along the selected route.
- Selecting the competition-at-17 branch inserts seventeen/scores and rejoins pilot. Other branches preserve the travelled prefix and replace the unread continuation. A visited target returns to its existing position without duplication.
- Native keyboard activation works for branches and next/previous movement. Intentional scene navigation moves focus to the destination title.
- Desk objects start a route from their own subject. A full-story action opens the detailed native dialog.
- Popup scroll lock, native focus containment, Escape, and close actions work. Closing restores the originating detail button, chosen route, current scene, and document scroll position within one pixel.
- All seven direct popup hashes and related-entry navigation work. Language can change inside the reader without losing its selection.
- Language and theme preferences survive reload. A fresh Vietnamese browser locale selects Vietnamese.
- All five default scenes have usable reading space and visible detail actions at 320, 390, 600, 768, 900, 1024, and 1440 pixels. No horizontal document overflow was detected. All four desk routes and detail popups were activated on mobile.
- Reduced motion presents complete static vertical pages. Branch insertion, popup access, and accessibility checks pass in that mode.
- Axe WCAG 2 / 2.1 AA checks pass for the active journey in light/dark, the Vietnamese reader, and the reduced-motion route. These are automated checks, not a complete accessibility certification.
- Contact destinations match the supplied values. The browser run recorded no runtime errors or failed requests.

## Visual inspection

Inspected desktop scenes in English/dark and Vietnamese/light, a horizontal transition, the optional branch, detailed readers, the mobile Vietnamese/light scene, and mobile contact. The seven-width checks include an 800-pixel-high laptop viewport; mobile checks use 844 pixels of height.

## Lighthouse

Measured the branching production preview before the subsequent motion pacing refinement, using local headless Chrome and Lighthouse's default mobile simulation. These scores were not remeasured after that refinement:

| Category | Score |
| --- | --- |
| Performance | 96 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

LCP: 2.3 seconds. CLS: 0. Total blocking time: 20 ms. These are local lab measurements, not field data or measurements of a deployed domain. The newer optional agentic-browsing category scores 50 because the site does not provide llms.txt or an ARD schema; its accessibility-tree check passes.

Machine-readable evidence and screenshots are in the ignored `artifacts/` directory, including `browser-verification.json`, `lighthouse.json`, and the `journey-*.png` images. `npm run capture` refreshes the visual evidence.

The app queued the request to open the production preview. The local URL can also be opened directly.

## Motion pacing refinement

The original scroll mapping moved a full-width paper through a transition occupying only 27% of a 105vh scene. A single 180px wheel event moved the article 1,072px in one animation frame in a local 1440 × 900 Chrome trace. This reproduced the abrupt motion reported by Eric.

The scene now spans 180vh, with 38% allocated to a transition. A damped spring smooths transform updates and a smoothstep curve eases both ends of the transition. Tilt was reduced. Native wheel/touch document scrolling is preserved.

The same 180px wheel event on the final build moved the paper through 35 frames, with a largest frame step of 69px and 613px total horizontal travel. The trace's 95th-percentile frame interval was 16.8ms. This is one controlled local input sample, not a guarantee across all devices or scroll gestures. Evidence: `artifacts/motion-before.json` and `artifacts/motion-after.json`; reproduce with `node scripts/profile-scroll.cjs`.

The full browser suite passed with the new pacing and spring. The final popup-freeze guard was then checked separately at 1440px and 390px: opening during a moving transition freezes the animation, closing preserves document position, and reverse wheel/branch movement settle correctly. Build/TypeScript also passed on the final version. Evidence: `artifacts/motion-verification.json`; reproduce with `node scripts/verify-motion.cjs`. The currently open in-app preview was refreshed to the new build.

## Desk motion and product link

After the sticky desk was replaced by a one-viewport section, its original start/start–end/end scroll offsets left a zero-length range at 1440 × 900. A 120px wheel input consequently jumped the research paper directly from 0px/8° to −32px/13°.

The revised range covers the full section height, followed by a damped spring. The same input now moves the paper approximately −1.14px/8.18°. Hover/focus lift is composed with current parallax rather than overriding it. The paper returns to its current scroll pose on pointer exit; the old hover brightness filter and mobile transform overrides were removed.

`node scripts/verify-desk.cjs` passed on the production build: parallax, hover return, keyboard focus, bilingual product links, reader Axe checks, seven viewport widths, and static reduced motion. Evidence: `artifacts/desk-verification.json` and `artifacts/dfriend-link-mobile.png`. Build/TypeScript passed. The full journey suite was not rerun for this scoped desk/link change.

Both the D-Friend scene and its popup link to https://www.dfriend.online/ in a separate tab with `noopener noreferrer`. The destination was opened successfully with the web tool, redirecting to `/vi`. The local app queued a request to open the refreshed desk preview.
