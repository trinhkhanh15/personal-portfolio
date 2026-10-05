# Open Desk implementation plan

1. Record the agreed identity, audience, concept, voice, content statuses, and public links in the brief and a single memory update note.
2. Scaffold a small static React / TypeScript / Vite app. Add Motion, one icon family, and locally served Vietnamese-capable fonts.
3. Write complete English and Vietnamese content for projects, linked stories, the notebook, and contact.
4. Build an asymmetric introduction, tactile desk entry points, and a concise contact footer.
5. Add hash-addressed native reading dialogs, language/theme persistence, reduced-motion behavior, and responsive layouts.
6. Run TypeScript and production build. Verify key paths, keyboard behavior, content honesty, mobile dimensions, both languages, both themes, and reduced motion in a browser.
7. Fix concrete failures, document the final verification evidence, and leave the local preview running.

## Approved scroll redesign

- Keep Open Desk identity and all seven detailed bilingual stories.
- Replace the notes tabs with short scroll scenes. Keep vertical reading; replace repeated horizontal slides with small camera transitions and subject-specific illustration motion.
- Introduce Eric and his approach before D-Friend on the default route. Keep project shortcuts on the desk.
- Provide a default route plus connected-page branches that preserve the travelled prefix and replace the unread tail. Returning to a visited page creates no duplicate node.
- Desk objects start at their scene; detail buttons open existing popups. Closing restores route, position, and focus.
- Keep native document scrolling. Use Motion values for transforms, discrete state for route/current scene, and static vertical pages for reduced motion.
- Verify actual browser motion, branch/reverse behavior, popup resume, keyboard access, mobile reading space, preferences, and accessibility before delivery.
