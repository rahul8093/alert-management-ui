# Alert Management mobile demo

Client-ready UI prototype for the Alert Management app design. Built with React Native and Expo. All screens use local sample data so the app can be demonstrated without a backend or network connection.

## Run the demo

1. Install [Expo Go](https://expo.dev/client) on an iPhone or Android phone, or start a simulator.
2. From this project folder, run:

   ```sh
   npm install
   npx expo start
   ```

3. Scan the QR code in Expo Go (Android) or with the iPhone Camera app. Press `i` or `a` in the terminal to use a simulator/emulator.
4. The sign-in screen is prefilled for the demo. Tap **Sign in**; credentials are not validated.

## Demo flow

- **Dashboard:** choose a site, review the critical alert, status summary, failure events and parameter compliance chart.
- **Alerts:** search and filter critical, warning, offline, sensor and resolved events. Tap an event for its details.
- **Reports:** choose Effluent ETP or Emission Stack, set a date and site, then switch between Table and Graph.
- **Account access:** explore the Forgot Password and Contact Administrator screens from Sign in.
- **Trends:** open the parameter overview from the Dashboard.

## Prototype behavior

Sign in, reset link, alert details, filters, report views and calendar selection are frontend interactions only. Export displays a prototype message; it does not create a file. Contact actions open the device email or phone app when available. Replace `src/data/mock.ts` and the screen-level sample values with backend services when those are ready.

## Main files

- `App.tsx` — app entry point and providers
- `src/navigation/` — sign-in stack and bottom tabs
- `src/screens/` — Sign in, Dashboard, Trends, Alerts, Reports, Forgot Password and Contact Administrator
- `src/components/` — shared headers, cards, dropdowns and date picker
- `src/data/mock.ts` — sample parameters, alerts, sites and report readings
- `src/theme.ts` — shared colors and elevation
