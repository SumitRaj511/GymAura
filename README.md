# GymAura

A responsive fitness planning concept designed for Sumit Raj's UI/UX portfolio. The visual direction follows the supplied design reference: charcoal surfaces, neon lime, expressive typography, and large fitness photography.


## Run locally

No dependencies or build step are needed. Run `python -m http.server 8000 --directory dist` from this directory, then open http://localhost:8000.

## Features

- Workout routines for strength, endurance, and mobility with experience, schedule, equipment, and session-time controls.
- Seven-day training and recovery schedule, exercise completion, progress indicators, plan saving, and text export.
- Balanced, vegetarian, and vegan meal examples, alternative meals, recalculated nutrition estimates, and a downloadable shopping list.
- Two locally hosted gym clips, an immersive video dialog, and a background video with pause control.
- Sideways scroll reveals, staggered text transitions, scroll-linked hero typography, parallax photography, animated ticker, pointer-based card tilt, and reduced-motion support.
- Workout-time slider with a 6–24px growing fill, stronger glow, and five session-power levels from Reset to Peak.
- Responsive mobile layout, keyboard controls, native accessible form controls and dialogs.

## Design decisions

The landing page leads from motivation to training goals, then to a working planner. The meal planner brings nutrition into the same journey. Dark surfaces keep visual attention on photography and interactive state, while lime identifies primary actions and progress. Personalisation is deliberately short and requires no account.

This is a portfolio concept, not a real fitness company. It makes no fabricated customer or trainer claims. Workouts and meal estimates are illustrative, not clinical recommendations. The routine generator is deterministic and browser-local; it does not use AI or connect to a backend. Data is saved only in the current browser's local storage when saved. Plans do not sync between devices. Nutrition is approximate; ingredient quantities and individual calorie targets are not calculated.

## Files

- `dist/index.html` — page structure and accessible controls.
- `dist/styles.css` — visual system, responsive layouts, transitions, motion preferences.
- `dist/app.js` — workout generation, meal selection, progress, persistence, downloads, video controls.
- `dist/assets/` — optimised images and gym videos.
- `.openai/hosting.json` — static hosting configuration.

## Media

- Hero: the user-supplied reference at https://lightpink-eagle-586211.hostingersite.com/.
- Photography: Unsplash.
- Gym clips: Mixkit, “A young muscular man training at the gym with the battle ropes” (52079) and “Man training on the bars in the gym” (23450).
- Fonts: Barlow Condensed and DM Sans via Google Fonts; system font fallbacks included.

## Validation

JavaScript syntax checked with Node. Browser checks cover workout generation, completion, saved state after reload, diet filters, meal swaps, shopping-list content, video playback, desktop rendering, and a 390px mobile viewport. No dependencies, analytics, accounts, or external API keys are required.
