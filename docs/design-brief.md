# Eric Nguyen: Open Desk

Status: Open Desk concept retained; branching scroll journey implemented locally.
Updated: 2026-10-05, Asia/Ho_Chi_Minh.

## Purpose

A bilingual personal website for friends, the builder community, and founders who might want to collaborate. Visitors should understand Eric as a person through his choices, current work, questions, and interests, then feel comfortable starting a conversation. Eric bets on his own ability to learn and build more than on any single venture.

Public identity: Eric Nguyen / Nguyễn Khánh Trình.

## Selected concept: a desk left open

The site is a personal workspace with things left open, not a chronological biography. A visitor can simply scroll through short scenes or select a connected thought to change the route. Articles arrive from the right and leave to the left; within each scene, the paper stays still while its concise text moves upward as the visitor scrolls down. Detailed stories remain in separate reading popups.

The metaphor is a designed digital desk, not a claimed photograph of Eric's room. It does not require an operating-system simulation, a loader, a game, or a tutorial.

## Art direction

- Calm graphite environment, diffused light, spacious composition, and a mint accent. This palette is an implementation choice inferred from Eric's preferences, not an existing personal brand.
- A tactile, asymmetric arrangement of a project folder, research pages, an idea note, and a personal notebook. Objects carry meaningful content and state.
- Large, plain sans-serif typography; smaller monospace for useful annotations. Fonts must support Vietnamese and be hosted locally.
- Visual identity comes from the name, composition, desk objects, writing, and reactions to interaction. No invented slogan or inflated founder persona.
- Dark is the main art direction. A readable light option uses the same identity and object arrangement.
- Motion settings: DESIGN_VARIANCE 8, MOTION_INTENSITY 6, VISUAL_DENSITY 3.

## Information architecture

### Introduction

Eric's name and a short, natural introduction. The first screen establishes that he builds products, experiments with agents, and learns through trying. A view of the open desk gives immediate access to the work.

### On the desk

Four objects are primary entry points:

1. D-Friend folder: founder; EdTech product in pilot. Explore why it started and what changed.
2. Financial-agent research pages: tech lead, first time writing a paper, work in progress, no demo or reported findings.
3. Agent-improve-agent note: an early idea, not a built system or validated general capability.
4. Personal notebook: games, films, working preferences, stack, and learning habits.

Each object has a concise preview and keyboard-accessible action that starts the scroll journey at that subject. Every scene has a separate full-story button for the existing reading dialog. Direct hashes can open all seven detailed entries. The four desk objects remain the personal identity and entry points; the journey carries the main exploration.

The D-Friend scene and its detailed reader provide an external link to https://www.dfriend.online/. The product site opens in a separate tab; selecting the desk folder continues to explore the portfolio.

### Things Eric has reconsidered

Three connected scenes, with full detail available in the reader:

- At 17: devoted three months to learning algorithms for the national competition, made a costly graph-problem mistake, carried the disappointment into the second day, and received no award. His initial reaction was to see the system as unfair. Looking back, the story must acknowledge his own mistake. Do not present a hypothetical second/third prize as a lost achievement or say the exam proves education is unfair.
- During D-Friend: a more sophisticated multidimensional score was still a score. This led him to think about a learning environment and philosophy instead.
- During pilot: shipping the student side before the teacher side made the first pilot poorly structured. Shipping the teacher side for a second pilot exposed an oversized scope. Burnout and scope reduction made the question of what to test, cost, latency, and runway more concrete.

These are selectively honest stories. Omit private family details, health measurements, gratuitous swearing, and intimate information. The voice remains human and direct.

### Scroll route and branches

Default route: D-Friend → pilot → financial-agent research → agent-improve-agent idea → personal notebook → contact.

An optional branch from D-Friend visits the competition at 17 and rethinking scores, then rejoins the pilot scene. Other related-page links let visitors redirect the unread part of their route. Choosing a previously visited node returns to that node without appending it again. Reverse scrolling follows the actual chosen route. Starting from a desk object creates a fresh route beginning at that object.

