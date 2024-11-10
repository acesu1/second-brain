import { mutation, query } from './_generated/server'
import { ConvexError, v } from 'convex/values'

// Create note
export const createNote = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    text: v.string(),
  },

  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      throw new ConvexError('Not authenticated')
    }

    await ctx.db.insert('notes', {
      title: args.title,
      description: args.description,
      text: args.text,
      tokenIdentifier: userId,
    })
  },
})

// Get notes
export const getNotes = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      return []
    }

    return await ctx.db
      .query('notes')
      .withIndex('by_token_identifier', (q) => q.eq('tokenIdentifier', userId))
      .collect()
  },
})
