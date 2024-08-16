import dotenv from 'dotenv';
import express from 'express';
// import cors from 'cors';
import helmet from 'helmet';
import { StoryRouter } from './controller/story';
import { globalErrorHandler } from './utils/globalErrorHandler';

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT;

app.use(helmet());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use(StoryRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
