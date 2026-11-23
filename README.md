<div align="center">

# GymAura — Train with Intention

**A responsive workout and nutrition planning website that builds a weekly fitness routine around your goals, experience, equipment, and available time.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Hosted_on-Vercel-000000?style=flat&logo=vercel&logoColor=white)
![No Build Step](https://img.shields.io/badge/Build_step-none-c6ff00?style=flat)

[**Live Demo →**](https://gymaura-sumit.vercel.app/)

</div>

---

## Overview

GymAura is a UI/UX portfolio project by **Sumit Raj**. It pairs an expressive visual identity (charcoal backgrounds, neon-lime accents, bold typography, large fitness photography) with interactive planning tools, so users can go from exploring fitness goals to a full weekly routine and meal ideas in just a few steps, with no account required.

## Features

### 🏋️ Personalized Workout Planner
- Choose between **strength**, **endurance**, and **mobility** goals.
- Customize routines by experience level, training schedule, equipment, and session duration.
- Generate a **seven-day schedule** with training and recovery days.
- Mark exercises as complete and track progress with visual indicators.
- Save plans in the browser and **export them as text**.

### 🥗 Nutrition Planner
- Explore **balanced, vegetarian, and vegan** meal examples.
- Swap meals and see updated nutrition estimates.
- Download a **shopping list** for the selected meals.

### ✨ Interactive Experience
- Immersive fitness imagery and locally hosted gym videos.
- Scroll reveals, animated typography, parallax imagery, and interactive card effects.
- Workout-duration slider with visual feedback.
- Responsive layouts for desktop and mobile.
- Keyboard controls, accessible form labels, video pause controls, and reduced-motion support.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Semantic page structure, forms, dialogs, and video elements |
| CSS3 | Custom styling, responsive layouts, transitions, and animations |
| Vanilla JavaScript | Workout generation, meal selection, progress tracking, and UI interactions |
| Web Storage API | Saving plans in the current browser |
| Google Fonts | Barlow Condensed and DM Sans typography |
| WebP and MP4 | Image and video assets |
| Vercel | Live website hosting |

> GymAura is a **static frontend application**. It needs no package installation, build step, backend server, database, or API keys.

## UI/UX Design

The user journey moves from **exploring goals → creating a weekly routine → selecting meal ideas**. Short forms, immediate feedback, and account-free access keep planning straightforward. Primary actions and progress states use lime so the next step is always easy to spot.

Key design considerations:

- **Visual hierarchy:** prominent headings and clear calls to action.
- **Consistency:** shared colors, spacing, buttons, and card treatments.
- **Interaction feedback:** selected states, progress indicators, and slider feedback.
- **Responsive design:** layouts that adapt to smaller screens.
- **Accessibility:** semantic controls, keyboard interaction, and reduced-motion preferences.

## Getting Started

### Run locally

1. Download and extract the project, or clone the repository:
   ```bash
   git clone (https://github.com/SumitRaj511/GymAura.git)
   cd gymaura
   ```
2. Open a terminal in the GymAura folder that contains `dist`.
3. Start a local static server with Python:
   ```bash
   python -m http.server 8000 --directory dist
   ```
   On systems where Python uses the `python3` command:
   ```bash
   python3 -m http.server 8000 --directory dist
   ```
4. Visit [http://localhost:8000](http://localhost:8000) in your browser.

Alternatively, serve the `dist` folder with a static-server extension such as **VS Code Live Server**.

## Project Structure

```text
.
├── dist/
│   ├── index.html    # Page structure, content, and planner controls
│   ├── styles.css    # Visual styling, responsive layouts, and animations
│   ├── app.js        # Planning logic, progress, local storage, downloads, video controls
│   └── assets/       # Fitness images and video files
└── README.md         # Project overview and setup instructions
```

## How It Works

Users enter their preferences, and JavaScript builds a routine from predefined exercises and schedules. Meal selections update the displayed nutrition estimates and shopping list. Saved plans stay in the current browser via `localStorage`.

### Limitations

- The planner uses **predefined rules**; it does not call an AI model.
- Saved data **does not sync across devices**.
- Workouts and meal examples are **illustrative**, and nutrition values are approximate. Individual calorie targets and ingredient quantities are not calculated.

## Author

**Sumit Raj**

Built as a portfolio project showcasing frontend development, responsive interface design, and interactive user experiences.
