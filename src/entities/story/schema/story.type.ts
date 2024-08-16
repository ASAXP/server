import { z } from 'zod';

const storySchema = z.object({
  storyId: z.number(),
  projectId: z.number(),
  sprintId: z.number().nullable(),
  title: z.string(),
  type: z.enum(['story', 'epic', 'spike']),
  point: z.number().min(0).max(10),
  epicId: z.number().nullable(),
  progress: z.enum(['ready', 'ongoing', 'done']),
});

type TStory = z.infer<typeof storySchema>;

export { type TStory, storySchema };
