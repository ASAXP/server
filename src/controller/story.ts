import express from 'express';
import wrapAPI from '@/utils/wrapAPI';
import { z } from 'zod';

const StoryRouter = express.Router();

StoryRouter.get('/stories', (req, res) => {
  res.status(200).json(['list']);
});

StoryRouter.get('/stories/:storyId', (req, res) => {
  const { storyId } = req.params;
  res.status(200).json({ id: storyId, target: {} });
});

StoryRouter.post('/stories', (req, res) => {
  const story = req.body;
  const formSchema = z.object({
    type: z.enum(['story', 'epic', 'spike']),
    title: z.string(),
    point: z.number(),
  });
  const parsed = formSchema.parse(story);
  res.status(200).json(parsed);
});

StoryRouter.put('/stories/:storyId', (req, res) => {
  const { storyId } = req.params;
  const { body: story } = req;
  res.status(200).json({
    id: storyId,
    ...story,
  });
});

StoryRouter.delete('/stories/:storyId', (req, res) => {
  res.status(200).send('removed!');
});

export { StoryRouter };
