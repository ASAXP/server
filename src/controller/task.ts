import express from 'express';
import wrapAPI from '../utils/wrapAPI.ts';
import { z } from 'zod';
import { taskSchema } from 'src/entities/task/schema/task.type.ts';
import { TaskRepository } from '@/repository/task/task.repository.ts';

const TaskRouter = express.Router();

TaskRouter.get(
  '/tasks',
  wrapAPI(async (req, res) => {
    const { storyID } = req.query;
    const parsedID = z.number().parse(storyID);
    const result = await TaskRepository.getTaskList(parsedID);
    res.status(200).json(result);
  }),
);

TaskRouter.post(
  '/tasks',
  wrapAPI(async (req, res) => {
    const task: unknown = req.body;
    const parsed = taskSchema.parse(task);
    const queryResult = await TaskRepository.postTask(parsed);
    res.status(200).json({ isSuccess: true });
  }),
);

TaskRouter.put(
  '/tasks/:taskID',
  wrapAPI(async (req, res) => {
    const { taskID } = req.params;
    const { body: task } = req;
    const result = await [];
    res.status(200).json(result);
  }),
);

TaskRouter.delete(
  '/tasks/:taskID',
  wrapAPI(async (req, res) => {
    const { taskID } = req.params;
    const bool = await [];
    res.status(200).send('removed');
  }),
);

export { TaskRouter };
