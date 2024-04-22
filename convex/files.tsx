import {v} from "convex/values";
import { query, mutation } from "./_generated/server";


export const createFile = mutation({
    args: { 
        name: v.string(),
        teamId: v.string(),
        createdBy: v.string(),
        archieve: v.boolean(),
        document: v.string(),
        whiteboard: v.string()
     },
    handler: async (ctx: any, args: any) => {
      const result = await ctx.db.insert("files", args);

      return result;
    }
})


export const getFiles = query({
    args: {},
    handler: async (ctx: any, args: any) => {
        const result = await ctx.db.
          query("files")
          .collect();

        return result;
    }
})

export const getFilesByTeamId = query({
  args: {
    teamId: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
      const result = await ctx.db.
        query("files")
        .filter((q: any) => q.eq(q.field("teamId"), args.teamId))
        .order("desc")
        .collect();

      return result;
  }
})


export const updateDocument = mutation({
  args: {
    _id: v.id("files"),
    document: v.string()
  },

  handler: async(ctx: any, args: any) => {
    const result = await ctx.db.patch("files", {args});

    return result;
  }
})


// export const deleteFilesByTeamId = mutation({
//   args: {
//     teamId: v.id("teams"),
//   },
//   handler: async (ctx: any, args: any) => {
//     try {
//       const files = await ctx.db.query("files").filter((q: any) => q.eq("teamId", args.teamId)).collect();

//       for (const file of files) {
//         await ctx.db.delete(file._id);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   },
// })


export const deleteFilesByTeamId = mutation({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx: any, args: any) => {
    try {
      const files = await ctx.db.query("files").filter((q: any) => q.eq("teamId", args.teamId)).collect();

      for (const file of files) {
        await ctx.db.delete(file._id);
      }
    } catch (error) {
      console.log(error);
    }
  },
})
