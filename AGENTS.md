```markdown
# AGENTS.md

## 1. Project Title

**ObiFit** (Working Title)

## 2. About the Project

ObiFit is a mobile health, nutrition, and home fitness app tailored for West Africa and global users. It allows users to log regional meals using simple text descriptions powered by AI, follow science-backed home workouts (calisthenics, bodyweight, posture fixes, back pain relief, and Kegel routines) guided by 3D avatars, and sync steps and health metrics from popular regional wearables (Oraimo, itel, Infinix) alongside Apple Watch and Fitbit.

## 3. Who We Are Building For

- **West African Food Lovers:** People who consume traditional dishes (Jollof, Amala, Egusi, Pounded Yam, Suya) and need accurate macro tracking without weighing every meal.
- **Home Workout Enthusiasts:** Men and women seeking guided bodyweight training, calisthenics, stretching, posture correction, or pelvic floor exercises without needing gym equipment.
- **Budget Smartwatch Owners:** Users relying on widely available regional smartwatches (Oraimo, itel, Infinix, Xiaomi) or mainstream devices (Apple Watch, Fitbit).

## 4. Tech Stack

- **Mobile Frontend:** React Native (Expo)
- **Database & Backend:** PostgreSQL (Supabase)
- **AI Processing:** Open-Source AI (DeepSeek / Llama) for food text parsing
- **Health Synchronization:** Google Health Connect (Android) & Apple HealthKit (iOS)
- **Audio Engine:** Background music streaming with auto-ducking voice coaching

## 5. Folder Structure
```

obifit-app/
├── assets/ # Images, 3D avatar files, audio tracks
├── src/
│ ├── components/ # Shared buttons, cards, modals, input elements
│ ├── screens/ # Screen views (Home, Nutrition, Workouts, Metrics)
│ ├── services/ # API helpers, health sync bridges, backend calls
│ ├── hooks/ # Custom React hooks (Audio ducking, timer logic)
│ ├── navigation/ # Screen routing and tab configurations
│ └── utils/ # Nutrition calculations, text formatters, storage
├── server/ # Backend API services, AI endpoints, database schemas
├── AGENTS.md # Agent context and instruction file
└── package.json # Project dependencies

```

## 6. How to Use These Files
- **Read Context First:** Review this `AGENTS.md` before generating code or modifying system architecture.
- **Follow Established Patterns:** Align with the existing UI components, React hooks, and database conventions across the codebase.
- **Scope Discipline:** Focus strictly on requested tasks without adding unapproved packages or refactoring working modules.

## 7. Non-Negotiables
- **Mobile Performance:** All UI screens and 3D avatar animations must remain smooth and responsive on mid-range smartphones.
- **Offline Functionality:** Core logging for food, water, and workouts must work offline and sync automatically when internet access returns.
- **User-Friendly UX:** Avoid requiring complex scales—rely on AI text input, natural language descriptions, and visual portion sizes.

## 8. Sensitive Data Handling
- **Server-Side Enforcement:** All personal health parameters, authentication credentials, passwords, user tokens, and private profile data must be processed and secured exclusively on the backend/server side.
- **Zero Client Exposure:** Private API keys, database credentials, and raw user health records must never be exposed on the frontend client.

## 9. When in Doubt
- Ask for clarification before altering database schemas, API routes, or core user flows.
- Choose simple, maintainable solutions over heavy third-party dependencies.
- Prioritize user experience and smooth app execution over technical complexity.

## 10. Core Promise
*"Eat your favorite local meals, move your body anywhere, and build lasting health without extreme diets or expensive gym memberships."*

## 11. Business Rules
- **West African First:** Ensure regional food database entries remain accurate, customizable, and easily accessible.
- **Holistic Momentum Scoring:** Daily streaks score overall consistency across nutrition, steps, hydration, and workouts so one missed habit does not break progress.
- **Gender & Level Inclusivity:** Every workout category must provide tailored options for all genders and fitness levels (Beginner to Advanced).

## 12. Environment Variables
- `EXPO_PUBLIC_API_URL` — Frontend API gateway endpoint
- `EXPO_PUBLIC_HEALTH_CONNECT_ID` — Health Connect integration key
- `SUPABASE_URL` — Backend database connection URL (Server-side)
- `SUPABASE_SERVICE_ROLE_KEY` — Database service role key (Server-side only)
- `AI_PARSER_API_KEY` — Secret key for open-source AI food parser (Server-side only)

## 13. User Flows
1. **Onboarding:** Input profile goals -> Select gender & workout preferences -> Connect health wearable -> Establish baseline goals.
2. **AI Meal Logging:** Type meal description -> AI parses macros & ingredients -> Adjust portion or oil sliders -> Confirm log.
3. **Guided Workout Session:** Select routine -> View 3D Avatar demonstration -> Start session with voice cues & music -> Log completion.
4. **Daily Health Sync:** App syncs wearable steps and activity -> Calculate daily hydration and macro totals -> Update Momentum Score.

```
