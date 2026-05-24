# Allo Inventory Reservation System

## Tech Stack
- Next.js
- TypeScript
- Prisma
- Neon PostgreSQL

## Features
- Product listing
- Warehouse inventory tracking
- Reservation system
- Confirm reservation
- Release reservation
- Live stock updates

## APIs
- GET /api/products
- POST /api/reservations
- POST /api/reservations/:id/confirm
- POST /api/reservations/:id/release

## Run Locally

Install dependencies:

```bash
npm install
```

Run app:

```bash
npm run dev
```

## Database
Using Neon PostgreSQL with Prisma ORM.

## Reservation Expiry
Currently handled manually through release API.
In production this can be automated using a cron job or background worker.