import express from 'express';
import wrapAPI from '../utils/wrapAPI.js';
import { z } from 'zod';
import { storyRepository } from '../repository/story/story.repository.js';

const StoryRouter = express.Router();

StoryRouter.get(
  '/stories',
  wrapAPI(async (_, res) => {
    const result = await storyRepository.getStoryList();
    res.status(200).json(result);
  }),
);

StoryRouter.get(
  '/stories/:storyId',
  wrapAPI(async (req, res) => {
    const { storyId } = req.params;
    const result = await storyRepository.getStoryById(storyId);
    res.status(200).json(result);
  }),
);

StoryRouter.post(
  '/stories',
  wrapAPI(async (req, res) => {
    const story = req.body;
    const formSchema = z.object({
      type: z.enum(['story', 'epic', 'spike']),
      title: z.string(),
      point: z.number(),
    });
    const parsed = formSchema.parse(story);
    const queryResult = await storyRepository.postStory(parsed);

    res.status(200).json(parsed);
  }),
);

StoryRouter.put(
  '/stories/:storyId',
  wrapAPI(async (req, res) => {
    const { storyId } = req.params;
    const { body: story } = req;
    const result = await storyRepository.updateStory(storyId, story);
    res.status(200).send({ status: 'ok' });
  }),
);

StoryRouter.delete(
  '/stories/:storyId',
  wrapAPI(async (req, res) => {
    const { storyId } = req.params;
    const bool = await storyRepository.deleteStory(storyId);
    res.status(200).send('removed!');
  }),
);

export { StoryRouter };
