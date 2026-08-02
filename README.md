# meditationApp
A mobile meditation app built in JavaScript using the Expo / React Native app structure with an app router layout. It provides onboarding (signup/login), a home screen with daily/featured meditations and quotes, meditation detail screens, and user settings. Intended for mobile users who want guided or tracked meditation sessions.

## Features
- Authentication screens: Signup and Login
- Home screen with daily meditation, popular meditations, and daily quote
- Meditation details pages (dynamic route per meditation id)
- Settings screen for user preferences
- Small, modular UI components (Top display, Tabs, Footer, Header buttons)
- Centralized theme and icon constants for consistent styling

## Stack
- Language: JavaScript (100%)
- Framework / runtime: React Native (Expo-style app structure; app.json and App.js present)
- Router pattern: app/ directory with `_layout.js` and nested routes (dynamic route [id] for meditation details)
- Notable patterns/libraries (inferred from project layout and filenames):
  - Expo / React Native ecosystem (App.js, app.json, babel.config.js, assets/)
  - Component-based UI with separate `.style.js` files
  - Centralized constants for icons and theme

## Repository structure (top-level)
```
App.js                         # App entry
app.json                       # Expo / app config
babel.config.js                # Babel config
package.json                   # project manifest (dependencies & scripts)
package-lock.json              # lockfile
assets/                        # images, fonts, audio, etc.
app/                           # app router pages & layout
  _layout.js                   # top-level layout for app router
  index.js                     # likely router entry or home wrapper
  home.js                      # home screen
  login.js                     # login screen
  signup.js                    # signup screen
  settings.js                  # settings screen
  meditation-details/          # dynamic route for meditation details
    [id].js                    # meditation detail screen for a given id
components/                     # reusable UI components
  DailyMeditation.js
  DailyQuote.js
  PopularMeditation.js
  ScreenHeaderBtn.js
  Welcome.js
  MeditationTopDisplay/        # component + styles
    MeditationTopDisplay.js
    MeditationTopDisplay.style.js
  about/                       # About component + styles
  footer/                      # Footer component + styles
  tabs/                        # Tabs component + styles
  index.js                     # component exports
constants/                      # theme / icons / shared constants
  icons.js
  theme.js
context/                        # React context providers (state management)
hook/                           # custom hooks
.gitignore
MARKETPLACE_LISTING.md
product_backlog.md             # project backlog / TODOs
README.md                      # (this file)
```

## How it fits together
The app follows a component-driven React Native layout. The entrypoint (App.js) bootstraps the app and the app/ directory implements route-based screens with a top-level layout in `_layout.js`. Screens (home, login, signup, settings, meditation details) import shared components from the `components/` folder. Visual styles are separated into `.style.js` files. Global constants (theme, icons) live in `constants/`. Context and custom hooks provide shared state and behavior.

## Getting started (short path)
Prerequisites:
- Node.js (recommended LTS)
- npm or yarn
- Expo CLI (if using Expo) or use `npx expo` commands

Common commands (from the project root):
```bash
# Install dependencies
npm install

# Start the development server (Expo)
npm run start
# or, if using expo directly
npx expo start

# Run on Android emulator
npx expo run:android

# Run on iOS simulator (macOS)
npx expo run:ios
```

Notes:
- If package.json defines different scripts (e.g., `start` or `dev`), use the script that exists there. If this is an Expo project, `expo start` opens the Metro bundler and lets you run on a simulator or Expo Go.
- If you see `app.json`, the project is configured for Expo. Check `app.json` for asset and slug details.

## Development notes
- Screens use the app router pattern; dynamic routes are under `app/meditation-details/[id].js` — to view a meditation detail open the route with the meditation id.
- Styles are colocated in `*.style.js` files next to components.
- Shared constants (colors, sizes, icons) are in `constants/theme.js` and `constants/icons.js` — change them to update app-wide styling.

## Testing & linting
- No test or linter configuration observed at top-level. If you want to add tests, consider Jest + React Native Testing Library and add linting with ESLint.

## Contributing
- Fork the repo, create a feature branch, implement changes, and open a pull request describing your changes.
- Before opening a PR, run the app locally and verify on device/simulator.
- Add or update entries in `product_backlog.md` if working on larger items so maintainers can track progress.

## Troubleshooting
- Metro bundler cache issues: try `npx expo start -c` or delete `node_modules` and reinstall.
- Missing or mismatched native dependencies: follow Expo docs or run `npx expo doctor`.

## License
No license file detected at the repository root. Add a LICENSE file (e.g., MIT) if you want to make reuse terms explicit.

## Where to look next
- package.json — to confirm exact dependencies and available npm scripts
- app/_layout.js and App.js — to understand bootstrapping and navigation
- context/ and hook/ — to inspect state management and data flow
- product_backlog.md — to see planned features and priorities

---
If you want, I can:
- produce a ready-to-paste README.md (this file) and update the repo,
- extract exact dependency and script commands from package.json and update the How to run section,
- or add badges and an example screenshot section if you provide assets/screenshots.
