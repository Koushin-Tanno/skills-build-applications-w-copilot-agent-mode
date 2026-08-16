import express from 'express';
import './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

app.get('/api/users/', async (_request, response, next) => {
  try {
    response.json(await User.find().lean());
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members').lean());
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().populate('user').sort({ recordedAt: -1 }).lean());
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_request, response, next) => {
  try {
    response.json(await Leaderboard.find().populate('user team').sort({ score: -1 }).lean());
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().lean());
  } catch (error) {
    next(error);
  }
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Unable to load API data' });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${baseUrl}`);
});
