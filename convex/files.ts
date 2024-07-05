import { mutation } from './_generated/server';

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx, _) => {
    return await ctx.storage.generateUploadUrl();
  }
});
