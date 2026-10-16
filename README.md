# CampusEase — Vue Router Student Dashboard

A Vue 3 + Vite single-page application with Vue Router 4.

## Features
- Browser-local demo sign-in and sign-out
- Five routed pages: Home, Tasks, Schedule, Profile, and Settings
- Task CRUD: add, view, edit, delete, search, filter, and mark complete
- Class schedule CRUD: add, view, edit, delete, and filter by day
- Profile editing
- Settings for dark mode, compact layout, and notification preference
- Local persistence with `localStorage`
- Export data as a JSON backup
- Responsive layout for desktop and mobile

## Run the project

If you extracted this as a fresh project, open a terminal in the project folder and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Notes
- Sign-in is a frontend demo only: any valid email and password are accepted. The session email is stored in `localStorage`, but passwords are not stored and credentials are not verified. This is not suitable for protecting real user data.
- Data is saved in the current browser/device through `localStorage`; it is not connected to a backend or online account.
- The notifications setting stores a preference only; it does not send real notifications.
- Profile information and sample tasks are demo data. Edit the profile page to personalize them.
