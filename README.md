# StreamX - Movie & Series Explorer

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)

**A modern, high-performance cinema discovery application built with React 18, TypeScript, Tailwind CSS, and the TMDB API.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-StreamX-FF6B6B?style=for-the-badge&logo=vercel)](https://movies-explorer-umber.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-FFA500?style=for-the-badge)](LICENSE)

</div>

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Project Goals](#2-project-goals)
3. [Tech Stack](#3-tech-stack)
4. [Technical Architecture](#4-technical-architecture)
5. [Features](#5-features)
6. [Screenshots](#6-screenshots)
7. [Live Demo](#7-live-demo)
8. [Installation](#8-installation)
9. [Challenges Faced](#9-challenges-faced)
10. [What I Learned](#10-what-i-learned)
11. [Future Improvements](#11-future-improvements)

---

## 1. Problem Statement

### Who has the problem?

Movie enthusiasts and TV show watchers who struggle to find detailed information or preview links for their favorite content across fragmented, ad-cluttered, and unreliable streaming websites.

### Why it matters?

- **User Experience**: Modern viewers demand a fast, ad-free, and intuitive interface
- **Accessibility**: Content discovery should work seamlessly on both mobile and desktop
- **Efficiency**: Users want to quickly find what to watch next without navigating through multiple sites
- **Quality**: Viewers expect a premium, professional look and feel when browsing entertainment content

### Why this solution exists?

This project provides a unified, all-in-one solution:

| Feature | Description |
|---------|-------------|
| **Instant Search** | Find movies, series, and actors in one unified search |
| **Built-in Player** | Watch previews without leaving the site |
| **Episode Management** | Navigate through seasons and episodes easily |
| **Personal Library** | Save favorites with persistent local storage |
| **Rich Metadata** | Access genres, ratings, synopses, and cast information |

---

## 2. Project Goals

- Build a scalable React + TypeScript application with clean architecture
- Implement a Multi-Search engine with performance optimization (Debounce pattern)
- Manage complex TV Series data structures (Seasons/Episodes navigation)
- Apply type-safe API handling with TypeScript interfaces
- Deliver a premium UI/UX using Tailwind CSS v4
- Implement responsive design for all device sizes
- Create a maintainable and extendable codebase

---

## 3. Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS v4 |
| **Routing** | React Router DOM v6 |
| **State Management** | Context API + LocalStorage |
| **HTTP Client** | Axios |
| **External API** | The Movie Database (TMDB) |
| **Video Embedding** | Vidsrc Integration |

---

## 4. Technical Architecture

### Frontend Structure

```
src/
├── api/                 # Axios instance configuration & movieService logic
│   ├── axiosConfig.ts   # Centralized Axios instance with interceptors
│   └── movieService.ts  # All TMDB API requests
├── components/          # Reusable UI components
│   ├── Hero.tsx        # Homepage hero section with featured content
│   ├── MovieCard.tsx   # Individual movie/series display card
│   ├── MovieGrid.tsx   # Responsive grid layout for movies
│   ├── MovieRow.tsx    # Horizontal row for categorized content
│   ├── MovieSkeleton.tsx # Loading placeholder component
│   ├── Navbar.tsx      # Navigation header
│   ├── Pagination.tsx  # Page navigation controls
│   ├── SearchBar.tsx   # Search input with debounce
│   └── SortFilters.tsx # Sorting and filtering options
├── context/            # Global state management
│   └── MovieContext.tsx # Favorites state with Context API
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts  # Debounce implementation for search
│   └── useFetchMovies.ts # Data fetching logic
├── layouts/            # Page layout templates
│   └── MainLayout.tsx  # Main app layout with navbar/footer
├── pages/              # Route views/pages
│   ├── Home.tsx        # Homepage with trending content
│   ├── Movies.tsx      # Browse all movies
│   ├── Series.tsx      # Browse all TV series
│   ├── Search.tsx      # Search results page
│   ├── Favorites.tsx   # User's saved favorites
│   └── MovieDetails.tsx # Detailed view with player
├── types/              # TypeScript type definitions
│   └── movie.ts        # Movie, TV Show, Episode interfaces
└── utils/              # Utility functions & constants
    └── constants.ts    # App-wide constants
```

### API Communication

- **Data Source**: The Movie Database (TMDB) API
- **Service Layer**: `movieService.ts` centralizes all API requests
- **Type Safety**: API responses are mapped to strongly-typed TypeScript interfaces
- **Error Handling**: Graceful degradation with user-friendly error messages
- **Loading States**: Skeleton loaders during data fetch

### Database Structure

> **Note**: This is a frontend-only application with no backend server.

- **Local Storage**: Favorites are persisted using browser `localStorage`
- **API Cache**: None (data fetched directly from TMDB)
- **State Management**: In-memory state via React Context API

### State Management Strategy

| State | Technology | Purpose |
|-------|------------|---------|
| **Global State** | Context API | Manages Favorites across the app |
| **Persistence** | LocalStorage | Survives page refreshes |
| **Routing** | React Router DOM | Deep-linking for movies/series |
| **API Data** | React Query (custom hooks) | Fetching and caching API responses |

---

## 5. Features

### Authentication
- No authentication required (public application)
- Personal favorites stored locally per browser

### Validation
- **Input Validation**: Search queries sanitized before API calls
- **Type Guards**: TypeScript checks for valid movie/TV show responses
- **URL Validation**: Safe routing with proper ID validation

### Error Handling
- **API Errors**: Graceful fallback with user-friendly error messages
- **Missing Images**: Placeholder images for failed loads
- **Network Errors**: Retry mechanism with offline indicator
- **Component Errors**: Error boundaries for graceful degradation

### Security Considerations
- **Environment Variables**: API keys stored in `.env` files (never committed)
- **XSS Prevention**: React's built-in escaping prevents XSS attacks
- **CORS**: TMDB API handles CORS properly
- **No Sensitive Data**: No user data stored on external servers

### Responsive Design
- **Mobile-First**: Designed for mobile devices first, then desktop
- **Breakpoints**: Tailwind CSS responsive classes for all screen sizes
- **Touch-Friendly**: Large tap targets for mobile navigation
- **Dark Theme**: Modern dark-themed aesthetic for better viewing

### Additional Features

| Feature | Description |
|---------|-------------|
| **Advanced Search** | Multi-results for movies and TV shows |
| **Debounced Search** | Performance optimization reduces API calls |
| **Rich Metadata** | Genres, ratings, synopses, runtime, release dates |
| **TV Mode** | Season selector and episode list with thumbnails |
| **Integrated Player** | One-click streaming preview via modal |
| **Episode Switching** | Navigate episodes directly in TV interface |
| **Favorites System** | Persistent local library with real-time updates |
| **Pagination** | Browse large content libraries with page navigation |
| **Sorting & Filtering** | Sort by popularity, rating, release date |

---

## 6. Screenshots

> Add your screenshots in `/public/screenshots/` and link them here

| Homepage | Search Results |
|----------|----------------|
| ![Home](public/screenshots/home.png) | ![Search](public/screenshots/search.png) |

| Movie Details | Favorites |
|---------------|------------|
| ![Details](public/screenshots/details.png) | ![Favorites](public/screenshots/favorites.png) |

---

## 7. Live Demo

Check out the live application: [StreamX - Movie Explorer](https://movies-explorer-umber.vercel.app/)

---

## 8. Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- TMDB API Key (free at [themoviedb.org](https://www.themoviedb.org/))

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/ciara-gospel/movies-explorer.git
cd movies-explorer

# 2. Install dependencies
npm install

# 3. Environment Setup
# Create a .env file in the root directory and add:
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# 4. Start development server
npm run dev

# 5. Build for production
npm run build
```

### Getting TMDB API Key

1. Go to [The Movie Database](https://www.themoviedb.org/)
2. Create an account and navigate to Settings > API
3. Generate a new API key
4. Add it to your `.env` file

---

## 9. Challenges Faced

### Frontend Challenge: Navigation Loop

**Problem**: The automatic search redirect (Debounce) was fighting with the MovieDetails navigation. If a user clicked a movie while the debounce timer was active, they were pulled back to the search page.

**Solution**: Added a `location.pathname` check in the search `useEffect` to abort navigation if the user is no longer on the home or search route.

---

### TypeScript Challenge: Strict Typing

**Problem**: TMDB returns different field names for movies (`title`) and TV shows (`name`). This caused TypeScript build errors when trying to access these properties uniformly.

**Solution**: Implemented type guards and mapped responses to a unified `Movie` interface using optional properties (`title?`, `name?`) to handle both content types.

---

### Debugging Experience: Build Failures

**Problem**: TypeScript blocked the Vercel build due to unused imports and type mismatches in the `TMDBResponse`.

**Solution**: Cleaned up unused variables and refined the Service Layer types to match the expected component props exactly.

---

### UI Challenge: Responsive Design

**Problem**: Ensuring the movie grid and player modal looked good on all screen sizes.

**Solution**: Utilized Tailwind CSS responsive classes (`md:`, `lg:`, `xl:`) and tested across multiple viewport sizes.

---

## 10. What I Learned

### Technical Skills

- **Debounce Pattern**: Mastering the debounce technique for high-performance search inputs
- **TypeScript**: Advanced type guards, interfaces, and strict typing
- **React Hooks**: Custom hooks for reusable logic (`useDebounce`, `useFetchMovies`)
- **Context API**: Global state management without external libraries

### Architecture & Workflow

- **Environment Variables**: Importance of API key security in frontend applications
- **Service Layer**: How to structure API calls to keep components clean
- **Clean Code**: Writing maintainable and readable code
- **Error Handling**: Implementing graceful degradation for better UX

### Development Tools

- **Vite**: Fast development server and optimized builds
- **Tailwind CSS**: Modern utility-first CSS framework
- **React Router**: Dynamic routing and deep-linking
- **Vercel**: Deployment and CI/CD pipeline

---

## 11. Future Improvements

### Planned Features

| Feature | Priority | Description |
|---------|----------|-------------|
| **Infinite Scroll** | High | Replace pagination with smooth infinite scroll |
| **PWA Support** | Medium | Make the app installable on mobile devices |
| **Firebase Sync** | Medium | Sync favorites across different devices |
| **User Authentication** | Low | Allow users to create accounts and save preferences |
| **Watchlist** | Low | Create multiple watchlists for different categories |
| **Recommendations** | Low | AI-powered movie recommendations based on watch history |
| **Dark/Light Mode** | Low | Toggle between dark and light themes |
| **Offline Mode** | Low | Cache previously viewed content for offline access |

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the API
- [Vidsrc](https://vidsrc.xyz/) for video embedding
- [React](https://react.dev/) community for excellent documentation
- All open-source contributors

---

<div align="center">

**Made with love by StreamX Team**

</div>
