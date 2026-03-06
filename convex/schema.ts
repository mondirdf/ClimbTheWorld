import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    country: v.string(),
    createdAt: v.number(),
  }).index("by_username", ["username"]),
  flags: defineTable({
    userId: v.id("users"),
    username: v.string(),
    country: v.string(),
    height: v.number(),
    createdAt: v.number(),
    color: v.optional(v.string()),
  })
    .index("by_height", ["height"])
    .index("by_user", ["userId"]),
});
