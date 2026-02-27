StreamX - Movie & Series Explorer
A modern, high-performance cinema discovery application built with React 18, TypeScript, Tailwind CSS, and the TMDB API.

Overview
StreamX is a frontend-focused streaming exploration platform designed to provide a clean and professional experience. It allows users to browse trending content, search across a massive database, and preview movies and TV episodes directly in the app.

It demonstrates:

Advanced API integration (Multi-search & Deep-linking)

Global state management with Context API

Complex debouncing logic for performance

Scalable project architecture

Modern responsive UI with Tailwind CSS v4

1. Problem Statement
Who has the problem?
Movie enthusiasts who struggle to find detailed information or preview links for their favorite content across fragmented and ad-cluttered websites.

Why does it matter?
Users demand a fast, ad-free, and intuitive interface that works seamlessly on both mobile and desktop to discover what to watch next.

Why does this solution exist?
This project provides:

Instant Search: Find movies, series, and actors in one go.

Built-in Player: Watch previews without leaving the site.

Episode Management: Navigate through seasons and episodes easily.

Personal Library: Save favorites with persistent storage.

2. Project Goals
Build a scalable React + TypeScript application.

Implement a Multi-Search engine with performance optimization (Debounce).

Manage complex TV Series data structures (Seasons/Episodes).

Apply clean architecture and type-safe API handling.

Deliver a premium UI/UX using Tailwind CSS v4.

3. Technical Architecture
Frontend Structure
Plaintext

src/
 ├── api/           # Axios instance & movieService logic
 ├── components/    # Reusable UI (MovieCard, SearchBar, Grid)
 ├── context/       # Global state (MovieContext for Favorites)
 ├── hooks/         # Custom hooks (useDebounce, useLocalStorage)
 ├── pages/         # Route views (Home, Search, Details)
 ├── types/         # TypeScript Interfaces (Movie, Episode, etc.)
API Communication
Data fetched from The Movie Database (TMDB) API.

Service Layer: movieService.ts centralizes all requests.

Type Safety: API responses are mapped into strongly typed models to prevent runtime errors.

Error Handling: Graceful degradation for failed requests and missing images.

State Management Strategy
Context API: Manages the global Favorites state.

Persistence: Custom useLocalStorage hook ensures data survives page refreshes.

Dynamic Routing: react-router-dom handles deep-linking for movie and series IDs.

Tech Stack
Frontend: React 18, TypeScript, Vite, Tailwind CSS v4.

Routing: React Router DOM.

State: Context API + LocalStorage.

API: Axios + TMDB API.

Video: Vidsrc Embed Integration.

4. Features
Advanced Search
Debounced Search: Reduces API calls by waiting for user inactivity.

Multi-results: Displays movies and TV shows in a unified grid.

Deep Content Details
Rich Metadata: Genres, ratings, and synopses.

TV Mode: Season selector and episode list with thumbnail previews.

Integrated Player
One-Click Play: Instant streaming preview via modal.

Episode Switching: Switch episodes directly inside the TV interface.

Favorites System
Persistent Library: Save content to your local list.

Global Sync: Favorites count updated in real-time across the app.

Responsive Design
Mobile-first layout: Optimized for all screen sizes.

Visual Aesthetic: Modern blurred overlays and dark-themed design.

Screenshots
(Add your screenshots in /public/screenshots and link them here)

Live Demo
https://movies-explorer-umber.vercel.app/
5. Installation
Clone the repository:
git clone https://github.com/ciara-gospel/streamx-movie-explorer.git
cd streamx-movie-explorer

Install dependencies:
npm install

Environment Setup:
Create a .env file and add:
VITE_TMDB_API_KEY=your_key_here

Start development:
npm run dev

6. Challenges Faced
Frontend Challenge (Navigation Loop)
The automatic search redirect (Debounce) was fighting with the MovieDetails navigation. If a user clicked a movie while the timer was active, they were pulled back to the search page.
Solution: Added a location.pathname check in the search useEffect to abort navigation if the user is no longer on the home or search route.

TypeScript Challenge (Strict Typing)
TMDB returns different fields for movies (title) and TV shows (name). This caused build errors in TypeScript.
Solution: Implemented type guards and mapped responses to a unified Movie interface using optional properties.

Debugging Experience (Build Failures)
TypeScript blocked the Vercel build due to unused imports and type mismatches in the TMDBResponse.
Solution: Cleaned up unused variables and refined the Service Layer types to match the expected component props exactly.

7. What I Learned
Technical: Mastering the Debounce pattern for high-performance search.

Workflow: Understanding the importance of Environment Variables for API security.

Organization: How to structure a Service Layer to keep components clean.

8. Future Improvements
Infinite Scroll: Replace pagination for a smoother browsing experience.

PWA Support: Make the app installable on mobile devices.

Firebase Sync: Sync favorites across different devices.
