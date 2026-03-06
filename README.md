# Internet Mountain 🏔️

A playful infinite climbing web app built with **Next.js + TypeScript + TailwindCSS + Convex**.

Users scroll upward on a giant mountain, plant flags at their current height, compete on a realtime leaderboard, unlock milestone popups, discover random reward crates, and watch satisfying side content while climbing.

## Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, TailwindCSS
- **Backend**: Convex

## Project Structure

```txt
app/
  layout.tsx
  page.tsx
  globals.css
components/
  ClimbUI.tsx
  Flag.tsx
  Leaderboard.tsx
  SidebarFun.tsx
convex/
  schema.ts
  users.ts
  flags.ts
lib/
  convexClient.ts
```

## Features

- Infinite vertical mountain (`10,000,000px` climb zone)
- Height tracking from `window.scrollY`
- Place Flag system storing progress
- Country detection from `https://ipapi.co/json`
- Live rendering of all climbers' flags with tooltip details
- Realtime leaderboard ordered by highest height
- Famous milestone popups
- Random hidden reward crates (+500m, +1000m, special flag color)
- Competitive notifications (passing players / distance to next climber)
- Mythical summit message
- Fixed fun side panel with autoplay muted videos

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure env

Create `.env.local` from `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Then set values:

```env
NEXT_PUBLIC_CONVEX_URL="https://basic-seal-476.eu-west-1.convex.cloud"
NEXT_PUBLIC_CONVEX_ANON_KEY="PASTE_CONVEX_KEY_HERE"
```

> `CONVEX_ANON_KEY` is left as a placeholder by design.

### 3) Generate Convex types

```bash
npm run codegen
```

### 4) Run the app locally

```bash
npm run dev
```

This starts:
- Next.js dev server
- Convex dev process

Then open:

- `http://localhost:3000`

## Convex API

### Tables

- `users`
  - `username`
  - `country`
  - `createdAt`
- `flags`
  - `userId`
  - `username`
  - `country`
  - `height`
  - `createdAt`
  - `color` (optional reward)

### Functions

- `createUser(username, country)`
- `placeFlag(userId, height)`
- `getLeaderboard()`
- `getFlags()`

## Build for production

```bash
npm run build
npm run start
```
