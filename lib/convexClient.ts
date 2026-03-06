import { ConvexReactClient } from "convex/react";

export const CONVEX_URL =
  process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://basic-seal-476.eu-west-1.convex.cloud";

export const CONVEX_ANON_KEY =
  process.env.NEXT_PUBLIC_CONVEX_ANON_KEY ?? "PASTE_CONVEX_KEY_HERE";

export const convex = new ConvexReactClient(CONVEX_URL);
