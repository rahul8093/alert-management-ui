# Alert Manager — React Native (Expo) app

This is the **UI-only** version of the Alert Manager mobile app: Sign in, Dashboard,
Trends, Alerts and Reports, matching the wireframes and PDF design. All data is
mock data in `src/data/mock.ts` — there is no backend, login check, or push
notification wiring yet. It's meant as the visual/interaction layer to build
real features on top of.

## What's included
- **Sign in** — email/password form, password visibility toggle, remember me.
  "Sign in" just navigates to the app (no real auth).
- **Dashboard** — company selector, notification bell with badge, critical alert
  banner, stat tiles, and two live parameter cards (BOD, Flow Volume).
- **Trends** — all 8 CPCB parameters as a two-column grid of cards, opened from
  the Dashboard.
- **Alerts** — searchable, filterable inbox (Critical / Warning / Offline).
- **Reports** — company + site dropdowns, a date/date-range picker (bottom
  sheet calendar), and a data table with the same columns as your sheet
  (Site, log_date, BOD, TSS, COD, pH, Flow Volume, Flow Out, PM). Out-of-range
  values are tinted red. The table scrolls horizontally.

## Project structure
```
App.tsx                     entry point
src/
  theme.ts                  colors + shadow shared across the app
  context/AppContext.tsx    holds the selected company (shared by Dashboard & Reports)
  data/mock.ts              placeholder companies, sites, parameters, alerts, report rows
  utils/date.ts             date formatting + calendar helpers
  components/               GradientHeader, BellButton, ParameterCard, Sparkline,
                             AlertCard, Dropdown, DateFilterModal, StatusPill
  navigation/
    RootNavigator.tsx       Sign in -> Main
    MainTabs.tsx             bottom tabs: Dashboard (+ Trends), Alerts, Reports
  screens/
    SignInScreen.tsx
    DashboardScreen.tsx
    TrendsScreen.tsx
    AlertsScreen.tsx
    ReportsScreen.tsx
```

## Run it
Requires Node.js 18+ and the Expo Go app on your phone (or an emulator).

```bash
npm install
npx expo start
```

Then scan the QR code with Expo Go (Android) or the Camera app (iOS), or press
`i` / `a` in the terminal for a simulator/emulator, or `w` for a web preview.

## Wiring it to real data next
- Replace the arrays/functions in `src/data/mock.ts` with API calls (e.g. with
  `fetch`, `axios`, or React Query) — the screens already expect the same
  shapes (`Parameter`, `AlertItem`, `ReportRow`), so most screens won't need
  to change.
- `AppContext` currently only stores the selected company; extend it with the
  logged-in user and auth token once sign-in is real.
- The Reports table renders up to 60 rows for smoothness; swap in
  pagination or a "load more" call to the API for larger ranges.
- `Export` on the Reports screen is a placeholder button; wire it to your
  CSV/Excel export endpoint or `expo-file-system` + `expo-sharing`.
