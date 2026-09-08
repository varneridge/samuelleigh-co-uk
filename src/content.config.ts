import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    note: z.string().optional(),
    thumbnail: z.string().optional(),
    // Hearing notes only. Leave blank for ordinary articles.
    committee: z.string().optional(),
    session: z.string().optional(),
    witnesses: z.string().optional(),
    attendance: z.enum(['In person', 'Watched online']).optional(),
    draft: z.boolean().default(false)
  })
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    title: z.string(),
    period: z.string(),
    order: z.number().default(50),
    summary: z.string(),
    role: z.string(),
    context: z.string(),
    org: z.string().optional(),
    bullets: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageCaption: z.string().optional(),
    thumbnail: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
  schema: z.object({
    title: z.string(),
    period: z.string(),
    order: z.number().default(50),
    org: z.string().optional(),
    bullets: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    period: z.string(),
    order: z.number().default(50),
    summary: z.string(),
    stack: z.string().optional(),
    status: z.string().optional(),
    org: z.string().optional(),
    bullets: z.array(z.string()).default([]),
    thumbnail: z.string().optional(),
    image: z.string().optional(),
    imageCaption: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().optional(),
    lede: z.string().optional(),
    // settings.md only
    name: z.string().optional(),
    place: z.string().optional(),
    email: z.string().optional(),
    linkedin: z.string().optional(),
    note: z.string().optional(),
    photo: z.string().optional(),
    cv: z.string().optional(),
    cvUpdated: z.string().optional(),
    navAbout: z.string().optional(),
    navEducation: z.string().optional(),
    navWriting: z.string().optional(),
    navExperience: z.string().optional(),
    navProjects: z.string().optional(),
    headingEducation: z.string().optional(),
    headingExperience: z.string().optional(),
    headingProjects: z.string().optional(),
    headingWriting: z.string().optional()
  })
});

export const collections = { writing, education, experience, projects, pages };
