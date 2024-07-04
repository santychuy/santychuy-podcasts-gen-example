import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  podcasts: defineTable({
    author: v.string(),
    authorId: v.string(),
    authorImageUrl: v.string(),
    title: v.string(),
    description: v.string(),
    audioStorageId: v.optional(v.id('_storage')),
    audioUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id('_storage')),
    imageUrl: v.string(),
    voicePrompt: v.string(),
    imagePrompt: v.string(),
    voiceType: v.string(),
    audioDuration: v.number(),
    views: v.number(),
    user: v.id('users')
  })
    .searchIndex('search_author', { searchField: 'author' })
    .searchIndex('search_title', { searchField: 'title' })
    .searchIndex('search_body', { searchField: 'description' }),

  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string()
  })
});
