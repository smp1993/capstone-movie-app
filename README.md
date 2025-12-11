# Capstone Movie App

Full-stack movie discovery and favorites application built with **React + Vite**, **Express**, **MongoDB**, and deployed to the cloud.  
This project is my capstone for the Software Engineering course.

It demonstrates:

- React frontend with routing, context, and advanced patterns
- Google OAuth login
- Integration with **The Movie Database (TMDB)** external API
- Express backend with full **CRUD** and MongoDB
- Cloud deployment for both frontend and backend
- Dev Container for reproducible development
- Automated end-to-end test using **Playwright**
- Design artifact (sequence diagram)
- Documentation and video walkthrough

---

## 1. Live Links

- **Frontend (React, Vite, Netlify)**:  
  👉 `TODO: https://capstone-movie-app.netlify.app`  

- **Backend (Express, Render)**:  
  👉 `TODO: https://capstone-movie-backend.onrender.com`

- **Backend health**:  
  👉 `TODO: https://capstone-movie-backend.onrender.com/api/health`

- **Video demonstration (3–5 minutes)**:  
  👉 `TODO: add video link (YouTube / unlisted / Google Drive)`

---

## 2. Features Overview

### Frontend (React + Vite)

- Single Page Application with **React Router**:
  - `/` – Home
  - `/discover` – Discover popular movies from TMDB
  - `/favorites` – View and manage favorite movies (per user)
  - `/profile` – User profile (Google account info + favorites count)
  - Catch-all `*` – 404 page

- **Authentication**:
  - Google OAuth using `@react-oauth/google`
  - Logged-in state stored in a global **Context + useReducer**
  - Personalized navbar (`Hi, {name}`), profile page, and favorites per user

- **Advanced React Features**:
  - `useReducer` + Context for global app state (`user`, `favorites`)
  - `useSWR` for data fetching (TMDB popular movies)

- **External API Integration**:
  - Fetches popular movies from **TMDB API**
  - Shows title, rating, release date, and poster

- **Interactivity & Personalization**:
  - Logged-in users can add/remove favorites
  - `/profile` shows Google profile picture, name, email, and favorites count
  - UI changes based on authentication state

- **Additional Library**:
  - `framer-motion` for simple animations (e.g., movie cards)

- **Animation**:
  - Fade/scale animation for movie cards on the Discover page

---

### Backend (Express + MongoDB)

- **Deployment**:
  - Cloud-hosted on Render: `https://capstone-movie-backend.onrender.com`

- **Health Check**:
  - `GET /api/health` → `{ status: "ok", message: "Backend is running" }`

- **Favorites CRUD API** (`/api/favorites`):
  - `GET /api/favorites?userId=...` – List favorites for a user
  - `POST /api/favorites` – Add a new favorite
  - `PUT /api/favorites/:id` – Update (e.g., notes, rating) for a favorite
  - `DELETE /api/favorites/:id` – Remove a favorite

- **Database Integration**:
  - MongoDB with Mongoose
  - Favorite schema includes:
    - `userId` (Google `sub`)
    - `tmdbId`
    - `title`
    - `posterPath`
    - optional fields (e.g., `createdAt`)
  - Basic validation and error handling

- **Error Pages**:
  - Custom **404** and **500** HTML pages served from `backend/public/errors`
  - Middleware for catching 404 and unhandled errors

---

## 3. Architecture & Design

### High-Level Architecture

- **Frontend**: React/Vite SPA deployed on Netlify  
- **Backend**: Express REST API on Render  
- **Database**: MongoDB (Atlas)  
- **External API**: TMDB for movie data  
- **Auth**: Google OAuth → ID token decoded on the frontend → `userId` passed to backend

### Design Artifact – Sequence Diagram

This sequence diagram shows a typical user flow: discovering movies and adding a favorite.

