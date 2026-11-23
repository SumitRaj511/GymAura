GymAura — Train with Intention
A responsive workout and nutrition planning website that helps users build a weekly fitness routine around their goals, experience, equipment, and available time. Created as a UI/UX portfolio project by Sumit Raj, GymAura combines an expressive visual identity with interactive planning tools.
Live Demo
Explore GymAura →
Features
Personalized Workout Planner
- Choose between strength, endurance, and mobility goals.
- Customize routines by experience level, training schedule, equipment, and session duration.
- Generate a seven-day schedule with training and recovery days.
- Mark exercises as complete and view progress indicators.
- Save plans in the browser and export them as text.
Nutrition Planner
- Explore balanced, vegetarian, and vegan meal examples.
- Swap meals and view updated nutrition estimates.
- Download a shopping list for the selected meals.
Interactive Experience
- Immersive fitness imagery and locally hosted gym videos.
- Scroll reveals, animated typography, parallax imagery, and interactive card effects.
- Workout-duration slider with visual feedback.
- Responsive layouts for desktop and mobile screens.
- Keyboard controls, accessible form labels, video pause controls, and reduced-motion support.
Tech Stack
Technology	Purpose
HTML5	Semantic page structure, forms, dialogs, and video elements
CSS3	Custom styling, responsive layouts, transitions, and animations
Vanilla JavaScript	Workout generation, meal selection, progress tracking, and UI interactions
Web Storage API — localStorage	Saving plans in the current browser
Google Fonts	Barlow Condensed and DM Sans typography
WebP and MP4	Image and video assets
Vercel	Live website hosting


The project is a static frontend application. It requires no package installation, build step, backend server, database, or API keys.
UI/UX Design
GymAura's visual identity combines charcoal backgrounds, neon-lime accents, bold typography, and large fitness photography. Primary actions and progress states use lime to make the next step easy to identify.

The user journey moves from exploring fitness goals to creating a weekly workout routine and selecting meal ideas. Short forms, immediate feedback, and account-free access keep the planning experience straightforward.

Key design considerations include:
- Visual hierarchy: prominent headings and clear calls to action.
- Consistency: shared colors, spacing, buttons, and card treatments.
- Interaction feedback: selected states, progress indicators, and slider feedback.
- Responsive design: layouts that adapt to smaller screens.
- Accessibility: semantic controls, keyboard interaction, and reduced-motion preferences.
Run Locally
1. Download and extract the project, or clone your copy of its repository.
2. Open a terminal in the GymAura folder containing dist.
3. Start a local static server using Python:
   python -m http.server 8000 --directory dist
   On systems where Python uses the python3 command:
   python3 -m http.server 8000 --directory dist
4. Visit http://localhost:8000 in your browser.
Alternatively, serve the dist folder using a static-server extension such as VS Code Live Server.
Project Files
Path	Description
dist/index.html	Page structure, content, and planner controls
dist/styles.css	Visual styling, responsive layouts, and animations
dist/app.js	Planning logic, progress, local storage, downloads, and video controls
dist/assets/	Fitness images and video files
README.md	Project overview and setup instructions


How It Works
Users enter their preferences, and JavaScript builds a routine from predefined exercises and schedules. Meal selections update the displayed nutrition estimates and shopping list. Saved plans remain in the current browser through local storage.

The planner uses predefined rules; it does not call an AI model. Saved data does not sync across devices. Workouts and meal examples are illustrative, and nutrition values are approximate; individual calorie targets and ingredient quantities are not calculated.

Author
Sumit Raj
GitHub · Live Demo

Built as a portfolio project showcasing frontend development, responsive interface design, and interactive user experiences.
