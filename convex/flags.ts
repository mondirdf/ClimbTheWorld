import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const placeFlag = mutation({
  args: {
    userId: v.id("users"),
    height: v.number(),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db.insert("flags", {
      userId: args.userId,
      username: user.username,
      country: user.country,
      height: args.height,
      color: args.color,
      createdAt: Date.now(),
    });
  },
});

export const getFlags = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("flags")
      .order("desc")
      .take(250);
  },
});

export const getLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    const flags = await ctx.db.query("flags").collect();
    const bestByUser = new Map<
      string,
      { userId: string; username: string; country: string; bestHeight: number; updatedAt: number }
    >();

    for (const flag of flags) {
      const key = String(flag.userId);
      const existing = bestByUser.get(key);
      if (!existing || flag.height > existing.bestHeight) {
        bestByUser.set(key, {
          userId: key,
          username: flag.username,
          country: flag.country,
          bestHeight: flag.height,
          updatedAt: flag.createdAt,
        });
      }
    }

    return Array.from(bestByUser.values())
      .sort((a, b) => b.bestHeight - a.bestHeight)
      .slice(0, 20);
  },
});
