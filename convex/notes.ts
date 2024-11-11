import { mutation, query } from './_generated/server'
import { ConvexError, v } from 'convex/values'

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

export const deleteNote = mutation({
  args: {
    noteId: v.id('notes'),
  },

  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      throw new ConvexError('You must be logged in to create a note')
    }

    const note = await ctx.db.get(args.noteId)

    if (!note) {
      throw new ConvexError('Note not found')
    }

    await ctx.db.delete(args.noteId)
  },
})

export const updateNote = mutation({
  args: {
    noteId: v.id('notes'),
    text: v.string(),
    title: v.string(),
    description: v.string(),
  },

  async handler(ctx, args) {
    const { noteId } = args

    await ctx.db.patch(noteId,
      {
        text: args.text,
        title: args.title,
        description: args.description,
      })
  },
})
