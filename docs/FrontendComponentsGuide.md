# Frontend Components Guide (Explained Like You’re 10)

This guide explains **React components** in a simple way, using examples from this project.

---

## 1) What is a “Component”?

Think of your app like a **LEGO city**.

- A **component** is one LEGO piece (or a small LEGO build).
- You snap components together to build a full page.

Examples:
- A **Button** is a component.
- A **Login form card** is a component.
- A **Dashboard page** is made by combining many components.

In React, a component is usually a **function** that returns UI (HTML-like JSX).

---

## 2) Two Big Types of Components

### A) “Dumb” (Presentational) Components

These components mostly **show UI**.

- They don’t “know” much about the app.
- They just display what you tell them to display.

Examples in this repo:
- `context-core-frontend/src/Components/common/Button.jsx`
- `context-core-frontend/src/Components/common/Input.jsx`
- `context-core-frontend/src/Components/Dashboard/SectionCard.jsx`

They should usually:
- Accept **props**
- Not call APIs directly
- Not handle routing (most of the time)

### B) “Smart” (Container / Page) Components

These components do the “thinking”.

- They fetch data
- They call APIs
- They use context
- They decide what to render

Examples in this repo:
- `context-core-frontend/src/pages/Auth/Login.jsx`
- `context-core-frontend/src/pages/Dashboard/Dashboard.jsx`
- `context-core-frontend/src/Components/auth/RequireAuth.jsx` (this is a “smart” helper component)

---

## 3) Props: “Passing Notes” to Components

Props are like giving a component a **note** that says:
“Show this title” or “When clicked, run this”.

Example idea:
- `SectionCard` gets a `title` and some `children`.

In this repo:
- `context-core-frontend/src/Components/Dashboard/SectionCard.jsx`
  - `title` is a prop.
  - `children` is the stuff you put inside the card.

Rule of thumb:
- If a component needs information, **pass it as props**.

---

## 4) Children: “Putting Stuff Inside a Box”

`children` means: “Whatever you place inside this component”.

Think:
- `SectionCard` is a **box**
- The content you put inside is the **toy inside the box**

Example in this repo:
- `context-core-frontend/src/Components/Dashboard/DashboardChart.jsx`
  - It uses `SectionCard` and puts a chart inside it.

---

## 5) State: “A Component’s Memory”

State is like a component’s **memory**.

Example:
- “Am I loading?”
- “What data did I fetch?”

In this repo:
- `context-core-frontend/src/pages/Dashboard/Dashboard.jsx`
  - remembers `loading`
  - remembers `data`

Rule of thumb:
- Keep state **as close as possible** to where it’s used.
- Don’t make everything global.

---

## 6) Context: “A Shared Backpack for the Whole App”

Sometimes many components need the same information.

Imagine you have one backpack for the whole class:
- Everyone can take what they need from it.

That’s **React Context**:
- A “global place” for shared app info.

In this repo:
- `context-core-frontend/src/context/AuthContext.jsx`
  - stores `user`, `isAuthenticated`, `loading`
  - gives actions like `login()`, `logout()`, `refresh()`

And it’s used in:
- `context-core-frontend/src/Components/auth/RequireAuth.jsx`
  - checks if you’re logged in
  - if not logged in, sends you to `/login`
- `context-core-frontend/src/pages/Dashboard/Dashboard.jsx`
  - shows the user name in “Welcome back”

Important rule:
- Use context for **app-wide stuff** (auth, theme, notifications).
- Don’t use context for something that only one page needs.

---

## 7) Folder Structure (What Goes Where?)

This project is arranged like this:

- `context-core-frontend/src/pages/`
  - Full pages (routes), like `Login` and `Dashboard`.
  - These pages often call APIs.

- `context-core-frontend/src/Components/`
  - Reusable building blocks.

  Examples:
  - `context-core-frontend/src/Components/common/`
    - very reusable UI pieces like Button/Input
  - `context-core-frontend/src/Components/auth/`
    - auth-related components like `RequireAuth`
  - `context-core-frontend/src/Components/Dashboard/`
    - dashboard building blocks

- `context-core-frontend/src/api/`
  - functions that talk to the backend.
  - Example: `context-core-frontend/src/api/auth.js`
  - Example: `context-core-frontend/src/api/axios.js`

- `context-core-frontend/src/context/`
  - app-wide context providers (like auth).

---

## 8) How the Dashboard is Built (Real Example)

The Dashboard page is like a LEGO baseplate.

`context-core-frontend/src/pages/Dashboard/Dashboard.jsx`:
- fetches dashboard data from the backend
- decides what to show when loading/error
- then composes the UI:

Dashboard building blocks:
- `context-core-frontend/src/Components/Dashboard/DashboardShell.jsx`
  - page layout (padding/background)
- `context-core-frontend/src/Components/Dashboard/DashboardHeader.jsx`
  - “Dashboard” + “Welcome back …”
- `context-core-frontend/src/Components/Dashboard/DashboardStats.jsx`
  - shows 4 stat cards
- `context-core-frontend/src/Components/Dashboard/DashboardChart.jsx`
  - chart section
- `context-core-frontend/src/Components/Dashboard/RecentDocuments.jsx`
  - recent documents list

Why do this?
- Code becomes easier to read.
- You can reuse pieces later.
- Each component becomes smaller and easier to fix.

---

## 9) When Should I Create a New Component?

Create a new component when:
- You copy/paste the same UI more than once
- A file is getting too big and hard to read
- A “chunk” of the page has a clear job (example: “Recent documents list”)

Don’t create a new component when:
- It’s used only once and is tiny
- It makes the code harder to follow

---

## 10) A Simple Recipe for Building Pages

When you build a new feature/page:

1. Put the page in `src/pages/...`
2. Put reusable UI parts in `src/Components/<FeatureName>/...`
3. Put API calls in `src/api/...`
4. If many pages need shared data/actions, create context in `src/context/...`

---

## 11) Quick “Do / Don’t” Rules (Easy Mode)

Do:
- Keep components small
- Pass data with props
- Use context for app-wide things (auth)
- Put API calls in `src/api/`

Don’t:
- Put auth tokens in `localStorage` (this project uses HttpOnly cookies)
- Make every tiny thing a component
- Fetch data inside “dumb” UI components (usually)

---

## 12) Next Improvements You Can Add (Optional)

If you want to keep leveling up:
- Add a `Navbar` component that uses `useAuth()` and has a Logout button.
- Add a `Toast/Notification` context for messages like “Saved!” or “Error!”
- Add more dashboard components when new sections appear (documents page, settings page, etc.).

