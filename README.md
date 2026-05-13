# Sunha Care Foundation

Sunha Care Foundation is a multilingual Next.js 16 website for an NGO-style organization. It includes a public-facing foundation website, localized content, a blog system, and a simple authentication flow for login, registration, and dashboard access.

## Project Overview

This project was customized beyond the default Next.js starter and now includes a more complete foundation website experience with:

- Clean public URLs such as `/`, `/blog`, `/login`, `/register`, and `/dashboard`
- Cookie-based language switching between Bangla and English
- Shared navbar and footer across the full site
- Home page sections for hero, services, stories, projects, gallery, blog, and contact
- Blog listing page with search, category filter, featured post, and pagination
- Blog details page with share links, CTA sidebar, and related posts
- Authentication pages for login and registration
- Dashboard access after sign-in
- Shared branding using the real `public/logo.png` logo

## Completed Work

The following work has been completed in this repository:

### 1. UI and Layout

- Added a shared site shell for navbar, footer, top progress bar, and floating WhatsApp CTA
- Applied the shared shell across home, blog, blog details, login, register, and dashboard routes
- Replaced icon-based branding with the actual logo image
- Removed extra text next to the logo so the logo image displays fully

### 2. Home Page

- Improved the blog preview section on the home page
- Changed home blog cards to behave like full clickable cards
- Removed the separate `Read more` button from home blog cards
- Added a `See more` button linking to the full blog page
- Updated blog card border radius to `8px`

### 3. Blog System

- Added centralized blog data handling through shared helpers
- Created a full blog listing page
- Added:
  - featured post block
  - category filter
  - search input
  - compact pagination
- Created a blog details page with:
  - full article content
  - gallery images
  - share links
  - CTA box
  - related posts

### 4. Language Switching

- Removed visible `/en` and `/bn` from the public browser URL
- Implemented cookie-based language switching
- Kept internal locale routing for rendering, while exposing clean public URLs
- Added request rewriting through `proxy.ts`
- Updated the language switch button so it:
  - updates the locale cookie
  - refreshes the current page
  - keeps the same public route

### 5. Authentication

- Added login and registration screens
- Connected the UI to credential-based auth routes
- Added dashboard access flow after successful login/register
- Updated auth redirects and callback URLs to use clean paths

### 6. Git Setup

- Initialized the project as a Git repository
- Set the remote repository to:

```bash
https://github.com/NH-Mizan/Sunha-care-fundation.git
```

- Created the initial commit
- Pushed the project to GitHub on the `main` branch

## Route Structure

Public routes now look like this:

- `/`
- `/blog`
- `/blog/[slug]`
- `/login`
- `/register`
- `/dashboard`

Internally, localized rendering is still handled through the `[locale]` route structure and request rewriting.

## Language Behavior

Language now works as follows:

- User clicks the language switch button
- App updates a locale cookie
- App refreshes the same page
- Server renders the same route in the selected language
- URL stays clean without `/en` or `/bn`

## Tech Stack

- Next.js 16.2.3
- React 19
- TypeScript
- Tailwind CSS 4
- NextAuth
- Framer Motion
- Lucide React
- React Icons

## Important Files

Main files related to the current implementation:

- `proxy.ts`
- `hooks/use-locale-switcher.ts`
- `components/layout/site-shell.tsx`
- `sections/foundation-page.tsx`
- `app/[locale]/blog/page.tsx`
- `app/[locale]/blog/[slug]/page.tsx`
- `components/auth/auth-portal-page.tsx`
- `components/auth/auth-card.tsx`
- `lib/blog.ts`
- `messages/en.json`
- `messages/bn.json`

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Verification Done

The project has already been checked with:

```bash
npx eslint
npx tsc --noEmit
npm run build
```

## Git Commands Used

The repository was prepared and pushed with steps equivalent to:

```bash
git init
git branch -M main
git remote add origin https://github.com/NH-Mizan/Sunha-care-fundation.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

## Notes

- Public URLs are clean and professional
- Language is selected through cookie-based switching
- The project is already connected to the GitHub remote
- The current main branch has been pushed successfully
