import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', octopus: 'All eight arms are ready for action.' });
});

app.get('/api/', (_request, response) => {
  response.json({
    baseUrl,
    routes: ['users', 'teams', 'activities', 'leaderboard', 'workouts'].map((route) => `${baseUrl}/api/${route}/`),
  });
});

app.use('/api', apiRouter);

connectDatabase()
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening at ${baseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start OctoFit API:', error);
    process.exit(1);
  });