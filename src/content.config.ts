import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    color: z.string(),
    gradient: z.string(),
    cover: z.string().optional(),
    repo: z.string().url().optional(),
    playstore: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

const wiki = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/wiki' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['characters', 'realms', 'weapons', 'events']),
    color: z.string(),
    alternate_names: z.array(z.string()).default([]),
    title_role: z.string().optional(),
    faction: z.string().optional(),
    character_type: z.enum(['Hero', 'Villain', 'Anti-Hero', 'Mentor', 'Legendary', 'Deity', 'Supporting', 'Minor']).default('Supporting'),
    status: z.enum(['Canon', 'Draft', 'Under Review']).default('Canon'),
    first_appearance: z.string().optional(),
    abilities: z.array(z.string()).default([]),
    related_characters: z.array(z.string()).default([]),
    related_events: z.array(z.string()).default([]),
    related_realms: z.array(z.string()).default([]),
    related_weapons: z.array(z.string()).default([]),
    realm_type: z.string().optional(),
    period: z.string().optional(),
    region: z.string().optional(),
    capital: z.string().optional(),
    founded: z.string().optional(),
    ended: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    image: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    project: z.string().optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum(['Announcement', 'Update', 'Release', 'Event']),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    project: z.string().optional(),
  }),
});

export const collections = {
  projects,
  wiki,
  blog,
  news,
};
