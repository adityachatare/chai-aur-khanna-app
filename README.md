# Chai Aur Khaana

Chai Aur Khaana is a React Native food delivery app UI built with Expo. It demonstrates a full mobile navigation structure (Drawer → Tabs → Stack), protected routes, cart & orders flow, and deep linking into restaurant detail screens.

---

## Project overview

- Mobile UI for discovering restaurants, viewing menus, adding items to cart, and placing orders.
- Simple onboarding and credential-based login (demo credentials: `adityachatare` / `123`).
- Placing an order moves it to the Active Orders list and updates the Orders tab badge.

## Tech stack

- React Native (managed Expo project)
- react-navigation (Drawer, Bottom Tabs, Native Stack)
- TypeScript (project uses .tsx files)
- AsyncStorage for persisting auth state
- lucide-react-native for icons

## How to run locally

Prerequisites:

- Node.js (LTS)
- Yarn or npm
- Expo CLI (optional: `npm install -g expo-cli`)

Install dependencies and start the dev server:

```bash
npm install
# or: yarn

npx expo start
```

Open in Expo Go (mobile) or press `i` / `a` in the Expo CLI to open on an iOS simulator / Android emulator.

Notes for development:
- The app exposes a demo login that accepts username `adityachatare` and password `123`.
- Authentication state is persisted in AsyncStorage under the `isAuthenticated` key.

## Navigation structure

The app uses nested navigators: a `RootDrawer` with the main tabs and additional screens; `MainTabs` contains a `HomeStack` for onboarding, restaurant flows, and cart.

```mermaid
graph TD
    App(App) --> AuthContext{Auth State?}
    
    %% Unauthenticated Flow
    AuthContext -- Logged Out --> AuthStack(Auth Stack)
    AuthStack --> Onboarding(Onboarding Screen)
    AuthStack --> Login(Login Screen)
    
    %% Authenticated Flow
    AuthContext -- Logged In --> RootDrawer(Root Drawer Navigator)
    
    %% Drawer Contents
    RootDrawer --> MainTabs(Main Tabs Navigator)
    RootDrawer --> Settings(Settings Screen)
    RootDrawer --> Help(Help Screen)
    
    %% Main Tabs Contents
    MainTabs --> HomeTab(Home Stack)
    MainTabs --> SearchTab(Search Screen)
    MainTabs --> OrdersTab(Orders Screen)
    MainTabs --> ProfileTab(Profile Screen)
    
    %% Home Stack Contents
    HomeTab --> Home(Home Screen)
    HomeTab --> RestaurantDetail(Restaurant Detail Screen)
    HomeTab --> Cart(Cart Screen)
```

## Deep linking setup

Deep linking is configured in `src/navigation/index.tsx` using Expo Linking. The app supports links that open a restaurant detail directly using the restaurant name slug.

- Prefixes configured: the app uses the generated Expo URL prefix and the custom scheme `foodapp://`.
- Path used for restaurant detail: `restaurant/:restaurantName` (slugified name)

Examples:

- Open restaurant by name (space or special chars are slugified):
  - `foodapp://restaurant/Bella-Italia-Grill`
  - `foodapp://restaurant/Bella%20Italia%20Grill`

Testing deep links locally (Expo):

```bash
# From a machine with expo CLI running:
npx uri-scheme open "foodapp://restaurant/Bella-Italia-Grill" --android
npx uri-scheme open "foodapp://restaurant/Bella-Italia-Grill" --ios
```

Or trigger from adb (Android):

```bash
adb shell am start -a android.intent.action.VIEW -d "foodapp://restaurant/Bella-Italia-Grill"
```

## Screenshots

Add screenshots to `assets/screenshots/` and reference them in this README. Example markdown to include a screenshot:

```md
![Orders screen](assets/screenshots/orders.png)
```

If you want, I can capture and add placeholder screenshots into `assets/screenshots/` for the major flows (Home, Restaurant detail, Cart, Orders, Profile).

## Assumptions made

- Login is demo-only (no backend). Credentials are checked client-side for `adityachatare` / `123`.
- Restaurant routing uses slugified names rather than numeric IDs for deep linking.
- Orders placed from the Cart are created locally in app state; no server persistence is implemented.
- Images are referenced from external URLs in the code. For production you may want to host or bundle them.

---

If you'd like I can:

- Add actual screenshots into `assets/screenshots/` now.
- Add a small troubleshooting section for common Expo issues.
- Generate a CONTRIBUTING section or run scripts for CI.

Want me to add screenshots automatically? Reply which screens you want captured.
