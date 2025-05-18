import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().transform((str) => new Date(str)),
    excerpt: z.string(),
    image: z.string().optional(),
    imageCaption: z.string().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
}; 