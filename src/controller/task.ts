import express from 'express';
import wrapAPI from '../utils/wrapAPI.js';
import { z } from 'zod';
import { taskSchema } from '../entities/task/schema/task.type.js';
import { TaskRepository } from '../repository/task/task.repository.js';

const TaskRouter = express.Router();

TaskRouter.get(
  '/tasks/:storyID',
  wrapAPI(async (req, res) => {
    const { storyID } = req.params;
    const result = await TaskRepository.getTaskList(parseInt(storyID));
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
    const result = await TaskRepository.updateTask(taskID, task);
    res.status(200).json(result);
  }),
);

TaskRouter.delete(
  '/tasks/:taskID',
  wrapAPI(async (req, res) => {
    const { taskID } = req.params;
    const bool = await TaskRepository.deleteTask(taskID);
    res.status(200).send('removed');
  }),
);

export { TaskRouter };
