import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  notes: defineTable({
    title: v.string(),
    description: v.string(),
    text: v.string(),
    tokenIdentifier: v.string(),
  }).index('by_token_identifier', ['tokenIdentifier']),
})
