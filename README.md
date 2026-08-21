# Sky Crackers E-Commerce Platform

This is the Sky Crackers e-commerce platform and admin dashboard.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL (via Prisma ORM)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update the `DATABASE_URL` in `.env` to point to your local/remote PostgreSQL instance.
5. Push the database schema: `npx prisma db push`
6. Run the development server: `npm run dev`

## Project Structure
- `app/admin`: Admin dashboard routes
- `app/(store)`: Customer-facing store routes
- `app/api`: Backend API routes
- `components/`: Reusable React components (ui, admin, store, shared)
- `lib/`: Utilities, database clients, services, and integrations
- `prisma/`: Prisma schema and migrations
