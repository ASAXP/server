import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { StoryRouter } from './controller/story.js';
import { globalErrorHandler } from './utils/globalErrorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.get('/', (req, res) => {
  res.json({ hello: 'hello world' });
});

app.use(StoryRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