```mermaid
sequenceDiagram
  actor User
  participant Browser as React App
  participant TMDB as TMDB API
  participant Backend as Express API
  participant Mongo as MongoDB

  User->>Browser: Open /discover
  Browser->>TMDB: GET /movie/popular
  TMDB-->>Browser: JSON list of movies
  Browser-->>User: Render movie cards

  User->>Browser: Click "Add to Favorites"
  Browser->>Backend: POST /api/favorites (userId, tmdbId, title,...)
  Backend->>Mongo: Insert favorite document
  Mongo-->>Backend: OK
  Backend-->>Browser: 201 Created
  Browser-->>User: Show success (favorite added)

  User->>Browser: Open /favorites
  Browser->>Backend: GET /api/favorites?userId=...
  Backend->>Mongo: Query favorites for userId
  Mongo-->>Backend: Favorites list
  Backend-->>Browser: JSON favorites
  Browser-->>User: Render favorites page
```

---

## 4. Local Development

### 4.1. Prerequisites

- Node.js (LTS)
- npm
- MongoDB (local or Atlas)

### 4.2. Clone the Repository

```bash
git clone https://github.com/smp1993/capstone-movie-app.git
cd capstone-movie-app
```

---

### 4.3. Environment Variables

Create the following env files:

#### `frontend/.env`

```env
VITE_TMDB_API_KEY=fc9b5783e517d473a2db9d2938a749fd
VITE_API_BASE_URL=http://localhost:5050
VITE_GOOGLE_CLIENT_ID=922017013616-m1gr7p3cl72o0og3tkqr5p0m81g0ebm8.apps.googleusercontent.com
```

#### `backend/.env`

```env
MONGODB_URI=mongodb+srv://movie:Nuttertools1993@cluster0.tix9qch.mongodb.net/?appName=Cluster0
Port=5050
```

> Real keys are kept locally. This repo includes `.env.example` files and uses `.gitignore` to avoid committing secrets.

---

### 4.4. Using Dev Container (recommended)

The repo includes a `.devcontainer` configuration so that another developer can run the app with minimal setup:

1. Open the project in VS Code.
2. Install the **Dev Containers** extension.
3. Reopen in container.
4. Run:

   ```bash
   cd backend
   npm install
   npm start
   ```

   In another terminal:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

### 4.5. Running Backend Locally

```bash
cd backend
npm install
npm start
```

Backend will run at `http://localhost:5050`.

---

### 4.6. Running Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

Vite dev server runs at `http://localhost:5173`.

Make sure `VITE_API_BASE_URL=http://localhost:5050` in `frontend/.env`.

---

## 5. Automated Test (Playwright)

The project uses **Playwright** for one meaningful end-to-end test that hits the deployed frontend and verifies that:

- The home page loads.
- The Discover page loads.
- Movies from TMDB are rendered (checks for rating lines with `⭐`).

### Install Playwright (if needed)

From `frontend/`:

```bash
cd frontend
npx playwright install
```

### Run the E2E Test

```bash
npm run test:e2e
# or
npx playwright test
```

The config (`playwright.config.js`) points to the deployed Netlify URL via `baseURL`.

---

## 6. How Requirements Are Met (Rubric Mapping)

- **React Frontend**
  - Deployment & Accessibility: Netlify URL (see top of README)
  - Authentication: Google OAuth with `@react-oauth/google`
  - Advanced React: `useReducer` + Context, `useSWR`
  - External API: TMDB (`fetchPopularMovies`)
  - Interactivity/Personalization: authenticated favorites + profile page
  - Additional Library: `framer-motion`
  - Animation: animated movie cards in Discover

- **Express Backend**
  - Deployment: Render URL with `/api/health` endpoint
  - CRUD: `/api/favorites` supports Create/Read/Update/Delete
  - Database: MongoDB with Mongoose schema and basic validation

- **Additional Engineering Requirements**
  - Dev Container: `.devcontainer` folder with setup
  - Automated Testing: Playwright E2E test (`npm run test:e2e`)
  - Video Demonstration: link included in README
  - Attribution: see below
  - Design Artifact: sequence diagram (above)

---

## 7. Attribution

This project uses the following external resources:

- **TMDB API** for movie data  
  - The Movie Database (TMDB): https://www.themoviedb.org/
- **Google OAuth** for authentication  
  - Google Cloud Console – OAuth 2.0
- **UI / Libraries**:
  - `@react-oauth/google` for Google Login
  - `swr` for data fetching
  - `framer-motion` for animations
- **Educational / AI Assistance**:
  - ChatGPT was used to help with planning, debugging, and documentation.

All environment variables and secrets are stored locally and on the hosting platforms (Netlify, Render), not committed to the repository.