Each scene contains a title, two concise paragraphs (roughly 60–100 English words), a small illustrative object, a full-story button, and related-page choices. No click is required to continue along the default route. Next/previous buttons and a visible route strip support keyboard use and direct movement.

### Off the desk / connection

Brief interests appear in the notebook: The Godfather, Interstellar, Sekiro unfinished, Hollow Knight and Silksong completed, technology, quiet spaces, music according to mood. Do not use interests as evidence of personality traits or use copyrighted art as the site's identity.

One main invitation to email. Secondary public links:

- Email: trinhkhanh15082007@gmail.com
- GitHub: https://github.com/trinhkhanh15
- Instagram: https://www.instagram.com/ericnguyen_in/
- LinkedIn: https://www.linkedin.com/in/etnguyen1508/

## Research content contract

The paper compares a single-shot LLM, a fixed financial-research pipeline, and a bounded autonomous agent, with controlled inputs, model snapshot, output schema, feedback history, resource ceilings, and data interfaces. The pipeline and agent share callable tools. Proposed forecasts are sector-adjusted U.S. equity returns at 1, 5, and 20 trading days. Proposed evaluation covers matching score, calibration, latency, and cost, with blinded LLM quality scoring and a four-person human audit as secondary evidence. A frozen time-gated corpus is primary, a smaller forward study tests external validity. These are study plans, not results. Do not claim publication, peer review, predictive performance, or a trading strategy.

The agent-improve-agent direction asks whether a root agent could improve other agent systems. It is an untested idea. Domain transfer and reliable target-system evaluation remain open questions.

## Language and voice

Vietnamese and English have full content parity. English should be idiomatic rather than a word-for-word translation. Vietnamese uses friendly, direct first-person writing with 'mình'. No resume prose, generic motivational declarations, invented metrics, or testimonials. The visitor can switch language without losing the selected object. Remember a manually selected language; otherwise default to English regardless of browser language.

## Interaction and accessibility

- Native document scrolling drives a sticky scene frame. Reading and horizontal transition occupy separate phases; no wheel interception or nested scroll area is used for the short scenes.
- Each scene has 180 viewport heights of document travel. The last 38% of that distance handles its transition, with smooth acceleration/deceleration. A damped spring follows scroll progress for visual transforms; the document itself remains native. Opening a popup freezes the spring, including when it is still settling.
- Hover/focus offers feedback; all meaningful actions also work on touch and keyboard.
- Desk parallax uses the full section height as its scroll range. Hover/keyboard lift is added to the current scroll transform through one composed spring animation, avoiding competing transform owners. Reduced motion retains the static desk arrangement.
- Dialogs use native focus containment, Escape, close buttons, and focus restoration. Background scroll is locked while reading. Closing resumes the same scene, chosen path, and document position.
- Small screens show a usable compact desk with accessible object titles and a natural vertical reading flow; objects must not be clipped or overlap the navigation.
- Reduced motion presents static pages in normal vertical flow, with complete text, branch choices, and detail actions.
- No autoplay music, custom cursor, hidden navigation, analytics, contact backend, or broken external links.

## Implementation

React + TypeScript + Vite, native CSS tokens, Motion for scroll and interaction, one icon family, locally served fonts. All copy resides in typed bilingual content files. The site is static and can be deployed as the generated dist folder; deployment is outside this initial local build.

## Acceptance

1. Production build and TypeScript checks pass.
2. Desktop and mobile layouts are inspected in a real browser.
3. Scroll-only default navigation, optional branches, reverse scrolling, and keyboard movement work. Every scene opens its detailed entry, closes without losing position, and can be reached directly through a popup hash.
4. Full language switching and saved preferences work.
5. Keyboard focus, Escape, reduced-motion, and light/dark appearance work.
6. Public contact links match the provided values.
7. Research and idea statuses remain honest, and no unsupported results appear.
8. A running local preview is opened for Eric, with limitations stated precisely.

Local implementation and verification evidence is recorded in `docs/verification.md`. The native preview-open request was queued by the app; the local URLs also work directly in a browser.
