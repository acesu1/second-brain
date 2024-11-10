import { mutation } from './_generated/server'
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
