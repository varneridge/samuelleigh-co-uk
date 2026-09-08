import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    note: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    period: z.string(),
    order: z.number().default(50),
    summary: z.string(),
    role: z.string(),
    context: z.string(),
    image: z.string().optional(),
    imageCaption: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const hearings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hearings' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    committee: z.string(),
    session: z.string(),
    witnesses: z.string(),
    attendance: z.enum(['In person', 'Watched online']),
    summary: z.string(),
    draft: z.boolean().default(false)
  })
});

export const collections = { writing, work, hearings };
