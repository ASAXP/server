import { z } from 'zod';

const taskSchema = z.object({
  taskID: z.number().nullish(),
  userID: z.number().nullish(),
  storyID: z.number(),
  description: z.string(),
  flag: z.boolean(),
});

type TTask = z.infer<typeof taskSchema>;

export { taskSchema, type TTask };
