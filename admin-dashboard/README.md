# Babher Admin Dashboard

A secure, internal CMS built with Next.js App Router for managing Contentful content for the Babher website.

## Tech Stack
- **Next.js 15 (App Router)**
- **Tailwind CSS & shadcn/ui**
- **NextAuth.js (Auth.js beta)**
- **Contentful Management API (CMA)**

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy `.env.example` to `.env` or `.env.local` and fill in the values:
   ```bash
   cp .env.example .env.local
   ```
   
   - `CONTENTFUL_CMA_TOKEN`: Create a personal access token in Contentful -> Settings -> CMA Tokens. Needs full access.
   - `CONTENTFUL_SPACE_ID` / `CONTENTFUL_ENVIRONMENT`: Found in Contentful settings.
   - `AUTH_SECRET`: Generate by running `npx auth secret` or `openssl rand -base64 32`.
   - `ADMIN_USERNAME` / `ADMIN_PASSWORD`: Configure your secure login credentials for the dashboard.

3. **Run Development Server:**
   ```bash
   npm run dev -- -p 3001
   ```
   *Note: Using port 3001 to avoid conflicts if the main Vite frontend is running on 3000.*

## Deployment

Deploy on Vercel or any Node.js hosting. Ensure all environment variables are added in the hosting provider's dashboard.
The API routes are protected securely via NextAuth Middleware.
